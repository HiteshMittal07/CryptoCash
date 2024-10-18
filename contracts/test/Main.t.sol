// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {Main} from "../src/Main.sol";
import {DeployMain} from "../script/DeployMain.s.sol";
import "../lib/poseidon-sol/contracts/Poseidon.sol";

contract MainTest is Test {
    Main public main;
    address creator = makeAddr("creator");

    function setUp() public {
        DeployMain deployer = new DeployMain();
        main = deployer.run();
        vm.deal(creator, 10 ether);
    }

    function testCreateNote() external {
        // uint256 nullifier = 234224234;
        // uint256 secret = 123123123;
        // uint256 commitment = hash([nullifier, secret]);
    }
}
