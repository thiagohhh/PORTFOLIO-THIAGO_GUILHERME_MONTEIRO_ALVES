import { Link } from "react-router-dom";
import "./Sesi.css";

const Sesi = () => {
  return (
    <div className="sesi-container">
      <Link to="/" className="voltar">← Início</Link>
      
      <h2>Áreas do Conhecimento</h2>
      <p>Selecione uma área para gerenciar seu portfólio:</p>
      
      <div className="materias-caixa">
        <button className="card-area">
         Ciências Humanas
        </button>
        <button className="card-area">
          Matemática
        </button>
        <button className="card-area">
          Linguagens
        </button>
        <button className="card-area">
          Ciências da Natureza
        </button>
      </div>
    </div>
  );
};

export default Sesi;
