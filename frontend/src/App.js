import "bootstrap/dist/css/bootstrap.min.css";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import abi from "./ABI/Main.json";
import abi2 from "./ABI/Main.json";
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
import vkey from "./verification_key.json";
import "./App.css";
// import rbigint from "./random";
import { BigNumber } from "ethers";
import random from "./random";
import { packToSolidityProof } from "./packToSolidityProof";
// const snarkjs = require("snarkjs");
const snarkjs = require("snarkjs");
// const fs = require("fs");
function App() {
  // pdfjsLib.GlobalWorkerOptions.workerSrc = "path/to/pdf.worker.min.js";
  //this useState is created to give the state to different component for extracting the contract from it.
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
    const contractAddress = "0x85a286A678F9F434F0b6ab6547bA4Ab840295A28";
    // const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
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

  function generateSecureRandomBigNumber(min, max) {
    const range = new BigNumber(max).minus(min).plus(1);
    const bytesNeeded = Math.ceil(range.toString(2).length / 8);
    const maxChunkSize = 6; // Maximum number of bytes per iteration
    const numChunks = Math.ceil(bytesNeeded / maxChunkSize);
    let randomValue = new BigNumber("0");

    for (let i = 0; i < numChunks; i++) {
      const bytesToGenerate = Math.min(
        maxChunkSize,
        bytesNeeded - i * maxChunkSize
      );
      const randomBytes = crypto.randomBytes(bytesToGenerate);

      let chunkValue = new BigNumber("0");
      for (let j = 0; j < bytesToGenerate; j++) {
        chunkValue = chunkValue.times(256).plus(randomBytes.readUInt8(j));
      }

      randomValue = randomValue.times(256 ** bytesToGenerate).plus(chunkValue);
    }

    return randomValue.mod(range).plus(min);
  }
  async function CreateNote1() {
    const { contract } = state;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract1 = contract.connect(signer);
    const note = document.querySelector("#note").value;
    const option = { value: ethers.utils.parseEther(note) };
    const commitmentHash =
      "20159348664310517594321724268484965985500253805075981218504982571504652326323";
    const commitment = ethers.BigNumber.from(commitmentHash)._hex;
    const tx1 = await contract1.createNote(commitment, option);
    await tx1.wait();

    // balance = await ethers.provider.getBalance(deployer.address);
    // console.log(balance);
    const nullifier = parseInt("4056069145807454800581");
    const secret = parseInt("6280904180439752355679");
    const address = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
    const nullifierHash =
      "10062829781726759867607233874903475719260266720356579819079933182888540094468";
    const input = {
      nullifier: nullifier,
      nullifierHash: nullifierHash,
      recipient: address,
      secret: secret,
      commitment: commitmentHash,
    };
    const test1 = ethers.BigNumber.from(
      "4629604741548106608260839937976265207027033904114029603043531393055162424244"
    );
    const test2 = ethers.BigNumber.from(
      "6885295973002863617550007377755170501366163580148669054007311112029508977375"
    );
    const test3 = ethers.BigNumber.from(
      "13519347286785945869237144779544870342532919312456380179774907747295815700061"
    );
    const test4 = ethers.BigNumber.from(
      "9741216730826252104108451966222898499472604153099703158435470282180604812265"
    );
    const test5 = ethers.BigNumber.from(
      "11181359794897668101073473737088451706842177883647019631808078833516372476471"
    );
    const test6 = ethers.BigNumber.from(
      "15328654739934972336556966778015369340837671102563534006789791588252378269421"
    );
    const test7 = ethers.BigNumber.from(
      "12266166608762024524594087296721751829805364723651062783475454125799766669733"
    );
    const test8 = ethers.BigNumber.from(
      "4780556612309164027511118608828824040066380883736977290303706308401307750037"
    );
    console.log(test1._hex);
    const proof2 = [
      test1._hex,
      test2._hex,
      test3._hex,
      test4._hex,
      test5._hex,
      test6._hex,
      test7._hex,
      test8._hex,
    ];
    const nullifierHash1 =
      "0x163f5c1d326f8c7386de0b029693117bc1f9c4bcc09d2862389e1d7a3aa3c004";
    try {
      const transaction = await contract1.withdraw(
        proof2,
        nullifierHash1,
        commitment,
        address,
        { gasLimit: 21000 }
      );
      await transaction.wait();
    } catch (error) {
      console.log(error);
    }
    // balance = await ethers.provider.getBalance(address);
    // console.log(balance);

    // const transaction1 = await main.withdraw(
    //   proof2,
    //   nullifierHash1,
    //   commitment,
    //   address
    // );
    // await transaction1.wait();
  }

  async function CreateNote() {
    const { contract } = state;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract2 = contract.connect(signer);
    const note = document.querySelector("#note").value;

    // const nullifier = random();
    // const secret = random();
    // const nullifier1 = nullifier.toString(10);
    // const secret1 = secret.toString(10);
    // console.log(nullifier.toString(10));
    // const bigNullifier = parseInt(nullifier1);
    // const bigSecret = parseInt(secret1);
    // const nullifierHash = poseidon([bigInt(bigNullifier)]);
    // const commitmentHash = poseidon([bigInt(bigNullifier), bigInt(bigSecret)]);
    // const commitment = toNoteHex(commitmentHash);
    // const commitment = 0x1e588147f365558efc5cd184d4dc94b43f919f6bb10b4121f5038699092c8deb;
    const commitment = ethers.BigNumber.from(
      "13725760264266012175428937010324166955533782804720749816378413236072345275883"
    )._hex;
    // console.log(commitment);
    // const option = ethers.utils.parseEther(note);
    // const fee = await contract2.calculateFee(option);
    // const transaction = await contract2.createNote(commitment, option, {
    //   value: option.add(fee),
    // });
    // await transaction.wait();
    // console.log(nullifierHash);
    // console.log(commitmentHash);
    // const multivalueString = `${nullifier1},${secret1},${nullifierHash},${commitmentHash}`;
    // setnoteAddress(multivalueString);
    // console.log("note created");
    // window.alert("Note Created, You can download it");
    const address = await signer.getAddress();
    console.log(address);
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
    // const proof2 = packToSolidityProof(proof);
    const proof2 = [
      ethers.BigNumber.from(
        "5864220050082001083612579974035064855945763860269362214473989515537059524379"
      )._hex,
      ethers.BigNumber.from(
        "521259583062900644716062702087835148772232329983387290872776655191147321594"
      )._hex,
      ethers.BigNumber.from(
        "1146209616802744522529415134381718269925226010549713875057336661742929899753"
      )._hex,
      ethers.BigNumber.from(
        "14689361846255194004190402906316714904259456979540071575268310927841074302786"
      )._hex,
      ethers.BigNumber.from(
        "5297978878441267899004181253962874434359332295655751944410804421756495195445"
      )._hex,
      ethers.BigNumber.from(
        "8932808923748759807930847919814230092209972653627488073805648808878164525921"
      )._hex,
      ethers.BigNumber.from(
        "18496600873096512428514294366645318069927991605539029518356006198680312787462"
      )._hex,
      ethers.BigNumber.from(
        "10072363684301547698824020573454085420956940710714864040648322277157226167235"
      )._hex,
    ];

    // const nullifierHash1 = toNoteHex(nullifierHash);
    const nullifierHash1 = ethers.BigNumber.from(
      "14448754364484435303451218854782103820941572483011932101053125584759447642969"
    )._hex;
    console.log(nullifierHash1);
    console.log(commitment);
    console.log(proof2);
    try {
      const transaction = await contract2.withdraw(
        proof2,
        nullifierHash1,
        commitment,
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
      const contractAbi = abi2.abi;
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
        const proof2 = packToSolidityProof(proof);
        const nullifierHash1 = toNoteHex(nullifierHash);
        const commitment = toNoteHex(commitmentHash);
        console.log(nullifierHash1);
        console.log(commitment);
        console.log(proof2);
        console.log(typeof proof2);
        try {
          const transaction = await contract2.withdraw(
            proof2,
            nullifierHash1,
            commitment,
            address,
            { gasLimit: 21000 }
          );
          await transaction.wait();
        } catch (error) {
          console.log(error);
          alert(error);
        }
        // Additional actions or API calls can be performed here
        setShowModal(false);

        // const res = await snarkjs.groth16.verify(vkey, publicSignals, proof);
        // console.log(res);

        // if (res === true) {
        //   console.log("Verification OK");
        //   alert("Verified");
        // } else {
        //   console.log("Invalid proof");
        // }
      } catch (error) {
        alert(error);
      }
    }

    if (!!error) {
      console.info(error);
    }
  }

  function downloadQRCodePDF() {
    console.log(noteAddress);
    const textForQR = noteAddress.toString(); // Replace with your desired text

    // Create QR code using QRCode.js library
    const qrCanvas = document.createElement("canvas");
    QRCode.toCanvas(
      qrCanvas,
      textForQR,
      { width: 200, height: 200 },
      function (error) {
        if (error) {
          console.error("Error generating QR code:", error);
        } else {
          // Create a PDF document using jsPDF
          const pdf = new jsPDF();
          const qrDataURL = qrCanvas.toDataURL("image/jpeg"); // Convert QR canvas to data URL

          // Embed QR code image into the PDF
          pdf.addImage(qrDataURL, "JPEG", 15, 15, 180, 180); // Adjust position and size as needed

          // Download the PDF
          pdf.save("QRCode.pdf");
        }
      }
    );
  }

  const [qrText, setQRText] = useState(
    "Scan a QR code to get the embedded text."
  );

  const [showScanner, setShowScanner] = useState(false);

  const [passkey, setPasskey] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <button className="btn btn-dark" onClick={connectWallet}>
            Connect Wallet
          </button>

          <div className="mb-3">
            <label htmlFor="note" className="form-label">
              Enter Amount of Note
            </label>
            <input
              type="text"
              className="form-control"
              id="note"
              placeholder="Enter Amount of Note"
            />
          </div>

          <button className="btn btn-success me-2" onClick={CreateNote}>
            Create Note
          </button>
          <button
            id="downloadButton"
            className="btn btn-success me-2"
            onClick={downloadQRCodePDF}
          >
            Download Text File
          </button>
          {/* QR Scanner */}
          <button
            onClick={() => setShowScanner(!showScanner)}
            className="btn btn-danger mt-3"
          >
            Open QR Scanner
          </button>
          <div className="qr-scanner-container mt-3">
            {showScanner && (
              <QrReader
                onResult={(result, error) => {
                  withdraw(result, error);
                }}
                style={{ width: "100%" }}
              />
            )}
            <p>{qrText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
