// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {SettlementEngine} from "../src/SettlementEngine.sol";

contract SettlementEngineTest is Test {
    SettlementEngine public engine;

    function setUp() public {
        engine = new SettlementEngine();
    }

    function test_settleTimeSlot_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        engine.settleTimeSlot(1);
    }

    function test_settleParticipant_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        engine.settleParticipant(1, address(1));
    }

    function test_assessPenalty_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        engine.assessPenalty(address(1), 100, "reason");
    }

    function test_raiseDispute_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        engine.raiseDispute(1, address(1));
    }

    function test_getSettlementRecord_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        engine.getSettlementRecord(1, address(1));
    }

    function test_getTimeSlotSettlement_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        engine.getTimeSlotSettlement(1);
    }

    function test_isTimeSlotSettled_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        engine.isTimeSlotSettled(1);
    }

    function test_finalizeTimeSlot_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        engine.finalizeTimeSlot(1);
    }
}
