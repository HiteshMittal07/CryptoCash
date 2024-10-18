// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import "../src/Main.sol";
import {DeployVerifier} from "./DeployVerifier.s.sol";

contract DeployMain is Script {
    address _verifier;

    function run() external returns (Main) {
        vm.startBroadcast();

        DeployVerifier deployer = new DeployVerifier();
        _verifier = address(deployer.run());

        Main _main = new Main(_verifier);

        vm.stopBroadcast();
        return _main;
    }
}
