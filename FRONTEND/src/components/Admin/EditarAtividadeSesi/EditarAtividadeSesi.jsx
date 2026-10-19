import { useState } from "react";
import { Link } from "react-router-dom";
import Rodape from "../../Rodape/Rodape";
import circuloAmarelo from "../../../assets/imgs/senai/circulo-amarelo.png";
import circuloBranco from "../../../assets/imgs/senai/circulo-branco.png";
import "./EditarAtividadeSesi.css";

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
    { nome: "registro_atividades", rotulo: "Registro de atividades", linhas: 2 },
    { nome: "o_que_chamou_atencao", rotulo: "O que mais chamou minha atenção", linhas: 2 },
    { nome: "reflexao_pratica", rotulo: "Reflexão prática", linhas: 2 },
    { nome: "justificativa_autoavaliacao", rotulo: "Justificativa da autoavaliação", linhas: 2 },
  ],
  "Projetos e trabalhos": [
    { nome: "titulo_projeto", rotulo: "Título do projeto" },
    { nome: "texto_card", rotulo: "Texto do card", linhas: 2 },
    { nome: "foto", rotulo: "Foto do projeto", tipo: "arquivo" },
    { nome: "etiquetas", rotulo: "Etiquetas", tipo: "etiquetas" },
  ],
  "Reflexão crítica": [
    { nome: "aprendizado_academico", rotulo: "Aprendizado acadêmico" },
    { nome: "aplicacao_pratica", rotulo: "Aplicação prática" },
    { nome: "melhorias_necessarias", rotulo: "Melhorias necessárias" },
    { nome: "momentos_desafiadores", rotulo: "Momentos desafiadores" },
    { nome: "habilidades_desenvolvidas", rotulo: "Habilidades fortalecidas", tipo: "etiquetas" },
  ],
  "Conexões interdisciplinares": [
    { nome: "materias_conectadas", rotulo: "Matérias conectadas", tipo: "etiquetas" },
    { nome: "relacoes_interdisciplinares", rotulo: "Relações interdisciplinares", linhas: 3 },
  ],
  "Da escola para a vida": [
    { nome: "reflexao_experiencia", rotulo: "Reflexão sobre experiências" },
    { nome: "aplicacao_conhecimentos", rotulo: "Aplicação dos conhecimentos" },
    { nome: "influencia_forma_agir_pensar", rotulo: "Como a escola influenciou minha forma de pensar e agir?" },
    { nome: "habilidades_desenvolvidas", rotulo: "Que habilidades desenvolvi para o meu futuro?" },
    { nome: "desafios_novas_etapas", rotulo: "Como os desafios me prepararam para novas etapas?" },
  ],
};

const secoesAnuais = [
  "Reflexão crítica",
  "Conexões interdisciplinares",
  "Da escola para a vida",
];

const valorInicialPorCampo = {
  resumo_teorico: "Resumo das principais teorias e conceitos vistos neste bimestre.",
  teorias: "Texto já escrito pelo aluno.",
  conceitos: "Texto já escrito pelo aluno.",
  metodologias: "Texto já escrito pelo aluno.",
  titulo_projeto: "Projeto de Vida",
  texto_card: "Texto já escrito pelo aluno.",
  aprendizado_academico: "Texto já escrito pelo aluno.",
  aplicacao_pratica: "Texto já escrito pelo aluno.",
  melhorias_necessarias: "Texto já escrito pelo aluno.",
  momentos_desafiadores: "Texto já escrito pelo aluno.",
  reflexao_experiencia: "Texto já escrito pelo aluno.",
  aplicacao_conhecimentos: "Texto já escrito pelo aluno.",
  influencia_forma_agir_pensar: "Texto já escrito pelo aluno.",
  habilidades_desenvolvidas: "Texto já escrito pelo aluno.",
  desafios_novas_etapas: "Texto já escrito pelo aluno.",
  registro_atividades: "Texto já escrito pelo aluno.",
  o_que_chamou_atencao: "Texto já escrito pelo aluno.",
  reflexao_pratica: "Texto já escrito pelo aluno.",
  justificativa_autoavaliacao: "Texto já escrito pelo aluno.",
  relacoes_interdisciplinares: "Texto já escrito pelo aluno.",
};

const etiquetasIniciais = {
  "Projetos e trabalhos-etiquetas": ["Projeto", "Trabalho", "Evidência"],
  "Reflexão crítica-habilidades_desenvolvidas": ["Resiliência", "Paciência"],
  "Conexões interdisciplinares-materias_conectadas": ["Física", "História"],
};

