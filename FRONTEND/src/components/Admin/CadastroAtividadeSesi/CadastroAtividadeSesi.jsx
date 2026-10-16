import { useState } from "react";
import { Link } from "react-router-dom";
import Rodape from "../../Rodape/Rodape";
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

const camposPorSecao = {
  "Fundamentos teóricos": [
    { nome: "resumo_teorico", rotulo: "Resumo teórico", linhas: 2 },
    { nome: "teorias", rotulo: "Teorias" },
    { nome: "conceitos", rotulo: "Conceitos" },
    { nome: "metodologias", rotulo: "Metodologias" },
  ],
  "Participação em sala": [
    { nome: "registro_atividades", rotulo: "Registro das atividades", linhas: 2 },
    { nome: "o_que_chamou_atencao", rotulo: "O que chamou atenção" },
    { nome: "reflexao_pratica", rotulo: "Reflexão prática" },
    { nome: "justificativa_autoavaliacao", rotulo: "Justificativa da autoavaliação", linhas: 2 },
  ],
  "Projetos e trabalhos": [
    { nome: "titulo_projeto", rotulo: "Título do projeto" },
    { nome: "texto_card", rotulo: "Descrição do projeto", linhas: 2 },
    { nome: "foto", rotulo: "Imagem ou evidência", tipo: "file" },
  ],
  "Reflexão crítica": [
    { nome: "aprendizado_academico", rotulo: "Aprendizado acadêmico", linhas: 2 },
    { nome: "aplicacao_pratica", rotulo: "Aplicação prática" },
    { nome: "melhorias_necessarias", rotulo: "Melhorias necessárias" },
    { nome: "momentos_desafiadores", rotulo: "Momentos desafiadores" },
  ],
  "Conexões interdisciplinares": [
    { nome: "relacoes_interdisciplinares", rotulo: "Relações interdisciplinares", linhas: 3 },
  ],
  "Da escola para a vida": [
    { nome: "reflexao_experiencia", rotulo: "Reflexão sobre a experiência", linhas: 2 },
    { nome: "aplicacao_conhecimentos", rotulo: "Aplicação dos conhecimentos" },
    { nome: "influencia_forma_agir_pensar", rotulo: "Como influenciou sua forma de agir e pensar" },
    { nome: "habilidades_desenvolvidas", rotulo: "Habilidades desenvolvidas" },
    { nome: "desafios_novas_etapas", rotulo: "Desafios e próximas etapas" },
  ],
};

const secoesAnuais = [
  "Reflexão crítica",
  "Conexões interdisciplinares",
  "Da escola para a vida",
];

