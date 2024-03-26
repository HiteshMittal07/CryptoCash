import Home from "../Components/Home";
import { Routes, Route } from "react-router-dom";
import ScanNoteButton from "../Components/VerifyNotes";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/verify"
        element={
          <ScanNoteButton dialogTitle="Scan a CrptoCash Note"></ScanNoteButton>
        }
      />
    </Routes>
  );
};
export default Router;
