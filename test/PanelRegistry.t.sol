// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {PanelRegistry} from "../src/PanelRegistry.sol";

contract PanelRegistryTest is Test {
    PanelRegistry public registry;

    function setUp() public {
        registry = new PanelRegistry();
    }

    function test_registerPanel_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        registry.registerPanel(1, address(1), 1000);
    }

    function test_deregisterPanel_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        registry.deregisterPanel(1);
    }

    function test_reportProduction_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        registry.reportProduction(1, block.timestamp, 100);
    }

    function test_getPanelRecord_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        registry.getPanelRecord(1);
    }

    function test_getTotalProduction_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        registry.getTotalProduction(1);
    }

    function test_getProductionInTimeSlot_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        registry.getProductionInTimeSlot(1, block.timestamp, block.timestamp + 3600);
    }

    function test_isRegistered_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        registry.isRegistered(1);
    }

    function test_getRegisteredPanels_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        registry.getRegisteredPanels();
    }
}
