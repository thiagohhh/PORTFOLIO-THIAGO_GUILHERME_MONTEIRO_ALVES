
import "./Disciplina.css";


const Disciplina = ({ onSelecionarArea }) => {
  return (
    <div className="disciplinas-container">
      <h2>Áreas do Conhecimento</h2>
      <p>Selecione uma área para gerenciar as 7 seções obrigatórias do seu portfólio:</p>
      
      <div className="disciplinas-grid">
        <button className="btn-disciplina" onClick={() => onSelecionarArea("Humanas")}>
          Humanas
        </button>
        <button className="btn-disciplina" onClick={() => onSelecionarArea("Matemática")}>
          Matemática
        </button>
        <button className="btn-disciplina" onClick={() => onSelecionarArea("Linguagens")}>
          Linguagens
        </button>
        <button className="btn-disciplina" onClick={() => onSelecionarArea("Ciências da Natureza")}>
          Ciências da Natureza
        </button>
      </div>
    </div>
  );
};

export default Disciplina;
