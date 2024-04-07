// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import "./verifier.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Main is ReentrancyGuard{
struct CommitmentStore {    
    bool used;
    bool verified;
    address owner;
    address recipient;
    uint256 createdDate;
    uint256 spentDate;
    uint256 denomination;
    }
    // address payable public owner;
    // payable constructor can recieve ethers
    event Created(address creator, uint amount);
    mapping(bytes32 => bool) public nullifierHashes; // Nuffifier Hashes are used to nullify a BunnyNote so we know they have been spent
    mapping(bytes32 => CommitmentStore) public commitments; // stores notes details corresponding to commitment hash.
    address payable public _owner;
    Groth16Verifier instance; //stores the instance of deployed verifier contract on chain.
    constructor(){ 
        Groth16Verifier _instance=new Groth16Verifier(); // deployement of verifier to get instance for further use.
        instance=_instance;
        _owner=payable(msg.sender); //owner is contract creator
    }

    /**
     * @dev : function for creation of new notes
     * @param _commitment : hash of randomly generated number (nullifier, secret)
     */

    function createNote(bytes32 _commitment,uint256 denomination)public payable{
        require(!commitments[_commitment].used, "Used commitment");
        require(denomination > 0, "Invalid denomination");
        commitments[_commitment].used=true;
        commitments[_commitment].owner=msg.sender;
        commitments[_commitment].createdDate = block.timestamp;
        commitments[_commitment].denomination = denomination;
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
    function claim(uint256[2] calldata _pA, uint256[2][2] calldata _pB, uint256[2] calldata _pC, bytes32 _nullifierHash, bytes32 _commitment, address _recipient)public nonReentrant{
      require(!nullifierHashes[_nullifierHash],"The note is already spent");
      require(commitments[_commitment].used==true,"Invalid commitment");
      bool success=instance.verifyProof(_pA, _pB, _pC, [uint256(_nullifierHash),uint256(_commitment),uint256(uint160(_recipient))]);
      require(success,"Invalid");
      withdraw(_recipient,_nullifierHash);
    }

    /**
     * @dev : An internal function to be called when there is verification of the proof, this is for the transfer of funds 
     * @param _recipient : 
     */

    function withdraw(address _recipient,bytes32 _nullifierHash)internal{
        (bool success, )=payable(_recipient).call{value: address(this).balance}("");
        require(success,"failed transaction");
        nullifierHashes[_nullifierHash]=true;
    }

    /**
     * @dev : to check whether the notes is spend already or not
     * @param _nullifierHash : input parameter to check nullifierhash in mapping.
     */

    function verify(uint256[2] calldata _pA, uint256[2][2] calldata _pB, uint256[2] calldata _pC, bytes32 _nullifierHash, bytes32 _commitment, address _recipient)view public returns(bool) {
    require(!nullifierHashes[_nullifierHash],"The note is already spent");
    require(commitments[_commitment].used==true,"invalid commitment");  
    bool success=instance.verifyProof(_pA, _pB, _pC, [uint256(_nullifierHash),uint256(_commitment),uint256(uint160(_recipient))]);
    require(success,"Invalid");    
    return success;
  }

  function changeOwner(uint256[2] calldata _pA, uint256[2][2] calldata _pB, uint256[2] calldata _pC, bytes32 _nullifierHash, bytes32 _commitment, address _recipient,bytes32 new_commitment)public {
    require(!nullifierHashes[_nullifierHash],"The note is already spent");
    require(commitments[_commitment].used==true,"invalid commitment");  
    bool success=instance.verifyProof(_pA, _pB, _pC, [uint256(_nullifierHash),uint256(_commitment),uint256(uint160(_recipient))]);
    require(success,"Invalid");    
    createNote(new_commitment, commitments[_commitment].denomination);
    delete commitments[_commitment];
  }
}