import { useEffect, useState } from "react";
import "./ConteudoProjetos.css";
import { API, mediaUrl } from "../../config.js";
import { projetosDoRepositorio, imagensDoRepositorio } from "./conteudoRepositorio.js";

const ConteudoProjetos = () => {
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [imagemAmpliada, setImagemAmpliada] = useState(null);

  // Imagens locais do frontend devem usar a própria URL do site, não a API do backend.
  const urlImagem = (foto) => foto?.startsWith("/images/senai/") ? foto : mediaUrl(foto);

  useEffect(() => {
    async function buscar() {
      try {
        const [respostaProjetos, respostaGaleria] = await Promise.all([
          fetch(`${API}/senai/projetos`),
          fetch(`${API}/senai/galeria`).catch(() => null),
        ]);
        if (!respostaProjetos.ok) throw new Error(`Falha ao carregar projetos: ${respostaProjetos.status}`);
        const dados = await respostaProjetos.json();
        const dadosGaleria = respostaGaleria?.ok ? await respostaGaleria.json() : [];
        const cadastrados = Array.isArray(dados)
          ? dados
          : dados.projetos || [];
        const comFoto = cadastrados.filter((item) => item.foto || item.url_foto);
        const chaves = new Set(comFoto.map((item) =>
          (item.titulo_projeto || "").trim().toLowerCase() + "|" +
          (item.unidade_curricular || "").trim().toLowerCase()
        ));
        const complementares = projetosDoRepositorio.filter((item) =>
          !chaves.has(item.titulo_projeto.toLowerCase() + "|" + item.unidade_curricular.toLowerCase())
        );
        // Imagens antigas da Galeria são exibidas dentro de Projetos, sem recadastro.
        const imagensGaleria = (Array.isArray(dadosGaleria) ? dadosGaleria : [])
          .filter((item) => (item.tipo_midia || 'Imagem') === 'Imagem' && (item.arquivo || item.url_arquivo))
          .map((item) => ({
            id: 'galeria-' + item.id,
            titulo_projeto: item.titulo_midia || 'Registro visual',
            texto_card: item.explicado_a_midia || '',
            unidade_curricular: item.unidade_curricular || 'Registro',
            foto: item.arquivo || item.url_arquivo,
            etiquetas: [],
          }));
        const imagensRepositorio = imagensDoRepositorio.map((item) => ({
          id: item.id,
          titulo_projeto: item.titulo_midia,
          texto_card: item.explicado_a_midia || "",
          unidade_curricular: item.unidade_curricular || "Registro",
          foto: item.arquivo,
          etiquetas: [],
        }));
        const titulosExistentes = new Set([...comFoto, ...imagensGaleria].map((p) => (p.titulo_projeto || "").trim().toLowerCase()));
        const imagensRepositorioFiltradas = imagensRepositorio.filter((p) => !titulosExistentes.has((p.titulo_projeto || "").trim().toLowerCase()));
        setProjetos([...comFoto, ...imagensGaleria, ...imagensRepositorioFiltradas, ...complementares]);
      } catch (erro) {
        console.error("Não foi possível consultar os projetos do servidor; exibindo os do repositório.", erro);
        const imagensFallback = imagensDoRepositorio.map((item) => ({
          id: item.id,
          titulo_projeto: item.titulo_midia,
          texto_card: item.explicado_a_midia || "",
          unidade_curricular: item.unidade_curricular || "Registro",
          foto: item.arquivo,
          etiquetas: [],
        }));
        setProjetos([...projetosDoRepositorio, ...imagensFallback]);
      } finally {
        setCarregando(false);
      }
    }
    buscar();
  }, []);

  if (carregando) return <p className="carregando-projetos">Carregando projetos...</p>;
  if (projetos.length === 0) return <p className="sem-projetos">Nenhum projeto com imagem cadastrado ainda.</p>;

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
                      loading="lazy" onError={(evento) => { const img = evento.currentTarget; if (img.src.includes("cdn.jsdelivr.net/gh/thiagohhh/classrom@main/")) { img.onerror = null; img.src = img.src.replace("cdn.jsdelivr.net/gh/thiagohhh/classrom@main/", "raw.githubusercontent.com/thiagohhh/classrom/main/"); } }} />
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
