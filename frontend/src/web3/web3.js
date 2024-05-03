import { ethers, providers } from "ethers";
import abi from "../ABI/Main.json";
import { Proofa, Proofb, Proofc } from "../Utils/packToSolidityProof";
import random from "../Utils/random";
import { commitmentHash, nullifierHash } from "../Utils/createHash";
import { CreateQR } from "../Utils/createQR";
import { downloadQRCodePDF } from "../Utils/downloadQR";
export const contractAddress = {
  Sepolia_testnet: "0xD1b0AD45B16BE5201Bc6F057D0ed6d8882dEaE8F",
  arbitrum_sepolia: "0xa1A78fE74c89F1e7BBA24Fb0AF443EBa725bCe72",
  scroll_Sepolia: "0xd83D72db394Bd5A56461Aa86EcF116E7b4BDAe19",
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
  return await contract.createNote(
    commitment,
    ethers.utils.parseEther(denomination),
    {
      value: ethers.utils.parseEther(denomination),
    }
  );
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
    recipient
  );
}
export async function claim(
  contract,
  proof,
  nullifierHash,
  commitment,
  recipient
) {
  const proofA = Proofa(proof);
  const proofB = Proofb(proof);
  const proofC = Proofc(proof);
  return await contract.claim(
    proofA,
    proofB,
    proofC,
    nullifierHash,
    commitment,
    recipient,
    { gasLimit: 3000000 }
  );
}
export async function changeOwner(
  contract,
  proof,
  nullifierHash,
  commitment,
  recipient,
  new_commitment
) {
  const proofA = Proofa(proof);
  const proofB = Proofb(proof);
  const proofC = Proofc(proof);
  return await contract.changeOwner(
    proofA,
    proofB,
    proofC,
    nullifierHash,
    commitment,
    recipient,
    new_commitment,
    { gasLimit: 3000000 }
  );
}

export async function createNote(
  network_Id,
  nullifier,
  secret,
  nullifier_Hash,
  commitment_Hash,
  amount,
  signature
) {
  const noteString = `${nullifier},${secret},${nullifier_Hash},${commitment_Hash},${network_Id},${signature}`;
  const qrDataURL = await CreateQR(noteString);
  const networkName = getNetworkName(network_Id);
  const denomination = ethers.utils.formatUnits(amount, "ether");
  downloadQRCodePDF(qrDataURL, denomination, networkName);
}

export function toHex(number) {
  return ethers.BigNumber.from(number)._hex;
}
export const signMessage = async (commitment) => {
  const ethereum = window.ethereum;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const hash = ethers.utils.solidityKeccak256(["bytes32"], [commitment]);
  const signature = await signer.signMessage(ethers.utils.arrayify(hash));
  return signature;
};
