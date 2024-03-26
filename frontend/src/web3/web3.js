import { ethers, providers } from "ethers";
import abi from "../ABI/Main.json";
import { Proofa, Proofb, Proofc } from "../Utils/packToSolidityProof";
export const contractAddress = {
  Sepolia_testnet: "0xfDF7622023B08ce1f640Fda0F730486Bc375b623",
  zkEVM_testnet: "",
};
export function getWeb3Provider() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider;
}
export async function requestAccounts(provider) {
  const accounts = await provider.send("eth_requestAccounts", []);
  return accounts[0];
}
export const getContract = (provider, address) => {
  const contractABI = abi.abi;
  const signer = provider.getSigner();
  return new ethers.Contract(address, contractABI, signer);
};

export const getContractRead=(provider,address)=>{
  const contractABI=abi.abi;
  return new ethers.Contract(address,contractABI,provider);
}

export async function CreateCash(contract, commitment, denomination) {
  return await contract.createNote(commitment, {
    value: ethers.utils.parseEther(denomination),
  });
}

export async function verify(
  contract,
  proof,
  nullifierHash,
  commitment,
  recipient
) {
  const proofA = Proofa(proof);
  const proofB = Proofb(proof);
  const proofC = Proofc(proof);
  return await contract.verify(
    proofA,
    proofB,
    proofC,
    nullifierHash,
    commitment,
    recipient,
    { gasLimit: 3000000 }
  );
}

export function toHex(number) {
  return ethers.BigNumber.from(number)._hex;
}
