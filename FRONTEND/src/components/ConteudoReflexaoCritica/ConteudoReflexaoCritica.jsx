import "./ConteudoReflexaoCritica.css";

const ConteudoReflexaoCritica = () => {
  return (
    <div className="conteudo-reflexao-critica">
      <article className="cartao-reflexao">
        <h2>Aprendizado acadêmico</h2>
        <div className="linhas-reflexao">
          <span />
          <span />
        </div>
      </article>

      <article className="cartao-reflexao">
        <h2>Aplicação prática</h2>
        <div className="linhas-reflexao">
          <span />
          <span />
        </div>
      </article>

      <article className="cartao-reflexao">
        <h2>Melhorias necessárias</h2>
        <div className="linhas-reflexao">
          <span />
          <span />
        </div>
      </article>

      <article className="cartao-reflexao">
        <h2>Momentos desafiadores</h2>
        <div className="linhas-reflexao">
          <span />
          <span />
        </div>
        <div className="etiquetas-reflexao">
          <span>Facilidades</span>
          <span>Desafios</span>
          <span>Aprendizados</span>
        </div>
      </article>
    </div>
  );
};

export default ConteudoReflexaoCritica;
