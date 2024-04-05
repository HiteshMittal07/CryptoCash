// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import "./verifier.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
contract Note is ReentrancyGuard{
    mapping(address=>bool) isUser;
    event verified(bool status);

    bytes32 public commitment;
    bool used;
    address public owner;
    Groth16Verifier instance1;
    mapping(bytes32=>bool)nullifierHashes;
    constructor(bytes32 _commitment,Groth16Verifier instance)payable{

        commitment=_commitment;
        instance1=instance;
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
      require(used,"Unused Note");
      require(!nullifierHashes[_nullifierHash],"This note has been already spent");
      bool success=instance1.verifyProof(_pA, _pB, _pC, [uint256(_nullifierHash),uint256(_commitment),uint256(uint160(_recipient))]);
      require(success,"Invalid");
      withdraw(_nullifierHash,_recipient);
    }

    /**
     * @dev : An internal function to be called when there is verification of the proof, this is for the transfer of funds 
     * @param _nullifierHash :
     * @param _recipient : 
     */

    function withdraw(bytes32 _nullifierHash, address _recipient)internal{
        require(!isUser[msg.sender],"You can't claim");
        require(!nullifierHashes[_nullifierHash],"The note has already been spent");
        require(used,"Unused Note");
        nullifierHashes[_nullifierHash]=true;
        
        (bool success, )=payable(_recipient).call{value: address(this).balance}("");
        require(success,"failed transaction");
    }

    /**
     * @dev : to check whether the notes is spend already or not
     * @param _nullifierHash : input parameter to check nullifierhash in mapping.
     */

    function verify(uint256[2] calldata _pA, uint256[2][2] calldata _pB, uint256[2] calldata _pC, bytes32 _nullifierHash, bytes32 _commitment, address _recipient,bytes32 new_commitment) public {
    bool success=instance1.verifyProof(_pA, _pB, _pC, [uint256(_nullifierHash),uint256(_commitment),uint256(uint160(_recipient))]);
    require(success,"Invalid");
    require(used,"Unused Note");
    require(!nullifierHashes[_nullifierHash],"This note is already spent");
    require(!isUser[msg.sender] || owner==msg.sender,"Invalid ownership change");
    isUser[owner]=true;
    nullifierHashes[_nullifierHash]=true;
    commitment=new_commitment;
    
  }

}