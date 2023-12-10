// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract VotingDAO {
    
    address public founder;
    uint256 public totalShares;
    uint256 public totalProposals;

    struct Member {
        uint256 shares;
        bool hasVoted;
        mapping(uint256 => bool) votedProposals;
    }

    struct Proposal {
        address creator;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
    }

    mapping(address => Member) public members;
    Proposal[] public proposals;

    event ProposalCreated(uint256 proposalId, string description);
    event Voted(uint256 proposalId, address voter, bool inSupport);
    event ProposalExecuted(uint256 proposalId);

    modifier onlyFounder() {
        require(msg.sender == founder, "Only the founder can call this function");
        _;
    }

    modifier notVoted(uint256 _proposalId) {
        require(!members[msg.sender].votedProposals[_proposalId], "You have already voted");
        _;
    }

    constructor() {

        founder = msg.sender;
        totalShares = 0;
        totalProposals = 0;
    }

    function addMember(address _member, uint256 _shares) external onlyFounder {
        require(_member != address(0), "Invalid member address");
        require(_shares > 0, "Shares must be greater than zero");
        require(members[_member].shares == 0, "Member already exists");

        members[_member].shares = _shares;
        totalShares += _shares;
    }

    function createProposal(string memory _description) external {
        require(bytes(_description).length > 0, "Description can't be empty");

        proposals.push(Proposal({
            creator: msg.sender,
            description: _description,
            votesFor: 0,
            votesAgainst: 0,
            executed: false
        }));
        totalProposals++;

        emit ProposalCreated(totalProposals, _description);
    }

    function vote(uint256 _proposalId, bool _inSupport) external notVoted(_proposalId) {
        require(_proposalId > 0 && _proposalId <= totalProposals, "Invalid proposal ID");

        Member storage member = members[msg.sender];
        Proposal storage proposal = proposals[_proposalId - 1];
        require(!proposal.executed, "Proposal has already been executed");

        if (_inSupport) {
            proposal.votesFor += member.shares;
        } else {
            proposal.votesAgainst += member.shares;
        }

        member.votedProposals[_proposalId] = true;
        member.hasVoted = true;

        emit Voted(_proposalId, msg.sender, _inSupport);
    }

    function executeProposal(uint256 _proposalId) external onlyFounder {
        require(_proposalId > 0 && _proposalId <= totalProposals, "Invalid proposal ID");

        Proposal storage proposal = proposals[_proposalId - 1];
        require(!proposal.executed, "Proposal has already been executed");

        // Simple execution condition: more than 50% of the votes are in favor
        if (proposal.votesFor > totalShares / 2) {
       
            proposal.executed = true;

            emit ProposalExecuted(_proposalId);
        }
    }
}
