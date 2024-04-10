import Home from "../Components/Home";
import { Routes, Route } from "react-router-dom";
import ScanNoteButton from "../Components/WithdrawNotes";
import Create from "../Components/CreateNote";
import Info from "../Components/Info";
import ScanNoteButton1 from "../Components/verifyNotes";
import ScanNoteButton2 from "../Components/changeOwner";
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
                marginTop: "250px",
              }}
            >
              <h2 className="fw-bolder">Scan Here</h2>
              <p>
                <span className="fw-bolder">Disclaimer! </span>:You can verify
                whether the note you've been given has already been spent. If it
                has, you can return it to the creator and request a newly issued
                note, ensure this while taking note from the creator.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h3>Verify Note / Become Owner</h3>
                <div className="row">
                  <div className="col-6">
                    <ScanNoteButton1 dialogTitle="Scan for verifying note"></ScanNoteButton1>
                  </div>
                  <div className="col-6">
                    <ScanNoteButton2 dialogTitle="Scan for changing ownership"></ScanNoteButton2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />
      <Route
        path="/withdraw"
        element={
          <div className="container">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "250px",
              }}
            >
              <h2 className="fw-bolder">Withdraw Your Note Here</h2>
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
                <h3>Scan Here</h3>
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
