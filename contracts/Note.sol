// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract Note{
    uint amount;
    constructor()payable {
       
    }
    function withdraw(address recipient)public{
        recipient.call{value: address(this).balance}("");
    }
}