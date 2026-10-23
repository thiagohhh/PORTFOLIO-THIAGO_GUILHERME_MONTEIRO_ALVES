import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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
import MinhasAtividades from "./components/Admin/MinhasAtividades/MinhasAtividades";
import "./App.css";

const RotaProtegida = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  return token ? (
    children
  ) : (
    <Navigate to="/admin/login" replace state={{ from: location }} />
  );
};

function App() {
  return (
    <div className="container-principal">
      <Routes>
        <Route path="/" element={<QuemSouEu />} />
        <Route path="/Sesi" element={<Sesi />} />
        <Route path="/Sesi/conteudo/natureza" element={<ConteudoNatureza />} />
        <Route
          path="/Sesi/conteudo/linguagens"
          element={<ConteudoLinguagens />}
        />
        <Route path="/Sesi/conteudo/humanas" element={<ConteudoHumanas />} />
        <Route
          path="/Sesi/conteudo/matematica"
          element={<ConteudoMatematica />}
        />
        <Route path="/Senai" element={<Senai />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/atividades/nova/sesi"
          element={
            <RotaProtegida>
              <CadastroAtividadeSesi />
            </RotaProtegida>
          }
        />
        <Route
          path="/admin/atividades/nova/senai"
          element={
            <RotaProtegida>
              <CadastroAtividadeSenai />
            </RotaProtegida>
          }
        />
        <Route
          path="/admin/atividades/editar/sesi"
          element={
            <RotaProtegida>
              <EditarAtividadeSesi />
            </RotaProtegida>
          }
        />
        <Route
          path="/admin/atividades/editar/senai"
          element={
            <RotaProtegida>
              <EditarAtividadeSenai />
            </RotaProtegida>
          }
        />
        <Route
          path="/admin/atividades"
          element={
            <RotaProtegida>
              <MinhasAtividades />
            </RotaProtegida>
          }
        />
        <Route
          path="/admin/quemSouEu"
          element={
            <RotaProtegida>
              <EditarQuemSouEu />
            </RotaProtegida>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
