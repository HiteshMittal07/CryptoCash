import Home from "../Components/Home";
import { Routes, Route } from "react-router-dom";
import ScanNoteButton from "../Components/VerifyNotes";
import Create from "../Components/CreateNote";
import Info from "../Components/Info";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/verify"
        element={
          <div className="container">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <h2>Verify Your Note Here</h2>
              <p>
                This project, CryptoCash, revolutionizes cryptocurrency by
                enabling the creation of offline crypto in the form of QR notes.
                These notes, like traditional fiat currency, can be shared
                offline, ensuring privacy and security. Built on zero-knowledge
                proof technology (zk-SNARKs), CryptoCash guarantees that
                transactions are confidential and secure
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h3>Withdraw Note</h3>
                <ScanNoteButton dialogTitle="Scan a CrptoCash Note"></ScanNoteButton>
              </div>
            </div>
          </div>
        }
      />
      <Route path="/create" element={<Create />} />
      <Route path="/info" element={<Info />} />
    </Routes>
  );
};
export default Router;
