import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const contractAbi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_member",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_shares",
        type: "uint256",
      },
    ],
    name: "addMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
    ],
    name: "createProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_proposalId",
        type: "uint256",
      },
    ],
    name: "executeProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "founder",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "members",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "hasVoted",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposals",
    outputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "votesFor",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "votesAgainst",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "passed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalProposals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalShares",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_proposalId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_voteFor",
        type: "bool",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

function ContractInteraction() {
  const [contract, setContract] = useState(null);
  const [member, setMember] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const [proposalId, setProposalId] = useState(0);
  const [error, setError] = useState("");
  // const connectWeb3 = async () => {
  //   const web3Modal = new Web3Modal();
  //   const connection = await web3Modal.connect();
  //  const provider = new ethers.BrowserProvider(window.ethereum);
  //   const signer = provider.getSigner();
  //   const instance = new ethers.Contract(contractAddress, contractAbi, signer);
  //   setContract(instance);
  // };

  const connectWeb3 = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0xAB0E7bb4BDD6F3e60DEC203e4789dB785008B43D",
      contractAbi,
      signer
    );
    setContract(contract);
  };

  const addMember = async () => {
    const gasLimit = 33400;
    if (!contract || !member) return;

    try {
      const tx = await contract.addMember(member, 100); // 100 shares as an example
      const receipt = await tx.wait();
      console.log("Transaction Hash:", receipt.transactionHash);
      console.log("Member added successfully");
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const createProposal = async () => {
    if (!contract || !proposalDescription) return;

    try {
      const tx = await contract.createProposal(proposalDescription);
      await tx.wait();
      console.log("Proposal created successfully");
    } catch (error) {
      console.error("Error creating proposal:", error);
    }
  };

  const vote = async (voteFor) => {
    if (!contract || proposalId < 0) return;

    try {
      const tx = await contract.vote(proposalId, voteFor);
      await tx.wait();
      console.log("Vote submitted successfully");
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  const executeProposal = async () => {
    if (!contract || proposalId < 0) return;

    try {
      const tx = await contract.executeProposal(proposalId);
      await tx.wait();
      console.log("Proposal executed successfully");
    } catch (error) {
      console.error("Error executing proposal:", error);
    }
  };

  return (
    <div>
      <h2>DAO Contract Interaction</h2>
      <button onClick={connectWeb3}>Connect to Web3</button>
      <div>
        <input
          type="text"
          placeholder="Member Address"
          value={member}
          onChange={(e) => setMember(e.target.value)}
        />
        <button onClick={addMember}>Add Member</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Proposal Description"
          value={proposalDescription}
          onChange={(e) => setProposalDescription(e.target.value)}
        />
        <button onClick={createProposal}>Create Proposal</button>
      </div>
      <div>
        <input
          type="number"
          placeholder="Proposal ID"
          value={proposalId}
          onChange={(e) => setProposalId(e.target.value)}
        />
        <button onClick={() => vote(true)}>Vote For</button>
        <button onClick={() => vote(false)}>Vote Against</button>
        <button onClick={executeProposal}>Execute Proposal</button>
      </div>
    </div>
  );
}

export default ContractInteraction;
