// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IPanelNFT.sol";

contract PanelNFT is IPanelNFT {
    function balanceOf(address owner) external pure override returns (uint256) {
        revert("NOT_IMPLEMENTED");
    }

    function ownerOf(uint256 tokenId) external pure override returns (address) {
        revert("NOT_IMPLEMENTED");
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function transferFrom(address from, address to, uint256 tokenId) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function approve(address to, uint256 tokenId) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function setApprovalForAll(address operator, bool approved) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function getApproved(uint256 tokenId) external pure override returns (address) {
        revert("NOT_IMPLEMENTED");
    }

    function isApprovedForAll(address owner, address operator) external pure override returns (bool) {
        revert("NOT_IMPLEMENTED");
    }

    function mint(address to, string calldata metadataUri, uint256 capacityWatt) external pure override returns (uint256) {
        revert("NOT_IMPLEMENTED");
    }

    function retire(uint256 tokenId) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function getPanelMetadata(uint256 tokenId) external pure override returns (PanelMetadata memory) {
        revert("NOT_IMPLEMENTED");
    }

    function totalSupply() external pure override returns (uint256) {
        revert("NOT_IMPLEMENTED");
    }
}
