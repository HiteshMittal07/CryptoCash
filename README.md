# Crypto Note Creation System

This project allows users to create crypto notes backed by deposited funds in a smart contract and redeem them when needed.

## Overview

The system involves two contracts: the main contract and individual note contracts.

1. **Main Contract**: Handles depositing funds and creating note contracts.
2. **Note Contract**: Created for each crypto note, holds deposited amount and allows redemption.

## Workflow

1. **Deposit Funds**: Users deposit crypto into the main contract.
2. **Create Note**: Specify an amount and create a note. This action deploys a new note contract with the specified amount.
3. **Crypto Note Creation**: 

    - A new note contract is created with a constructor that holds the deposited amount.
    - The note contract contains a `withdraw` function that allows redemption of the deposited amount.

4. **Generate QR Code**: Users can download a QR code containing the note contract's address.
5. **Redeem Crypto Note**: 

    - Scan the QR code or input the contract address manually.
    - Decoding the contract address to retrieve the contract instance and ABI.
    - Creating a contract instance using the ABI and contract address.
    - Call the `withdraw` function from the contract instance to redeem the funds.

## Code Example

Main Contract:

```solidity
// Main contract for depositing funds and creating note contracts
contract MainContract {
    // Deposit funds function
    function deposit() public payable {
        // Logic for depositing funds
    }

    // Create note function
    function createNote(uint256 amount) public {
        // Logic for creating a new note contract with the specified amount
        // Deploy a new note contract with constructor payable(amount)
    }
}
