// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IGroth16Verifier {
    function verifyProof(
        uint256[2] calldata _pA,
        uint256[2][2] calldata _pB,
        uint256[2] calldata _pC,
        uint256[3] calldata _pubSignals
    ) external view returns (bool);
}

contract Main is ReentrancyGuard {
    error CommitmentAlreadyUsed();
    error InvalidAmount();
    error InvalidClaimer();
    error InvalidProof();
    error TransferFailed();
    error NoteAlreadySpent();
    error InvalidCommitment();
    error IncorrectNote();
    // struct for storing the information about the note.
    struct CommitmentStore {
        bool used;
        bool verified;
        address owner;
        address recipient;
        uint256 createdDate;
        uint256 spentDate;
        uint256 denomination;
    }

    // Nuffifier Hashes are used to nullify a note so we know they have been spent.
    mapping(bytes32 => bool) public nullifierHashes;

    // stores notes details corresponding to commitment hash.
    mapping(bytes32 => CommitmentStore) public commitments;

    // stores the instance of interface of deployed verifier contract on chain.
    IGroth16Verifier immutable instance;

    // event for crypto cash creation.
    event Created(address creator, uint amount);

    modifier NoteAlreadyUsed(bytes32 _nullifierHash) {
        if (nullifierHashes[_nullifierHash]) {
            revert NoteAlreadySpent();
        }
        _;
    }
    modifier CommitmentValidation(bytes32 _commitment) {
        if (!commitments[_commitment].used) {
            revert InvalidCommitment();
        }
        _;
    }

    /**
     * @param verifier_instance address of deployed verified contract.
     */
    constructor(address verifier_instance) {
        instance = IGroth16Verifier(verifier_instance);
    }

    /**
     * @dev : function for creation of new notes
     * @param _commitment : hash of randomly generated number (nullifier, secret)
     */

    function createNote(
        bytes32 _commitment,
        uint256 denomination
    ) external payable {
        if (commitments[_commitment].used) {
            revert CommitmentAlreadyUsed();
        }
        if (denomination <= 0 && msg.value != denomination) {
            revert InvalidAmount();
        }
        commitments[_commitment].used = true;
        commitments[_commitment].owner = msg.sender;
        commitments[_commitment].createdDate = block.timestamp;
        commitments[_commitment].denomination = denomination;
        emit Created(msg.sender, msg.value);
    }

    /**
     * @dev : function for withdrawing the funds .
     * @param _pA : parameters of proof
     * @param _pB : paramters of proof
     * @param _pC : private parameters of proof
     * @param _nullifierHash : hash of nullifierhash of nullifier
     * @param _commitment : hash of commitment (nullifier,secret)
     * @param _recipient : address to which the withdrawn funds should transfer.
     * @notice only the creator of proof can claim the note.
     * Follows the CEI pattern.
     */
    function claim(
        uint256[2] calldata _pA,
        uint256[2][2] calldata _pB,
        uint256[2] calldata _pC,
        bytes32 _nullifierHash,
        bytes32 _commitment,
        address _recipient
    )
        external
        nonReentrant
        NoteAlreadyUsed(_nullifierHash)
        CommitmentValidation(_commitment)
    {
        // checks the proof creator is msg.sender.
        if (
            msg.sender != commitments[_commitment].owner ||
            msg.sender != _recipient
        ) {
            revert InvalidClaimer();
        }
        bool proof_success = verify(
            _pA,
            _pB,
            _pC,
            _nullifierHash,
            _commitment,
            _recipient
        );
        if (!proof_success) {
            revert InvalidProof();
        }
        nullifierHashes[_nullifierHash] = true;
        (bool txn_success, ) = payable(_recipient).call{
            value: commitments[_commitment].denomination
        }("");
        if (!txn_success) {
            revert TransferFailed();
        }
    }

    /**
     * @dev : funnction for changing the owner of the cash, so that no other person can claim the cash.
     * @param _pA : parameter of proof
     * @param _pB : parameter of proof
     * @param _pC : parameter of proof
     * @param _nullifierHash : hash of nullifier
     * @param _commitment : hash of commitment (nullifier,secret)
     * @param _recipient : address to which the withdrawn funds should transfer
     * @param signature : it help to validate whether the cash is given by the current owner or not.
     */
    function changeOwner(
        uint256[2] calldata _pA,
        uint256[2][2] calldata _pB,
        uint256[2] calldata _pC,
        bytes32 _nullifierHash,
        bytes32 _commitment,
        address _recipient,
        bytes memory signature
    )
        external
        nonReentrant
        CommitmentValidation(_commitment)
        NoteAlreadyUsed(_nullifierHash)
    {
        bytes32 message = prefixed(keccak256(abi.encodePacked(_commitment)));
        if (
            recoverSigner(message, signature) != commitments[_commitment].owner
        ) {
            revert IncorrectNote();
        } // it repressents that it requires owner signature for changing owner.
        bool proof_success = verify(
            _pA,
            _pB,
            _pC,
            _nullifierHash,
            _commitment,
            _recipient
        );
        if (!proof_success) {
            revert InvalidProof();
        }
        commitments[_commitment].owner = _recipient;
    }

    /// signature methods.
    function splitSignature(
        bytes memory sig
    ) internal pure returns (uint8 v, bytes32 r, bytes32 s) {
        require(sig.length == 65);

        assembly {
            // first 32 bytes, after the length prefix.
            r := mload(add(sig, 32))
            // second 32 bytes.
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes).
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }

    function recoverSigner(
        bytes32 message,
        bytes memory sig
    ) internal pure returns (address) {
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(sig);
        return ecrecover(message, v, r, s);
    }

    /// builds a prefixed hash to mimic the behavior of eth_sign.
    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
            );
    }

    /**
     * @dev : to check whether the notes is valid , spent or not.
     * @return : it returns bool (true or false).
     */
    function verify(
        uint256[2] calldata _pA,
        uint256[2][2] calldata _pB,
        uint256[2] calldata _pC,
        bytes32 _nullifierHash,
        bytes32 _commitment,
        address _recipient
    )
        public
        view
        CommitmentValidation(_commitment)
        NoteAlreadyUsed(_nullifierHash)
        returns (bool)
    {
        bool success = instance.verifyProof(
            _pA,
            _pB,
            _pC,
            [
                uint256(_nullifierHash),
                uint256(_commitment),
                uint256(uint160(_recipient))
            ]
        );
        return success;
    }
}
