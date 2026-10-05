import "./ConteudoParticipacao.css";

const ConteudoParticipacao = () => {
  return (
    <div className="conteudo-participacao">
      <article className="cartao-participacao">
        <h2>Registro de atividades</h2>
        <div className="linhas-participacao">
          <span />
          <span />
          <span />
        </div>
      </article>

      <article className="cartao-participacao">
        <h2>O que mais chamou minha atenção</h2>
        <div className="linhas-participacao">
          <span />
          <span />
          <span />
        </div>
      </article>

      <article className="cartao-participacao">
        <h2>Reflexão prática</h2>
        <h3>Conceito aprendido</h3>
        <div className="linhas-participacao">
          <span />
          <span />
        </div>
        <h3>Como uso no dia a dia</h3>
        <div className="linhas-participacao">
          <span />
          <span />
        </div>
      </article>

      <article className="cartao-participacao">
        <h2>Autoavaliação do engajamento</h2>
        <div className="avaliacao-engajamento" aria-label="Engajamento: 4 de 5">
          <span className="ponto-avaliacao marcado" />
          <span className="ponto-avaliacao marcado" />
          <span className="ponto-avaliacao marcado" />
          <span className="ponto-avaliacao marcado" />
          <span className="ponto-avaliacao" />
        </div>
        <div className="linhas-participacao">
          <span />
          <span />
        </div>
      </article>
    </div>
  );
};

export default ConteudoParticipacao;
