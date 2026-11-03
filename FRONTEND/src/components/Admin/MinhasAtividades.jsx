


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rodape from "../layout/Rodape";
import { chamarApi } from "../../api";
import usuario from "../../assets/imgs/user-solid-full.svg";
import livro from "../../assets/imgs/book-solid-full.svg";
import enivar from "../../assets/imgs/paper-plane-solid-full.svg";
import Header from "../layout/Header";
import "./MinhasAtividades.css";


const fontes = [
  { tipo: "Senai · Projetos", listar: "/senai/projetos", apagar: "/senai/projetos", editarRota: "/admin/atividades/editar/senai", secao: "Projetos", instituicao: "Senai", titulo: (i) => i.titulo_projeto },
  { tipo: "Senai · Códigos", listar: "/senai/codigos", apagar: "/senai/codigos", editarRota: "/admin/atividades/editar/senai", secao: "Códigos", instituicao: "Senai", titulo: (i) => i.titulo_codigo },
  { tipo: "Senai · Galeria", listar: "/senai/galeria", apagar: "/senai/galeria", editarRota: "/admin/atividades/editar/senai", secao: "Galeria", instituicao: "Senai", titulo: (i) => i.titulo_midia },
  { tipo: "Senai · Relatórios", listar: "/senai/relatorios", apagar: "/senai/relatorios", editarRota: "/admin/atividades/editar/senai", secao: "Relatórios", instituicao: "Senai", titulo: (i) => i.titulo_relatorio },
  { tipo: "Senai · Aprendizagens", listar: "/senai/aprendizagens", apagar: "/senai/aprendizagens", editarRota: "/admin/atividades/editar/senai", secao: "Aprendizagens", instituicao: "Senai", titulo: (i) => i.titulo_aprendizagem },
  { tipo: "Senai · Autoavaliação", listar: "/senai/autoavaliacoes", apagar: "/senai/autoavaliacoes", editarRota: "/admin/atividades/editar/senai", secao: "Autoavaliação", instituicao: "Senai", titulo: (i) => i.unidade_curricular },
  { tipo: "Sesi · Fundamentos", listar: "/sesi/fundamentosTeoricos", apagar: "/sesi/fundamentosTeoricos", editarRota: "/admin/atividades/editar/sesi", secao: "Fundamentos teóricos", instituicao: "Sesi", titulo: (i) => "Fundamentos · " + (i.bimestre || "") + "º bim" },
  { tipo: "Sesi · Participação", listar: "/sesi/participacoesEmSala", apagar: "/sesi/participacoesEmSala", editarRota: "/admin/atividades/editar/sesi", secao: "Participação em sala", instituicao: "Sesi", titulo: (i) => "Participação · " + (i.bimestre || "") + "º bim" },
  { tipo: "Sesi · Projetos", listar: "/sesi/projetosTrabalhos", apagar: "/sesi/projetosTrabalhos", editarRota: "/admin/atividades/editar/sesi", secao: "Projetos e trabalhos", instituicao: "Sesi", titulo: (i) => i.titulo_projeto },
  { tipo: "Sesi · Reflexão crítica", listar: "/sesi/reflexoesCriticas", apagar: "/sesi/reflexoesCriticas", editarRota: "/admin/atividades/editar/sesi", secao: "Reflexão crítica", instituicao: "Sesi", titulo: () => "Reflexão crítica" },
  { tipo: "Sesi · Conexões", listar: "/sesi/conexoesInterdisciplinares", apagar: "/sesi/conexoesInterdisciplinares", editarRota: "/admin/atividades/editar/sesi", secao: "Conexões interdisciplinares", instituicao: "Sesi", titulo: () => "Conexões interdisciplinares" },
  { tipo: "Sesi · Escola para a vida", listar: "/sesi/escolaParaVida", apagar: "/sesi/escolaParaVida", editarRota: "/admin/atividades/editar/sesi", secao: "Da escola para a vida", instituicao: "Sesi", titulo: () => "Da escola para a vida" },
];


const SECOES_SENAI = ["Projetos", "Códigos", "Galeria", "Relatórios", "Aprendizagens", "Autoavaliação"];
const SECOES_SESI = [
  "Fundamentos teóricos",
  "Participação em sala",
  "Projetos e trabalhos",
  "Reflexão crítica",
  "Conexões interdisciplinares",
  "Da escola para a vida",
];

const AREAS_SESI = [
  "Matemática",
  "Linguagens",
  "Ciências da Natureza",
  "Ciências Humanas",
];

