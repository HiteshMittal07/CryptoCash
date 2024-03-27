import random from "../Utils/random";
import { ethers } from "ethers";
import { commitmentHash, nullifierHash } from "../Utils/createHash";
import {
  CreateCash,
  getAddress,
  getContract,
  getContractRead,
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
  async function CreateNote() {
    await switchNetwork(network_ID);
    const contractAddress = getAddress(network_ID);
    const networkName = getNetworkName(network_ID);
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
    <div>
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
    </div>
  );
}

export default Create;
