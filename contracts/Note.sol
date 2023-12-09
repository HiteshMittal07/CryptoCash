// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract Note{
    constructor()payable {
       
    }
    function withdraw()public{
        payable(msg.sender).call{value: address(this).balance}("");
    }
}