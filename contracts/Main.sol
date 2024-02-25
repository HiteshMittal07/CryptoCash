// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import "./verifier.sol";
contract Main{
    // address payable public owner;
    // payable constructor can recieve ethers
     Groth16Verifier verifier;
    struct CommitmentStore {
    bool used;
    address creator;
    address recipient;
    uint256 createdDate;
    uint256 spentDate;
    uint256 denomination;
}

mapping(bytes32 => bool) public nullifierHashes; // Nuffifier Hashes are used to nullify a BunnyNote so we know they have been spent
    // We store all the Bunny Notes data and make sure there are no accidental deposits twice and this allows us to query for transaction details later
    mapping(bytes32 => CommitmentStore) public commitments;
    address payable public _owner;
    event NewContract(address indexed creator, address indexed newContract);
    constructor() payable {
        _owner=payable(msg.sender);
    }
    mapping (address=>uint) balances;
    function deposit() public payable {
        balances[msg.sender]+=msg.value;
        // emit Transaction(msg.sender, address(this), msg.value);
    }
    function getBalances()public view returns(uint){
        return balances[msg.sender];
    }
    function createNote(bytes32 _commitment,uint amount)public{
        require(!commitments[_commitment].used, "Used commitment");
        require(amount > 0, "Invalid denomination");

        commitments[_commitment].used = true;
        commitments[_commitment].creator = msg.sender;
        commitments[_commitment].createdDate = block.timestamp;
        commitments[_commitment].denomination = amount;
        require(amount<=address(this).balance,"amount must be greater than 0");
        balances[msg.sender]-=amount;
    }

    function withdraw(uint[8] calldata _proof, bytes32 _nullifierHash, bytes32 _commitment, address _recipient)public{
        require(verifier.verifyProof([_proof[0], _proof[1]],[[_proof[2], _proof[3]], [_proof[4], _proof[5]]],[_proof[6], _proof[7]],
                [
                    uint(_nullifierHash),
                    uint(_commitment),
                    uint(uint160(_recipient))
                ]),"Invalid Proof");
        require(!nullifierHashes[_nullifierHash],"The note has already been spent");
        require(commitments[_commitment].used,"Unused Note");
        nullifierHashes[_nullifierHash]=true;
        (bool success,)=_recipient.call{value: commitments[_commitment].denomination}("");
        require(success,"Transfer failed");
    }
}