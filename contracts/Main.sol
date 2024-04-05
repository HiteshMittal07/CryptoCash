// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import "./verifier.sol";
import "./Note.sol";
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
    event Created(address creator, uint amount, address contractAddress);
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

    function createNote(bytes32 _commitment)external payable{
        require(!commitments[_commitment].used, "Used commitment");
        require(msg.value > 0, "Invalid denomination");
        commitments[_commitment].used=true;
        commitments[_commitment].owner=msg.sender;
        commitments[_commitment].createdDate = block.timestamp;
        commitments[_commitment].denomination = msg.value;
        Note instance2=new Note{value:msg.value}(_commitment,instance);
        emit Created(msg.sender, msg.value, address(instance2));
    }
}