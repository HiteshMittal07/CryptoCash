import "bootstrap/dist/css/bootstrap.min.css";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
// import your abi here
import abi from "./ABI/Hello.json";
import abi2 from "./ABI/Note.json";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import { QrReader } from "react-qr-reader";
// import * as pdfjsLib from "pdfjs-dist";
import "./Qrscanner.css";
// import pdfjsLib from "pdfjs-dist/build/pdf";

// Set the path to the workerSrc
import "./App.css";
function App() {
  // pdfjsLib.GlobalWorkerOptions.workerSrc = "path/to/pdf.worker.min.js";
  //this useState is created to give the state to different component for extracting the contract from it.
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
    contractRead: null,
  });
  const [NoteState, setNoteState] = useState({
    provider: null,
    signer: null,
    contract2: null,
    contractRead: null,
    newContract: null,
  });
  //this useState is created for updating the state of balance when money is deposited.
  const [balance, setBalance] = useState("not shown");
  const [network, setNetwork] = useState(5);
  const [account, setAccount] = useState("not connected");
  const [noteAddress, setnoteAddress] = useState("");
  const { ethereum } = window;

  const connectWallet = async () => {
    // const contractAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
    const currentNetworkId = await window.ethereum.request({
      method: "eth_chainId",
    });

    if (currentNetworkId !== `0x${Number(network).toString(16)}`) {
      await switchNetwork(1442);
    }
    const contractAddress = "0x1fa3dE0885E4Ca43fF57138A95A67111330AfDa5";
    const contractABI = abi.abi;
    const contractAbi = abi2.abi;
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      setAccount(accounts);
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const contractRead = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );
      contractRead.on("NewContract", (creator, newContract) => {
        setnoteAddress(newContract);
      });
      setState({
        provider,
        signer,
        contract,
        contractRead,
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

  async function deposit() {
    const { contract } = state;
    const amount1 = document.querySelector("#depositedAmount").value;
    const option = { value: ethers.parseEther(amount1) };
    const transaction = await contract.deposit(option);
    await transaction.wait();
  }

  async function CreateNote() {
    const { contract } = state;
    const { contractRead } = state;
    const note = document.querySelector("#note").value;
    const pass = document.querySelector("#pass").value;
    const option = ethers.parseEther(note);
    const transaction = await contract.createNote(option, pass);
    await transaction.wait();
    console.log("note created");
  }

  async function withdraw() {
    const { contract2 } = NoteState;
    console.log(contract2);
    try {
      const transaction = await contract2.withdraw(Number(passkey));
      await transaction.wait();
    } catch (error) {
      console.log(error);
    }
    console.log("withdrawal done");
    console.log("Passkey entered:", passkey);
    // Additional actions or API calls can be performed here
    setShowModal(false);
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

  // const handleWithdraw = () => {
  //   // Logic to handle withdrawal with the entered passkey
  //   console.log("Passkey entered:", passkey);
  //   // Additional actions or API calls can be performed here
  //   setShowModal(false); // Close the modal after handling the passkey
  // };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <button className="btn btn-dark" onClick={connectWallet}>
            Connect Wallet
          </button>

          <div className="mb-3">
            <label htmlFor="depositedAmount" className="form-label">
              Enter Amount to Deposit
            </label>
            <input
              type="text"
              className="form-control"
              id="depositedAmount"
              placeholder="Enter Amount to Deposit"
            />
          </div>

          <button className="btn btn-primary me-2" onClick={deposit}>
            Deposit
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
          <div className="mb-3">
            <label htmlFor="note" className="form-label">
              Create Pass Key
            </label>
            <input
              type="text"
              className="form-control"
              id="pass"
              placeholder="Create Pass Key"
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

          <div>
            {/* Withdraw Modal */}
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-danger"
            >
              Withdraw
            </button>
            {showModal && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={() => setShowModal(false)}>
                    &times;
                  </span>
                  <h2>Enter Passkey</h2>
                  <input
                    type="password"
                    placeholder="Enter your passkey"
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    className="form-control mb-3"
                  />
                  <button onClick={withdraw} className="btn btn-dark">
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>

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
                  if (!!result) {
                    setQRText(result?.text);
                    alert("Qr Scanned Successful");
                    const contractAbi = abi2.abi;
                    try {
                      const { provider } = state;
                      const { signer } = state;
                      console.log(result?.text);
                      const contract2 = new ethers.Contract(
                        result?.text,
                        contractAbi,
                        signer
                      );
                      const contractRead2 = new ethers.Contract(
                        result?.text,
                        contractAbi,
                        provider
                      );
                      setNoteState({
                        provider,
                        signer,
                        contract2,
                        contractRead2,
                        qrText,
                      });
                    } catch (error) {
                      alert(error);
                    }
                  }

                  if (!!error) {
                    console.info(error);
                  }
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
