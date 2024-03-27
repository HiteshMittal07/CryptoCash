import "bootstrap/dist/css/bootstrap.min.css";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import abi from "./ABI/Main.json";
import "./App.css";
import Router from "./routes/Router";
import Header from "./Components/Header";
function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
    contractAddress: null,
  });
  //this useState is created for updating the state of balance when money is deposited.
  const [balance, setBalance] = useState("not shown");
  const [network, setNetwork] = useState(5);
  const [account, setAccount] = useState("not connected");
  const [Proof, setProof] = useState("");
  const [noteAddress, setnoteAddress] = useState("");
  const { ethereum } = window;

  const connectWallet = async () => {
    // const contractAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
    const currentNetworkId = await window.ethereum.request({
      method: "eth_chainId",
    });

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const contractABI = abi.abi;
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      setAccount(accounts);
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );
      setState({
        provider,
        signer,
        contract,
        contractAddress,
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Header />
      <Router />
    </div>
  );
}

export default App;
