

import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import QuemSouEu from "./components/QuemSouEu";
import Senai from "./components/Senai/Senai";
import Sesi from "./components/Sesi/Sesi";
import ConteudoNatureza from "./components/Sesi/ConteudoNatureza";
import ConteudoLinguagens from "./components/Sesi/ConteudoLinguagens";
import ConteudoHumanas from "./components/Sesi/ConteudoHumanas";
import ConteudoMatematica from "./components/Sesi/ConteudoMatematica";
import Login from "./components/Admin/Login";
import CadastroAtividadeSesi from "./components/Admin/CadastroAtividadeSesi";
import CadastroAtividadeSenai from "./components/Admin/CadastroAtividadeSenai";
import EditarAtividadeSesi from "./components/Admin/EditarAtividadeSesi";
import EditarAtividadeSenai from "./components/Admin/EditarAtividadeSenai";
import EditarQuemSouEu from "./components/Admin/EditarQuemSouEu";
import MinhasAtividades from "./components/Admin/MinhasAtividades";
import IntroAnimacao from "./components/IntroAnimacao";
import "./App.css";

const RotaProtegida = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token"); 
  // Guarda a URL solicitada para que o login possa redirecionar de volta a ela.
  return token ? children : <Navigate to="/admin/login" replace state={{ from: location }} />;
};

function App() {
  return (
    <div className="container-principal">
      <IntroAnimacao />

      <Routes>
        <Route path="/" element={<QuemSouEu />} />

        <Route path="/Sesi" element={<Sesi />} />
        <Route path="/Senai" element={<Senai />} />

        <Route path="/Sesi/conteudo/natureza" element={<ConteudoNatureza />} />
        <Route path="/Sesi/conteudo/linguagens" element={<ConteudoLinguagens />} />
        <Route path="/Sesi/conteudo/humanas" element={<ConteudoHumanas />} />
        <Route path="/Sesi/conteudo/matematica" element={<ConteudoMatematica />} />

        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/atividades/nova/sesi" element={<RotaProtegida><CadastroAtividadeSesi /></RotaProtegida>} />
        <Route path="/admin/atividades/nova/senai" element={<RotaProtegida><CadastroAtividadeSenai /></RotaProtegida>} />
        <Route path="/admin/atividades/editar/sesi" element={<RotaProtegida><EditarAtividadeSesi /></RotaProtegida>} />
        <Route path="/admin/atividades/editar/senai" element={<RotaProtegida><EditarAtividadeSenai /></RotaProtegida>} />
        <Route path="/admin/quemSouEu" element={<RotaProtegida><EditarQuemSouEu /></RotaProtegida>} />
        <Route path="/admin/atividades" element={<RotaProtegida><MinhasAtividades /></RotaProtegida>} />
      </Routes>
    </div>
  );
}

export default App;
