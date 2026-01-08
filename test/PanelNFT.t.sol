// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {PanelNFT} from "../src/PanelNFT.sol";

contract PanelNFTTest is Test {
    PanelNFT public nft;

    function setUp() public {
        nft = new PanelNFT();
    }

    function test_balanceOf_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        nft.balanceOf(address(1));
    }

    function test_ownerOf_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        nft.ownerOf(1);
    }

    function test_safeTransferFrom_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        nft.safeTransferFrom(address(1), address(2), 1, "");
    }

    function test_transferFrom_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        nft.transferFrom(address(1), address(2), 1);
    }

    function test_approve_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        nft.approve(address(1), 1);
    }

    function test_setApprovalForAll_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        nft.setApprovalForAll(address(1), true);
    }

    function test_mint_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        nft.mint(address(1), "uri", 1000);
    }

    function test_retire_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        nft.retire(1);
    }

    function test_getPanelMetadata_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        nft.getPanelMetadata(1);
    }

    function test_totalSupply_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        nft.totalSupply();
    }
}
