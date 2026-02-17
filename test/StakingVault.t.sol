// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {StakingVault} from "../src/StakingVault.sol";
import {EnergyToken} from "../src/EnergyToken.sol";
import {IStakingVault} from "../src/interfaces/IStakingVault.sol";

contract StakingVaultTest is Test {
    StakingVault public vault;
    EnergyToken public token;

    address public owner;
    address public alice;
    address public bob;

    function setUp() public {
        token = new EnergyToken();
        owner = address(this);
        alice = makeAddr("alice");
        bob = makeAddr("bob");

        token.setMinter(owner, true);
        token.mint(alice, 10_000);
        token.mint(bob, 10_000);

        vault = new StakingVault(token);
    }

    function test_depositStake_Success() public {
        vm.startPrank(alice);
        token.approve(address(vault), 1000);
        vault.depositStake(1000);
        vm.stopPrank();
        assertEq(vault.getStake(alice), 1000);
        assertEq(vault.getTotalStaked(), 1000);
        assertEq(token.balanceOf(alice), 9_000);
        assertEq(token.balanceOf(address(vault)), 1000);
    }

    function test_withdrawStake_Success() public {
        vm.startPrank(alice);
        token.approve(address(vault), 1000);
        vault.depositStake(1000);
        vault.withdrawStake(500);
        vm.stopPrank();
        assertEq(vault.getStake(alice), 500);
        assertEq(token.balanceOf(alice), 9_500);
    }

    function test_withdrawStake_RevertsWhenLocked() public {
        vm.startPrank(alice);
        token.approve(address(vault), 1000);
        vault.depositStake(1000);
        vm.stopPrank();
        vault.lockStake(alice, 1 days);
        vm.prank(alice);
        vm.expectRevert(StakingVault.Locked.selector);
        vault.withdrawStake(500);
    }

    function test_applyPenalty_OnlyPenalizer() public {
        vm.startPrank(alice);
        token.approve(address(vault), 1000);
        vault.depositStake(1000);
        vm.stopPrank();
        vault.setPenalizer(bob, true);
        vm.prank(bob);
        vault.applyPenalty(alice, 200, "late");
        assertEq(vault.getStake(alice), 800);
        assertEq(token.balanceOf(owner), 200);
    }

    function test_slash_OnlyPenalizer() public {
        vm.startPrank(alice);
        token.approve(address(vault), 1000);
        vault.depositStake(1000);
        vm.stopPrank();
        vm.prank(owner);
        vault.slash(alice, 300, "violation");
        assertEq(vault.getStake(alice), 700);
    }

    function test_getStakeInfo() public view {
        IStakingVault.StakeInfo memory info = vault.getStakeInfo(alice);
        assertEq(info.staker, alice);
        assertEq(info.amount, 0);
        assertEq(info.lockUntil, 0);
        assertEq(info.isLocked, false);
    }

    function test_isStakeSufficient() public {
        vm.startPrank(alice);
        token.approve(address(vault), 500);
        vault.depositStake(500);
        vm.stopPrank();
        assertTrue(vault.isStakeSufficient(alice, 300));
        assertFalse(vault.isStakeSufficient(alice, 600));
    }

    function test_lockStake_OnlyOwner() public {
        vm.prank(alice);
        vm.expectRevert(StakingVault.Unauthorized.selector);
        vault.lockStake(alice, 1 days);
    }
}
