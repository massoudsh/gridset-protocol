// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {EnergyToken} from "../src/EnergyToken.sol";

contract EnergyTokenTest is Test {
    EnergyToken public token;

    function setUp() public {
        token = new EnergyToken();
    }

    function test_totalSupply_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        token.totalSupply();
    }

    function test_balanceOf_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        token.balanceOf(address(1));
    }

    function test_transfer_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        token.transfer(address(1), 100);
    }

    function test_approve_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        token.approve(address(1), 100);
    }

    function test_transferFrom_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        token.transferFrom(address(1), address(2), 100);
    }

    function test_mint_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        token.mint(address(1), 100);
    }

    function test_burn_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        token.burn(address(1), 100);
    }

    function test_lock_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        token.lock(address(1), 100);
    }

    function test_unlock_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        token.unlock(address(1), 100);
    }

    function test_getEnergyBalance_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        token.getEnergyBalance(address(1));
    }
}
