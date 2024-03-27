import random from "../Utils/random";
import { ethers } from "ethers";
import { commitmentHash, nullifierHash } from "../Utils/createHash";
import {
  CreateCash,
  getContract,
  getContractRead,
  getWeb3Provider,
  toHex,
} from "../web3/web3";
import { downloadQRCodePDF } from "../Utils/downloadQR";

function Create() {
  async function CreateNote() {
    const contractAddress = "0xe591A89874b21e4F462Bd2DdbcbF27384E872ea5";
    const provider = getWeb3Provider();
    const contract = getContract(provider, contractAddress);
    const contractRead = getContractRead(provider, contractAddress);
    const denomination = document.querySelector("#note").value;

    contractRead.on("Created", async (creator, amount, event) => {
      alert("Created");
      const noteString = `${nullifier},${secret},${nullifier_Hash},${commitment_Hash}`;
      event.removeListener();
      await downloadQRCodePDF(noteString);
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
