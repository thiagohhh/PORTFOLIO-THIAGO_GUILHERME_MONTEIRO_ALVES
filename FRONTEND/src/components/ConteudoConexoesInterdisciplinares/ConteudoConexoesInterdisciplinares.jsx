import "./ConteudoConexoesInterdisciplinares.css";

const ConteudoConexoesInterdisciplinares = () => {
  return (
    <div className="conteudo-conexoes">
      <div className="mapa-conexoes">
        <div className="linha-disciplinas">
          <div className="no-conexao">Física</div>
          <div className="no-conexao">Português</div>
        </div>
        <div className="no-conexao destaque-conexao">Matemática</div>
        <div className="linha-disciplinas">
          <div className="no-conexao">Geografia</div>
          <div className="no-conexao">História</div>
        </div>
      </div>

      <article className="cartao-conexoes">
        <h2>Relações interdisciplinares</h2>
        <div className="linhas-conexoes">
          <span />
          <span />
        </div>
      </article>
    </div>
  );
};

export default ConteudoConexoesInterdisciplinares;
