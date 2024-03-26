import "bootstrap/dist/css/bootstrap.min.css";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import abi from "./ABI/Main.json";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import { QrReader } from "react-qr-reader";
// import * as pdfjsLib from "pdfjs-dist";
import "./Qrscanner.css";
// import pdfjsLib from "pdfjs-dist/build/pdf";
// import { BigNumber } from "bignumber.js";
import crypto from "./modules/crypto-browserify";
import { groth16 } from "snarkjs";
import { poseidon } from "circomlibjs";
import bigInt from "big-integer";
// Set the path to the workerSrc
import "./App.css";
// import rbigint from "./random";
import { BigNumber } from "ethers";
import random from "./Utils/random";

import { Proofa, Proofb, Proofc } from "./Utils/packToSolidityProof";
import { CreateQR } from "./Utils/createQR";
import Create from "./Components/CreateNote";
import ScanNoteButton, { VerifyPage } from "./Components/VerifyNotes";
import Home from "./Components/Home";
import Router from "./routes/Router";
import Header from "./Components/Header";
const snarkjs = require("snarkjs");
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

    // if (currentNetworkId !== `0x${Number(network).toString(16)}`) {
    //   await switchNetwork(1442);
    // }
    // const contractAddress = "0x3e8Cd0D2a0416c93512Ad00cA2bAEc4fAa72119F";
    // const contractAddress = "0x792A9Fd227C690f02beB23678a52BF766849DFc0";
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

  // Function to handle changes in the selector
  // const handleSelectChange = async (event) => {
  //   setNetwork(event.target.value);
  // };

  async function switchNetwork(selectedValue) {
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${Number(selectedValue).toString(16)}` }],
      });
    } catch (error) {
      console.error("Error switching network:", error);
    }
  }

  const [nul, setNul] = useState(null);
  const [com, setCom] = useState(null);
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
    console.log(nullifier.toString(10));
    const bigNullifier = parseInt(nullifier1);
    const bigSecret = parseInt(secret1);
    const nullifierHash = poseidon([bigInt(bigNullifier)]);
    const commitmentHash = poseidon([bigInt(bigNullifier), bigInt(bigSecret)]);
    const commitment = toNoteHex(commitmentHash);
    console.log(commitment);
    const option = ethers.utils.parseEther(note);
    const transaction = await contract.createNote(commitment, {
      value: option,
    });
    await transaction.wait();
    console.log(nullifierHash);
    console.log(commitmentHash);
    const multivalueString = `${nullifier1},${secret1},${nullifierHash},${commitmentHash}`;
    setnoteAddress(multivalueString);
    console.log("note created");
    window.alert("Note Created, You can download it");
    const address = await signer.getAddress();
    console.log(address);
    const input = {
      nullifier: bigNullifier,
      nullifierHash: nullifierHash,
      recipient: address,
      secret: bigSecret,
      commitment: commitmentHash,
    };
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
      input,
      "Withdraw.wasm",
      "Withdraw_0001.zkey"
    );
    setProof(proof);
    setNul(nullifierHash);
    setCom(commitment);
  }

  async function withdrawnote() {
    // const address = await signer.getAddress();
    // console.log(address);
    // const input = {
    //   nullifier: bigNullifier,
    //   nullifierHash: nullifierHash,
    //   recipient: address,
    //   secret: bigSecret,
    //   commitment: commitmentHash,
    // };
    // const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    //   input,
    //   "Withdraw.wasm",
    //   "Withdraw_0001.zkey"
    // );
    // setProof(proof);
    // setNul(nullifierHash);
    // setCom(commitment);
    const contractABI = abi.abi;
    const contractAddress = "0xfDF7622023B08ce1f640Fda0F730486Bc375b623";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const address = await signer.getAddress();

    const proofa = Proofa(Proof);
    const proofb = Proofb(Proof);
    const proofc = Proofc(Proof);
    console.log(proofa);
    console.log(proofb);
    console.log(proofc);
    // const proof2 = packToSolidityProof(proof);
    const nullifierHash1 = toNoteHex(nul);
    console.log(nullifierHash1);
    console.log(com);
    // console.log(proof2);
    try {
      const transaction = await contract.verify(
        proofa,
        proofb,
        proofc,
        nullifierHash1,
        com,
        address,
        { gasLimit: 3000000 }
      );
      await transaction.wait();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  function toNoteHex(number, length = 32) {
    const str =
      number instanceof Buffer
        ? number.toString("hex")
        : bigInt(number).toString(16);
    return "0x" + str.padStart(length * 2, "0");
  }
  async function withdraw(result, error) {
    if (!!result) {
      setQRText(result?.text);
      alert("Qr Scanned Successful");
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = "0x867a0FF92c41d41CD8191da465293A750e499769";
        const contractABI = abi.abi;
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          provider
        );
        const contract2 = contract.connect(signer);
        const address = "0x11ae45Ab10039D1EA50A54edd2638200fa3aFaEa";
        const values = result?.text.split(",");
        const nullifier = parseInt(values[0]);
        const secret = parseInt(values[1]);
        const nullifierHash = values[2];
        const commitmentHash = values[3];
        console.log(address);
        console.log(nullifier);
        console.log(nullifierHash);
        console.log(secret);
        console.log(commitmentHash);
        console.time("proof time");
        const input = {
          nullifier: nullifier,
          nullifierHash: nullifierHash,
          recipient: address,
          secret: secret,
          commitment: commitmentHash,
        };
        const { proof, publicSignals } = await snarkjs.groth16.fullProve(
          input,
          "Withdraw.wasm",
          "Withdraw_0001.zkey"
        );
        setProof(proof);
        // const proof2 = packToSolidityProof(proof);
        // const nullifierHash1 = toNoteHex(nullifierHash);
        // const commitment = toNoteHex(commitmentHash);
        // console.log(nullifierHash1);
        // console.log(commitment);
        // console.log(proof2);
        // console.log(typeof proof2);
        // try {
        //   const transaction = await contract2.withdraw(
        //     proof2,
        //     nullifierHash1,
        //     commitment,
        //     address,
        //     { gasLimit: 21000 }
        //   );
        //   await transaction.wait();
        // } catch (error) {
        //   console.log(error);
        //   alert(error);
        // }
        // // Additional actions or API calls can be performed here
        // setShowModal(false);
      } catch (error) {
        alert(error);
      }
    }

    if (!!error) {
      console.info(error);
    }
  }

  async function downloadQRCodePDF(noteString) {
    const textForQR = noteString.toString();

    // Embed QR code image into the PDF
    const qrDataURL = await CreateQR(textForQR);
    const pdf = new jsPDF();
    pdf.addImage(qrDataURL, "JPEG", 25, 10, 100, 100); // Adjust position and size as needed
    pdf.text("This is note generated from CryptoCash.netlify.app", 25, 120);
    pdf.setFontSize(10);
    pdf.text(
      "To verify the note and withdraw funds, go to cryptoCash official website and open the withdraw note tab",
      25,
      130
    );
    // Download the PDF
    pdf.save("QRCode.pdf");
  }

  const [qrText, setQRText] = useState(
    "Scan a QR code to get the embedded text."
  );

  const [showScanner, setShowScanner] = useState(false);

  const [passkey, setPasskey] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <diV>
      <Header />
      <Router />
    </diV>
  );
}

export default App;
