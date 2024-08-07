import { generateProof } from "../Utils/createProof";
import { QrReader } from "react-qr-reader";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { isMobile } from "react-device-detect";
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import {
  changeOwner,
  claim,
  createNote,
  getAddress,
  getChainId,
  getContract,
  getContractRead,
  getNetworkName,
  getWeb3Provider,
  requestAccounts,
  signMessage,
  switchNetwork,
  toHex,
} from "../web3/web3";
import { useState } from "react";
import random from "../Utils/random";
import { CreateQR } from "../Utils/createQR";
import { downloadQRCodePDF } from "../Utils/downloadQR";
import { ethers } from "ethers";

/**
 * @typedef {Object} QRReaderProps
 * @property {(d: string) => void} setData - Function to set the scanned data
 * @property {(msg: string) => void} handleError - Function to handle errors
 * @property {() => void} handleClose - Function to handle the close event
 */

// Usage example
/**
 * @param {QRReaderProps} props
 */
const QRReader = (props) => {
  const facingMode = isMobile ? "environment" : "user";
  return (
    <div style={{ width: "100%" }}>
      <QrReader
        ViewFinder={ViewFinder}
        constraints={{ facingMode }}
        onResult={async (result, error) => {
          await getData(result, error, props);
        }}
      />
    </div>
  );
};

/**
 * @typedef {Object} ScanNoteDialogProps
 * @property {boolean} open - Indicates if the dialog is open
 * @property {() => void} onClose - Function to handle the close event
 * @property {(d: string) => void} setData - Function to set the scanned data
 * @property {(msg: string) => void} handleError - Function to handle errors
 * @property {string} dialogTitle - The title of the dialog
 */

// Usage example
/**
 * @param {ScanNoteDialogProps} props
 */
function ScanNoteDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{props.dialogTitle}</DialogTitle>
      <QRReader
        handleClose={handleClose}
        setData={props.setData}
        handleError={props.handleError}
      ></QRReader>
    </Dialog>
  );
}

/**
 * @typedef {Object} ScanNoteButtonProps
 * @property {(d: string) => void} setData - Function to set the scanned data
 * @property {(msg: string) => void} handleError - Function to handle errors
 * @property {string} dialogTitle - The title of the dialog
 */

// Usage example
/**
 * @param {ScanNoteButtonProps} props
 */
export default function ScanNoteButton2(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip arrow title="Scan a QR code">
        <Button
          variant="contained"
          sx={{ height: "100%", fontWeight: 800 }}
          onClick={handleClickOpen}
        >
          Scan
        </Button>
      </Tooltip>
      <ScanNoteDialog
        open={open}
        onClose={handleClose}
        setData={props.setData}
        handleError={props.handleError}
        dialogTitle={props.dialogTitle}
      />
    </div>
  );
}
export const ViewFinder = () => (
  <>
    <svg
      width="50px"
      viewBox="0 0 100 100"
      style={{
        top: 0,
        left: 0,
        zIndex: 1,
        boxSizing: "border-box",
        border: "50px solid rgba(0, 0, 0, 0.3)",
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      <path
        fill="none"
        d="M13,0 L0,0 L0,13"
        stroke="rgba(255, 0, 0, 0.5)"
        strokeWidth="5"
      />
      <path
        fill="none"
        d="M0,87 L0,100 L13,100"
        stroke="rgba(255, 0, 0, 0.5)"
        strokeWidth="5"
      />
      <path
        fill="none"
        d="M87,100 L100,100 L100,87"
        stroke="rgba(255, 0, 0, 0.5)"
        strokeWidth="5"
      />
      <path
        fill="none"
        d="M100,13 L100,0 87,0"
        stroke="rgba(255, 0, 0, 0.5)"
        strokeWidth="5"
      />
    </svg>
  </>
);
async function getData(result, error, props) {
  if (!!result) {
    alert("Qr Scanned Successful");
    props.handleClose();
    try {
      window.ethereum.on("chainChanged", async () => {
        await changeOwnership(
          nullifier,
          secret,
          nullifierHash,
          commitmentHash,
          amount,
          network_Id,
          signature
        );
      });
      const values = result?.text.split(",");
      const nullifier = parseInt(values[0]);
      const secret = parseInt(values[1]);
      const nullifierHash = values[2];
      const commitmentHash = values[3];
      const amount = values[4];
      const network_Id = values[5];
      const signature = values[6];
      await switchNetwork(network_Id);
      const chainId = await getChainId();
      if (chainId == `0x${Number(network_Id).toString(16)}`) {
        await changeOwnership(
          nullifier,
          secret,
          nullifierHash,
          commitmentHash,
          amount,
          network_Id,
          signature
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}
async function changeOwnership(
  nullifier,
  secret,
  nullifierHash,
  commitmentHash,
  amount,
  network_Id,
  signature
) {
  try {
    window.ethereum.removeListener("chainChanged", async () => {
      await changeOwnership(
        nullifier,
        secret,
        nullifierHash,
        commitmentHash,
        amount,
        network_Id,
        signature
      );
    });
    const contractAddress = getAddress(network_Id);
    const provider = getWeb3Provider();
    const contract = getContract(provider, contractAddress);
    const address = await requestAccounts(provider);
    const Proof = await generateProof(
      nullifier,
      nullifierHash,
      address,
      secret,
      commitmentHash
    );
    try {
      const transaction = await changeOwner(
        contract,
        Proof,
        toHex(nullifierHash),
        toHex(commitmentHash),
        address,
        signature
      );
      await transaction.wait();
      window.alert("ownership changed successful");
      const new_signature = await signMessage(toHex(commitmentHash));
      await createNote(
        network_Id,
        nullifier,
        secret,
        nullifierHash,
        commitmentHash,
        amount,
        new_signature
      );
    } catch (error) {
      console.log(error);
      alert(error.reason);
    }
  } catch (error) {
    console.log(error);
  }
}
