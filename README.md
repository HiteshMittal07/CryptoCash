# CryptoCash

CryptoCash is a project designed to enable offline transactions with cryptocurrency, similar to using physical cash. Unlike typical cryptocurrency transactions that require a recipient address, CryptoCash notes can be used by anyone holding them to withdraw funds. Each note contains unique secrets created by the note's creator. To maintain the privacy of these secrets and prevent them from being revealed on-chain, the project utilizes zero-knowledge proof (ZKP) technology.

## Overview

The goal of CryptoCash is to bridge the gap between traditional fiat currency and cryptocurrency, offering a familiar cash-like experience with the security and efficiency of blockchain technology. With CryptoCash, users can create, transfer, and redeem notes without the need for recipient addresses, it can also be used as gift cards.

### Key Features

- **Offline Sharing:** No need for an internet connection for sharing as pdf files are printable.
- **Fungibility:** Each note is interchangeable, just like physical cash.
- **Privacy:** Zero-knowledge proof technology ensures that note secrets remain private.
- **Multi-Network Support:** Operates on three testnets: Eth Sepolia, Scroll Sepolia, and Arbitrum Sepolia.

### New Features

 -**Note Ownership Verification**: 
 - Solving the problem of creator using the note after sharing.
  - Recipients must verify notes on the website after receiving them.
  - This process changes ownership and checks note validity and spend status.
  - It links the note with a new commitment and deletes the previous commitment.
  - Ensures that only the current note holder can claim it at any time.
  - Prevents sharing the same note with multiple people.
 
### New Features - Latest Update
- Providing Optimization for previour problem solution
- Now no need of creation of new_commitment on every sharing
- Creator have to sign some message and add in the note
- Which will be verified on the chain whenever there is sharing the reciver , have to opt for change owner in order to become owner
- Then there will be check that whether the signature match with current owner of note or not, if yes then owner will be changed and new owner have to sign some message and add to new note and can keep it.
  
## How to Use

1. **Select Network**: Choose the desired network (testnet) for creating notes.
2. **Create Note**: Input the desired amount and create a note.
3. **Download Note**: Once created, the note can be downloaded for later use.
4. **Verify Note**: Use the Verify Note section to check if a note has been spent.
5. **Withdraw Note**: Withdraw funds from a note by scanning its QR code.

## Technologies Used

- **Frontend:** React.js for building the user interface.
- **Backend:** Solidity for smart contract development.
- **Blockchain:** EVM compatible Testnets for transaction processing.
- **Zero-Knowledge Proofs:** Implemented Circom circuits using zk-SNARKs for privacy.
- **Testing:** Integrated with various testnets for testing functionality.

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/HiteshMittal07/CryptoCash.git
   ```
