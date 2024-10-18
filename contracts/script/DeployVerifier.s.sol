// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import "../src/verifier.sol";

contract DeployVerifier is Script {
    function run() external returns (Groth16Verifier) {
        vm.startBroadcast();

        Groth16Verifier _verifier = new Groth16Verifier();

        vm.stopBroadcast();
        return _verifier;
    }
}
