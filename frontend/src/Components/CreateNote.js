import random from "../Utils/random";
import { ethers } from "ethers";
import { commitmentHash, nullifierHash } from "../Utils/createHash";
import {
  CreateCash,
  getAddress,
  getContract,
  getContractRead,
  getImg,
  getNetworkName,
  getWeb3Provider,
  switchNetwork,
  toHex,
} from "../web3/web3";
import { downloadQRCodePDF } from "../Utils/downloadQR";
import { useLocation } from "react-router-dom";

function Create() {
  const location = useLocation();
  const network_ID = location.state ? location.state.from : null;
  const networkName = getNetworkName(network_ID);
  const link1 = getImg(network_ID);
  async function CreateNote() {
    await switchNetwork(network_ID);
    const contractAddress = getAddress(network_ID);
    const provider = getWeb3Provider();
    const contract = getContract(provider, contractAddress);
    const contractRead = getContractRead(provider, contractAddress);
    const denomination = document.querySelector("#note").value;

    contractRead.on("Created", async (creator, amount, event) => {
      alert("Created");
      const noteString = `${nullifier},${secret},${nullifier_Hash},${commitment_Hash},${network_ID}`;
      event.removeListener();
      await downloadQRCodePDF(noteString, denomination, networkName);
    });
    const nullifier = random();
    const secret = random();
    const nullifier_Hash = nullifierHash(parseInt(nullifier));
    const commitment_Hash = commitmentHash(
      parseInt(nullifier),
      parseInt(secret)
    );
    const commitment = toHex(commitment_Hash);
    console.log(nullifier);
    const transaction = await CreateCash(contract, commitment, denomination);
    await transaction.wait();
  }

  return (
    // <div className="container mt-4 d-flex justify-content-center align-items-center">
    //   <div
    //     className="card bg-transparent text-light"
    //     style={{ maxWidth: "400px" }}
    //   >
    //     <div className="card-body">
    //       <div className="mb-3">
    //         <label htmlFor="note" className="form-label">
    //           Enter Amount of Note
    //         </label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           id="note"
    //           placeholder="Enter Amount of Note"
    //         />
    //       </div>
    //       <button className="btn btn-success me-2" onClick={CreateNote}>
    //         Create Note
    //       </button>
    //     </div>
    //   </div>
    // </div>
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
              alt="card image"
              className="card__img"
              style={{ height: "320px" }}
            />

            <h1 className="card__title">{networkName}</h1>
            {/* <p className="card__description">Create Notes</p>
             */}
            <input
              placeholder="Enter the amount of note"
              id="note"
              style={{ background: "transparent" }}
            />
            <button onClick={CreateNote} className="btn btn-light">
              Create
            </button>
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
