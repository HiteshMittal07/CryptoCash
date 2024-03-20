const hre = require("hardhat");
async function main() {
  const Verifier = await hre.ethers.deployContract("Groth16Verifier");
  await Verifier.waitForDeployment();
  const address1 = Verifier.target;
  const Main = await hre.ethers.deployContract("Main", [address1]);
  await Main.waitForDeployment();
  console.log(Main.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
