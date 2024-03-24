import { ethers } from "ethers";
import { generateProof } from "../Utils/createProof";
import { Proofa, Proofb, Proofc } from "../Utils/packToSolidityProof";
import { getContract, getWeb3Provider, requestAccounts } from "../web3/web3";

async function withdrawnote() {
  const contractAddress = "0xfDF7622023B08ce1f640Fda0F730486Bc375b623";
  const provider = getWeb3Provider();
  const contract = getContract(provider, contractAddress);
  const address = requestAccounts();
  const Proof = await generateProof();
  const proofa = Proofa(Proof);
  const proofb = Proofb(Proof);
  const proofc = Proofc(Proof);
  console.log(proofa);
  console.log(proofb);
  console.log(proofc);
  // const proof2 = packToSolidityProof(proof);
  const nullifierHash1 = ethers.BigNumber.from(nul)._hex;
  console.log(nullifierHash1);
  console.log(com);
  // console.log(proof2);
  try {
    const transaction = await contract.verify(
      proofa,
      proofb,
      proofc,
      nullifierHash1,
      com,
      address,
      { gasLimit: 3000000 }
    );
    await transaction.wait();
  } catch (error) {
    console.log(error);
    alert(error);
  }
}
