// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

// import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/utils/Address.sol";
// import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
// contract Hello{
// address owner = msg.sender;
// mapping(uint256 => bool) usedNonces;
// event DepositETH(
//         bytes32 indexed commitment,
//         address depositFor,
//         uint256 timestamp,
//         uint256 denomination,
//         uint256 fee
//     );
// function claimPayment(uint256 amount, uint256 nonce, bytes memory signature) external {
//         require(!usedNonces[nonce]);
//         usedNonces[nonce] = true;
//         // this recreates the message that was signed on the client
//         bytes32 message = prefixed(keccak256(abi.encodePacked(msg.sender, amount, nonce,this)));
//         require(recoverSigner(message, signature) == owner);
//         payable(msg.sender).transfer(amount);
// }

// function splitSignature(bytes memory sig) internal pure returns (uint8 v, bytes32 r, bytes32 s)
// {
//     require(sig.length == 65);
//     assembly {
//     // first 32 bytes, after the length prefix.
//     r := mload(add(sig, 32))
//     // second 32 bytes.
//     s := mload(add(sig, 64))
//     // final byte (first byte of the next 32 bytes).
//     v := byte(0, mload(add(sig, 96)))
// }
// return (v, r, s);
// }

// function recoverSigner(bytes32 message, bytes memory sig)internal pure returns (address)
// {
//     (uint8 v, bytes32 r, bytes32 s) = splitSignature(sig);
//     return ecrecover(message, v, r, s);
// }
// /// builds a prefixed hash to mimic the behavior of eth_sign.
// function prefixed(bytes32 hash) internal pure returns (bytes32) {
//     return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
// }

// function depositEth(bytes32 _commitment,uint256 denomination) external payable nonReentrant {
//         require(!commitments[_commitment].used, "Used commitment");
//         require(denomination > 0, "Invalid denomination");
//         uint256 fee = calculateFee(denomination);
//         require(msg.value == denomination + fee, "Invalid Value");
//         // Record the CryptoCash and the value that was deposited into the contract
//         commitments[_commitment].used = true;
//         commitments[_commitment].creator = msg.sender;
//         commitments[_commitment].createdDate = block.timestamp;
//         commitments[_commitment].usesToken = false;
//         commitments[_commitment].denomination = denomination;
//         // Forward the fee to the owner
//         Address.sendValue(_owner, fee);
//         emit DepositETH(
//             _commitment,
//             msg.sender,
//             block.timestamp,
//             denomination,
//             fee
//         );
//     }
// function calculateFee(uint256 denomination) pure returns (uint256 fee) {
//         fee = denomination.div(feeDivider);
// }
// function withdraw(
//         uint256[8] calldata _proof,
//         bytes32 _nullifierHash,
//         bytes32 _commitment,
//         address _recipient
//     ) external nonReentrant {
//         require(
//             !nullifierHashes[_nullifierHash],
//             "The note has already been spent"
//         );
//         require(commitments[_commitment].used, "Unused Note!");
//         require(
//             verifier.verifyProof(
//                 [_proof[0], _proof[1]],
//                 [[_proof[2], _proof[3]], [_proof[4], _proof[5]]],
//                 [_proof[6], _proof[7]],
//                 [
//                     uint256(_nullifierHash),
//                     uint256(_commitment),
//                     uint256(uint160(_recipient))
//                 ]
//             ),
//             "Invalid Withdraw proof"
//         );
//         // Nullify the BunnyNote, invalidating it
//         nullifierHashes[_nullifierHash] = true;
//         commitments[_commitment].recipient = _recipient;
//         commitments[_commitment].spentDate = block.timestamp;

//         // Process the withdraw
//         if (commitments[_commitment].usesToken) {
//             //Transfer the token
//             commitments[_commitment].token.safeTransfer(
//                 _recipient,
//                 commitments[_commitment].denomination
//             );
//         } else {
//             //Transfer the eth
//             Address.sendValue(
//                 payable(_recipient),
//                 commitments[_commitment].denomination
//             );
//         }

//         emit WithdrawBunnyNote(
//             commitments[_commitment].creator,
//             _recipient,
//             _commitment
//         );
//     }

//     /** @dev whether a BunnyNote is already spent
//         @param _nullifierHash is used to check if a note has been spent
//      */

//     function isSpent(bytes32 _nullifierHash) public view returns (bool) {
//         return nullifierHashes[_nullifierHash];
//     }

// }


contract Hello{
    address payable public owner;
    // payable constructor can recieve ethers
    constructor() payable {
        owner=payable(msg.sender);
    }
    // this functiin can also recieve ethers
    function getOwner()public view returns(address){
        return owner;
    }
    mapping (address=>uint) balances;
    function deposit() public payable {
        balances[msg.sender]+=msg.value;
        // emit Transaction(msg.sender, address(this), msg.value);
    }
    function getBalances()public view returns(uint){
        return balances[msg.sender];
    }
    function withdraw() public {
        require(balances[msg.sender]>0,"Account is Empty");
        uint amount=balances[msg.sender];
        balances[msg.sender]-=amount;
        (bool success,)=msg.sender.call{value:amount}("amount withdrawn froom smart contarct");
        require(success, "failed to recieve ether");
        // emit Transaction(address(this), msg.sender, amount);
    }
    function transfer(address payable _to,uint _amount) public{
        require(balances[msg.sender]>=_amount,"you dont have enough balance");
        balances[msg.sender]-=_amount;
        (bool success,)=_to.call{value:_amount}("ether transfered");
        require(success,"failed");
    }
}