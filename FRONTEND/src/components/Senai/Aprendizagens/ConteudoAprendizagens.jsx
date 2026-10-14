import "./ConteudoAprendizagens.css";
import estrelaAmarela from "../../../assets/imgs/senai/estrela-amarela.png";
import estrelaBranca from "../../../assets/imgs/senai/estrela-branca.png";

const aprendizagens = [
  { titulo: "Modelagem de dados", avaliacao: 4 },
  { titulo: "Criação de rotas da API", avaliacao: 5 },
  { titulo: "Interfaces responsivas", avaliacao: 3 },
];

const ConteudoAprendizagens = () => {
  return (
    <div className="lista-aprendizagens">
      {aprendizagens.map((aprendizagem) => (
        <article className="cartao-aprendizagem" key={aprendizagem.titulo}>
          <div>
            <h3>{aprendizagem.titulo}</h3>
            <p>Registre aqui o que foi aprendido e como foi aplicado.</p>
          </div>
          <div className="estrelas-aprendizagem" aria-label={`${aprendizagem.avaliacao} de 5 estrelas`}>
            {Array.from({ length: 5 }, (_, indice) => (
              <img
                key={indice}
                src={indice < aprendizagem.avaliacao ? estrelaAmarela : estrelaBranca}
                alt=""
              />
            ))}
          </div>
        </article>
      ))}
    </div>
  );
};

export default ConteudoAprendizagens;
