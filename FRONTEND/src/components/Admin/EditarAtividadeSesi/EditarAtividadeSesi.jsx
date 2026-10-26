import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Rodape from "../../Rodape/Rodape";
import { chamarApi } from "../../../api";
import estrelaAmarela from "../../../assets/imgs/senai/estrela-amarela.png";
import estrelaBranca from "../../../assets/imgs/senai/estrela-branca.png";
import iconeProjeto from "../../../assets/imgs/senai/icone-projeto.svg";
import "./EditarAtividadeSesi.css";

const secoes = [
  "Fundamentos teóricos",
  "Participação em sala",
  "Projetos e trabalhos",
  "Reflexão crítica",
  "Conexões interdisciplinares",
  "Da escola para a vida",
];

const secoesAnuais = [
  "Reflexão crítica",
  "Conexões interdisciplinares",
  "Da escola para a vida",
];

const rotas = {
  "Fundamentos teóricos": "/sesi/fundamentosTeoricos",
  "Participação em sala": "/sesi/participacoesEmSala",
  "Projetos e trabalhos": "/sesi/projetosTrabalhos",
  "Reflexão crítica": "/sesi/reflexoesCriticas",
  "Conexões interdisciplinares": "/sesi/conexoesInterdisciplinares",
  "Da escola para a vida": "/sesi/escolaParaVida",
};

