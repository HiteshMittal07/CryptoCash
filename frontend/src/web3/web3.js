import { ethers } from "ethers";
import abi from "../ABI";
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
