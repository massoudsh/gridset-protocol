// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {EnergyOracle} from "../src/EnergyOracle.sol";
import {IEnergyOracle} from "../src/interfaces/IEnergyOracle.sol";

contract EnergyOracleTest is Test {
    EnergyOracle public oracle;

    address public owner;
    uint256 public slot0;

    function setUp() public {
        oracle = new EnergyOracle();
        owner = address(this);
        slot0 = (block.timestamp / 1 hours) * 1 hours;
    }

    function test_reportProduction_Success() public {
        oracle.reportProduction(1, slot0, 100);
        oracle.reportProduction(1, slot0, 50);
        assertEq(oracle.getTotalProductionInSlot(slot0), 150);
        IEnergyOracle.ProductionReport memory r = oracle.getProductionReport(1, slot0);
        assertEq(r.panelId, 1);
        assertEq(r.energyWh, 50);
        assertEq(r.reporter, owner);
        assertTrue(r.verified);
    }

    function test_finalizeTimeSlot_Success() public {
        oracle.reportProduction(1, slot0, 200);
        oracle.finalizeTimeSlot(slot0);
        assertTrue(oracle.isTimeSlotFinalized(slot0));
        IEnergyOracle.TimeSlotData memory d = oracle.getTimeSlotData(slot0);
        assertEq(d.startTime, slot0);
        assertEq(d.endTime, slot0 + 1 hours);
        assertEq(d.totalEnergy, 200);
        assertTrue(d.finalized);
    }

    function test_updateOracle_OnlyOwner() public {
        address newOracle = address(0x123);
        oracle.updateOracle(newOracle);
        vm.prank(address(0x99));
        vm.expectRevert(EnergyOracle.Unauthorized.selector);
        oracle.reportProduction(1, slot0, 100);
    }

    function test_finalizeTimeSlot_RevertsWhenAlreadyFinalized() public {
        oracle.finalizeTimeSlot(slot0);
        vm.expectRevert(EnergyOracle.SlotAlreadyFinalized.selector);
        oracle.finalizeTimeSlot(slot0);
    }
}
