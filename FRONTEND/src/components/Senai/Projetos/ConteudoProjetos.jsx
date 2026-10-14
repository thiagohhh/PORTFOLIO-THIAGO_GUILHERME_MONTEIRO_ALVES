import "./ConteudoProjetos.css";

const projetos = ["Projeto 01", "Projeto 02", "Projeto 03"];

const ConteudoProjetos = () => {
  return (
    <div className="grade-senai-projetos">
      {projetos.map((projeto) => (
        <article className="cartao-senai-projeto" key={projeto}>
          <div className="placeholder-projeto">Imagem do projeto</div>
          <h3>{projeto}</h3>
          <p>Adicione uma breve descrição e a evidência deste projeto.</p>
          <div className="detalhes-projeto">
            <span>Projeto</span>
            <span>Descrição</span>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ConteudoProjetos;
