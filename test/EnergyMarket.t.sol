// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {EnergyMarket} from "../src/EnergyMarket.sol";

contract EnergyMarketTest is Test {
    EnergyMarket public market;

    function setUp() public {
        market = new EnergyMarket();
    }

    function test_placeBid_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        market.placeBid(1, 100, 50);
    }

    function test_placeAsk_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        market.placeAsk(1, 100, 50);
    }

    function test_cancelOrder_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        market.cancelOrder(1);
    }

    function test_startAuction_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        market.startAuction(1, 3600);
    }

    function test_clearAuction_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        market.clearAuction(1);
    }

    function test_getOrder_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        market.getOrder(1);
    }

    function test_getAuction_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        market.getAuction(1);
    }

    function test_getBestBid_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        market.getBestBid(1);
    }

    function test_getBestAsk_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        market.getBestAsk(1);
    }

    function test_getOrderBook_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        market.getOrderBook(1);
    }
}
