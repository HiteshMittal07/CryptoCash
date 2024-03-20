// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
interface Iverifier{
    function verifyProof(uint256[2] calldata _pA, uint256[2][2] calldata _pB, uint256[2] calldata _pC, uint256[3] calldata _pubSignals) external view returns (bool);
}
struct CommitmentStore {
    bool used;
    address creator;
    address recipient;
    uint256 createdDate;
    uint256 spentDate;
    uint256 denomination;
}
contract Main is ReentrancyGuard{
    // address payable public owner;
    // payable constructor can recieve ethers
    using SafeMath for uint256;
    Iverifier public immutable verifier;
    uint256 public constant feeDivider = 100;
    event Created(address creator, uint amount);
    mapping(bytes32 => bool) public nullifierHashes; // Nuffifier Hashes are used to nullify a BunnyNote so we know they have been spent
    // We store all the crypto cash data and make sure there are no accidental deposits twice and this allows us to query for transaction details later
    mapping(bytes32 => CommitmentStore) public commitments;
    address payable public _owner;
    constructor(Iverifier _verifier){
        verifier = _verifier;
        _owner=payable(msg.sender);
    }
    function createNote(bytes32 _commitment,uint256 denomination)external payable nonReentrant{
        require(!commitments[_commitment].used, "Used commitment");
        require(denomination > 0, "Invalid denomination");
        uint256 fee = calculateFee(denomination);
    require(msg.value == denomination + fee, "Invalid Value");
        commitments[_commitment].used = true;
        commitments[_commitment].creator = msg.sender;
        commitments[_commitment].createdDate = block.timestamp;
        commitments[_commitment].denomination = denomination;
        Address.sendValue(_owner, fee);
        emit Created(msg.sender, denomination);
    }

    function calculateFee(
    uint256 denomination
  ) public pure returns (uint256 fee) {
    fee = denomination.div(feeDivider);
  }
    function withdraw(uint256[8] calldata _proof, bytes32 _nullifierHash, bytes32 _commitment, address _recipient)external nonReentrant{
        require(!nullifierHashes[_nullifierHash],"The note has already been spent");
        require(verifier.verifyProof([_proof[0], _proof[1]],[[_proof[2], _proof[3]], [_proof[4], _proof[5]]],[_proof[6], _proof[7]],
                [
                    uint256(_nullifierHash),
                    uint256(_commitment),
                    uint256(uint160(_recipient))
                ]),"Invalid Proof");
        require(commitments[_commitment].used,"Unused Note");
        nullifierHashes[_nullifierHash]=true;
        commitments[_commitment].recipient=_recipient;
        commitments[_commitment].spentDate=block.timestamp;
        Address.sendValue(
        payable(_recipient),
        commitments[_commitment].denomination
      );
    }
    function isSpent(bytes32 _nullifierHash) public view returns (bool) {
    return nullifierHashes[_nullifierHash];
  }
}