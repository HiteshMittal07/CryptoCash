import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Router from "./routes/Router";
import Header from "./Components/Header";
import { ethers } from "ethers";
import crypto from "./modules/crypto-browserify";
function App() {
  const signMessage1 = () => {
    // Step 1: Generate key pair
    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: { type: "pkcs1", format: "pem" },
      privateKeyEncoding: { type: "pkcs1", format: "pem" },
    });

    // Step 2: Generate and serialize the proof
    const proofData = "hi there"; // Serialize the proof data into a byte array

    // Step 3: Sign the proof
    const sign = crypto.createSign("RSA-SHA256");
    sign.write(proofData);
    sign.end();
    const signature = sign.sign(privateKey, "hex");

    // Step 4: Include the signature
    const signedProof = Buffer.concat([
      Buffer.from(signature, "hex"),
      proofData,
    ]);

    // Step 5: Verification (done by the recipient)
    const verify = crypto.createVerify("RSA-SHA256");
    verify.write(proofData);
    verify.end();
    const isValid = verify.verify(publicKey, signature, "hex");

    console.log("Signature verification:", isValid);
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
    } catch (error) {
      alert(error);
    }
  };

  const signMessage = async () => {
    const ethereum = window.ethereum;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const data = "hi there";
    let signature;
    // Request account access if needed
    signature = await signer.signMessage(data);

    const recoveredAddress = ethers.utils.verifyMessage(data, signature);
    console.log("Recovered address:", recoveredAddress);
  };

  return (
    <div className="my-background">
      <Header connectWallet={connectWallet} />
      <Router />
      <button onClick={signMessage}>Sign</button>
      <button onClick={signMessage1}>Sign1</button>
    </div>
  );
}

export default App;
