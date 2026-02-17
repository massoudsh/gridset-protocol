// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IEnergyOracle.sol";

/**
 * @title EnergyOracle
 * @notice Reports production data and finalizes time slots for settlement.
 */
contract EnergyOracle is IEnergyOracle {
    uint256 public constant SLOT_DURATION = 1 hours;

    mapping(uint256 => mapping(uint256 => ProductionReport)) private _reports; // panelId => timestamp => report
    mapping(uint256 => uint256) private _slotTotalEnergy;   // slotId => total energy
    mapping(uint256 => bool) private _slotFinalized;

    address public owner;
    address public oracle;

    error Unauthorized();
    error ZeroAddress();
    error SlotAlreadyFinalized();

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    modifier onlyOracle() {
        if (msg.sender != oracle && msg.sender != owner) revert Unauthorized();
        _;
    }

    constructor() {
        owner = msg.sender;
        oracle = msg.sender;
    }

    function updateOracle(address newOracle) external override onlyOwner {
        if (newOracle == address(0)) revert ZeroAddress();
        address oldOracle = oracle;
        oracle = newOracle;
        emit OracleUpdated(oldOracle, newOracle);
    }

    function reportProduction(uint256 panelId, uint256 timestamp, uint256 energyWh) external override onlyOracle {
        uint256 slotId = (timestamp / SLOT_DURATION) * SLOT_DURATION;
        _slotTotalEnergy[slotId] += energyWh;
        _reports[panelId][timestamp] = ProductionReport({
            panelId: panelId,
            timestamp: timestamp,
            energyWh: energyWh,
            reporter: msg.sender,
            verified: true
        });
        emit ProductionReported(panelId, timestamp, energyWh, msg.sender);
    }

    function finalizeTimeSlot(uint256 timeSlot) external override onlyOracle {
        if (_slotFinalized[timeSlot]) revert SlotAlreadyFinalized();
        _slotFinalized[timeSlot] = true;
        uint256 total = _slotTotalEnergy[timeSlot];
        emit TimeSlotFinalized(timeSlot, total);
    }

    function getProductionReport(uint256 panelId, uint256 timestamp) external view override returns (ProductionReport memory) {
        return _reports[panelId][timestamp];
    }

    function getTimeSlotData(uint256 timeSlot) external view override returns (TimeSlotData memory) {
        return TimeSlotData({
            startTime: timeSlot,
            endTime: timeSlot + SLOT_DURATION,
            totalEnergy: _slotTotalEnergy[timeSlot],
            finalized: _slotFinalized[timeSlot]
        });
    }

    function getTotalProductionInSlot(uint256 timeSlot) external view override returns (uint256) {
        return _slotTotalEnergy[timeSlot];
    }

    function isTimeSlotFinalized(uint256 timeSlot) external view override returns (bool) {
        return _slotFinalized[timeSlot];
    }
}
