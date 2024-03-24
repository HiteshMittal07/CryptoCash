pragma circom 2.0.0;
include "./node_modules/circomlib/circuits/poseidon.circom";
template withdraw() {
    signal input nullifierHash;
    signal input commitment;
    signal _commitment;
    signal input nullifier;
    signal input secret;
    signal input recipient;

    signal _nullifier;
    signal recipientSquare;

   component commitmentPoseidon = Poseidon(2);

    commitmentPoseidon.inputs[0] <== nullifier;
    commitmentPoseidon.inputs[1] <== secret;
    _commitment <== commitmentPoseidon.out;
    
    component commitmentPoseidon1 = Poseidon(1);
    commitmentPoseidon1.inputs[0] <== nullifier;
    _nullifier <== commitmentPoseidon1.out;
    commitment === _commitment; 
    _nullifier === nullifierHash; // checking here whether you have nullifier and nullifierHash corresponding to each other or not.

    recipientSquare <== recipient * recipient;
}

component main{public[nullifierHash,commitment,recipient]} = withdraw();
