import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./info.css";
function Info() {
  return (
    <div className="container mt-5 text-dark" style={{ textAlign: "center" }}>
      <h1
        className="mb-5 text-light"
        style={{
          textAlign: "center",
          textTransform: "uppercase",
          fontWeight: "900",
        }}
      >
        How to Use My Project
      </h1>
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-light" style={{ fontWeight: "700" }}>
            1. Select Network
          </h2>
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
          <h2 className="text-light" style={{ fontWeight: "700" }}>
            2. Create Note
          </h2>
          <p>
            Deposit funds and download your QR note, ensuring it remains
            confidential.
          </p>
        </div>
        <div className="col-md-6">
          <h2 className="text-light" style={{ fontWeight: "700" }}>
            3. Verify Note
          </h2>
          <p>
            Use the "Verify Note" section to scan the QR note and verify its
            authenticity.
          </p>
          <h2 className="text-light" style={{ fontWeight: "700" }}>
            4. Withdrawal Verification
          </h2>
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
