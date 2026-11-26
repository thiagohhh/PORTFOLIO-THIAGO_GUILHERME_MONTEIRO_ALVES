import { useEffect, useState } from "react";
import "./ConteudoGaleria.css";
import { API, mediaUrl } from "../../config.js";
import { imagensDoRepositorio } from "./conteudoRepositorio.js";

const urlImagem = (value) => mediaUrl(value);

const ConteudoGaleria = () => {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [imagemAmpliada, setImagemAmpliada] = useState(null);

  useEffect(() => {
    let ativo = true;
    async function buscar() {
      try {
        const resposta = await fetch(`${API}/senai/galeria`);
        if (!resposta.ok) throw new Error(`Falha ao carregar galeria: ${resposta.status}`);
        const dados = await resposta.json();
        const cadastrados = Array.isArray(dados)
          ? dados
          : dados.galeria || dados.midias || dados.itens || [];
        const chaves = new Set(cadastrados.map((item) =>
          (item.titulo_midia || "").trim().toLowerCase() + "|" +
          (item.unidade_curricular || "").trim().toLowerCase()
        ));
        const complementares = imagensDoRepositorio.filter((item) =>
          !chaves.has(item.titulo_midia.toLowerCase() + "|" + item.unidade_curricular.toLowerCase())
        );
        if (ativo) setItens([...cadastrados, ...complementares]);
      } catch (erro) {
        console.error("Não foi possível consultar a galeria do servidor; exibindo imagens do repositório.", erro);
        if (ativo) setItens(imagensDoRepositorio);
      } finally {
        if (ativo) setCarregando(false);
      }
    }
    buscar();
    return () => { ativo = false; };
  }, []);

  const abrirImagem = (item) => {
    const arquivo = item.arquivo || item.url_arquivo;
    if (arquivo) setImagemAmpliada({ src: urlImagem(arquivo), alt: item.titulo_midia || "Imagem da galeria" });
  };

  const tratarErroImagem = (evento) => {
    const img = evento.currentTarget;
    const atual = img.src;
    if (atual.includes("raw.githubusercontent.com/thiagohhh/classrom/main/")) {
      img.src = atual.replace(
        "raw.githubusercontent.com/thiagohhh/classrom/main/",
        "cdn.jsdelivr.net/gh/thiagohhh/classrom@main/"
      );
      return;
    }
    if (atual.includes("cdn.jsdelivr.net/gh/thiagohhh/classrom@main/")) {
      img.onerror = null;
      img.closest(".area-midia")?.classList.add("imagem-indisponivel");
      img.remove();
    }
  };

  if (carregando) return <p>Carregando galeria...</p>;
  if (itens.length === 0) return <p>Nenhuma mídia cadastrada ainda.</p>;

  return (
    <>
      <div className="grade-senai-galeria">
        {itens.map((item) => {
          const arquivo = item.arquivo || item.url_arquivo;
          return (
            <article className="cartao-galeria" key={item.id || item.titulo_midia}>
              <div className="area-midia">
                {arquivo ? (
                  <button type="button" className="botao-imagem-galeria"
                    onClick={() => abrirImagem(item)}
                    aria-label={`Ampliar ${item.titulo_midia || "imagem"}`}>
                    <img src={urlImagem(arquivo)} alt={item.titulo_midia || "Imagem da galeria"}
                      loading="lazy" onError={tratarErroImagem} />
                    <span>Clique para ampliar</span>
                  </button>
                ) : "Mídia"}
              </div>
              <h3>{item.titulo_midia}</h3>
              <p>{item.explicado_a_midia || ""}</p>
            </article>
          );
        })}
      </div>
      {imagemAmpliada && (
        <div className="modal-imagem-galeria" role="dialog" aria-modal="true"
          aria-label="Imagem ampliada da galeria" onClick={() => setImagemAmpliada(null)}>
          <button type="button" className="fechar-modal-galeria"
            onClick={() => setImagemAmpliada(null)} aria-label="Fechar imagem ampliada">×</button>
          <img src={imagemAmpliada.src} alt={imagemAmpliada.alt}
            onError={(evento) => {
              const img = evento.currentTarget;
              if (img.src.includes("raw.githubusercontent.com/thiagohhh/classrom/main/")) {
                img.src = img.src.replace("raw.githubusercontent.com/thiagohhh/classrom/main/", "cdn.jsdelivr.net/gh/thiagohhh/classrom@main/");
              }
            }}
            onClick={(evento) => evento.stopPropagation()} />
        </div>
      )}
    </>
  );
};

export default ConteudoGaleria;
