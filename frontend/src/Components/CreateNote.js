import random from "../Utils/random";
import { commitmentHash, nullifierHash } from "../Utils/createHash";
import {
  CreateCash,
  getAddress,
  getChainId,
  getContract,
  getContractRead,
  getImg,
  getNetworkName,
  getWeb3Provider,
  signMessage,
  switchNetwork,
  toHex,
} from "../web3/web3";
import { downloadQRCodePDF } from "../Utils/downloadQR";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { CreateQR } from "../Utils/createQR";

function Create() {
  const [show, setShow] = useState(false);
  const [noteDetails, setNoteDetails] = useState(null);
  const location = useLocation();
  const network_ID = location.state ? location.state.from : null;
  const networkName = getNetworkName(network_ID);
  const link1 = getImg(network_ID);

  const switchChain = async () => {
    window.ethereum.on("chainChanged", CreateNote);
    const chainId = await getChainId();
    if (chainId == `0x${Number(network_ID).toString(16)}`) {
      await CreateNote();
    }
    await switchNetwork(network_ID);
  };
  async function CreateNote() {
    window.ethereum.removeListener("chainChanged", CreateNote);
    const denomination = document.querySelector("#note").value;
    if (!denomination) {
      window.alert("enter valid amount");
      return;
    }
    const contractAddress = getAddress(network_ID);
    const provider = getWeb3Provider();
    const contract = getContract(provider, contractAddress);
    const contractRead = getContractRead(provider, contractAddress);
    localStorage.setItem("denomination", denomination);
    contractRead.on("Created", async (creator, amount, event) => {
      const signature = await signMessage(commitment);
      const noteString = `${nullifier},${secret},${nullifier_Hash},${commitment_Hash},${amount},${network_ID},${signature}`;
      const qrDataURL = await CreateQR(noteString);
      setNoteDetails(qrDataURL);
      alert("Created");
      setShow(true);
      event.removeListener();
    });
    const nullifier = random();
    const secret = random();
    const nullifier_Hash = nullifierHash(parseInt(nullifier));
    const commitment_Hash = commitmentHash(
      parseInt(nullifier),
      parseInt(secret)
    );
    const commitment = toHex(commitment_Hash);
    const transaction = await CreateCash(contract, commitment, denomination);
    await transaction.wait();
  }
  useEffect(() => {
    const addNetwork = async () => {
      const network_Id = location.state.from;
      await switchNetwork(network_Id);
    };
    addNetwork();
  }, []);
  function download() {
    const networkName = getNetworkName(network_ID);
    const denomination = localStorage.getItem("denomination");
    downloadQRCodePDF(noteDetails, denomination, networkName);
  }
  return (
    <div className="card1">
      <h1 className="text-light mb-3 fw-bolder" style={{ fontSize: "50px" }}>
        CREATE A NOTE
      </h1>
      <div
        className="card__container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <article className="card__article">
          <div className="card__data">
            <img
              src={link1}
              alt="card"
              className="card__img"
              style={{ height: "320px" }}
            />

            <h1 className="card__title">{networkName}</h1>
            {/* <p className="card__description">Create Notes</p>
             */}
            <input
              placeholder="Enter the amount of note"
              id="note"
              style={{
                border: "2px solid grey",
                borderRadius: "19px",
                textAlign: "center",
              }}
            />
            <div className="card__description">
              <button onClick={switchChain} className="btn btn-light me-2">
                Create
              </button>
              {show && (
                <button className="btn btn-light" onClick={download}>
                  Download
                </button>
              )}
            </div>
          </div>

          <div className="card__shapes">
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
            <span className="card__shape"></span>
          </div>
        </article>
      </div>
    </div>
  );
}

export default Create;
