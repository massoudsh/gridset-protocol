// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IEnergyMarket.sol";

contract EnergyMarket is IEnergyMarket {
    function placeBid(uint256 timeSlot, uint256 price, uint256 quantity) external pure override returns (uint256) {
        revert("NOT_IMPLEMENTED");
    }

    function placeAsk(uint256 timeSlot, uint256 price, uint256 quantity) external pure override returns (uint256) {
        revert("NOT_IMPLEMENTED");
    }

    function cancelOrder(uint256 orderId) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function startAuction(uint256 timeSlot, uint256 duration) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function clearAuction(uint256 timeSlot) external pure override returns (uint256) {
        revert("NOT_IMPLEMENTED");
    }

    function getOrder(uint256 orderId) external pure override returns (Order memory) {
        revert("NOT_IMPLEMENTED");
    }

    function getAuction(uint256 timeSlot) external pure override returns (Auction memory) {
        revert("NOT_IMPLEMENTED");
    }

    function getBestBid(uint256 timeSlot) external pure override returns (uint256 price, uint256 quantity) {
        revert("NOT_IMPLEMENTED");
    }

    function getBestAsk(uint256 timeSlot) external pure override returns (uint256 price, uint256 quantity) {
        revert("NOT_IMPLEMENTED");
    }

    function getOrderBook(uint256 timeSlot) external pure override returns (Order[] memory bids, Order[] memory asks) {
        revert("NOT_IMPLEMENTED");
    }
}
