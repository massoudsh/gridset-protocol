// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IStakingVault.sol";

contract StakingVault is IStakingVault {
    function depositStake(uint256 amount) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function withdrawStake(uint256 amount) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function applyPenalty(address staker, uint256 amount, string calldata reason) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function slash(address staker, uint256 amount, string calldata reason) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function getStake(address staker) external pure override returns (uint256) {
        revert("NOT_IMPLEMENTED");
    }

    function getStakeInfo(address staker) external pure override returns (StakeInfo memory) {
        revert("NOT_IMPLEMENTED");
    }

    function getTotalStaked() external pure override returns (uint256) {
        revert("NOT_IMPLEMENTED");
    }

    function isStakeSufficient(address staker, uint256 requiredAmount) external pure override returns (bool) {
        revert("NOT_IMPLEMENTED");
    }

    function lockStake(address staker, uint256 lockDuration) external pure override {
        revert("NOT_IMPLEMENTED");
    }
}
