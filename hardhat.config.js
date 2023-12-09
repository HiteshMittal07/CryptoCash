require("@nomicfoundation/hardhat-toolbox");

const GOERLI_URL = process.env.URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
require("dotenv").config();
module.exports = {
  solidity: "0.8.6",
  networks: {
    // goerli: {
    //   url: URL,
    //   accounts: [PRIVATE_KEY],
    // },
    // hardhat: {
    //   chainId: 31337,
    // },
    // zkEVM: {
    //   url: "https://rpc.public.zkevm-test.net",
    //   accounts: [PRIVATE_KEY],
    // },
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
