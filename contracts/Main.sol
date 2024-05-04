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
     * @dev : function for withdrawing the funds .
     * @param _pA : parameters of proof
     * @param _pB : paramters of proof
     * @param _pC : private parameters of proof
     * @param _nullifierHash : hash of nullifierhash of nullifier
     * @param _commitment : hash of commitment (nullifier,secret)
     * @param _recipient : address to which the withdrawn funds should transfer
     */
    function claim(uint256[2] calldata _pA, uint256[2][2] calldata _pB, uint256[2] calldata _pC, bytes32 _nullifierHash, bytes32 _commitment, address _recipient)public nonReentrant{
      require(msg.sender==commitments[_commitment].owner,"you can't claim this note");  
      bool success=verify(_pA, _pB, _pC, _nullifierHash, _commitment, _recipient);
      require(success,"Invalid");
      (bool _success, )=payable(_recipient).call{value: commitments[_commitment].denomination}("");
       require(_success,"failed transaction");
       nullifierHashes[_nullifierHash]=true;
    }

    /**
     * @dev : to check whether the notes is valid , spent or not.
     * @return : it returns bool (true or false).
     */

    function verify(uint256[2] calldata _pA, uint256[2][2] calldata _pB, uint256[2] calldata _pC, bytes32 _nullifierHash, bytes32 _commitment, address _recipient)view public returns(bool) {
    require(!nullifierHashes[_nullifierHash],"The note is already spent");
    require(commitments[_commitment].used==true,"invalid commitment");  
    bool success=instance.verifyProof(_pA, _pB, _pC, [uint256(_nullifierHash),uint256(_commitment),uint256(uint160(_recipient))]);
    require(success,"Invalid Proof");    
    return success;
  }

    /**
     * @dev : funnction for changing the owner of the cash, so that no other person can claim the cash.
     * @param _pA : parameter of proof
     * @param _pB : parameter of proof
     * @param _pC : parameter of proof
     * @param _nullifierHash : hash of nullifier
     * @param _commitment : hash of commitment (nullifier,secret)
     * @param _recipient : address to which the withdrawn funds should transfer
     * @param signature : it help to validate whether the cash is given by the current owner or not.
     */

  function changeOwner(uint256[2] calldata _pA, uint256[2][2] calldata _pB, uint256[2] calldata _pC, bytes32 _nullifierHash, bytes32 _commitment, address _recipient,bytes memory signature)public nonReentrant{
    bytes32 message = prefixed(keccak256(abi.encodePacked(_commitment)));
    require(recoverSigner(message, signature)==commitments[_commitment].owner,"You don't have correct note");
    bool success=verify(_pA, _pB, _pC, _nullifierHash, _commitment, _recipient);
    require(success,"Invalid");
    commitments[_commitment].owner=_recipient;
  }

    /// signature methods.
    function splitSignature(bytes memory sig)
        internal
        pure
        returns (uint8 v, bytes32 r, bytes32 s)
    {
        require(sig.length == 65);

        assembly {
            // first 32 bytes, after the length prefix.
            r := mload(add(sig, 32))
            // second 32 bytes.
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes).
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }

    function recoverSigner(bytes32 message, bytes memory sig)
        internal
        pure
        returns (address)
    {
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(sig);
        return ecrecover(message, v, r, s);
    }

    /// builds a prefixed hash to mimic the behavior of eth_sign.
    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }
}