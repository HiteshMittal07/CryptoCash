import Home from "../Components/Home";
import { Routes, Route } from "react-router-dom";
import ScanNoteButton from "../Components/VerifyNotes";
import Create from "../Components/CreateNote";
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
      <Route path="/create" element={<Create />} />
    </Routes>
  );
};
export default Router;