const EditarAtividadeSesi = () => {
  const [secaoAtiva, setSecaoAtiva] = useState(secoes[0]);
  const [bimestreAtivo, setBimestreAtivo] = useState(2);
  const [valores, setValores] = useState(valorInicialPorCampo);
  const avaliacao = 4;
  const [avaliacoes, setAvaliacoes] = useState({});
  const [etiquetas, setEtiquetas] = useState(etiquetasIniciais);
  const [etiquetaDigitada, setEtiquetaDigitada] = useState("");
  const [arquivo, setArquivo] = useState("atual");
  const [mensagem, setMensagem] = useState("");
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);
  const secaoAnual = secoesAnuais.includes(secaoAtiva);
  const campos = camposPorSecao[secaoAtiva];

  const chaveCampo = (nome) => `${secaoAtiva}-${nome}`;

  const atualizarCampo = (nome, valor) => {
    setValores((atuais) => ({ ...atuais, [nome]: valor }));
    setMensagem("");
  };

  const adicionarEtiqueta = (nome) => {
    const novaEtiqueta = etiquetaDigitada.trim();
    const chave = chaveCampo(nome);
    const atuais = etiquetas[chave] || [];

    if (!novaEtiqueta || atuais.includes(novaEtiqueta)) return;
    setEtiquetas((todas) => ({ ...todas, [chave]: [...atuais, novaEtiqueta] }));
    setEtiquetaDigitada("");
  };

  const removerEtiqueta = (nome, etiquetaRemover) => {
    const chave = chaveCampo(nome);
    setEtiquetas((todas) => ({
      ...todas,
      [chave]: (todas[chave] || []).filter((etiqueta) => etiqueta !== etiquetaRemover),
    }));
  };

  const salvarAlteracoes = (evento) => {
    evento.preventDefault();
    setMensagem("Alterações não salvas: a edição ainda não está conectada ao servidor.");
  };

  const cancelarAlteracoes = () => {
    setValores(valorInicialPorCampo);
    setAvaliacoes({});
    setEtiquetas(etiquetasIniciais);
    setArquivo("atual");
    setMensagem("As alterações desta tela foram descartadas.");
    setConfirmarExclusao(false);
  };

  const excluirAtividade = () => {
    setConfirmarExclusao(false);
    setMensagem("Atividade não excluída: a edição ainda não está conectada ao servidor.");
  };

  const renderizarEtiquetas = (campo) => {
    const etiquetasDoCampo = etiquetas[chaveCampo(campo.nome)] || [];
    return (
      <>
        <div className="entrada-etiquetas-edicao">
          <input
            id={`etiqueta-${secaoAtiva.replace(/\s+/g, "-")}-${campo.nome}`}
            type="text"
            placeholder="Digite e clique em Adicionar"
            value={etiquetaDigitada}
            onChange={(evento) => setEtiquetaDigitada(evento.target.value)}
            onKeyDown={(evento) => {
              if (evento.key === "Enter") {
                evento.preventDefault();
                adicionarEtiqueta(campo.nome);
              }
            }}
          />
          <button type="button" onClick={() => adicionarEtiqueta(campo.nome)}>
            Adicionar
          </button>
        </div>
        {etiquetasDoCampo.length > 0 && (
          <div className="lista-etiquetas-edicao">
            {etiquetasDoCampo.map((etiqueta) => (
              <button
                type="button"
                key={etiqueta}
                aria-label={`Remover ${etiqueta}`}
                onClick={() => removerEtiqueta(campo.nome, etiqueta)}
              >
                {etiqueta} ×
              </button>
            ))}
          </div>
        )}
      </>
    );
  };

  const renderizarCampo = (campo) => {
    if (campo.tipo === "etiquetas") return renderizarEtiquetas(campo);
    if (campo.tipo === "arquivo") {
      return (
        <div className="arquivo-edicao-sesi">
          <div className="miniatura-arquivo-edicao">{arquivo}</div>
          <label className="botao-trocar-arquivo-edicao" htmlFor="arquivo-projeto-edicao">
            Trocar arquivo
            <input
              id="arquivo-projeto-edicao"
              type="file"
              accept="image/*"
              onChange={(evento) => setArquivo(evento.target.files?.[0]?.name || "atual")}
            />
          </label>
        </div>
      );
    }

    const chave = chaveCampo(campo.nome);
    const valor = valores[chave] ?? valorInicialPorCampo[campo.nome] ?? "";
    return campo.linhas ? (
      <textarea
        id={chave}
        name={campo.nome}
        rows={campo.linhas}
        value={valor}
        onChange={(evento) => atualizarCampo(chave, evento.target.value)}
      />
    ) : (
      <input
        id={chave}
        name={campo.nome}
        type="text"
        value={valor}
        onChange={(evento) => atualizarCampo(chave, evento.target.value)}
      />
    );
  };

  return (
    <div className="pagina-edicao-sesi">
      <header className="cabecalho-edicao-sesi">
        <Link className="voltar-edicao-sesi" to="/">
          ← Portfólio
        </Link>
        <span>Área do aluno</span>
      </header>

      <main className="conteudo-edicao-sesi">
        <aside className="navegacao-edicao-sesi" aria-label="Navegação administrativa">
          <Link className="item-edicao-sesi" to="/admin/atividades/nova/sesi">
            <span className="icone-edicao-sesi">+</span>
            Enviar atividade
          </Link>
          <button className="item-edicao-sesi ativo" type="button" aria-current="page">
            <span className="icone-edicao-sesi">≡</span>
            Minhas atividades
          </button>
          <Link
            className="item-edicao-sesi"
            to="/admin/login"
            onClick={() => localStorage.removeItem("token")}
          >
            <span className="icone-edicao-sesi">↪</span>
            Sair
          </Link>
        </aside>

        <section className="area-edicao-sesi" aria-labelledby="titulo-edicao-sesi">
          <header className="titulo-edicao-sesi">
            <h1 id="titulo-edicao-sesi">
              Editar
              <br />
              <span>atividade</span>
            </h1>
            <p>Alterando · {secaoAtiva}</p>
          </header>

          <div className="contexto-edicao-sesi">
            <span>Instituição: Sesi</span>
            <label>
              Seção:
              <select
                value={secaoAtiva}
                onChange={(evento) => {
                  setSecaoAtiva(evento.target.value);
                  setMensagem("");
                }}
                aria-label="Seção da atividade"
              >
                {secoes.map((secao) => (
                  <option key={secao} value={secao}>
                    {secao}
                  </option>
                ))}
              </select>
            </label>
            {secaoAnual && <span>Anual · 1 página</span>}
          </div>

          <form className="formulario-edicao-sesi" onSubmit={salvarAlteracoes}>
            {!secaoAnual && (
              <fieldset className="selecao-bimestre-edicao">
                <legend>
                  <span className="numero-edicao-sesi">1</span>
                  Bimestre
                </legend>
                <div className="opcoes-bimestre-edicao">
                  {[1, 2, 3, 4].map((bimestre) => (
                    <button
                      className={`botao-bimestre-edicao ${bimestreAtivo === bimestre ? "ativo" : ""}`}
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

            <fieldset className="campos-edicao-sesi">
              <legend>
                <span className="numero-edicao-sesi">{secaoAnual ? "1" : "2"}</span>
                Conteúdo
              </legend>

              {campos.map((campo) => (
                <div className="campo-edicao-sesi" key={campo.nome}>
                  {campo.nome === "justificativa_autoavaliacao" && (
                    <div className="campo-autoavaliacao-edicao">
                      <span>Autoavaliação (nota)</span>
                      <div className="bolinhas-edicao-sesi" role="group" aria-label={`Autoavaliação: ${avaliacoes[secaoAtiva] ?? avaliacao} de 5`}>
                        {[1, 2, 3, 4, 5].map((valor) => {
                          const nota = avaliacoes[secaoAtiva] ?? avaliacao;
                          return (
                            <button
                              type="button"
                              key={valor}
                              aria-label={`${valor} de 5`}
                              aria-pressed={nota === valor}
                              onClick={() => setAvaliacoes((atuais) => ({ ...atuais, [secaoAtiva]: valor }))}
                            >
                              <img src={valor <= nota ? circuloAmarelo : circuloBranco} alt="" />
                            </button>
                          );
                        })}
                        <span>{avaliacoes[secaoAtiva] ?? avaliacao} de 5</span>
                      </div>
                    </div>
                  )}
                  <label
                    htmlFor={
                      campo.tipo === "etiquetas"
                        ? `etiqueta-${secaoAtiva.replace(/\s+/g, "-")}-${campo.nome}`
                        : campo.tipo === "arquivo"
                          ? "arquivo-projeto-edicao"
                          : chaveCampo(campo.nome)
                    }
                  >
                    {campo.rotulo}
                  </label>
                  {renderizarCampo(campo)}
                </div>
              ))}

              <p className="destino-edicao-sesi">
                Vai aparecer em: Sesi › {secaoAtiva}
                {!secaoAnual && ` › ${bimestreAtivo}º bimestre`}
              </p>

              <div className="acoes-edicao-sesi">
                <div>
                  <button className="botao-salvar-edicao-sesi" type="submit">
                    Salvar alterações
                  </button>
                  <button
                    className="botao-cancelar-edicao-sesi"
                    type="button"
                    onClick={cancelarAlteracoes}
                  >
                    Cancelar
                  </button>
                </div>
                <button
                  className="botao-excluir-edicao-sesi"
                  type="button"
                  onClick={() => setConfirmarExclusao(true)}
                >
                  Excluir atividade
                </button>
              </div>

              {mensagem && (
                <p className="mensagem-edicao-sesi" role="status">
                  {mensagem}
                </p>
              )}
            </fieldset>
          </form>
        </section>
      </main>

      <Rodape />

      {confirmarExclusao && (
        <div className="fundo-confirmacao-edicao" role="presentation">
          <section
            className="dialogo-confirmacao-edicao"
            role="alertdialog"
            aria-labelledby="titulo-confirmacao-edicao"
            aria-describedby="texto-confirmacao-edicao"
          >
            <h2 id="titulo-confirmacao-edicao">Excluir atividade?</h2>
            <p id="texto-confirmacao-edicao">
              Esta ação removeria o conteúdo de {secaoAtiva}
              {!secaoAnual && ` do ${bimestreAtivo}º bimestre`}.
            </p>
            <div className="acoes-confirmacao-edicao">
              <button type="button" onClick={() => setConfirmarExclusao(false)}>
                Manter atividade
              </button>
              <button type="button" onClick={excluirAtividade}>
                Confirmar exclusão
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default EditarAtividadeSesi;
