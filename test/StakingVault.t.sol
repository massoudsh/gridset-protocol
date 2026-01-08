// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {StakingVault} from "../src/StakingVault.sol";

contract StakingVaultTest is Test {
    StakingVault public vault;

    function setUp() public {
        vault = new StakingVault();
    }

    function test_depositStake_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        vault.depositStake(100);
    }

    function test_withdrawStake_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        vault.withdrawStake(100);
    }

    function test_applyPenalty_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        vault.applyPenalty(address(1), 100, "reason");
    }

    function test_slash_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        vault.slash(address(1), 100, "reason");
    }

    function test_getStake_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        vault.getStake(address(1));
    }

    function test_getStakeInfo_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        vault.getStakeInfo(address(1));
    }

    function test_getTotalStaked_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        vault.getTotalStaked();
    }

    function test_isStakeSufficient_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        vault.isStakeSufficient(address(1), 100);
    }

    function test_lockStake_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        vault.lockStake(address(1), 86400);
    }
}
