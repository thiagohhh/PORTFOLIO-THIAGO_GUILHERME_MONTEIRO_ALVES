import { Route, Routes } from "react-router-dom";
import QuemSouEu from "./components/QuemSouEu/QuemSouEu";
import Senai from "./components/Senai/Senai";
import Sesi from "./components/Sesi/Sesi";
import ConteudoNatureza from "./components/Natureza/Conteudo";
import ConteudoLinguagens from "./components/Linguagens/Conteudo";
import ConteudoHumanas from "./components/Humanas/Conteudo";
import ConteudoMatematica from "./components/Matematica/Conteudo";
import Login from "./components/Login/Login";
import CadastroAtividadeSesi from "./components/Admin/CadastroAtividadeSesi/CadastroAtividadeSesi";
import CadastroAtividadeSenai from "./components/Admin/CadastroAtividadeSenai/CadastroAtividadeSenai";
import EditarAtividadeSesi from "./components/Admin/EditarAtividadeSesi/EditarAtividadeSesi";
import EditarAtividadeSenai from "./components/Admin/EditarAtividadeSenai/EditarAtividadeSenai";
import EditarQuemSouEu from "./components/Admin/EditarQuemSouEu/EditarQuemSouEu";
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
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/atividades/nova/sesi"
          element={<CadastroAtividadeSesi />}
        />
        <Route
          path="/admin/atividades/nova/senai"
          element={<CadastroAtividadeSenai />}
        />
        <Route
          path="/admin/atividades/editar/sesi"
          element={<EditarAtividadeSesi />}
        />
        <Route
          path="/admin/atividades/editar/senai"
          element={<EditarAtividadeSenai />}
        />
        <Route
          path="/admin/quemSouEu"
          element={<EditarQuemSouEu />}
        />
      </Routes>
    </div>
  );
}

export default App;
