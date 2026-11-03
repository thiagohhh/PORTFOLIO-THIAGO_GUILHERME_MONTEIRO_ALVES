


import { useState } from "react";
import { Link } from "react-router-dom";
import Rodape from "../layout/Rodape";
import { chamarApi } from "../../api";
import estrelaAmarela from "../../assets/imgs/senai/estrela-amarela.png";
import estrelaBranca from "../../assets/imgs/senai/estrela-branca.png";
import iconeProjeto from "../../assets/imgs/senai/icone-projeto.svg";
import usuario from "../../assets/imgs/user-solid-full.svg";
import livro from "../../assets/imgs/book-solid-full.svg";
import enivar from "../../assets/imgs/paper-plane-solid-full.svg";
import Header from "../layout/Header";
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
  const [inputMateria, setInputMateria] = useState(""); 
  const [mensagem, setMensagem] = useState("");
  const [autoavaliacao, setAutoavaliacao] = useState(0);
  const [nomeArquivo, setNomeArquivo] = useState("");
  const [campos, setCampos] = useState({});
  const [enviando, setEnviando] = useState(false);

  // Estas seções não pertencem a um bimestre; as outras incluem o bimestre no cadastro.
  const ehSecaoAnual = secoesAnuais.includes(secaoAtiva);

  function atualizarCampo(nome, valor) {
    setCampos((antigos) => ({ ...antigos, [nome]: valor }));
  }

  function adicionarMateria() {
    const texto = inputMateria.trim();
    if (!texto) return; 
    if (materiasEscolhidas.length >= 4) {
      setMensagem("Máximo de 4 matérias conectadas.");
      return;
    }
    if (materiasEscolhidas.some((m) => m.toLowerCase() === texto.toLowerCase())) {
      setMensagem("Essa matéria já foi adicionada.");
      return;
    }
    setMateriasEscolhidas([...materiasEscolhidas, texto]); 
    setInputMateria(""); 
    setMensagem("");
  }

  function removerMateria(nome) {
    setMateriasEscolhidas(materiasEscolhidas.filter((m) => m !== nome));
  }

  function limpar() {
    setCampos({});
    setAutoavaliacao(0);
    setNomeArquivo("");
    setMateriasEscolhidas([]);
    setInputMateria("");
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


    if (secaoAtiva === "Fundamentos teóricos") {
      if (!(campos.resumo_teorico || "").trim()) {
        setMensagem("Preenche o resumo teorico (obrigatorio).");
        return;
      }
    }
    if (secaoAtiva === "Participação em sala") {
      if (!(campos.registro_atividades || "").trim()) {
        setMensagem("Preenche o registro de atividades (obrigatorio).");
        return;
      }
    }
    // Projetos enviam foto em multipart; conexões guardam área e matérias no formato esperado pela API.
    if (secaoAtiva === "Projetos e trabalhos") {
      if (!(campos.titulo_projeto || "").trim()) {
        setMensagem("Preenche o titulo do projeto (obrigatorio).");
        return;
      }
    }
    if (secaoAtiva === "Conexões interdisciplinares") {
      if (!(campos.relacoes_interdisciplinares || "").trim() && materiasEscolhidas.length === 0) {
        setMensagem("Coloca pelo menos a explicacao ou uma materia conectada.");
        return;
      }
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
        try {
          const idNovo = resultado.id || resultado.data?.id;
          if (idNovo) {
            const mapa = JSON.parse(localStorage.getItem("mapaAreasSesi") || "{}");
            mapa["Sesi-" + secaoAtiva + "-" + idNovo] = areaAtiva;
            localStorage.setItem("mapaAreasSesi", JSON.stringify(mapa));
          }
        } catch (erro) {
          console.error("Não foi possível atualizar o mapa de áreas do SESI.", erro);
        }
        setMensagem("Atividade enviada!");
        limpar();
      } else {
        setMensagem(resultado.message || resultado.erro || "Nao deu pra enviar. Confere os campos obrigatorios.");
      }
    } catch {
      setMensagem("Nao consegui falar com o servidor. Ele ta ligado?");
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
                    src={n <= autoavaliacao ? estrelaAmarela : estrelaBranca}
                    alt=""
                  />
                </button>
              ))}
            </div>
          </div>
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
            Bolinha do meio = <strong>{areaAtiva}</strong>. Digite as matérias
            que se conectam com ela (máx. 4):
          </p>

          <div className="opcoes-admin" style={{ marginBottom: 12 }}>
            <button type="button" className="opcao-admin selecionada">
              {areaAtiva}
            </button>
          </div>

          <label className="campo-admin-sesi">
            <span>Matérias conectadas</span>
            <div className="linha-materia-conexao">
              <input
                type="text"
                placeholder="Digite e clique em Adicionar"
                value={inputMateria}
                onChange={(e) => setInputMateria(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    adicionarMateria();
                  }
                }}
              />
              <button
                type="button"
                className="botao-adicionar-materia"
                onClick={adicionarMateria}
              >
                Adicionar
              </button>
            </div>
          </label>

          {materiasEscolhidas.length > 0 && (
            <div className="lista-tags-materias">
              {materiasEscolhidas.map((m) => (
                <span key={m} className="tag-materia">
                  {m}
                  <button
                    type="button"
                    className="tag-materia-remover"
                    onClick={() => removerMateria(m)}
                    title="Remover"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

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
      <Header/>

      <main className="conteudo-admin-sesi">
        <aside className="navegacao-admin-sesi">
          <button className="item-navegacao-admin ativo" type="button">
            <span className="icone-navegacao-admin">
              <img src={enivar} alt="" />
            </span>
            Enviar atividade
          </button>
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
            <p>Enviar · {secaoAtiva}</p>

            {!ehSecaoAnual && (
              <span className="subtitulo-bimestre-sesi">
                ↳ {bimestreAtivo}º bimestre
              </span>
            )}
          </header>

          <form className="formulario-cadastro-sesi" onSubmit={enviar}>
            <div className="grupo-selecao-admin">
              <p className="titulo-grupo">
                <span className="numero-etapa-admin">1</span>Instituição
              </p>
              <div className="opcoes-admin">
                <button className="opcao-admin selecionada" type="button">
                  Sesi
                </button>
                <Link className="opcao-admin" to="/admin/atividades/nova/senai">
                  Senai
                </Link>
              </div>
            </div>

            <div className="grupo-selecao-admin">
              <p className="titulo-grupo">
                <span className="numero-etapa-admin">2</span>Área
              </p>
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
            </div>

            <div className="grupo-selecao-admin">
              <p className="titulo-grupo">
                <span className="numero-etapa-admin">3</span>Seção
              </p>
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
            </div>

            {!ehSecaoAnual && (
              <div className="grupo-selecao-admin">
                <p className="titulo-grupo">
                  <span className="numero-etapa-admin">4</span>Bimestre
                </p>
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
              </div>
            )}

            <div className="bloco-conteudo-admin">
              <p className="titulo-grupo">
                <span className="numero-etapa-admin">
                  {ehSecaoAnual ? 4 : 5}
                </span>
                Conteúdo
              </p>

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
            </div>
          </form>
        </section>
      </main>

      <Rodape />
    </div>
  );
};

export default CadastroAtividadeSesi;
