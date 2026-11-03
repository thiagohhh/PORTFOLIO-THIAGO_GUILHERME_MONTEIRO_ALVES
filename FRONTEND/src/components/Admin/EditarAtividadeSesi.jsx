


import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Rodape from "../layout/Rodape";
import { chamarApi } from "../../api";

import estrelaAmarela from "../../assets/imgs/senai/estrela-amarela.png";
import estrelaBranca from "../../assets/imgs/senai/estrela-branca.png";
import iconeProjeto from "../../assets/imgs/senai/icone-projeto.svg";
import usuario from "../../assets/imgs/user-solid-full.svg";
import livro from "../../assets/imgs/book-solid-full.svg";
import enivar from "../../assets/imgs/paper-plane-solid-full.svg";
import Header from "../layout/Header"

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
    estadoInicial.secao || "Fundamentos teóricos",
  );
  const [bimestreAtivo, setBimestreAtivo] = useState(
    estadoInicial.bimestre ? Number(estadoInicial.bimestre) : 1,
  );
  const [idItem, setIdItem] = useState(
    estadoInicial.id != null ? String(estadoInicial.id) : "",
  );
  const [mensagem, setMensagem] = useState("");
  const [autoavaliacao, setAutoavaliacao] = useState(0);
  const [nomeArquivo, setNomeArquivo] = useState("");
  const [campos, setCampos] = useState({});
  const [carregandoDados, setCarregandoDados] = useState(false);

  // Só as seções bimestrais enviam bimestre; as reflexões anuais não têm esse campo.
  const ehSecaoAnual = secoesAnuais.includes(secaoAtiva);

  useEffect(() => {
    if (!idItem || !secaoAtiva) return;

    async function carregarItem() {
      setCarregandoDados(true);
      setMensagem("");
      try {
        const res = await chamarApi(rotas[secaoAtiva]);
        const dados = await res.json();
        const lista = Array.isArray(dados) ? dados : [];
        const item = lista.find((x) => String(x.id) === String(idItem));

        if (!item) {
          setMensagem("Nao achei essa atividade. Tenta de novo pelo Minhas atividades.");
          setCarregandoDados(false);
          return;
        }

        // Remove metadados do banco para preencher apenas os campos editáveis do formulário.
        const resto = { ...item };
        delete resto.id;
        delete resto.aluno_id;
        setCampos(resto);
        if (item.bimestre != null) setBimestreAtivo(Number(item.bimestre));
        if (item.autoavaliacao != null) setAutoavaliacao(Number(item.autoavaliacao));
      } catch {
        setMensagem("Deu erro ao carregar a atividade.");
      } finally {
        setCarregandoDados(false);
      }
    }

    carregarItem();
  }, [idItem, secaoAtiva]);

  function atualizarTexto(nomeDoCampo, valorDigitado) {
    setCampos({ ...campos, [nomeDoCampo]: valorDigitado });
  }

  function limparFormulario() {
    setIdItem("");
    setCampos({});
    setAutoavaliacao(0);
    setNomeArquivo("");
    setMensagem("");
  }
  async function salvarAlteracoes(evento) {
    evento.preventDefault();
    setMensagem("");

    if (!idItem) {
      setMensagem("Abra pelo botão Editar em Minhas atividades.");
      return;
    }

    const alunoId = localStorage.getItem("alunoId");
    const caminhoApi = `${rotas[secaoAtiva]}/${idItem}`;

    try {
      let resposta;

      // A imagem exige multipart; as outras seções são atualizadas como JSON.
      if (secaoAtiva === "Projetos e trabalhos") {
        const dadosForm = new FormData(evento.currentTarget);
        dadosForm.append("aluno_id", alunoId);
        dadosForm.append("bimestre", bimestreAtivo);

        resposta = await chamarApi(caminhoApi, {
          method: "PUT",
          body: dadosForm,
        });
      } else {
        const dadosJson = {
          aluno_id: alunoId,
          ...campos,
        };

        if (!ehSecaoAnual) {
          dadosJson.bimestre = bimestreAtivo;
        }
        if (secaoAtiva === "Participação em sala") {
          dadosJson.autoavaliacao = autoavaliacao;
        }

        resposta = await chamarApi(caminhoApi, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosJson),
        });
      }

      const resultado = await resposta.json();
      if (resposta.ok) {
        setMensagem("Alterações salvas!");
      } else {
        setMensagem(resultado.message || "Erro ao salvar");
      }
    } catch {
      setMensagem("Nao consegui falar com o servidor. Ele ta ligado?");
    }
  }

  return (
    <div className="pagina-admin-sesi">
            <Header/>

      <main className="conteudo-admin-sesi">
        <aside className="navegacao-admin-sesi">
          <Link
            className="item-navegacao-admin"
            to="/admin/atividades/nova/sesi"
          >
            <span className="icone-navegacao-admin">
              <img src={enivar} alt="" />
            </span>
            Enviar atividade
          </Link>
          <Link className="item-navegacao-admin" to="/admin/quemSouEu">
            <span className="icone-navegacao-admin">
              <img src={usuario} alt="" />
            </span>
            Quem sou eu
          </Link>
          <Link className="item-navegacao-admin" to="/admin/atividades">
            <span className="icone-navegacao-admin">
              <img src={livro} alt="" />
            </span>
            Minhas atividades
          </Link>
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
            <p>Editar · {secaoAtiva}</p>
            {!ehSecaoAnual && (
              <span className="subtitulo-bimestre-sesi">
                ↳ {bimestreAtivo}º bimestre
              </span>
            )}
          </header>

          <form
            className="formulario-cadastro-sesi"
            onSubmit={salvarAlteracoes}
          >
            <div className="grupo-selecao-admin">
              <p className="titulo-grupo">
                <span className="numero-etapa-admin">1</span>Instituição
              </p>
              <div className="opcoes-admin">
                <button className="opcao-admin selecionada" type="button">
                  Sesi
                </button>
                <Link
                  className="opcao-admin"
                  to="/admin/atividades/editar/senai"
                >
                  Senai
                </Link>
              </div>
            </div>

            <div className="grupo-selecao-admin">
              <p className="titulo-grupo">
                <span className="numero-etapa-admin">2</span>Seção
              </p>
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
            </div>

            {!ehSecaoAnual && (
              <div className="grupo-selecao-admin">
                <p className="titulo-grupo">
                  <span className="numero-etapa-admin">3</span>Bimestre
                </p>
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
              </div>
            )}

            <div className="bloco-conteudo-admin">
              <p className="titulo-grupo">
                <span className="numero-etapa-admin">
                  {ehSecaoAnual ? 3 : 4}
                </span>
                Conteúdo
              </p>

              {!idItem && (
                <p className="mensagem-admin">
                  Abra esta tela pelo botão <strong>Editar</strong> em Minhas
                  atividades.
                </p>
              )}

              {secaoAtiva === "Fundamentos teóricos" && (
                <>
                  <label className="campo-admin-sesi">
                    <span>Resumo teórico</span>
                    <textarea
                      placeholder="Escreva aqui..."
                      rows={2}
                      value={campos.resumo_teorico || ""}
                      onChange={(e) =>
                        atualizarTexto("resumo_teorico", e.target.value)
                      }
                    />
                  </label>
                  <label className="campo-admin-sesi">
                    <span>Teorias</span>
                    <input
                      type="text"
                      placeholder="Escreva aqui..."
                      value={campos.teorias || ""}
                      onChange={(e) =>
                        atualizarTexto("teorias", e.target.value)
                      }
                    />
                  </label>
                  <label className="campo-admin-sesi">
                    <span>Conceitos</span>
                    <input
                      type="text"
                      placeholder="Escreva aqui..."
                      value={campos.conceitos || ""}
                      onChange={(e) =>
                        atualizarTexto("conceitos", e.target.value)
                      }
                    />
                  </label>
                  <label className="campo-admin-sesi">
                    <span>Metodologias</span>
                    <input
                      type="text"
                      placeholder="Escreva aqui..."
                      value={campos.metodologias || ""}
                      onChange={(e) =>
                        atualizarTexto("metodologias", e.target.value)
                      }
                    />
                  </label>
                </>
              )}

              {secaoAtiva === "Participação em sala" && (
                <>
                  <label className="campo-admin-sesi">
                    <span>Registro das atividades</span>
                    <textarea
                      placeholder="Escreva aqui..."
                      rows={2}
                      value={campos.registro_atividades || ""}
                      onChange={(e) =>
                        atualizarTexto("registro_atividades", e.target.value)
                      }
                    />
                  </label>
                  <label className="campo-admin-sesi">
                    <span>O que chamou atenção</span>
                    <input
                      type="text"
                      placeholder="Escreva aqui..."
                      value={campos.o_que_chamou_atencao || ""}
                      onChange={(e) =>
                        atualizarTexto("o_que_chamou_atencao", e.target.value)
                      }
                    />
                  </label>
                  <label className="campo-admin-sesi">
                    <span>Reflexão prática</span>
                    <input
                      type="text"
                      placeholder="Escreva aqui..."
                      value={campos.reflexao_pratica || ""}
                      onChange={(e) =>
                        atualizarTexto("reflexao_pratica", e.target.value)
                      }
                    />
                  </label>
                  <label className="campo-admin-sesi">
                    <span>Justificativa da autoavaliação</span>
                    <textarea
                      placeholder="Escreva aqui..."
                      rows={2}
                      value={campos.justificativa_autoavaliacao || ""}
                      onChange={(e) =>
                        atualizarTexto(
                          "justificativa_autoavaliacao",
                          e.target.value,
                        )
                      }
                    />
                  </label>

                  <div className="avaliacao-cadastro-admin">
                    <p className="titulo-grupo">Autoavaliação</p>
                    <div className="estrelas-cadastro-admin">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          className="estrela-cadastro-admin"
                          onClick={() => setAutoavaliacao(n)}
                        >
                          <img
                            src={
                              n <= autoavaliacao
                                ? estrelaAmarela
                                : estrelaBranca
                            }
                            alt=""
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {secaoAtiva === "Projetos e trabalhos" && (
                <>
                  <label className="campo-admin-sesi">
                    <span>Título do projeto</span>
                    <input
                      type="text"
                      placeholder="Escreva aqui..."
                      value={campos.titulo_projeto || ""}
                      onChange={(e) =>
                        atualizarTexto("titulo_projeto", e.target.value)
                      }
                    />
                  </label>
                  <label className="campo-admin-sesi">
                    <span>Descrição do projeto</span>
                    <textarea
                      placeholder="Escreva aqui..."
                      rows={2}
                      value={campos.texto_card || ""}
                      onChange={(e) =>
                        atualizarTexto("texto_card", e.target.value)
                      }
                    />
                  </label>
                  <label className="campo-admin-sesi">
                    <span>Imagem ou evidência</span>
                    <div
                      className="area-arquivo-admin"
                      onClick={() =>
                        document.getElementById("foto-editar-sesi")?.click()
                      }
                    >
                      <img src={iconeProjeto} alt="" />
                      <strong>Clique para escolher uma imagem</strong>
                      <span>{nomeArquivo || "Nenhum arquivo selecionado"}</span>
                      <input
                        id="foto-editar-sesi"
                        name="foto"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                          setNomeArquivo(e.target.files?.[0]?.name || "")
                        }
                      />
                    </div>
                  </label>
                </>
              )}

              {secaoAtiva === "Reflexão crítica" && (
                <>
                  <label className="campo-admin-sesi">
                    <span>Aprendizado acadêmico</span>
                    <textarea
                      placeholder="Escreva aqui..."
                      rows={2}
                      value={campos.aprendizado_academico || ""}
                      onChange={(e) =>
                        atualizarTexto("aprendizado_academico", e.target.value)
                      }
                    />
                  </label>
                  <label className="campo-admin-sesi">
                    <span>Aplicação prática</span>
                    <input
                      type="text"
                      placeholder="Escreva aqui..."
                      value={campos.aplicacao_pratica || ""}
                      onChange={(e) =>
                        atualizarTexto("aplicacao_pratica", e.target.value)
                      }
                    />
                  </label>
                  <label className="campo-admin-sesi">
                    <span>Melhorias necessárias</span>
                    <input
                      type="text"
                      placeholder="Escreva aqui..."
                      value={campos.melhorias_necessarias || ""}
                      onChange={(e) =>
                        atualizarTexto("melhorias_necessarias", e.target.value)
                      }
                    />
                  </label>
                  <label className="campo-admin-sesi">
                    <span>Momentos desafiadores</span>
                    <input
                      type="text"
                      placeholder="Escreva aqui..."
                      value={campos.momentos_desafiadores || ""}
                      onChange={(e) =>
                        atualizarTexto("momentos_desafiadores", e.target.value)
                      }
                    />
                  </label>
                </>
              )}

              {secaoAtiva === "Conexões interdisciplinares" && (
                <label className="campo-admin-sesi">
                  <span>Relações interdisciplinares</span>
                  <textarea
                    placeholder="Escreva aqui..."
                    rows={3}
                    value={campos.relacoes_interdisciplinares || ""}
                    onChange={(e) =>
                      atualizarTexto(
                        "relacoes_interdisciplinares",
                        e.target.value,
                      )
                    }
                  />
                </label>
              )}

              {secaoAtiva === "Da escola para a vida" && (
                <>
                  <label className="campo-admin-sesi">
                    <span>Reflexão sobre a experiência</span>
                    <textarea
                      placeholder="Escreva aqui..."
                      rows={2}
                      value={campos.reflexao_experiencia || ""}
                      onChange={(e) =>
                        atualizarTexto("reflexao_experiencia", e.target.value)
                      }
                    />
                  </label>
                  <label className="campo-admin-sesi">
                    <span>Aplicação dos conhecimentos</span>
                    <input
                      type="text"
                      placeholder="Escreva aqui..."
                      value={campos.aplicacao_conhecimentos || ""}
                      onChange={(e) =>
                        atualizarTexto(
                          "aplicacao_conhecimentos",
                          e.target.value,
                        )
                      }
                    />
                  </label>
                  <label className="campo-admin-sesi">
                    <span>Como influenciou sua forma de agir e pensar</span>
                    <input
                      type="text"
                      placeholder="Escreva aqui..."
                      value={campos.influencia_forma_agir_pensar || ""}
                      onChange={(e) =>
                        atualizarTexto(
                          "influencia_forma_agir_pensar",
                          e.target.value,
                        )
                      }
                    />
                  </label>
                  <label className="campo-admin-sesi">
                    <span>Habilidades desenvolvidas</span>
                    <input
                      type="text"
                      placeholder="Escreva aqui..."
                      value={campos.habilidades_desenvolvidas || ""}
                      onChange={(e) =>
                        atualizarTexto(
                          "habilidades_desenvolvidas",
                          e.target.value,
                        )
                      }
                    />
                  </label>
                  <label className="campo-admin-sesi">
                    <span>Desafios para novas etapas</span>
                    <input
                      type="text"
                      placeholder="Escreva aqui..."
                      value={campos.desafios_novas_etapas || ""}
                      onChange={(e) =>
                        atualizarTexto("desafios_novas_etapas", e.target.value)
                      }
                    />
                  </label>
                </>
              )}

              <p className="destino-atividade-admin">
                Vai atualizar em: Sesi › {secaoAtiva}{" "}
                {!ehSecaoAnual && ` › ${bimestreAtivo}º bimestre`}
              </p>

              <div className="acoes-cadastro-admin">
                <button className="botao-enviar-admin" type="submit">
                  Salvar
                </button>
                <button
                  className="botao-cancelar-admin"
                  type="button"
                  onClick={limparFormulario}
                >
                  Cancelar
                </button>
              </div>

              {carregandoDados && <p>Carregando dados da atividade...</p>}
              {mensagem && <p className="mensagem-admin">{mensagem}</p>}
            </div>
          </form>
        </section>
      </main>

      <Rodape />
    </div>
  );
};

export default EditarAtividadeSesi;
