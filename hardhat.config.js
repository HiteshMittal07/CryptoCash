require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_URL = process.env.URL;
const ARBITRUM_SEPOLIA_URL = process.env.URL2;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.6",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/159b7960b9944758a7d7b268c6b334ab",
      accounts: [PRIVATE_KEY],
    },
    hardhat: {
      chainId: 31337,
    },
    zkEVM: {
      url: "https://rpc.public.zkevm-test.net",
      accounts: [PRIVATE_KEY],
    },
    arbitrumSepolia: {
      url: "https://arbitrum-sepolia.infura.io/v3/e9272ec915974ba4a93e0f68e037ee9e",
      accounts: [PRIVATE_KEY],
    },
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/",
      accounts: [PRIVATE_KEY],
    },
  },
};
