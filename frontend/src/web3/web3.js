import { ethers, providers } from "ethers";
import abi from "../ABI/Main.json";
import { Proofa, Proofb, Proofc } from "../Utils/packToSolidityProof";
export const contractAddress = {
  // Sepolia_testnet: "0xcb9c202880AC40cb4846CA24e07d97D01202abf8",
  Sepolia_testnet: "0x4a27864c18cA385d8a3B6e5dE1fE0fed1e9225B8",
  arbitrum_sepolia: "0xe591A89874b21e4F462Bd2DdbcbF27384E872ea5",
  scroll_Sepolia: "0xB70d7E5a736D8EEae7148928cB8b6f233bb6D467",
};
export function getWeb3Provider() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider;
}
export async function getChainId() {
  const chainId = await window.ethereum.request({
    method: "eth_chainId",
    params: [],
  });
  return chainId;
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
  return await contract.createNote(commitment, denomination, {
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
    return "Sepolia testnet";
  } else if (Id === "534351") {
    return "Scroll Sepolia";
  } else if (Id === "421614") {
    return "Arbitrum Sepolia";
  }
};
export const getImg = (Id) => {
  if (Id === "11155111") {
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png";
  } else if (Id === "534351") {
    return "https://static.chainbroker.io/mediafiles/projects/scroll/scroll.jpeg";
  } else if (Id === "421614") {
    return "https://cryptologos.cc/logos/arbitrum-arb-logo.png";
  }
};
const getRpc = (Id) => {
  if (Id === "11155111") {
    return "https://sepolia.infura.io/v3/";
  } else if (Id === "534351") {
    return "https://scroll-sepolia.blockpi.network/v1/rpc/public";
  } else if (Id === "421614") {
    return "https://arbitrum-sepolia.blockpi.network/v1/rpc/public";
  }
};
const getBlockUrl = (Id) => {
  if (Id === "11155111") {
    return "https://sepolia.etherscan.io";
  } else if (Id === "534351") {
    return "https://sepolia.scrollscan.com";
  } else if (Id === "421614") {
    return "https://sepolia-explorer.arbitrum.io";
  }
};
export const addNetwork = async (Id) => {
  const chainId = `0x${Number(Id).toString(16)}`;
  const rpcUrl = getRpc(Id);
  const chainName = getNetworkName(Id);
  const blockUrl = getBlockUrl(Id);
  const networkParams = {
    chainId: chainId,
    chainName: chainName, // Network name
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: [rpcUrl],
    blockExplorerUrls: [blockUrl], // Block explorer URL
  };
  window.ethereum
    .request({
      method: "wallet_addEthereumChain",
      params: [networkParams],
    })
    .then(() => {
      console.log("Custom network added to MetaMask");
    })
    .catch((error) => {
      console.error("Failed to add custom network to MetaMask:", error);
    });
};
export async function switchNetwork(selectedValue) {
  await window.ethereum
    .request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${Number(selectedValue).toString(16)}` }],
    })
    .then(() => {
      console.log("Chain ID is added in MetaMask");
    })
    .catch((error) => {
      if (error.code === 4902) {
        console.log("Chain ID is not added in MetaMask");
        addNetwork(selectedValue);
      } else {
        console.error(error);
      }
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
