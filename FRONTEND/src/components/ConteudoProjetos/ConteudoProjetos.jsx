import "./ConteudoProjetos.css";

const ConteudoProjetos = () => {
  return (
    <div className="conteudo-projetos">
      <article className="cartao-projeto">
        <div className="imagem-projeto">Foto ou evidência</div>
        <h2>Projeto 01</h2>
        <div className="linhas-projeto">
          <span />
          <span />
        </div>
        <div className="etiquetas-projeto">
          <span>Projeto</span>
          <span>Trabalho</span>
          <span>Evidência</span>
        </div>
      </article>

      <article className="cartao-projeto">
        <div className="imagem-projeto">Foto ou evidência</div>
        <h2>Projeto 02</h2>
        <div className="linhas-projeto">
          <span />
          <span />
        </div>
        <div className="etiquetas-projeto">
          <span>Projeto</span>
          <span>Trabalho</span>
          <span>Evidência</span>
        </div>
      </article>
    </div>
  );
};

export default ConteudoProjetos;
