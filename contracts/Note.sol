// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract Note{
    uint private pass;
    constructor(uint passKey)payable {
       pass=passKey;
    }
    function withdraw(uint pass1)public{
        require(pass1==pass,"Give the correct pass key to claim");
        selfdestruct(payable(msg.sender));
    }
}