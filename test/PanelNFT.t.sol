// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {PanelNFT} from "../src/PanelNFT.sol";
import {IPanelNFT} from "../src/interfaces/IPanelNFT.sol";

contract PanelNFTTest is Test {
    PanelNFT public nft;

    address public owner;
    address public minter;
    address public alice;
    address public bob;

    function setUp() public {
        nft = new PanelNFT();
        owner = address(this);
        minter = makeAddr("minter");
        alice = makeAddr("alice");
        bob = makeAddr("bob");
        nft.setMinter(minter, true);
    }

    function test_mint_Success() public {
        vm.prank(minter);
        uint256 id = nft.mint(alice, "ipfs://meta/1", 5000);
        assertEq(id, 1);
        assertEq(nft.ownerOf(1), alice);
        assertEq(nft.balanceOf(alice), 1);
        assertEq(nft.totalSupply(), 1);
        IPanelNFT.PanelMetadata memory m = nft.getPanelMetadata(1);
        assertEq(m.tokenId, 1);
        assertEq(m.metadataUri, "ipfs://meta/1");
        assertEq(m.capacityWatt, 5000);
        assertTrue(m.isActive);
    }

    function test_transferFrom_Success() public {
        vm.prank(minter);
        nft.mint(alice, "uri", 1000);
        vm.prank(alice);
        nft.transferFrom(alice, bob, 1);
        assertEq(nft.ownerOf(1), bob);
        assertEq(nft.balanceOf(alice), 0);
        assertEq(nft.balanceOf(bob), 1);
    }

    function test_approve_And_getApproved() public {
        vm.prank(minter);
        nft.mint(alice, "uri", 1000);
        vm.prank(alice);
        nft.approve(bob, 1);
        assertEq(nft.getApproved(1), bob);
        vm.prank(bob);
        nft.transferFrom(alice, bob, 1);
        assertEq(nft.ownerOf(1), bob);
    }

    function test_retire() public {
        vm.prank(minter);
        nft.mint(alice, "uri", 1000);
        vm.prank(alice);
        nft.retire(1);
        IPanelNFT.PanelMetadata memory m = nft.getPanelMetadata(1);
        assertFalse(m.isActive);
        vm.prank(alice);
        vm.expectRevert(PanelNFT.AlreadyRetired.selector);
        nft.transferFrom(alice, bob, 1);
    }

    function test_balanceOf_InitialZero() public view {
        assertEq(nft.balanceOf(alice), 0);
    }

    function test_ownerOf_RevertsInvalidToken() public {
        vm.expectRevert(PanelNFT.InvalidTokenId.selector);
        nft.ownerOf(999);
    }

    function test_mint_RevertsWhenNotMinter() public {
        vm.prank(alice);
        vm.expectRevert(PanelNFT.Unauthorized.selector);
        nft.mint(alice, "uri", 1000);
    }
}
