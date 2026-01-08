// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {GovernanceDAO} from "../src/GovernanceDAO.sol";

contract GovernanceDAOTest is Test {
    GovernanceDAO public dao;

    function setUp() public {
        dao = new GovernanceDAO();
    }

    function test_createProposal_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        dao.createProposal("description", 86400);
    }

    function test_castVote_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        dao.castVote(1, true);
    }

    function test_executeProposal_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        dao.executeProposal(1);
    }

    function test_cancelProposal_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        dao.cancelProposal(1);
    }

    function test_getProposal_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        dao.getProposal(1);
    }

    function test_getVote_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        dao.getVote(1, address(1));
    }

    function test_hasVoted_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        dao.hasVoted(1, address(1));
    }

    function test_getVotingPower_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        dao.getVotingPower(address(1));
    }

    function test_isProposalExecutable_Reverts() public {
        vm.expectRevert("NOT_IMPLEMENTED");
        dao.isProposalExecutable(1);
    }
}
