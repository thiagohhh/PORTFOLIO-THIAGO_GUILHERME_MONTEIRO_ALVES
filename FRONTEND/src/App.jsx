import { Route, Routes } from "react-router-dom";
import QuemSouEu from "./components/QuemSouEu/QuemSouEu";
import Senai from "./components/Senai/Senai";
import Sesi from "./components/Sesi/Sesi";
import "./App.css";

function App() {
  return (
    <div className="container-principal">
      <Routes>
        <Route path="/" element={<QuemSouEu />} />
        <Route path="/Sesi" element={<Sesi />} />
        <Route path="/Senai" element={<Senai />} />
      </Routes>
    </div>
  );
}

export default App;
