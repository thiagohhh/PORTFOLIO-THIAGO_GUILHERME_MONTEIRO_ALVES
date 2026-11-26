import { useEffect, useState } from "react";
import "./ConteudoGaleria.css";
import { API, mediaUrl } from "../../config.js";

const ConteudoGaleria = () => {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [imagemAmpliada, setImagemAmpliada] = useState(null);

  useEffect(() => {
    async function buscar() {
      try {
        const resposta = await fetch(`${API}/senai/galeria`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const dados = await resposta.json();
        setItens(Array.isArray(dados) ? dados : []);
      } catch (erro) {
        console.error(erro);
        setItens([]);
      } finally {
        setCarregando(false);
      }
    }
    buscar();
  }, []);

  if (carregando) return <p>Carregando galeria...</p>;
  if (itens.length === 0) return <p>Nenhuma mídia cadastrada ainda.</p>;

  return (
    <>
      <div className="grade-senai-galeria">
        {itens.map((item) => (
          <article className="cartao-galeria" key={item.id}>
            <div className="area-midia">
              {item.arquivo ? (
                <button
                  type="button"
                  className="botao-imagem-galeria"
                  onClick={() =>
                    setImagemAmpliada({
                      src: mediaUrl(item.arquivo),
                      alt: item.titulo_midia || "Imagem da galeria",
                    })
                  }
                  aria-label={`Ampliar ${item.titulo_midia || "imagem"}`}
                >
                  <img
                    src={mediaUrl(item.arquivo)}
                    alt={item.titulo_midia || "Imagem da galeria"}
                  />
                  <span>Clique para ampliar</span>
                </button>
              ) : (
                "Mídia"
              )}
            </div>
            <h3>{item.titulo_midia}</h3>
            <p>{item.explicado_a_midia}</p>
          </article>
        ))}
      </div>

      {imagemAmpliada && (
        <div
          className="modal-imagem-galeria"
          role="dialog"
          aria-modal="true"
          aria-label="Imagem ampliada da galeria"
          onClick={() => setImagemAmpliada(null)}
        >
          <button
            type="button"
            className="fechar-modal-galeria"
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
    </>
  );
};

export default ConteudoGaleria;
