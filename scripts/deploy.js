const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("Groth16Verifier");
  await contract.waitForDeployment();
  console.log("contract address:", contract.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