const CadastroAtividadeSesi = () => {
  const [secaoAtiva, setSecaoAtiva] = useState(secoes[0]);
  const [bimestreAtivo, setBimestreAtivo] = useState(2);
  const [valores, setValores] = useState({});
  const [autoavaliacao, setAutoavaliacao] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const secaoAnual = secoesAnuais.includes(secaoAtiva);
  const campos = camposPorSecao[secaoAtiva];

  const atualizarCampo = (nome, valor) => {
    setValores((valoresAtuais) => ({
      ...valoresAtuais,
      [`${secaoAtiva}-${bimestreAtivo}-${nome}`]: valor,
    }));
  };

  const enviarFormulario = (evento) => {
    evento.preventDefault();
    setMensagem("Atividade não enviada: o cadastro ainda não está conectado ao servidor.");
  };

  const cancelarFormulario = () => {
    setValores({});
    setAutoavaliacao(0);
    setMensagem("");
  };

  return (
    <div className="pagina-admin-sesi">
      <header className="cabecalho-admin-sesi">
        <Link className="voltar-admin-sesi" to="/">
          ← Portfólio
        </Link>
        <span>Área do aluno</span>
      </header>

      <main className="conteudo-admin-sesi">
        <aside className="navegacao-admin-sesi" aria-label="Navegação administrativa">
          <button className="item-navegacao-admin ativo" type="button" aria-current="page">
            <span className="icone-navegacao-admin">+</span>
            Enviar atividade
          </button>
          <button className="item-navegacao-admin" type="button" disabled>
            <span className="icone-navegacao-admin">≡</span>
            Minhas atividades
          </button>
          <Link className="item-navegacao-admin sair-admin" to="/admin/login">
            <span className="icone-navegacao-admin">↪</span>
            Sair
          </Link>
        </aside>

        <section className="area-cadastro-sesi" aria-labelledby="titulo-cadastro-sesi">
          <header className="titulo-cadastro-sesi">
            <h1 id="titulo-cadastro-sesi">
              Enviar
              <br />
              <span>atividade</span>
            </h1>
            <p>Nova atividade · {secaoAtiva}</p>
          </header>

          <form className="formulario-cadastro-sesi" onSubmit={enviarFormulario}>
            <fieldset className="grupo-selecao-admin">
              <legend>
                <span className="numero-etapa-admin">1</span>
                Instituição
              </legend>
              <div className="opcoes-admin">
                <button className="opcao-admin selecionada" type="button" aria-pressed="true">
                  Sesi
                </button>
                <Link className="opcao-admin" to="/admin/atividades/nova/senai">
                  Senai
                </Link>
              </div>
            </fieldset>

            <fieldset className="grupo-selecao-admin">
              <legend>
                <span className="numero-etapa-admin">2</span>
                Seção
              </legend>
              <div className="opcoes-admin opcoes-secoes-admin">
                {secoes.map((secao) => (
                  <button
                    className={`opcao-admin ${secaoAtiva === secao ? "selecionada" : ""}`}
                    key={secao}
                    type="button"
                    aria-pressed={secaoAtiva === secao}
                    onClick={() => {
                      setSecaoAtiva(secao);
                      setMensagem("");
                    }}
                  >
                    {secao}
                  </button>
                ))}
              </div>
            </fieldset>

            {!secaoAnual && (
              <fieldset className="grupo-selecao-admin">
                <legend>
                  <span className="numero-etapa-admin">3</span>
                  Bimestre
                </legend>
                <div className="opcoes-admin">
                  {[1, 2, 3, 4].map((bimestre) => (
                    <button
                      className={`opcao-admin ${bimestreAtivo === bimestre ? "selecionada" : ""}`}
                      key={bimestre}
                      type="button"
                      aria-pressed={bimestreAtivo === bimestre}
                      onClick={() => {
                        setBimestreAtivo(bimestre);
                        setMensagem("");
                      }}
                    >
                      {bimestre}º bimestre
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <fieldset className="bloco-campos-admin">
              <legend>
                <span className="numero-etapa-admin">{secaoAnual ? "3" : "4"}</span>
                Conteúdo
              </legend>

              {campos.map((campo) => {
                const chave = `${secaoAtiva}-${bimestreAtivo}-${campo.nome}`;
                return (
                  <label className="campo-admin-sesi" htmlFor={chave} key={campo.nome}>
                    <span>{campo.rotulo}</span>
                    {campo.tipo === "file" ? (
                      <div className="area-arquivo-admin">
                        <img src={iconeProjeto} alt="" />
                        <strong>Clique para escolher uma imagem</strong>
                        <span>{valores[chave] || "Nenhum arquivo selecionado"}</span>
                        <input
                          className="entrada-arquivo-admin"
                          id={chave}
                          name={campo.nome}
                          type="file"
                          accept="image/*"
                          onChange={(evento) =>
                            atualizarCampo(campo.nome, evento.target.files?.[0]?.name || "")
                          }
                        />
                      </div>
                    ) : campo.linhas ? (
                      <textarea
                        id={chave}
                        name={campo.nome}
                        rows={campo.linhas}
                        placeholder="Escreva aqui..."
                        value={valores[chave] || ""}
                        onChange={(evento) => atualizarCampo(campo.nome, evento.target.value)}
                      />
                    ) : (
                      <input
                        id={chave}
                        name={campo.nome}
                        type="text"
                        placeholder="Escreva aqui..."
                        value={valores[chave] || ""}
                        onChange={(evento) => atualizarCampo(campo.nome, evento.target.value)}
                      />
                    )}
                  </label>
                );
              })}

              {secaoAtiva === "Participação em sala" && (
                <fieldset className="avaliacao-cadastro-admin">
                  <legend>Autoavaliação</legend>
                  <div className="estrelas-cadastro-admin" aria-label={`Autoavaliação: ${autoavaliacao} de 5`}>
                    {[1, 2, 3, 4, 5].map((estrela) => (
                      <button
                        className="estrela-cadastro-admin"
                        key={estrela}
                        type="button"
                        aria-label={`${estrela} de 5 estrelas`}
                        aria-pressed={autoavaliacao === estrela}
                        onClick={() => setAutoavaliacao(estrela)}
                      >
                        <img
                          src={estrela <= autoavaliacao ? estrelaAmarela : estrelaBranca}
                          alt=""
                        />
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              <p className="destino-atividade-admin">
                Vai aparecer em: Sesi › {secaoAtiva}
                {!secaoAnual && ` › ${bimestreAtivo}º bimestre`}
              </p>

              <div className="acoes-cadastro-admin">
                <button className="botao-enviar-admin" type="submit">
                  Enviar
                </button>
                <button
                  className="botao-cancelar-admin"
                  type="reset"
                  onClick={cancelarFormulario}
                >
                  Cancelar
                </button>
              </div>

              {mensagem && (
                <p className="mensagem-cadastro-admin" role="status">
                  {mensagem}
                </p>
              )}
            </fieldset>
          </form>
        </section>
      </main>

      <Rodape />
    </div>
  );
};

export default CadastroAtividadeSesi;
