// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/ISettlementEngine.sol";

contract SettlementEngine is ISettlementEngine {
    function settleTimeSlot(uint256 timeSlot) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function settleParticipant(uint256 timeSlot, address participant) external pure override returns (SettlementRecord memory) {
        revert("NOT_IMPLEMENTED");
    }

    function assessPenalty(address participant, uint256 amount, string calldata reason) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function raiseDispute(uint256 timeSlot, address participant) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function getSettlementRecord(uint256 timeSlot, address participant) external pure override returns (SettlementRecord memory) {
        revert("NOT_IMPLEMENTED");
    }

    function getTimeSlotSettlement(uint256 timeSlot) external pure override returns (TimeSlotSettlement memory) {
        revert("NOT_IMPLEMENTED");
    }

    function isTimeSlotSettled(uint256 timeSlot) external pure override returns (bool) {
        revert("NOT_IMPLEMENTED");
    }

    function finalizeTimeSlot(uint256 timeSlot) external pure override {
        revert("NOT_IMPLEMENTED");
    }
}
