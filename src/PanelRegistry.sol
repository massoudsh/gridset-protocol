// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IPanelRegistry.sol";

contract PanelRegistry is IPanelRegistry {
    function registerPanel(uint256 tokenId, address owner, uint256 capacityWatt) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function deregisterPanel(uint256 tokenId) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function reportProduction(uint256 tokenId, uint256 timestamp, uint256 energyWh) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function getPanelRecord(uint256 tokenId) external pure override returns (PanelRecord memory) {
        revert("NOT_IMPLEMENTED");
    }

    function getTotalProduction(uint256 tokenId) external pure override returns (uint256) {
        revert("NOT_IMPLEMENTED");
    }

    function getProductionInTimeSlot(uint256 tokenId, uint256 startTime, uint256 endTime) external pure override returns (uint256) {
        revert("NOT_IMPLEMENTED");
    }

    function isRegistered(uint256 tokenId) external pure override returns (bool) {
        revert("NOT_IMPLEMENTED");
    }

    function getRegisteredPanels() external pure override returns (uint256[] memory) {
        revert("NOT_IMPLEMENTED");
    }
}
