import random from "../Utils/random";
import abi from "../ABI";
import { ethers } from "ethers";
import { commitmentHash, nullifierHash } from "../Utils/createHash";
async function CreateNote() {
  const contractABI = abi.abi;
  const contractAddress = "0xfDF7622023B08ce1f640Fda0F730486Bc375b623";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  const note = document.querySelector("#note").value;

  const nullifier = random();
  const secret = random();
  const nullifier1 = nullifier.toString(10);
  const secret1 = secret.toString(10);
  const bigNullifier = parseInt(nullifier1);
  const bigSecret = parseInt(secret1);
  const nullifier_Hash = nullifierHash(bigNullifier);
  const commitment_Hash = commitmentHash(bigNullifier, bigSecret);
  const commitment = ethers.BigNumber.from(commitment_Hash)._hex;
  console.log(commitment);
  const option = ethers.utils.parseEther(note);
  const transaction = await contract.createNote(commitment, {
    value: option,
  });
  await transaction.wait();
  console.log(nullifier_Hash);
  console.log(commitment_Hash);
  //   const multivalueString = `${nullifier1},${secret1},${nullifier_Hash},${commitment_Hash}`;
  //setnoteAddress(multivalueString);
  console.log("note created");
  window.alert("Note Created, You can download it");
}

export default CreateNote;
