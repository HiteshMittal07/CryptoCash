const { ethers } = require("hardhat");

async function main() {
  const Verifier = await ethers.getContractFactory("Groth16Verifier");
  const verifier = await Verifier.deploy();
  await verifier.waitForDeployment();
  const address1 = verifier.getAddress();
  const Main = await ethers.getContractFactory("Main");
  const main = await Main.deploy(address1);
  await main.waitForDeployment();
  const address = await main.getAddress();
  console.log(address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
