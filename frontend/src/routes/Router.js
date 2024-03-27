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
          <ScanNoteButton dialogTitle="Scan a CrptoCash Note"></ScanNoteButton>
        }
      />
      <Route path="/create" element={<Create />} />
      <Route path="/info" element={<Info />} />
    </Routes>
  );
};
export default Router;
