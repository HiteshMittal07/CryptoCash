// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import "./verifier.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
contract Note is ReentrancyGuard{
    Groth16Verifier instance;
    event verified(bool status);
    bytes32 public commitment;
    bool used;
    constructor(bytes32 _commitment,Groth16Verifier _instance)payable{
        commitment=_commitment;
        instance=_instance;
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
      require(!used,"The note is already spent");
      require(commitment==_commitment,"Invalid commitment");
      bool success=instance.verifyProof(_pA, _pB, _pC, [uint256(_nullifierHash),uint256(_commitment),uint256(uint160(_recipient))]);
      require(success,"Invalid");
      withdraw(_recipient);
    }

    /**
     * @dev : An internal function to be called when there is verification of the proof, this is for the transfer of funds 
     * @param _recipient : 
     */

    function withdraw(address _recipient)internal{
        (bool success, )=payable(_recipient).call{value: address(this).balance}("");
        require(success,"failed transaction");
        used=true;
    }

    /**
     * @dev : to check whether the notes is spend already or not
     * @param _nullifierHash : input parameter to check nullifierhash in mapping.
     */

    function verify(uint256[2] calldata _pA, uint256[2][2] calldata _pB, uint256[2] calldata _pC, bytes32 _nullifierHash, bytes32 _commitment, address _recipient,bytes32 new_commitment) public {
    require(!used,"The note is already spent");
    require(commitment==_commitment,"invalid commitment");  
    bool success=instance.verifyProof(_pA, _pB, _pC, [uint256(_nullifierHash),uint256(_commitment),uint256(uint160(_recipient))]);
    require(success,"Invalid");
    commitment=new_commitment;
    
  }

}