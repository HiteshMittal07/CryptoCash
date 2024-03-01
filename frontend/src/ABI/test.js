const { BigNumber } = require("bignumber.js");
const crypto = require("crypto");
const { poseidon } = require("circomlibjs");
function generateSecureRandomBigNumber(min, max) {
  const range = new BigNumber(max).minus(min).plus(1);
  const bytesNeeded = Math.ceil(range.toString(2).length / 8);
  const maxChunkSize = 6; // Maximum number of bytes per iteration
  const numChunks = Math.ceil(bytesNeeded / maxChunkSize);
  let randomValue = new BigNumber("0");

  for (let i = 0; i < numChunks; i++) {
    const bytesToGenerate = Math.min(
      maxChunkSize,
      bytesNeeded - i * maxChunkSize
    );
    const randomBytes = crypto.randomBytes(bytesToGenerate);

    let chunkValue = new BigNumber("0");
    for (let j = 0; j < bytesToGenerate; j++) {
      chunkValue = chunkValue.times(256).plus(randomBytes.readUInt8(j));
    }

    randomValue = randomValue.times(256 ** bytesToGenerate).plus(chunkValue);
  }

  return randomValue.mod(range).plus(min);
}

// Usage example
const min = new BigNumber("1000000000000000000000"); // 10^21
const max = new BigNumber("9999999999999999999999"); // Just an example upper limit
const randomNumber = generateSecureRandomBigNumber(min, max);
const nullifier = generateSecureRandomBigNumber(min, max);
const secret = generateSecureRandomBigNumber(min, max);
const buffer = Buffer.from(nullifier.toString());
const nullifierHash = poseidon(buffer);
console.log(nullifierHash.toString("hex"));
