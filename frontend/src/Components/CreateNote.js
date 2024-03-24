import random from "../Utils/random";
import abi from "../ABI";
import { ethers } from "ethers";
import { commitmentHash, nullifierHash } from "../Utils/createHash";
import { getContract, getWeb3Provider } from "../web3/web3";
import { CreateQR } from "../Utils/createQR";
import { downloadQRCodePDF } from "../Utils/downloadQR";
async function CreateNote() {
  const contractAddress = "0xfDF7622023B08ce1f640Fda0F730486Bc375b623";
  const provider = getWeb3Provider();
  const contract = getContract(provider, contractAddress);
  const note = document.querySelector("#note").value;

  const nullifier = random();
  const secret = random();
  const nullifier_Hash = nullifierHash(nullifier);
  const commitment_Hash = commitmentHash(nullifier, secret);
  const commitment = ethers.BigNumber.from(commitment_Hash)._hex;
  console.log(commitment);
  const option = ethers.utils.parseEther(note);
  const transaction = await contract.createNote(commitment, {
    value: option,
  });
  await transaction.wait();

  contract.on("Created", async (creator, amount) => {
    const noteString = `${nullifier},${secret},${nullifier_Hash},${commitment_Hash}`;
    await downloadQRCodePDF(noteString);
  });
}

export default CreateNote;
