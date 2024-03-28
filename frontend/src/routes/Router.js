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
          <div className="d-flex justify-content-center align-items-center">
            <h1 className="text-light mt-5 mb-5">Withdraw Note</h1>
            <ScanNoteButton dialogTitle="Scan a CrptoCash Note"></ScanNoteButton>
          </div>
        }
      />
      <Route path="/create" element={<Create />} />
      <Route path="/info" element={<Info />} />
    </Routes>
  );
};
export default Router;
