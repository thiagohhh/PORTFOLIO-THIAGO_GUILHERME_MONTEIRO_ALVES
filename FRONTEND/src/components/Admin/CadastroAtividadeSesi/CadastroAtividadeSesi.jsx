import { useState } from "react";
import { Link } from "react-router-dom";
import Rodape from "../../Rodape/Rodape";
import { chamarApi } from "../../../api";
import estrelaAmarela from "../../../assets/imgs/senai/estrela-amarela.png";
import estrelaBranca from "../../../assets/imgs/senai/estrela-branca.png";
import iconeProjeto from "../../../assets/imgs/senai/icone-projeto.svg";
import "./CadastroAtividadeSesi.css";

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

const areas = [
  "Ciências da Natureza",
  "Linguagens",
  "Ciências Humanas",
  "Matemática",
];

const materias = ["Física", "Português", "Geografia", "História", "Química"];

const rotas = {
  "Fundamentos teóricos": "/sesi/fundamentosTeoricos",
  "Participação em sala": "/sesi/participacoesEmSala",
  "Projetos e trabalhos": "/sesi/projetosTrabalhos",
  "Reflexão crítica": "/sesi/reflexoesCriticas",
  "Conexões interdisciplinares": "/sesi/conexoesInterdisciplinares",
  "Da escola para a vida": "/sesi/escolaParaVida",
};

