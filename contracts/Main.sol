// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import "./verifier.sol";

contract Main{
    // address payable public owner;
    // payable constructor can recieve ethers
    event Created(address creator, uint amount);
    mapping(bytes32 => bool) public nullifierHashes; // Nuffifier Hashes are used to nullify a BunnyNote so we know they have been spent
    // We store all the crypto cash data and make sure there are no accidental deposits twice and this allows us to query for transaction details later
    struct CommitmentStore {
    bool used;
    address creator;
    address recipient;
    uint256 createdDate;
    uint256 spentDate;
    uint256 denomination;
    }
    mapping(bytes32 => CommitmentStore) public commitments;
    address payable public _owner;
    Groth16Verifier instance1;
    constructor(){
        Groth16Verifier instance=new Groth16Verifier();
        instance1=instance;
        _owner=payable(msg.sender);
    }
    function createNote(bytes32 _commitment)external payable{
        require(!commitments[_commitment].used, "Used commitment");
        require(msg.value > 0, "Invalid denomination");
        commitments[_commitment].used = true;
        commitments[_commitment].creator = msg.sender;
        commitments[_commitment].createdDate = block.timestamp;
        commitments[_commitment].denomination = msg.value;
        emit Created(msg.sender, msg.value);
    }


    function verify(uint256[2] calldata _pA, uint256[2][2] calldata _pB, uint256[2] calldata _pC, bytes32 _nullifierHash, bytes32 _commitment, address _recipient)public{
      bool success=instance1.verifyProof(_pA, _pB, _pC, [uint256(_nullifierHash),uint256(_commitment),uint256(uint160(_recipient))]);
      require(success,"Invalid");
      withdraw(_nullifierHash,_commitment,_recipient);
    }
    function withdraw(bytes32 _nullifierHash, bytes32 _commitment, address _recipient)internal{
        require(!nullifierHashes[_nullifierHash],"The note has already been spent");
        require(commitments[_commitment].used,"Unused Note");
        nullifierHashes[_nullifierHash]=true;
        commitments[_commitment].recipient=_recipient;
        commitments[_commitment].spentDate=block.timestamp;
        (bool success, )=payable(_recipient).call{value: commitments[_commitment].denomination}("");
        require(success,"failed transaction");
    }
    function isSpent(bytes32 _nullifierHash) public view returns (bool) {
    return nullifierHashes[_nullifierHash];
  }
}