// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IEnergyOracle.sol";

contract EnergyOracle is IEnergyOracle {
    function reportProduction(uint256 panelId, uint256 timestamp, uint256 energyWh) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function finalizeTimeSlot(uint256 timeSlot) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function getProductionReport(uint256 panelId, uint256 timestamp) external pure override returns (ProductionReport memory) {
        revert("NOT_IMPLEMENTED");
    }

    function getTimeSlotData(uint256 timeSlot) external pure override returns (TimeSlotData memory) {
        revert("NOT_IMPLEMENTED");
    }

    function getTotalProductionInSlot(uint256 timeSlot) external pure override returns (uint256) {
        revert("NOT_IMPLEMENTED");
    }

    function isTimeSlotFinalized(uint256 timeSlot) external pure override returns (bool) {
        revert("NOT_IMPLEMENTED");
    }

    function updateOracle(address newOracle) external pure override {
        revert("NOT_IMPLEMENTED");
    }
}
