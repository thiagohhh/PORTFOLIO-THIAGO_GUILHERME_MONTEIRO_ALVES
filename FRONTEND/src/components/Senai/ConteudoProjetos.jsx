

import { useEffect, useState } from "react";
import "./ConteudoProjetos.css";
import { API } from "../../config.js";

const ConteudoProjetos = () => {
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch(`${API}/senai/projetos`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
       
        setProjetos(Array.isArray(dados) ? dados : dados.projetos || []);
      })
      .catch((erro) => {
        console.error("Erro ao buscar projetos:", erro);
        setProjetos([]);
      })
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) {
    return <p className="carregando-projetos">Carregando projetos...</p>;
  }

  if (projetos.length === 0) {
    return <p className="sem-projetos">Nenhum projeto cadastrado ainda.</p>;
  }

  return (
    <div className="grade-senai-projetos">
      {projetos.map((projeto) => (
        <article className="cartao-senai-projeto" key={projeto.id || projeto.titulo_projeto}>
          <div className="placeholder-projeto">
            {projeto.foto ? (
              <img
                src={`${API}/${projeto.foto}`}
                alt={projeto.titulo_projeto}
              />
            ) : (
              "Imagem do projeto"
            )}
          </div>
          <h3>{projeto.titulo_projeto}</h3>
          <p>{projeto.texto_card || "Sem descrição"}</p>
          <div className="detalhes-projeto">
            <span>{projeto.unidade_curricular || "Projeto"}</span>
            <span>Descrição</span>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ConteudoProjetos;
