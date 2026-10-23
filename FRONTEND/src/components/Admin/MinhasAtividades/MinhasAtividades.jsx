import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rodape from "../../Rodape/Rodape";
import { chamarApi } from "../../../api";
import "./MinhasAtividades.css";

// rotas de listagem e exclusão
const fontes = [
  { tipo: "Senai · Projetos", listar: "/senai/projetos", apagar: "/senai/projetos", titulo: (i) => i.titulo_projeto },
  { tipo: "Senai · Códigos", listar: "/senai/codigos", apagar: "/senai/codigos", titulo: (i) => i.titulo_codigo },
  { tipo: "Senai · Galeria", listar: "/senai/galeria", apagar: "/senai/galeria", titulo: (i) => i.titulo_midia },
  { tipo: "Senai · Relatórios", listar: "/senai/relatorios", apagar: "/senai/relatorios", titulo: (i) => i.titulo_relatorio },
  { tipo: "Senai · Aprendizagens", listar: "/senai/aprendizagens", apagar: "/senai/aprendizagens", titulo: (i) => i.titulo_aprendizagem },
  { tipo: "Senai · Autoavaliação", listar: "/senai/autoavaliacoes", apagar: "/senai/autoavaliacoes", titulo: (i) => i.unidade_curricular },
  { tipo: "Sesi · Fundamentos", listar: "/sesi/fundamentosTeoricos", apagar: "/sesi/fundamentosTeoricos", titulo: (i) => "Fundamentos · " + (i.bimestre || "") + "º bim" },
  { tipo: "Sesi · Participação", listar: "/sesi/participacoesEmSala", apagar: "/sesi/participacoesEmSala", titulo: (i) => "Participação · " + (i.bimestre || "") + "º bim" },
  { tipo: "Sesi · Projetos", listar: "/sesi/projetosTrabalhos", apagar: "/sesi/projetosTrabalhos", titulo: (i) => i.titulo_projeto },
  { tipo: "Sesi · Reflexão crítica", listar: "/sesi/reflexoesCriticas", apagar: "/sesi/reflexoesCriticas", titulo: () => "Reflexão crítica" },
  { tipo: "Sesi · Conexões", listar: "/sesi/conexoesInterdisciplinares", apagar: "/sesi/conexoesInterdisciplinares", titulo: () => "Conexões interdisciplinares" },
  { tipo: "Sesi · Escola para a vida", listar: "/sesi/escolaParaVida", apagar: "/sesi/escolaParaVida", titulo: () => "Da escola para a vida" },
];

const MinhasAtividades = () => {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [recarregar, setRecarregar] = useState(0);   // novo: contador

  useEffect(() => {
    async function carregar() {
      // (sem setCarregando(true) aqui)
      const juntos = [];

      for (const fonte of fontes) {
        try {
          const resposta = await chamarApi(fonte.listar);
          const dados = await resposta.json();
          if (Array.isArray(dados)) {
            for (const item of dados) {
              juntos.push({
                id: item.id,
                tipo: fonte.tipo,
                titulo: fonte.titulo(item) || "Sem título",
                apagar: fonte.apagar + "/" + item.id,
                bimestre: item.bimestre || null,
              });
            }
          }
        } catch {
          // ignora
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
              <article className="card-minha-atividade" key={item.tipo + "-" + item.id}>
                <div className="info-minha-atividade">
                  <strong>{item.titulo}</strong>
                  <span>{item.tipo}</span>
                </div>
                <div className="acoes-minha-atividade">
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