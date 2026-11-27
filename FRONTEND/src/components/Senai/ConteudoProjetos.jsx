import { useEffect, useState } from "react";
import "./ConteudoProjetos.css";
import { API, mediaUrl } from "../../config.js";
import { projetosDoRepositorio } from "./conteudoRepositorio.js";

const ConteudoProjetos = () => {
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [imagemAmpliada, setImagemAmpliada] = useState(null);\n  const [busca, setBusca] = useState("");

  // Imagens locais do frontend devem usar a própria URL do site, não a API do backend.
  const urlImagem = (foto) => foto?.startsWith("/images/senai/") ? foto : mediaUrl(foto);

  useEffect(() => {
    async function buscar() {
      try {
        const respostaProjetos = await fetch(`${API}/senai/projetos`);
        if (!respostaProjetos.ok) throw new Error(`Falha ao carregar projetos: ${respostaProjetos.status}`);
        const dados = await respostaProjetos.json();
        const cadastrados = Array.isArray(dados)
          ? dados
          : dados.projetos || [];
        // Mantém os projetos cadastrados e complementa com os registros do repositório.
        const comFoto = cadastrados.filter((item) => item.foto || item.url_foto);
        const chaves = new Set(comFoto.map((item) =>
          (item.titulo_projeto || "").trim().toLowerCase() + "|" +
          (item.unidade_curricular || "").trim().toLowerCase()
        ));
        const complementares = projetosDoRepositorio.filter((item) =>
          !chaves.has(item.titulo_projeto.toLowerCase() + "|" + item.unidade_curricular.toLowerCase())
        );
        setProjetos([...comFoto, ...complementares]);
      } catch (erro) {
        console.error("Não foi possível consultar os projetos do servidor; exibindo os do repositório.", erro);
        setProjetos(projetosDoRepositorio);
      } finally {
        setCarregando(false);
      }
    }
    buscar();
  }, []);

  if (carregando) return <p className="carregando-projetos">Carregando projetos...</p>;
  const projetosFiltrados = projetos.filter((projeto) => [projeto.titulo_projeto, projeto.texto_card, projeto.unidade_curricular, ...(Array.isArray(projeto.etiquetas) ? projeto.etiquetas : [])].filter(Boolean).join(" ").toLowerCase().includes(busca.trim().toLowerCase()));\n  if (projetos.length === 0) return <p className="sem-projetos">Nenhum projeto com imagem cadastrado ainda.</p>;

  return (
    <>
      <div className="grade-senai-projetos">
        {projetos.map((projeto) => {
          const foto = projeto.foto || projeto.url_foto;
          return (
            <article className="cartao-senai-projeto" key={projeto.id || projeto.titulo_projeto}>
              {foto && (
                <div className="placeholder-projeto">
                  <button type="button" className="botao-imagem-projeto"
                    onClick={() => setImagemAmpliada({
                      src: urlImagem(foto),
                      alt: projeto.titulo_projeto || "Imagem do projeto",
                    })}
                    aria-label={`Ampliar imagem de ${projeto.titulo_projeto || "projeto"}`}>
                    <img src={urlImagem(foto)} alt={projeto.titulo_projeto || "Imagem do projeto"}
                      loading="lazy" onError={(evento) => { const img = evento.currentTarget; if (img.src.includes("raw.githubusercontent.com/thiagohhh/classrom/main/")) { img.onerror = null; img.src = img.src.replace("raw.githubusercontent.com/thiagohhh/classrom/main/", "cdn.jsdelivr.net/gh/thiagohhh/classrom@main/"); } }} />
                    <span className="dica-ampliar-imagem">Clique para ampliar</span>
                  </button>
                </div>
              )}
              <h3>{projeto.titulo_projeto}</h3>
              <p>{projeto.texto_card || "Sem descrição"}</p>
              <div className="detalhes-projeto"><span>{projeto.unidade_curricular || "Projeto"}</span></div>
              {Array.isArray(projeto.etiquetas) && projeto.etiquetas.length > 0 && (
                <div className="etiquetas-projeto" aria-label="Tecnologias do projeto">
                  {projeto.etiquetas.map((etiqueta, indice) => (
                    <span className="etiqueta-projeto" key={`${projeto.id || projeto.titulo_projeto}-${indice}`}>
                      {etiqueta}
                    </span>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>
      {imagemAmpliada && (
        <div className="modal-imagem-projeto" role="dialog" aria-modal="true"
          aria-label="Imagem ampliada do projeto" onClick={() => setImagemAmpliada(null)}>
          <button type="button" className="fechar-modal-imagem"
            onClick={() => setImagemAmpliada(null)} aria-label="Fechar imagem ampliada">×</button>
          <img src={imagemAmpliada.src} alt={imagemAmpliada.alt}
            onClick={(evento) => evento.stopPropagation()} />
        </div>
      )}
    </>
  );
};

export default ConteudoProjetos;
