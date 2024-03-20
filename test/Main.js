// example testing of the smart contract working with custom arguments
const { BigNumber } = require("ethers");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const snarkjs = require("snarkjs");

function packToSolidityProof(proof) {
  return [
    proof.pi_a[0],
    proof.pi_a[1],
    proof.pi_b[0][1],
    proof.pi_b[0][0],
    proof.pi_b[1][1],
    proof.pi_b[1][0],
    proof.pi_c[0],
    proof.pi_c[1],
  ];
}
describe("Main", function () {
  let Main;
  let main;
  let deployer;
  let Verifier;
  let verifier;
  it("creates a note", async () => {
    const accounts = await ethers.getSigners();
    deployer = accounts[0];
    // console.log(deployer);
    Verifier = await ethers.getContractFactory("Groth16Verifier");
    verifier = await Verifier.deploy();
    await verifier.waitForDeployment();
    const address1 = verifier.getAddress();
    Main = await ethers.getContractFactory("Main");
    main = await Main.deploy(address1);
    await main.waitForDeployment();
    const address2 = await main.getAddress();
    console.log(address2);
    let balance = await ethers.provider.getBalance(deployer.address);
    console.log(balance);
    const option = ethers.parseEther("10");
    const fee = main.calculateFee(option);
    const commitment =
      "0x2c91c978985a5328930cf5f77ac704c1a327db79110707ceb4f3e0742b5915b3";
    const tx1 = await main.createNote(commitment, option, {
      value: option.add(fee),
    });
    await tx1.wait();

    balance = await ethers.provider.getBalance(deployer.address);
    console.log(balance);
    const nullifier = parseInt("4056069145807454800581");
    const secret = parseInt("6280904180439752355679");
    const address = "0x11ae45Ab10039D1EA50A54edd2638200fa3aFaEa";
    const nullifierHash =
      "10062829781726759867607233874903475719260266720356579819079933182888540094468";
    const commitmentHash =
      "20159348664310517594321724268484965985500253805075981218504982571504652326323";
    const input = {
      nullifier: nullifier,
      nullifierHash: nullifierHash,
      recipient: address,
      secret: secret,
      commitment: commitmentHash,
    };
    const proof2 = [
      "4629604741548106608260839937976265207027033904114029603043531393055162424244",
      "6885295973002863617550007377755170501366163580148669054007311112029508977375",
      "13519347286785945869237144779544870342532919312456380179774907747295815700061",
      "9741216730826252104108451966222898499472604153099703158435470282180604812265",
      "11181359794897668101073473737088451706842177883647019631808078833516372476471",
      "15328654739934972336556966778015369340837671102563534006789791588252378269421",
      "12266166608762024524594087296721751829805364723651062783475454125799766669733",
      "4780556612309164027511118608828824040066380883736977290303706308401307750037",
    ];
    const nullifierHash1 =
      "0x163f5c1d326f8c7386de0b029693117bc1f9c4bcc09d2862389e1d7a3aa3c004";
    const transaction = await main.withdraw(
      proof2,
      nullifierHash1,
      commitment,
      address
    );
    await transaction.wait();
    balance = await ethers.provider.getBalance(address);
    console.log(balance);

    const transaction1 = await main.withdraw(
      proof2,
      nullifierHash1,
      commitment,
      address
    );
    await transaction1.wait();
  });
});
