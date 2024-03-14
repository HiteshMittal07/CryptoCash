// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";
interface Iverifier{
    function verifyProof(uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC, uint[3] calldata _pubSignals)external view returns (bool);
}
contract Main is ReentrancyGuard{
    // address payable public owner;
    // payable constructor can recieve ethers
    struct CommitmentStore {
    bool used;
    bool spent;
    address creator;
    address recipient;
    uint256 createdDate;
    uint256 spentDate;
    uint256 denomination;
    }
    Iverifier public immutable verifier;
    event Created(address creator, uint amount);
    mapping(bytes32 => bool) public nullifierHashes; // Nuffifier Hashes are used to nullify a BunnyNote so we know they have been spent
    // We store all the crypto cash data and make sure there are no accidental deposits twice and this allows us to query for transaction details later
    mapping(bytes32 => CommitmentStore) public commitments;
    address payable public _owner;
    constructor(Iverifier _verifier) payable {
        verifier = _verifier;
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
    function createNote(bytes32 _commitment,uint amount)public nonReentrant{
        require(!commitments[_commitment].used, "Used commitment");
        require(amount > 0, "Invalid denomination");
        require(amount<=balances[msg.sender],"Deposit more to create note!!");
        commitments[_commitment].used = true;
        commitments[_commitment].creator = msg.sender;
        commitments[_commitment].createdDate = block.timestamp;
        commitments[_commitment].denomination = amount;
        balances[msg.sender]-=amount;
        emit Created(msg.sender, amount);
    }

    function withdraw(uint[8] calldata _proof, bytes32 _nullifierHash, bytes32 _commitment, address _recipient)public nonReentrant{
        require(!nullifierHashes[_nullifierHash],"The note has already been spent");
        require(verifier.verifyProof([_proof[0], _proof[1]],[[_proof[2], _proof[3]], [_proof[4], _proof[5]]],[_proof[6], _proof[7]],
                [
                    uint(_nullifierHash),
                    uint(_commitment),
                    uint(uint160(_recipient))
                ]),"Invalid Proof");
        require(commitments[_commitment].used,"Unused Note");
        nullifierHashes[_nullifierHash]=true;
        commitments[_commitment].recipient=_recipient;
        commitments[_commitment].spentDate=block.timestamp;
        commitments[_commitment].spent=true;
        (bool success,)=_recipient.call{gas:200000,value:commitments[_commitment].denomination}("");
        require(success,"invalid");
    }
}