const MinhasAtividades = () => {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [recarregar, setRecarregar] = useState(0);

  const [instituicao, setInstituicao] = useState("Senai"); 
  const [filtroSecao, setFiltroSecao] = useState("Todas");
  const [filtroExtra, setFiltroExtra] = useState("Todos"); 
  const [filtroArea, setFiltroArea] = useState("Todas"); 

  useEffect(() => {
    async function carregar() {
      const juntos = [];

      // Cada tipo de atividade vem de uma rota diferente; falha em uma fonte não impede as demais.
      for (const fonte of fontes) {
        try {
          const resposta = await chamarApi(fonte.listar);
          const dados = await resposta.json();
          const lista = Array.isArray(dados) ? dados : [];

          for (const item of lista) {
            // Recupera a área de registros antigos a partir do texto ou do mapa salvo no cadastro.
            let areaItem = item.area || null;
            if (!areaItem && item.relacoes_interdisciplinares) {
              const m = String(item.relacoes_interdisciplinares).match(/Área:\s*(.+)/);
              if (m) areaItem = m[1].split("\n")[0].trim();
            }
            try {
              const mapa = JSON.parse(localStorage.getItem("mapaAreasSesi") || "{}");
              const chave = fonte.instituicao + "-" + fonte.secao + "-" + item.id;
              if (mapa[chave]) areaItem = mapa[chave];
            } catch (erro) {
              console.error("Não foi possível ler o mapa de áreas do SESI.", erro);
            }

            juntos.push({
              id: item.id,
              tipo: fonte.tipo,
              titulo: fonte.titulo(item) || "Sem título",
              apagar: fonte.apagar + "/" + item.id,
              editarRota: fonte.editarRota,
              secao: fonte.secao,
              instituicao: fonte.instituicao,
              bimestre: item.bimestre != null ? Number(item.bimestre) : null,
              unidade: item.unidade_curricular || item.unidade || null,
              area: areaItem,
            });
          }
        } catch (erro) {
          console.error(`Não foi possível carregar as atividades de ${fonte.tipo}.`, erro);
        }
      }

      setItens(juntos);
      setCarregando(false);
    }

    carregar();
  }, [recarregar]);

  async function excluir(item) {
    const ok = window.confirm("Excluir esta atividade? Não dá para desfazer.");
    if (!ok) return;

    try {
      const resposta = await chamarApi(item.apagar, { method: "DELETE" });
      if (resposta.ok || resposta.status === 204) {
        setMensagem("Atividade excluída.");
        setCarregando(true);
        setRecarregar((n) => n + 1);
      } else {
        setMensagem("Não foi possível excluir.");
      }
    } catch {
      setMensagem("Erro de conexão ao excluir.");
    }
  }

  function escolherInstituicao(nome) {
    setInstituicao(nome);
    setFiltroSecao("Todas");
    setFiltroExtra("Todos");
    setFiltroArea("Todas");
  }

  // Os filtros extras mudam conforme a instituição: SESI usa bimestre/área e SENAI usa unidade.
  const daInstituicao = itens.filter((i) => i.instituicao === instituicao);

  const secoesDaTela = instituicao === "Senai" ? SECOES_SENAI : SECOES_SESI;

  const unidadesEncontradas = [
    ...new Set(daInstituicao.map((i) => i.unidade).filter(Boolean)),
  ].sort();

  const itensFiltrados = daInstituicao.filter((item) => {
    if (filtroSecao !== "Todas" && item.secao !== filtroSecao) return false;

    if (instituicao === "Sesi" && filtroArea !== "Todas") {
      if (!item.area || item.area !== filtroArea) return false;
    }

    if (filtroExtra !== "Todos") {
      if (instituicao === "Sesi") {
        if (item.bimestre == null) return false;
        if (String(item.bimestre) !== String(filtroExtra)) return false;
      } else {
        if (!item.unidade || item.unidade !== filtroExtra) return false;
      }
    }
    return true;
  });

  const selo =
    instituicao === "Senai"
      ? "SENAI · POR SEÇÃO E UNIDADE CURRICULAR"
      : "SESI · POR SEÇÃO E BIMESTRE";

  return (
    <div className="pagina-admin-sesi">
      <Header />

      <main className="conteudo-admin-sesi">
        <aside className="navegacao-admin-sesi">
          <Link className="item-navegacao-senai" to="/admin/atividades/nova/sesi">
            <span className="icone-navegacao-senai">
              <img src={enivar} alt="" />
            </span>
            Enviar atividade
          </Link>

          <Link className="item-navegacao-senai" to="/admin/quemSouEu">
            <span className="icone-navegacao-senai">
              <img src={usuario} alt="" />
            </span>
            Quem sou eu
          </Link>

          <Link className="item-navegacao-senai ativo" to="/admin/atividades">
            <span className="icone-navegacao-senai">
              <img src={livro} alt="" />
            </span>
            Minhas atividades
          </Link>

          <Link
            className="item-navegacao-senai sair-admin-senai"
            to="/admin/login"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("alunoId");
            }}
          >
            <span className="icone-navegacao-senai">↪</span>
            Sair
          </Link>
        </aside>

        <section className="area-cadastro-sesi">
          <header className="titulo-cadastro-sesi">
            <h1>
              Minhas
              <br />
              <span>atividades</span>
            </h1>
            <p className="selo-instituicao">{selo}</p>
          </header>

          <div className="filtros-linha">
            <span className="filtros-label">Instituição</span>
            <div className="filtros-chips">
              <button
                type="button"
                className={"chip-filtro" + (instituicao === "Senai" ? " on" : "")}
                onClick={() => escolherInstituicao("Senai")}
              >
                SENAI
              </button>
              <button
                type="button"
                className={"chip-filtro" + (instituicao === "Sesi" ? " on" : "")}
                onClick={() => escolherInstituicao("Sesi")}
              >
                SESI
              </button>
            </div>
          </div>

          <div className="filtros-linha">
            <span className="filtros-label">Seção</span>
            <div className="filtros-chips">
              <button
                type="button"
                className={"chip-filtro" + (filtroSecao === "Todas" ? " on" : "")}
                onClick={() => setFiltroSecao("Todas")}
              >
                Todas
              </button>
              {secoesDaTela.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={"chip-filtro" + (filtroSecao === s ? " on" : "")}
                  onClick={() => setFiltroSecao(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {instituicao === "Sesi" && (
            <div className="filtros-linha">
              <span className="filtros-label">Área de conhecimento</span>
              <div className="filtros-chips">
                <button
                  type="button"
                  className={"chip-filtro" + (filtroArea === "Todas" ? " on" : "")}
                  onClick={() => setFiltroArea("Todas")}
                >
                  Todas
                </button>
                {AREAS_SESI.map((a) => (
                  <button
                    key={a}
                    type="button"
                    className={"chip-filtro" + (filtroArea === a ? " on" : "")}
                    onClick={() => setFiltroArea(a)}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="filtros-linha">
            <span className="filtros-label">
              {instituicao === "Senai" ? "Unidade curricular" : "Bimestre"}
            </span>
            <div className="filtros-chips">
              <button
                type="button"
                className={"chip-filtro" + (filtroExtra === "Todos" ? " on" : "")}
                onClick={() => setFiltroExtra("Todos")}
              >
                Todos
              </button>

              {instituicao === "Sesi" &&
                [1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={
                      "chip-filtro" + (String(filtroExtra) === String(n) ? " on" : "")
                    }
                    onClick={() => setFiltroExtra(String(n))}
                  >
                    {n}º bimestre
                  </button>
                ))}

              {instituicao === "Senai" &&
                unidadesEncontradas.map((u) => (
                  <button
                    key={u}
                    type="button"
                    className={"chip-filtro" + (filtroExtra === u ? " on" : "")}
                    onClick={() => setFiltroExtra(u)}
                  >
                    {u}
                  </button>
                ))}
            </div>
          </div>

          {mensagem && <p className="mensagem-admin">{mensagem}</p>}
          {carregando && <p>Carregando...</p>}

          {!carregando && daInstituicao.length === 0 && (
            <p>Nenhuma atividade publicada ainda nesta instituição.</p>
          )}

          {!carregando && daInstituicao.length > 0 && itensFiltrados.length === 0 && (
            <p>Nenhuma atividade com esses filtros.</p>
          )}

          <div className="lista-minhas-atividades">
            {itensFiltrados.map((item) => (
              <article
                className="card-minha-atividade"
                key={item.tipo + "-" + item.id}
              >
               
                <div className="thumb-atividade" aria-hidden="true">
                  {item.instituicao === "Senai" ? "SN" : "SE"}
                </div>

                <div className="info-minha-atividade">
                  <strong>{item.titulo}</strong>
                  <span className="meta-atividade">
                    {item.secao}
                    {item.area ? ` · ${item.area}` : ""}
                    {item.unidade ? ` · ${item.unidade}` : ""}
                    {item.bimestre != null ? ` · ${item.bimestre}º bimestre` : ""}
                    {!item.unidade && item.bimestre == null && !item.area && instituicao === "Sesi"
                      ? " · Anual"
                      : ""}
                  </span>

                  <div className="acoes-minha-atividade">
                    <Link
                      className="botao-editar-atividade"
                      to={item.editarRota}
                      state={{
                        id: item.id,
                        secao: item.secao,
                        bimestre: item.bimestre,
                      }}
                    >
                      Editar
                    </Link>

                    <button
                      type="button"
                      className="botao-excluir-atividade"
                      onClick={() => excluir(item)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Rodape />
    </div>
  );
};

export default MinhasAtividades;
