

import { useEffect, useState } from "react";
import "./ConteudoProjetos.css";
import { API, mediaUrl } from "../../config.js";

const ConteudoProjetos = () => {
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [imagemAmpliada, setImagemAmpliada] = useState(null);

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
              <button
                type="button"
                className="botao-imagem-projeto"
                onClick={() => setImagemAmpliada({
                  src: mediaUrl(projeto.foto),
                  alt: projeto.titulo_projeto || "Imagem do projeto",
                })}
                aria-label={`Ampliar imagem de ${projeto.titulo_projeto || "projeto"}`}
              >
                <img src={mediaUrl(projeto.foto)} alt={projeto.titulo_projeto || "Imagem do projeto"} />
                <span className="dica-ampliar-imagem">Clique para ampliar</span>
              </button>
            ) : (
              "Imagem do projeto"
            )}
          </div>
          <h3>{projeto.titulo_projeto}</h3>
          <p>{projeto.texto_card || "Sem descrição"}</p>
          <div className="detalhes-projeto">
            <span>{projeto.unidade_curricular || "Projeto"}</span>
          </div>
          {Array.isArray(projeto.etiquetas) && projeto.etiquetas.length > 0 && (
            <div className="etiquetas-projeto" aria-label="Tecnologias do projeto">
              {projeto.etiquetas.map((etiqueta, indice) => (
                <span className="etiqueta-projeto" key={`${projeto.id}-${indice}`}>
                  {etiqueta}
                </span>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
      {imagemAmpliada && (
        <div
          className="modal-imagem-projeto"
          role="dialog"
          aria-modal="true"
          aria-label="Imagem ampliada do projeto"
          onClick={() => setImagemAmpliada(null)}
        >
          <button
            type="button"
            className="fechar-modal-imagem"
            onClick={() => setImagemAmpliada(null)}
            aria-label="Fechar imagem ampliada"
          >
            ×
          </button>
          <img
            src={imagemAmpliada.src}
            alt={imagemAmpliada.alt}
            onClick={(evento) => evento.stopPropagation()}
          />
        </div>
      )}
  );
};

export default ConteudoProjetos;
