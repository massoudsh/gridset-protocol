// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IEnergyToken.sol";

contract EnergyToken is IEnergyToken {
    function totalSupply() external pure override returns (uint256) {
        revert("NOT_IMPLEMENTED");
    }

    function balanceOf(address account) external pure override returns (uint256) {
        revert("NOT_IMPLEMENTED");
    }

    function transfer(address to, uint256 amount) external pure override returns (bool) {
        revert("NOT_IMPLEMENTED");
    }

    function allowance(address owner, address spender) external pure override returns (uint256) {
        revert("NOT_IMPLEMENTED");
    }

    function approve(address spender, uint256 amount) external pure override returns (bool) {
        revert("NOT_IMPLEMENTED");
    }

    function transferFrom(address from, address to, uint256 amount) external pure override returns (bool) {
        revert("NOT_IMPLEMENTED");
    }

    function mint(address to, uint256 amount) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function burn(address from, uint256 amount) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function lock(address account, uint256 amount) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function unlock(address account, uint256 amount) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function getEnergyBalance(address account) external pure override returns (EnergyBalance memory) {
        revert("NOT_IMPLEMENTED");
    }
}
