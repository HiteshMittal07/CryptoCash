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
    bool verified;
    address creator;
    address recipient;
    uint256 createdDate;
    uint256 spentDate;
    uint256 denomination;
    }
    mapping(bytes32 => CommitmentStore) public commitments; // stores notes details corresponding to commitment hash.
    address payable public _owner;
    Groth16Verifier instance1; //stores the instance of deployed verifier contract on chain.
    constructor(){
        Groth16Verifier instance=new Groth16Verifier(); // deployement of verifier to get instance for further use.
        instance1=instance;
        _owner=payable(msg.sender); //owner is contract creator
    }

    /**
     * @dev : function for creation of new notes
     * @param _commitment : hash of randomly generated number (nullifier, secret)
     */

    function createNote(bytes32 _commitment)external payable{
        require(!commitments[_commitment].used, "Used commitment");
        require(msg.value > 0, "Invalid denomination");
        commitments[_commitment].used = true;
        commitments[_commitment].creator = msg.sender;
        commitments[_commitment].createdDate = block.timestamp;
        commitments[_commitment].denomination = msg.value;
        emit Created(msg.sender, msg.value);
    }

    /**
     * @dev : function for verification of proof submitted by withdrawer whether it is correct or not
     * @param _pA : parameters of proof
     * @param _pB : paramters of proof
     * @param _pC : private parameters of proof
     * @param _nullifierHash : hash of nullifier
     * @param _commitment : hash of commitment (nullifier,secret)
     * @param _recipient : address to which the withdrawn funds should transfer
     */
    function verify(uint256[2] calldata _pA, uint256[2][2] calldata _pB, uint256[2] calldata _pC, bytes32 _nullifierHash, bytes32 _commitment, address _recipient)public{
      require(commitments[_commitment].used,"Unused Note");
      require(!nullifierHashes[_nullifierHash],"This note has been already spent");
      require(!commitments[_commitment].verified,"This note has been already verified");
      bool success=instance1.verifyProof(_pA, _pB, _pC, [uint256(_nullifierHash),uint256(_commitment),uint256(uint160(_recipient))]);
      require(success,"Invalid");
      commitments[_commitment].verified=true;
      withdraw(_nullifierHash,_commitment,_recipient);
    }

    /**
     * @dev : An internal function to be called when there is verification of the proof, this is for the transfer of funds 
     * @param _nullifierHash :
     * @param _commitment : 
     * @param _recipient : 
     */

    function withdraw(bytes32 _nullifierHash, bytes32 _commitment, address _recipient)internal{
        require(!nullifierHashes[_nullifierHash],"The note has already been spent");
        require(commitments[_commitment].used,"Unused Note");
        nullifierHashes[_nullifierHash]=true;
        commitments[_commitment].recipient=_recipient;
        commitments[_commitment].spentDate=block.timestamp;
        (bool success, )=payable(_recipient).call{value: commitments[_commitment].denomination}("");
        require(success,"failed transaction");
    }

    /**
     * @dev : to check whether the notes is spend already or not
     * @param _nullifierHash : input parameter to check nullifierhash in mapping.
     * @return  bool : returns true of false based on mapping
     */

    function isSpent(bytes32 _nullifierHash) public view returns (bool) {
    return nullifierHashes[_nullifierHash];
  }
}