# Crypto Note Creation System

This project allows users to create crypto notes backed by deposited funds in a smart contract and redeem them when needed.

## Overview

The system involves two contracts: the main contract and individual note contracts.

1. **Main Contract**: Handles depositing funds and creating note contracts.
2. **Note Contract**: Created for each crypto note, holds deposited amount and allows redemption. Requires a PIN for withdrawal.

## Workflow

1. **Deposit Funds**: Users deposit crypto into the main contract.
2. **Create Note**: Specify an amount and a PIN, then create a note. This action deploys a new note contract with the specified amount and PIN.
3. **Crypto Note Creation**: 

    - A new note contract is created with a constructor that holds the deposited amount and PIN.
    - The note contract contains a `withdraw` function that requires the PIN for redemption.

4. **Generate QR Code**: Users can download a QR code containing the note contract's address and PIN.
5. **Redeem Crypto Note**: 

    - Scan the QR code or input the contract address and PIN manually.
    - Decoding the contract address to retrieve the contract instance and ABI.
    - Creating a contract instance using the ABI and contract address.
    - Call the `withdraw` function from the contract instance, providing the PIN to redeem the funds.

6. **Usage**:

... (existing usage instructions remain unchanged)

## Use Cases

### Secure Fund Transfer
- Users can securely transfer funds by creating crypto notes with specific amounts and PINs, allowing only those with the correct PIN to redeem the funds.

### Gift Certificates or Vouchers
- Businesses can issue digital gift certificates or vouchers by creating crypto notes with designated amounts and sharing them with customers. Customers can redeem these notes when making purchases.

### Controlled Allowances for Children
- Parents can create crypto notes with predefined allowances for their children. Children can redeem these notes periodically while requiring the specified PIN.

### Time-Locked Payments
- Crypto notes can be created with time-locked withdrawals, allowing funds to be released only after a specified period or event.

### Emergency Fund Access
- Users can create emergency crypto notes with reserved funds and PINs, providing a safety net for unexpected situations.

### Conditional Payments
- Crypto notes can be used for conditional payments, requiring specific conditions or verification steps before allowing fund withdrawal.


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
    function createNote(uint256 amount, uint256 pin) public {
        // Logic for creating a new note contract with the specified amount and PIN
        // Deploy a new note contract with constructor payable(amount, pin)
    }
}

// Note contract for holding deposited amount and allowing redemption with a PIN
contract NoteContract {
    uint256 public depositedAmount;
    uint256 public notePIN;

    // Constructor to initialize depositedAmount and notePIN
    constructor(uint256 amount, uint256 pin) payable {
        depositedAmount = amount;
        notePIN = pin;
    }

    // Withdraw function to redeem deposited amount, requires PIN
    function withdraw(uint256 inputPIN) public {
        require(inputPIN == notePIN, "Invalid PIN");
        // Logic to withdraw the deposited amount
        // selfdestruct(payable(msg.sender));
    }
}
