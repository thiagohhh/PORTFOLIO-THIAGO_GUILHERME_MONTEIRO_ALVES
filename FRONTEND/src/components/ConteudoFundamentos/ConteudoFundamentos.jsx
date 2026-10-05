import "./ConteudoFundamentos.css";

const ConteudoFundamentos = () => {
  return (
    <>
      <article className="resumo-conteudo">
        <h2>Resumo teórico</h2>
        <div className="linhas-anotacao" />
         <span />
          <span />
          <span/>
      </article>

      <div className="blocos-conteudo">
        <article className="bloco-conteudo">
          <h2>Teorias</h2>
          <div className="linhas-anotacao">
            <span />
            <span />
          </div>
        </article>

        <article className="bloco-conteudo">
          <h2>Conceitos</h2>
          <div className="linhas-anotacao">
            <span />
            <span />
          </div>
        </article>

        <article className="bloco-conteudo">
          <h2>Metodologias</h2>
          <div className="linhas-anotacao">
            <span />
            <span />
          </div>
        </article>
      </div>
    </>
  );
};

export default ConteudoFundamentos;