const EditarAtividadeSesi = () => {
  const location = useLocation();
  const estadoInicial = location.state || {};

  const [secaoAtiva, setSecaoAtiva] = useState(
    estadoInicial.secao || "Fundamentos teóricos"
  );
  const [bimestreAtivo, setBimestreAtivo] = useState(
    estadoInicial.bimestre ? Number(estadoInicial.bimestre) : 1
  );
  const [idItem, setIdItem] = useState(
    estadoInicial.id != null ? String(estadoInicial.id) : ""
  );
  const [mensagem, setMensagem] = useState("");
  const [autoavaliacao, setAutoavaliacao] = useState(0);
  const [nomeArquivo, setNomeArquivo] = useState("");
  const [campos, setCampos] = useState({});

  // se veio de Minhas Atividades, garante id/seção preenchidos
  useEffect(() => {
    if (estadoInicial.id != null) setIdItem(String(estadoInicial.id));
    if (estadoInicial.secao) setSecaoAtiva(estadoInicial.secao);
    if (estadoInicial.bimestre) setBimestreAtivo(Number(estadoInicial.bimestre));
  }, [estadoInicial.id, estadoInicial.secao, estadoInicial.bimestre]);

  const ehSecaoAnual = secoesAnuais.includes(secaoAtiva);

  function atualizarCampo(nome, valor) {
    setCampos((antigos) => ({ ...antigos, [nome]: valor }));
  }

  function limpar() {
    setIdItem("");
    setCampos({});
    setAutoavaliacao(0);
    setNomeArquivo("");
    setMensagem("");
  }

  async function salvar(evento) {
    evento.preventDefault();
    setMensagem("");

    if (!idItem) {
      setMensagem("Abra pelo botão Editar em Minhas atividades.");
      return;
    }

    const alunoId = localStorage.getItem("alunoId");
    const caminho = `${rotas[secaoAtiva]}/${idItem}`;

    try {
      let resposta;

      if (secaoAtiva === "Projetos e trabalhos") {
        const dados = new FormData(evento.currentTarget);
        dados.append("aluno_id", alunoId);
        dados.append("bimestre", bimestreAtivo);

        resposta = await chamarApi(caminho, {
          method: "PUT",
          body: dados,
        });
      } else {
        const dados = {
          aluno_id: alunoId,
          ...campos,
        };

        if (!ehSecaoAnual) {
          dados.bimestre = bimestreAtivo;
        }
        if (secaoAtiva === "Participação em sala") {
          dados.autoavaliacao = autoavaliacao;
        }

        resposta = await chamarApi(caminho, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados),
        });
      }

      const resultado = await resposta.json();
      setMensagem(
        resposta.ok ? "Alterações salvas!" : resultado.message || "Erro ao salvar"
      );
    } catch {
      setMensagem("Não foi possível conectar ao servidor.");
    }
  }

  function CampoTexto({ nome, rotulo, linhas }) {
    if (linhas) {
      return (
        <label className="campo-admin-sesi">
          <span>{rotulo}</span>
          <textarea
            name={nome}
            rows={linhas}
            placeholder="Escreva aqui..."
            value={campos[nome] || ""}
            onChange={(e) => atualizarCampo(nome, e.target.value)}
          />
        </label>
      );
    }
    return (
      <label className="campo-admin-sesi">
        <span>{rotulo}</span>
        <input
          name={nome}
          type="text"
          placeholder="Escreva aqui..."
          value={campos[nome] || ""}
          onChange={(e) => atualizarCampo(nome, e.target.value)}
        />
      </label>
    );
  }

  function camposDaSecao() {
    if (secaoAtiva === "Fundamentos teóricos") {
      return (
        <>
          <CampoTexto nome="resumo_teorico" rotulo="Resumo teórico" linhas={2} />
          <CampoTexto nome="teorias" rotulo="Teorias" />
          <CampoTexto nome="conceitos" rotulo="Conceitos" />
          <CampoTexto nome="metodologias" rotulo="Metodologias" />
        </>
      );
    }

    if (secaoAtiva === "Participação em sala") {
      return (
        <>
          <CampoTexto nome="registro_atividades" rotulo="Registro das atividades" linhas={2} />
          <CampoTexto nome="o_que_chamou_atencao" rotulo="O que chamou atenção" />
          <CampoTexto nome="reflexao_pratica" rotulo="Reflexão prática" />
          <CampoTexto
            nome="justificativa_autoavaliacao"
            rotulo="Justificativa da autoavaliação"
            linhas={2}
          />
          <fieldset className="avaliacao-cadastro-admin">
            <legend>Autoavaliação</legend>
            <div className="estrelas-cadastro-admin">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  className="estrela-cadastro-admin"
                  onClick={() => setAutoavaliacao(n)}
                >
                  <img
                    src={n <= autoavaliacao ? estrelaAmarela : estrelaBranca}
                    alt=""
                  />
                </button>
              ))}
            </div>
          </fieldset>
        </>
      );
    }

    if (secaoAtiva === "Projetos e trabalhos") {
      return (
        <>
          <CampoTexto nome="titulo_projeto" rotulo="Título do projeto" />
          <CampoTexto nome="texto_card" rotulo="Descrição do projeto" linhas={2} />
          <label className="campo-admin-sesi">
            <span>Imagem ou evidência</span>
            <div
              className="area-arquivo-admin"
              onClick={() => document.getElementById("foto-editar-sesi")?.click()}
            >
              <img src={iconeProjeto} alt="" />
              <strong>Clique para escolher uma imagem</strong>
              <span>{nomeArquivo || "Nenhum arquivo selecionado"}</span>
              <input
                id="foto-editar-sesi"
                className="entrada-arquivo-admin"
                name="foto"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setNomeArquivo(e.target.files?.[0]?.name || "")}
              />
            </div>
          </label>
        </>
      );
    }

    if (secaoAtiva === "Reflexão crítica") {
      return (
        <>
          <CampoTexto nome="aprendizado_academico" rotulo="Aprendizado acadêmico" linhas={2} />
          <CampoTexto nome="aplicacao_pratica" rotulo="Aplicação prática" />
          <CampoTexto nome="melhorias_necessarias" rotulo="Melhorias necessárias" />
          <CampoTexto nome="momentos_desafiadores" rotulo="Momentos desafiadores" />
        </>
      );
    }

    if (secaoAtiva === "Conexões interdisciplinares") {
      return (
        <CampoTexto
          nome="relacoes_interdisciplinares"
          rotulo="Relações interdisciplinares"
          linhas={3}
        />
      );
    }

    if (secaoAtiva === "Da escola para a vida") {
      return (
        <>
          <CampoTexto nome="reflexao_experiencia" rotulo="Reflexão sobre a experiência" linhas={2} />
          <CampoTexto nome="aplicacao_conhecimentos" rotulo="Aplicação dos conhecimentos" />
          <CampoTexto
            nome="influencia_forma_agir_pensar"
            rotulo="Como influenciou sua forma de agir e pensar"
          />
          <CampoTexto nome="habilidades_desenvolvidas" rotulo="Habilidades desenvolvidas" />
          <CampoTexto nome="desafios_novas_etapas" rotulo="Desafios para novas etapas" />
        </>
      );
    }

    return null;
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
            Editar atividade
          </button>
          <Link
            className="item-navegacao-admin sair-admin"
            to="/admin/login"
            onClick={() => localStorage.removeItem("token")}
          >
            <span className="icone-navegacao-admin">↪</span>
            Sair
          </Link>
        </aside>

        <section className="area-cadastro-sesi">
          <header className="titulo-cadastro-sesi">
            <h1>
              Editar
              <br />
              <span>atividade</span>
            </h1>
            <p>
              Editar · {secaoAtiva}
              {!ehSecaoAnual && ` · ${bimestreAtivo}º bimestre`}
            </p>
          </header>

          <form className="formulario-cadastro-sesi" onSubmit={salvar}>
            <fieldset className="grupo-selecao-admin">
              <legend>
                <span className="numero-etapa-admin">1</span>Instituição
              </legend>
              <div className="opcoes-admin">
                <button className="opcao-admin selecionada" type="button">
                  Sesi
                </button>
                <Link className="opcao-admin" to="/admin/atividades/editar/senai">
                  Senai
                </Link>
              </div>
            </fieldset>

            <fieldset className="grupo-selecao-admin">
              <legend>
                <span className="numero-etapa-admin">2</span>Seção
              </legend>
              <div className="opcoes-admin opcoes-secoes-admin">
                {secoes.map((secao) => (
                  <button
                    key={secao}
                    type="button"
                    className={`opcao-admin ${secaoAtiva === secao ? "selecionada" : ""}`}
                    onClick={() => {
                      setSecaoAtiva(secao);
                      setMensagem("");
                      setCampos({});
                    }}
                  >
                    {secao}
                  </button>
                ))}
              </div>
            </fieldset>

            {!ehSecaoAnual && (
              <fieldset className="grupo-selecao-admin">
                <legend>
                  <span className="numero-etapa-admin">3</span>Bimestre
                </legend>
                <div className="opcoes-admin">
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`opcao-admin ${bimestreAtivo === n ? "selecionada" : ""}`}
                      onClick={() => setBimestreAtivo(n)}
                    >
                      {n}º bimestre
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <fieldset className="bloco-conteudo-admin">
              <legend>
                <span className="numero-etapa-admin">{ehSecaoAnual ? 3 : 4}</span>
                Conteúdo
              </legend>

              {/* ID vem automaticamente de Minhas Atividades — sem input */}
              {!idItem && (
                <p className="mensagem-admin">
                  Abra esta tela pelo botão <strong>Editar</strong> em Minhas atividades.
                </p>
              )}

              {camposDaSecao()}

              <p className="destino-atividade-admin">
                Vai atualizar em: Sesi › {secaoAtiva}
                {!ehSecaoAnual && ` › ${bimestreAtivo}º bimestre`}
              </p>

              <div className="acoes-cadastro-admin">
                <button className="botao-enviar-admin" type="submit">
                  Salvar
                </button>
                <button className="botao-cancelar-admin" type="button" onClick={limpar}>
                  Cancelar
                </button>
              </div>

              {mensagem && <p className="mensagem-admin">{mensagem}</p>}
            </fieldset>
          </form>
        </section>
      </main>

      <Rodape />
    </div>
  );
};

export default EditarAtividadeSesi;