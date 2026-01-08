// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {EnergyOracle} from "../src/EnergyOracle.sol";

contract EnergyOracleTest is Test {
    EnergyOracle public oracle;

    function setUp() public {
        oracle = new EnergyOracle();
    }

    function test_reportProduction_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        oracle.reportProduction(1, block.timestamp, 100);
    }

    function test_finalizeTimeSlot_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        oracle.finalizeTimeSlot(1);
    }

    function test_getProductionReport_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        oracle.getProductionReport(1, block.timestamp);
    }

    function test_getTimeSlotData_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        oracle.getTimeSlotData(1);
    }

    function test_getTotalProductionInSlot_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        oracle.getTotalProductionInSlot(1);
    }

    function test_isTimeSlotFinalized_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        oracle.isTimeSlotFinalized(1);
    }

    function test_updateOracle_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        oracle.updateOracle(address(1));
    }
}
