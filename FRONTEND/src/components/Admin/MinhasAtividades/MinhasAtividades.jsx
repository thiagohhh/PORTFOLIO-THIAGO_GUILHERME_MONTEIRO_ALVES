import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rodape from "../../Rodape/Rodape";
import { chamarApi } from "../../../api";
import "./MinhasAtividades.css";

// rotas de listagem, exclusão e edição
const fontes = [
  {
    tipo: "Senai · Projetos",
    listar: "/senai/projetos",
    apagar: "/senai/projetos",
    editarRota: "/admin/atividades/editar/senai",
    secao: "Projetos",
    titulo: (i) => i.titulo_projeto,
  },
  {
    tipo: "Senai · Códigos",
    listar: "/senai/codigos",
    apagar: "/senai/codigos",
    editarRota: "/admin/atividades/editar/senai",
    secao: "Códigos",
    titulo: (i) => i.titulo_codigo,
  },
  {
    tipo: "Senai · Galeria",
    listar: "/senai/galeria",
    apagar: "/senai/galeria",
    editarRota: "/admin/atividades/editar/senai",
    secao: "Galeria",
    titulo: (i) => i.titulo_midia,
  },
  {
    tipo: "Senai · Relatórios",
    listar: "/senai/relatorios",
    apagar: "/senai/relatorios",
    editarRota: "/admin/atividades/editar/senai",
    secao: "Relatórios",
    titulo: (i) => i.titulo_relatorio,
  },
  {
    tipo: "Senai · Aprendizagens",
    listar: "/senai/aprendizagens",
    apagar: "/senai/aprendizagens",
    editarRota: "/admin/atividades/editar/senai",
    secao: "Aprendizagens",
    titulo: (i) => i.titulo_aprendizagem,
  },
  {
    tipo: "Senai · Autoavaliação",
    listar: "/senai/autoavaliacoes",
    apagar: "/senai/autoavaliacoes",
    editarRota: "/admin/atividades/editar/senai",
    secao: "Autoavaliação",
    titulo: (i) => i.unidade_curricular,
  },
  {
    tipo: "Sesi · Fundamentos",
    listar: "/sesi/fundamentosTeoricos",
    apagar: "/sesi/fundamentosTeoricos",
    editarRota: "/admin/atividades/editar/sesi",
    secao: "Fundamentos teóricos",
    titulo: (i) => "Fundamentos · " + (i.bimestre || "") + "º bim",
  },
  {
    tipo: "Sesi · Participação",
    listar: "/sesi/participacoesEmSala",
    apagar: "/sesi/participacoesEmSala",
    editarRota: "/admin/atividades/editar/sesi",
    secao: "Participação em sala",
    titulo: (i) => "Participação · " + (i.bimestre || "") + "º bim",
  },
  {
    tipo: "Sesi · Projetos",
    listar: "/sesi/projetosTrabalhos",
    apagar: "/sesi/projetosTrabalhos",
    editarRota: "/admin/atividades/editar/sesi",
    secao: "Projetos e trabalhos",
    titulo: (i) => i.titulo_projeto,
  },
  {
    tipo: "Sesi · Reflexão crítica",
    listar: "/sesi/reflexoesCriticas",
    apagar: "/sesi/reflexoesCriticas",
    editarRota: "/admin/atividades/editar/sesi",
    secao: "Reflexão crítica",
    titulo: () => "Reflexão crítica",
  },
  {
    tipo: "Sesi · Conexões",
    listar: "/sesi/conexoesInterdisciplinares",
    apagar: "/sesi/conexoesInterdisciplinares",
    editarRota: "/admin/atividades/editar/sesi",
    secao: "Conexões interdisciplinares",
    titulo: () => "Conexões interdisciplinares",
  },
  {
    tipo: "Sesi · Escola para a vida",
    listar: "/sesi/escolaParaVida",
    apagar: "/sesi/escolaParaVida",
    editarRota: "/admin/atividades/editar/sesi",
    secao: "Da escola para a vida",
    titulo: () => "Da escola para a vida",
  },
];

const MinhasAtividades = () => {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [recarregar, setRecarregar] = useState(0);

  useEffect(() => {
    async function carregar() {
      const juntos = [];

      for (const fonte of fontes) {
        try {
          const resposta = await chamarApi(fonte.listar);
          const dados = await resposta.json();
          const lista = Array.isArray(dados) ? dados : [];

          for (const item of lista) {
            juntos.push({
              id: item.id,
              tipo: fonte.tipo,
              titulo: fonte.titulo(item) || "Sem título",
              apagar: fonte.apagar + "/" + item.id,
              editarRota: fonte.editarRota,
              secao: fonte.secao,
              bimestre: item.bimestre || null,
            });
          }
        } catch {
          // ignora fonte que falhar
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

  return (
    <div className="pagina-admin-sesi">
      <header className="cabecalho-admin-sesi">
        <Link className="voltar-admin-sesi" to="/">
          ← Portfólio
        </Link>
        <span>Área do aluno</span>
      </header>

      <main className="conteudo-admin-sesi">
        <aside className="navegacao-admin-sesi">
          <Link className="item-navegacao-admin" to="/admin/atividades/nova/sesi">
            <span className="icone-navegacao-admin">+</span>
            Enviar atividade
          </Link>
          <button className="item-navegacao-admin ativo" type="button">
            <span className="icone-navegacao-admin">≡</span>
            Minhas atividades
          </button>
          <Link className="item-navegacao-admin" to="/admin/quemSouEu">
            <span className="icone-navegacao-admin">●</span>
            Quem sou eu
          </Link>
          <Link
            className="item-navegacao-admin sair-admin"
            to="/admin/login"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("alunoId");
            }}
          >
            <span className="icone-navegacao-admin">↪</span>
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
            <p>Sesi e Senai juntos</p>
          </header>

          {mensagem && <p className="mensagem-admin">{mensagem}</p>}
          {carregando && <p>Carregando...</p>}

          {!carregando && itens.length === 0 && (
            <p>Nenhuma atividade publicada ainda.</p>
          )}

          <div className="lista-minhas-atividades">
            {itens.map((item) => (
              <article
                className="card-minha-atividade"
                key={item.tipo + "-" + item.id}
              >
                <div className="info-minha-atividade">
                  <strong>{item.titulo}</strong>
                  <span>{item.tipo}</span>
                </div>

                <div className="acoes-minha-atividade">
                  {/* Editar: leva para a tela de edição com id e seção já preenchidos */}
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
