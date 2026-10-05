import { Route, Routes } from "react-router-dom";
import QuemSouEu from "./components/QuemSouEu/QuemSouEu";
import Senai from "./components/Senai/Senai";
import Sesi from "./components/Sesi/Sesi";
import ConteudoNatureza from "./components/Natureza/Conteudo";
import ConteudoLinguagens from "./components/Linguagens/Conteudo";
import ConteudoHumanas from "./components/Humanas/Conteudo";
import ConteudoMatematica from "./components/Matematica/Conteudo";
import "./App.css";

function App() {
  return (
    <div className="container-principal">
      <Routes>
        <Route path="/" element={<QuemSouEu />} />
        <Route path="/Sesi" element={<Sesi />} />
        <Route
          path="/Sesi/conteudo/natureza"
          element={<ConteudoNatureza />}
        />
        <Route
          path="/Sesi/conteudo/linguagens"
          element={<ConteudoLinguagens />}
        />
        <Route
          path="/Sesi/conteudo/humanas"
          element={<ConteudoHumanas />}
        />
        <Route
          path="/Sesi/conteudo/matematica"
          element={<ConteudoMatematica />}
        />
        <Route path="/Senai" element={<Senai />} />
      </Routes>
    </div>
  );
}

export default App;
