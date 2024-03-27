import React from "react";
import "bootstrap/dist/css/bootstrap.css";

function Info() {
  return (
    <div className="container mt-5 text-light">
      <h2 className="mb-4">How to Use My Project</h2>
      <div className="row">
        <div className="col-md-6">
          <h3>1) Select Network:</h3>
          <p>
            Choose from Eth Sepolia, Scroll Sepolia, or Arbitrum Sepolia to
            create your notes.
          </p>
          <p>
            To get testnet ETHs, use the{" "}
            <a
              href="https://www.alchemy.com/faucets/ethereum-sepolia"
              target="_blank"
            >
              Eth Sepolia faucet
            </a>
            .
          </p>
          <p>
            To get testnet Scroll ETHs, use the{" "}
            <a href="https://scroll.faucetme.pro/" target="_blank">
              Scroll Sepolia faucet
            </a>
            .
          </p>
          <p>
            To get testnet Arbitrum ETHs, use the{" "}
            <a
              href="https://www.alchemy.com/faucets/arbitrum-sepolia"
              target="_blank"
            >
              Arbitrum Sepolia faucet
            </a>
            .
          </p>
          <h3>2) Create Note:</h3>
          <p>
            Deposit funds and download your QR note, ensuring it remains
            confidential.
          </p>
          <h3>3) Verify Note:</h3>
          <p>
            Use the "Verify Note" section to scan the QR note and verify its
            authenticity.
          </p>
        </div>
        <div className="col-md-6">
          <h3>4) Withdrawal Verification: </h3>
          <p>
            After scanning, a zk proof is generated using a circom circuit,
            which is verified on-chain, ensuring that the withdrawer knows the
            confidential information shared by the sender without revealing it.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Info;
