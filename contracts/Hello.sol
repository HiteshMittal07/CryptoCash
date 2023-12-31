// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import "./Note.sol";

contract Hello{
    // address payable public owner;
    // payable constructor can recieve ethers
    event NewContract(address indexed creator, address indexed newContract);
    constructor() payable {
        // owner=payable(msg.sender);
    }
    mapping (address=>uint) balances;
    function deposit() public payable {
        balances[msg.sender]+=msg.value;
        // emit Transaction(msg.sender, address(this), msg.value);
    }
    function getBalances()public view returns(uint){
        return balances[msg.sender];
    }
    function createNote(uint amount,uint passKey)public{
        require(amount<=address(this).balance,"amount must be greater than 0");
        balances[msg.sender]-=amount;
        Note newContractInstance = new Note{value: amount}(passKey);
        emit NewContract(msg.sender, address(newContractInstance));
    }

}