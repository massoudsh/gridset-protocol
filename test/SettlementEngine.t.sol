// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {SettlementEngine} from "../src/SettlementEngine.sol";
import {EnergyToken} from "../src/EnergyToken.sol";
import {EnergyMarket} from "../src/EnergyMarket.sol";
import {ISettlementEngine} from "../src/interfaces/ISettlementEngine.sol";

contract SettlementEngineTest is Test {
    SettlementEngine public engine;
    EnergyToken public token;
    EnergyMarket public market;

    address public owner;
    address public alice;
    address public bob;
    uint256 public constant SLOT = 1000;
    uint256 public constant DURATION = 3600;

    function setUp() public {
        token = new EnergyToken();
        market = new EnergyMarket();
        owner = address(this);
        alice = makeAddr("alice");
        bob = makeAddr("bob");

        token.setMinter(owner, true);
        token.mint(alice, 100_000);
        token.mint(bob, 100_000);

        engine = new SettlementEngine(token, market);

        market.startAuction(SLOT, DURATION);
        vm.prank(alice);
        market.placeBid(SLOT, 100, 50);
        vm.prank(bob);
        market.placeAsk(SLOT, 90, 40);
        market.clearAuction(SLOT);
    }

    function test_finalizeTimeSlot_Success() public {
        engine.finalizeTimeSlot(SLOT);
        ISettlementEngine.TimeSlotSettlement memory s = engine.getTimeSlotSettlement(SLOT);
        assertTrue(s.isFinalized);
        assertEq(s.clearingPrice, 100);
        assertEq(s.totalEnergy, 40);
    }

    function test_settleTimeSlot_Success() public {
        engine.finalizeTimeSlot(SLOT);
        token.approve(address(engine), 4000);
        vm.prank(alice);
        token.approve(address(engine), 4000);
        vm.prank(bob);
        token.approve(address(engine), type(uint256).max);

        engine.settleTimeSlot(SLOT);

        assertTrue(engine.isTimeSlotSettled(SLOT));
        ISettlementEngine.SettlementRecord memory rAlice = engine.getSettlementRecord(SLOT, alice);
        assertTrue(rAlice.isSettled);
        assertEq(rAlice.energyConsumed, 40);
        assertEq(rAlice.energyProduced, 0);
        assertEq(rAlice.paymentAmount, 0);
        assertEq(token.balanceOf(alice), 100_000 - 4000);

        ISettlementEngine.SettlementRecord memory rBob = engine.getSettlementRecord(SLOT, bob);
        assertEq(rBob.energyProduced, 40);
        assertEq(rBob.paymentAmount, 4000);
        assertEq(token.balanceOf(bob), 100_000 + 4000);
    }

    function test_finalizeTimeSlot_RevertsWhenNotCleared() public {
        market.startAuction(SLOT + 1, DURATION);
        vm.expectRevert(SettlementEngine.SlotNotCleared.selector);
        engine.finalizeTimeSlot(SLOT + 1);
    }

    function test_settleTimeSlot_RevertsWhenNotFinalized() public {
        vm.expectRevert(SettlementEngine.SlotNotFinalized.selector);
        engine.settleTimeSlot(SLOT);
    }

    function test_assessPenalty_OnlyPenalizer() public {
        token.mint(alice, 1000);
        engine.setPenalizer(bob, true);
        vm.prank(alice);
        token.approve(address(engine), 500);
        vm.prank(bob);
        engine.assessPenalty(alice, 500, "late");
        assertEq(token.balanceOf(owner), 500);
    }

    function test_raiseDispute() public {
        engine.finalizeTimeSlot(SLOT);
        vm.prank(alice);
        engine.raiseDispute(SLOT, alice);
        // No getter for dispute in interface; just check it doesn't revert
    }
}