function CampoTexto({ nome, rotulo, linhas, valor, aoMudar }) {
  if (linhas) {
    return (
      <label className="campo-admin-sesi">
        <span>{rotulo}</span>
        <textarea
          name={nome}
          rows={linhas}
          placeholder="Escreva aqui..."
          value={valor}
          onChange={(e) => aoMudar(nome, e.target.value)}
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
        value={valor}
        onChange={(e) => aoMudar(nome, e.target.value)}
      />
    </label>
  );
}

const CadastroAtividadeSesi = () => {
  const [secaoAtiva, setSecaoAtiva] = useState("Fundamentos teóricos");
  const [bimestreAtivo, setBimestreAtivo] = useState(1);
  const [areaAtiva, setAreaAtiva] = useState("Matemática");
  const [materiasEscolhidas, setMateriasEscolhidas] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [autoavaliacao, setAutoavaliacao] = useState(0);
  const [nomeArquivo, setNomeArquivo] = useState("");
  const [campos, setCampos] = useState({});
  const [enviando, setEnviando] = useState(false);

  const ehSecaoAnual = secoesAnuais.includes(secaoAtiva);

  function atualizarCampo(nome, valor) {
    setCampos((antigos) => ({ ...antigos, [nome]: valor }));
  }

  function clicarMateria(nome) {
    if (materiasEscolhidas.includes(nome)) {
      setMateriasEscolhidas(materiasEscolhidas.filter((m) => m !== nome));
    } else {
      setMateriasEscolhidas([...materiasEscolhidas, nome]);
    }
  }

  function limpar() {
    setCampos({});
    setAutoavaliacao(0);
    setNomeArquivo("");
    setMateriasEscolhidas([]);
  }

  async function enviar(evento) {
    evento.preventDefault();
    setMensagem("");

    const alunoId = Number(localStorage.getItem("alunoId"));
    const token = localStorage.getItem("token");

    if (!token || !alunoId || Number.isNaN(alunoId)) {
      setMensagem("Faça login antes de enviar.");
      return;
    }

    setEnviando(true);

    try {
      let resposta;

      if (secaoAtiva === "Projetos e trabalhos") {
        const dados = new FormData();
        dados.append("aluno_id", String(alunoId));
        dados.append("bimestre", String(bimestreAtivo));
        dados.append("titulo_projeto", campos.titulo_projeto || "");
        dados.append("texto_card", campos.texto_card || "");

        const inputFoto = document.getElementById("foto-sesi");
        if (inputFoto && inputFoto.files && inputFoto.files[0]) {
          dados.append("foto", inputFoto.files[0]);
        }

        resposta = await chamarApi(rotas[secaoAtiva], {
          method: "POST",
          body: dados,
        });
      } else if (secaoAtiva === "Conexões interdisciplinares") {
        const texto =
          "Área: " +
          areaAtiva +
          "\nMatérias: " +
          (materiasEscolhidas.join(", ") || "nenhuma") +
          "\n" +
          (campos.relacoes_interdisciplinares || "");

        resposta = await chamarApi(rotas[secaoAtiva], {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            aluno_id: alunoId,
            relacoes_interdisciplinares: texto,
          }),
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

        resposta = await chamarApi(rotas[secaoAtiva], {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados),
        });
      }

      const resultado = await resposta.json().catch(() => ({}));

      if (resposta.ok) {
        setMensagem("Atividade enviada!");
        limpar();
      } else {
        setMensagem(resultado.message || "Erro ao enviar");
      }
    } catch {
      setMensagem("Não foi possível conectar ao servidor.");
    } finally {
      setEnviando(false);
    }
  }

  function camposDaSecao() {
    if (secaoAtiva === "Fundamentos teóricos") {
      return (
        <>
          <CampoTexto
            nome="resumo_teorico"
            rotulo="Resumo teórico"
            linhas={2}
            valor={campos.resumo_teorico || ""}
            aoMudar={atualizarCampo}
          />
          <CampoTexto
            nome="teorias"
            rotulo="Teorias"
            valor={campos.teorias || ""}
            aoMudar={atualizarCampo}
          />
          <CampoTexto
            nome="conceitos"
            rotulo="Conceitos"
            valor={campos.conceitos || ""}
            aoMudar={atualizarCampo}
          />
          <CampoTexto
            nome="metodologias"
            rotulo="Metodologias"
            valor={campos.metodologias || ""}
            aoMudar={atualizarCampo}
          />
        </>
      );
    }

    if (secaoAtiva === "Participação em sala") {
      return (
        <>
          <CampoTexto
            nome="registro_atividades"
            rotulo="Registro das atividades"
            linhas={2}
            valor={campos.registro_atividades || ""}
            aoMudar={atualizarCampo}
          />
          <CampoTexto
            nome="o_que_chamou_atencao"
            rotulo="O que chamou atenção"
            valor={campos.o_que_chamou_atencao || ""}
            aoMudar={atualizarCampo}
          />
          <CampoTexto
            nome="reflexao_pratica"
            rotulo="Reflexão prática"
            valor={campos.reflexao_pratica || ""}
            aoMudar={atualizarCampo}
          />
          <CampoTexto
            nome="justificativa_autoavaliacao"
            rotulo="Justificativa da autoavaliação"
            linhas={2}
            valor={campos.justificativa_autoavaliacao || ""}
            aoMudar={atualizarCampo}
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
          <CampoTexto
            nome="titulo_projeto"
            rotulo="Título do projeto"
            valor={campos.titulo_projeto || ""}
            aoMudar={atualizarCampo}
          />
          <CampoTexto
            nome="texto_card"
            rotulo="Descrição do projeto"
            linhas={2}
            valor={campos.texto_card || ""}
            aoMudar={atualizarCampo}
          />
          <label className="campo-admin-sesi">
            <span>Imagem ou evidência</span>
            <div
              className="area-arquivo-admin"
              onClick={() => document.getElementById("foto-sesi")?.click()}
            >
              <img src={iconeProjeto} alt="" />
              <strong>Clique para escolher uma imagem</strong>
              <span>{nomeArquivo || "Nenhum arquivo selecionado"}</span>
              <input
                id="foto-sesi"
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
      );
    }

    if (secaoAtiva === "Reflexão crítica") {
      return (
        <>
          <CampoTexto
            nome="aprendizado_academico"
            rotulo="Aprendizado acadêmico"
            linhas={2}
            valor={campos.aprendizado_academico || ""}
            aoMudar={atualizarCampo}
          />
          <CampoTexto
            nome="aplicacao_pratica"
            rotulo="Aplicação prática"
            valor={campos.aplicacao_pratica || ""}
            aoMudar={atualizarCampo}
          />
          <CampoTexto
            nome="melhorias_necessarias"
            rotulo="Melhorias necessárias"
            valor={campos.melhorias_necessarias || ""}
            aoMudar={atualizarCampo}
          />
          <CampoTexto
            nome="momentos_desafiadores"
            rotulo="Momentos desafiadores"
            valor={campos.momentos_desafiadores || ""}
            aoMudar={atualizarCampo}
          />
        </>
      );
    }

    if (secaoAtiva === "Conexões interdisciplinares") {
      return (
        <>
          <p style={{ marginBottom: 12 }}>
            Bolinha do meio = área escolhida. Clique nas matérias que se
            conectam com ela:
          </p>

          <div className="opcoes-admin" style={{ marginBottom: 16 }}>
            <button type="button" className="opcao-admin selecionada">
              {areaAtiva}
            </button>

            {materias.map((m) => (
              <button
                key={m}
                type="button"
                className={
                  "opcao-admin " +
                  (materiasEscolhidas.includes(m) ? "selecionada" : "")
                }
                onClick={() => clicarMateria(m)}
              >
                {m}
              </button>
            ))}
          </div>

          <CampoTexto
            nome="relacoes_interdisciplinares"
            rotulo="Explique as relações"
            linhas={3}
            valor={campos.relacoes_interdisciplinares || ""}
            aoMudar={atualizarCampo}
          />
        </>
      );
    }

    if (secaoAtiva === "Da escola para a vida") {
      return (
        <>
          <CampoTexto
            nome="reflexao_experiencia"
            rotulo="Reflexão sobre a experiência"
            linhas={2}
            valor={campos.reflexao_experiencia || ""}
            aoMudar={atualizarCampo}
          />
          <CampoTexto
            nome="aplicacao_conhecimentos"
            rotulo="Aplicação dos conhecimentos"
            valor={campos.aplicacao_conhecimentos || ""}
            aoMudar={atualizarCampo}
          />
          <CampoTexto
            nome="influencia_forma_agir_pensar"
            rotulo="Como influenciou sua forma de agir e pensar"
            valor={campos.influencia_forma_agir_pensar || ""}
            aoMudar={atualizarCampo}
          />
          <CampoTexto
            nome="habilidades_desenvolvidas"
            rotulo="Habilidades desenvolvidas"
            valor={campos.habilidades_desenvolvidas || ""}
            aoMudar={atualizarCampo}
          />
          <CampoTexto
            nome="desafios_novas_etapas"
            rotulo="Desafios para novas etapas"
            valor={campos.desafios_novas_etapas || ""}
            aoMudar={atualizarCampo}
          />
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
          <button className="item-navegacao-admin ativo" type="button">
            <span className="icone-navegacao-admin">+</span>
            Enviar atividade
          </button>
          <Link className="item-navegacao-senai" to="/admin/quemSouEu">
            <span className="icone-navegacao-senai">●</span> Quem sou eu
          </Link>
          <Link className="item-navegacao-admin" to="/admin/atividades">
            <span className="icone-navegacao-admin">≡</span>
            Minhas atividades
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
              Enviar
              <br />
              <span>atividade</span>
            </h1>
            <p>
              Nova atividade · {areaAtiva} · {secaoAtiva}
              {!ehSecaoAnual ? ` · ${bimestreAtivo}º bimestre` : ""}
            </p>
          </header>

          <form className="formulario-cadastro-sesi" onSubmit={enviar}>
            <fieldset className="grupo-selecao-admin">
              <legend>
                <span className="numero-etapa-admin">1</span>Instituição
              </legend>
              <div className="opcoes-admin">
                <button className="opcao-admin selecionada" type="button">
                  Sesi
                </button>
                <Link className="opcao-admin" to="/admin/atividades/nova/senai">
                  Senai
                </Link>
              </div>
            </fieldset>

            <fieldset className="grupo-selecao-admin">
              <legend>
                <span className="numero-etapa-admin">2</span>Área
              </legend>
              <div className="opcoes-admin">
                {areas.map((area) => (
                  <button
                    key={area}
                    type="button"
                    className={
                      "opcao-admin " + (areaAtiva === area ? "selecionada" : "")
                    }
                    onClick={() => setAreaAtiva(area)}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="grupo-selecao-admin">
              <legend>
                <span className="numero-etapa-admin">3</span>Seção
              </legend>
              <div className="opcoes-admin opcoes-secoes-admin">
                {secoes.map((secao) => (
                  <button
                    key={secao}
                    type="button"
                    className={
                      "opcao-admin " +
                      (secaoAtiva === secao ? "selecionada" : "")
                    }
                    onClick={() => {
                      setSecaoAtiva(secao);
                      setMensagem("");
                      setCampos({});
                      setMateriasEscolhidas([]);
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
                  <span className="numero-etapa-admin">4</span>Bimestre
                </legend>
                <div className="opcoes-admin">
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={
                        "opcao-admin " +
                        (bimestreAtivo === n ? "selecionada" : "")
                      }
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
                <span className="numero-etapa-admin">
                  {ehSecaoAnual ? 4 : 5}
                </span>
                Conteúdo
              </legend>

              {camposDaSecao()}

              <p className="destino-atividade-admin">
                Vai aparecer em: Sesi › {areaAtiva} › {secaoAtiva}
                {!ehSecaoAnual ? ` › ${bimestreAtivo}º bimestre` : ""}
              </p>

              <div className="acoes-cadastro-admin">
                <button
                  className="botao-enviar-admin"
                  type="submit"
                  disabled={enviando}
                >
                  {enviando ? "Enviando..." : "Enviar"}
                </button>
                <button
                  className="botao-cancelar-admin"
                  type="button"
                  onClick={() => {
                    limpar();
                    setMensagem("");
                  }}
                >
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

export default CadastroAtividadeSesi;
