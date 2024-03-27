import { ethers, providers } from "ethers";
import abi from "../ABI/Main.json";
import { Proofa, Proofb, Proofc } from "../Utils/packToSolidityProof";
export const contractAddress = {
  Sepolia_testnet: "0xcb9c202880AC40cb4846CA24e07d97D01202abf8",
  arbitrum_sepolia: "0xe591A89874b21e4F462Bd2DdbcbF27384E872ea5",
  scroll_Sepolia: "0xB70d7E5a736D8EEae7148928cB8b6f233bb6D467",
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

export const getContractRead = (provider, address) => {
  const contractABI = abi.abi;
  return new ethers.Contract(address, contractABI, provider);
};

export async function CreateCash(contract, commitment, denomination) {
  return await contract.createNote(commitment, {
    value: ethers.utils.parseEther(denomination),
  });
}

export const getAddress = (Id) => {
  if (Id === "11155111") {
    return contractAddress.Sepolia_testnet;
  } else if (Id === "534351") {
    return contractAddress.scroll_Sepolia;
  } else if (Id === "421614") {
    return contractAddress.arbitrum_sepolia;
  }
};
export const getNetworkName = (Id) => {
  if (Id === "11155111") {
    return "Sepolia_testnet";
  } else if (Id === "534351") {
    return "Scroll_Sepolia";
  } else if (Id === "421614") {
    return "Arbitrum_Sepolia";
  }
};
export async function switchNetwork(selectedValue) {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${Number(selectedValue).toString(16)}` }],
    });
  } catch (error) {
    console.error("Error switching network:", error);
  }
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
