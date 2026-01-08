// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IGovernanceDAO.sol";

contract GovernanceDAO is IGovernanceDAO {
    function createProposal(string calldata description, uint256 votingPeriod) external pure override returns (uint256) {
        revert("NOT_IMPLEMENTED");
    }

    function castVote(uint256 proposalId, bool support) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function executeProposal(uint256 proposalId) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function cancelProposal(uint256 proposalId) external pure override {
        revert("NOT_IMPLEMENTED");
    }

    function getProposal(uint256 proposalId) external pure override returns (Proposal memory) {
        revert("NOT_IMPLEMENTED");
    }

    function getVote(uint256 proposalId, address voter) external pure override returns (Vote memory) {
        revert("NOT_IMPLEMENTED");
    }

    function hasVoted(uint256 proposalId, address voter) external pure override returns (bool) {
        revert("NOT_IMPLEMENTED");
    }

    function getVotingPower(address voter) external pure override returns (uint256) {
        revert("NOT_IMPLEMENTED");
    }

    function isProposalExecutable(uint256 proposalId) external pure override returns (bool) {
        revert("NOT_IMPLEMENTED");
    }
}
