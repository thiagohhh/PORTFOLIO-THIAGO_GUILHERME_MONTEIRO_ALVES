import { useState } from "react";
import { Link } from "react-router-dom";
import Rodape from "../../Rodape/Rodape";
import circuloAmarelo from "../../../assets/imgs/senai/circulo-amarelo.png";
import circuloBranco from "../../../assets/imgs/senai/circulo-branco.png";
import estrelaAmarela from "../../../assets/imgs/senai/estrela-amarela.png";
import estrelaBranca from "../../../assets/imgs/senai/estrela-branca.png";
import "./EditarAtividadeSenai.css";

const abas = [
  "Projetos",
  "Códigos",
  "Galeria",
  "Relatórios",
  "Aprendizagens",
  "Autoavaliação",
  "Competências",
];

const camposPorAba = {
  Projetos: [
    { nome: "titulo_projeto", rotulo: "Título do projeto" },
    { nome: "texto_card", rotulo: "Texto do card", linhas: 2 },
    { nome: "foto", rotulo: "Foto do projeto", tipo: "arquivo-imagem" },
    { nome: "etiquetas", rotulo: "Etiquetas", tipo: "etiquetas" },
  ],
  Códigos: [
    { nome: "titulo_codigo", rotulo: "Título do código" },
    { nome: "descricao_linguagem", rotulo: "Linguagem" },
    { nome: "bloco_codigo", rotulo: "Bloco de código", tipo: "codigo", linhas: 8 },
  ],
  Galeria: [
    { nome: "tipo_midia", rotulo: "Tipo de mídia", tipo: "select", opcoes: ["Imagem", "Vídeo"] },
    { nome: "titulo_midia", rotulo: "Título da mídia" },
    { nome: "explicado_a_midia", rotulo: "Explicação da mídia", linhas: 2 },
    { nome: "arquivo", rotulo: "Arquivo da mídia", tipo: "arquivo-midia" },
  ],
  Relatórios: [
    { nome: "titulo_relatorio", rotulo: "Título do relatório" },
    { nome: "paragrafo_relatorio", rotulo: "Parágrafo do relatório", linhas: 3 },
    { nome: "pdf", rotulo: "Arquivo PDF", tipo: "arquivo-pdf" },
    { nome: "etiquetas", rotulo: "Etiquetas", tipo: "etiquetas" },
  ],
  Aprendizagens: [
    { nome: "titulo_aprendizagem", rotulo: "Título da aprendizagem" },
    { nome: "descricao_aprendizagem", rotulo: "Descrição da aprendizagem", linhas: 2 },
    { nome: "nivel_estrelas", rotulo: "Nível (estrelas)", tipo: "estrelas" },
  ],
  Autoavaliação: [
    { nome: "nota_bolinhas", rotulo: "Nota (bolinhas)", tipo: "bolinhas" },
    {
      nome: "percentual",
      rotulo: "Progresso da barra",
      tipo: "percentual",
      ajuda: "Digite um valor de 0 a 100 para definir o preenchimento da barra.",
    },
    { nome: "justificativa_texto", rotulo: "Justificativa", linhas: 3 },
  ],
  Competências: [{ nome: "titulo_competencia", rotulo: "Título da competência" }],
};

const valoresIniciais = {
  "Projetos-unidade_curricular": "Desenvolvimento Front-end",
  "Projetos-titulo_projeto": "Loja virtual",
  "Projetos-texto_card": "Texto já escrito pelo aluno.",
  "Códigos-unidade_curricular": "Desenvolvimento Front-end",
  "Códigos-titulo_codigo": "Manipulação DOM",
  "Códigos-descricao_linguagem": "JavaScript",
  "Códigos-bloco_codigo": "function somar(a, b) {\n  return a + b;\n}",
  "Galeria-unidade_curricular": "Desenvolvimento Front-end",
  "Galeria-tipo_midia": "Vídeo",
  "Galeria-titulo_midia": "Demonstração do projeto",
  "Galeria-explicado_a_midia": "Texto já escrito pelo aluno.",
  "Relatórios-unidade_curricular": "Desenvolvimento Front-end",
  "Relatórios-titulo_relatorio": "Relatório técnico 1",
  "Relatórios-paragrafo_relatorio": "Texto já escrito pelo aluno.",
  "Aprendizagens-unidade_curricular": "Desenvolvimento Front-end",
  "Aprendizagens-titulo_aprendizagem": "Modelagem de dados",
  "Aprendizagens-descricao_aprendizagem": "Texto já escrito pelo aluno.",
  "Autoavaliação-unidade_curricular": "Desenvolvimento Front-end",
  "Autoavaliação-percentual": "80",
  "Autoavaliação-justificativa_texto": "Texto já escrito pelo aluno.",
  "Competências-unidade_curricular": "Desenvolvimento Front-end",
  "Competências-titulo_competencia": "Desenvolver aplicações web",
};

const etiquetasIniciais = {
  "Projetos-etiquetas": ["HTML", "CSS", "JS"],
  "Relatórios-etiquetas": ["Banco de dados", "API"],
};

const EditarAtividadeSenai = () => {
  const [abaAtiva, setAbaAtiva] = useState("Projetos");
  const [valores, setValores] = useState(valoresIniciais);
  const [avaliacoes, setAvaliacoes] = useState({
    Aprendizagens: 4,
    Autoavaliação: 4,
  });
  const [etiquetas, setEtiquetas] = useState(etiquetasIniciais);
  const [etiquetaDigitada, setEtiquetaDigitada] = useState("");
  const [arquivos, setArquivos] = useState({
    Projetos: "atual",
    Galeria: "atual",
    Relatórios: "atual",
  });
  const [mensagem, setMensagem] = useState("");
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);
  const campos = camposPorAba[abaAtiva];

  const chaveCampo = (nome) => `${abaAtiva}-${nome}`;

  const atualizarCampo = (nome, valor) => {
    setValores((atuais) => ({ ...atuais, [chaveCampo(nome)]: valor }));
    setMensagem("");
  };

  const adicionarEtiqueta = (nome) => {
    const etiqueta = etiquetaDigitada.trim();
    const chave = chaveCampo(nome);
    const atuais = etiquetas[chave] || [];
    if (!etiqueta || atuais.includes(etiqueta)) return;

    setEtiquetas((todas) => ({ ...todas, [chave]: [...atuais, etiqueta] }));
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
    setValores(valoresIniciais);
    setAvaliacoes({ Aprendizagens: 4, Autoavaliação: 4 });
    setEtiquetas(etiquetasIniciais);
    setArquivos({ Projetos: "atual", Galeria: "atual", Relatórios: "atual" });
    setMensagem("As alterações desta tela foram descartadas.");
    setConfirmarExclusao(false);
  };

  const renderizarEtiquetas = (campo) => {
    const chave = chaveCampo(campo.nome);
    const itens = etiquetas[chave] || [];
    const id = `etiqueta-${abaAtiva.replace(/\s+/g, "-")}`;

    return (
      <>
        <div className="entrada-etiquetas-edicao-senai">
          <input
            id={id}
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
        {itens.length > 0 && (
          <div className="lista-etiquetas-edicao-senai">
            {itens.map((etiqueta) => (
              <button
                type="button"
                key={etiqueta}
                aria-label={`Remover etiqueta ${etiqueta}`}
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

  const renderizarMarcadores = (campo) => {
    const ehEstrela = campo.tipo === "estrelas";
    const nota = avaliacoes[abaAtiva] || 0;
    const selecionado = ehEstrela ? estrelaAmarela : circuloAmarelo;
    const vazio = ehEstrela ? estrelaBranca : circuloBranco;

    return (
      <div
        className={`marcadores-edicao-senai ${ehEstrela ? "estrelas-edicao-senai" : ""}`}
        role="group"
        aria-label={`${campo.rotulo}: ${nota} de 5`}
      >
        {[1, 2, 3, 4, 5].map((valor) => (
          <button
            type="button"
            key={valor}
            aria-label={`${valor} de 5`}
            aria-pressed={nota === valor}
            onClick={() => setAvaliacoes((atuais) => ({ ...atuais, [abaAtiva]: valor }))}
          >
            <img src={valor <= nota ? selecionado : vazio} alt="" />
          </button>
        ))}
        <span>{nota} de 5</span>
      </div>
    );
  };

  const renderizarArquivo = (campo) => {
    const id = `arquivo-${abaAtiva.replace(/\s+/g, "-")}`;
    const aceita =
      campo.tipo === "arquivo-pdf"
        ? ".pdf,application/pdf"
        : campo.tipo === "arquivo-imagem"
          ? "image/*"
          : "image/*,video/*";

    return (
      <div className="arquivo-edicao-senai">
        <div className="miniatura-edicao-senai">{arquivos[abaAtiva] || "atual"}</div>
        <label className="trocar-arquivo-edicao-senai" htmlFor={id}>
          Trocar arquivo
          <input
            id={id}
            type="file"
            accept={aceita}
            onChange={(evento) =>
              setArquivos((atuais) => ({
                ...atuais,
                [abaAtiva]: evento.target.files?.[0]?.name || "atual",
              }))
            }
          />
        </label>
      </div>
    );
  };

  const renderizarCampo = (campo) => {
    if (campo.tipo === "etiquetas") return renderizarEtiquetas(campo);
    if (campo.tipo?.startsWith("arquivo")) return renderizarArquivo(campo);
    if (campo.tipo === "estrelas" || campo.tipo === "bolinhas") {
      return renderizarMarcadores(campo);
    }
    if (campo.tipo === "percentual") {
      const valor = valores[chaveCampo(campo.nome)] ?? "";
      return (
        <div className="percentual-edicao-senai">
          <input
            id={chaveCampo(campo.nome)}
            name={campo.nome}
            type="number"
            min="0"
            max="100"
            required
            aria-describedby={`${chaveCampo(campo.nome)}-ajuda`}
            value={valor}
            onChange={(evento) => atualizarCampo(campo.nome, evento.target.value)}
          />
          <span>%</span>
          <small id={`${chaveCampo(campo.nome)}-ajuda`}>
            {campo.ajuda}
          </small>
        </div>
      );
    }
    if (campo.tipo === "select") {
      const valor = valores[chaveCampo(campo.nome)] ?? "";
      return (
        <select
          id={chaveCampo(campo.nome)}
          name={campo.nome}
          value={valor}
          onChange={(evento) => atualizarCampo(campo.nome, evento.target.value)}
        >
          {campo.opcoes.map((opcao) => (
            <option value={opcao} key={opcao}>
              {opcao}
            </option>
          ))}
        </select>
      );
    }

    const valor = valores[chaveCampo(campo.nome)] ?? "";
    return campo.linhas ? (
      <textarea
        id={chaveCampo(campo.nome)}
        name={campo.nome}
        rows={campo.linhas}
        className={campo.tipo === "codigo" ? "editor-codigo-edicao-senai" : ""}
        value={valor}
        onChange={(evento) => atualizarCampo(campo.nome, evento.target.value)}
      />
    ) : (
      <input
        id={chaveCampo(campo.nome)}
        name={campo.nome}
        type="text"
        value={valor}
        onChange={(evento) => atualizarCampo(campo.nome, evento.target.value)}
      />
    );
  };

  return (
    <div className="pagina-edicao-senai">
      <header className="cabecalho-edicao-senai">
        <Link className="voltar-edicao-senai" to="/">
          ← Portfólio
        </Link>
        <span>Área do aluno</span>
      </header>

      <main className="conteudo-edicao-senai">
        <aside className="navegacao-edicao-senai" aria-label="Navegação administrativa">
          <Link className="item-edicao-senai" to="/admin/atividades/nova/senai">
            <span className="icone-edicao-senai">+</span>
            Enviar atividade
          </Link>
          <button className="item-edicao-senai ativo" type="button" aria-current="page">
            <span className="icone-edicao-senai">≡</span>
            Minhas atividades
          </button>
          <Link className="item-edicao-senai" to="/admin/login">
            <span className="icone-edicao-senai">↪</span>
            Sair
          </Link>
        </aside>

        <section className="area-edicao-senai" aria-labelledby="titulo-edicao-senai">
          <header className="titulo-edicao-senai">
            <h1 id="titulo-edicao-senai">
              Editar
              <br />
              <span>atividade</span>
            </h1>
            <p>Alterando · {abaAtiva}</p>
          </header>

          <div className="contexto-edicao-senai">
            <span>Instituição: Senai</span>
            <span>Aba: {abaAtiva}</span>
          </div>

          <div className="abas-edicao-senai" role="tablist" aria-label="Tipo de atividade Senai">
            {abas.map((aba) => (
              <button
                key={aba}
                id={`aba-senai-${aba.replace(/\s+/g, "-")}`}
                className={abaAtiva === aba ? "ativa" : ""}
                type="button"
                role="tab"
                aria-selected={abaAtiva === aba}
                aria-controls="painel-edicao-senai"
                onClick={() => {
                  setAbaAtiva(aba);
                  setMensagem("");
                  setEtiquetaDigitada("");
                }}
              >
                {aba}
              </button>
            ))}
          </div>

          <form className="formulario-edicao-senai" onSubmit={salvarAlteracoes}>
            <fieldset
              className="campos-edicao-senai"
              id="painel-edicao-senai"
              role="tabpanel"
              aria-labelledby={`aba-senai-${abaAtiva.replace(/\s+/g, "-")}`}
            >
              <legend>
                <span className="numero-edicao-senai">1</span>
                Conteúdo
              </legend>

              <label className="campo-edicao-senai" htmlFor={`unidade-${abaAtiva}`}>
                <span>Unidade curricular</span>
                <input
                  id={`unidade-${abaAtiva}`}
                  type="text"
                  placeholder="Digite a unidade curricular"
                  value={valores[`${abaAtiva}-unidade_curricular`] ?? ""}
                  onChange={(evento) =>
                    setValores((atuais) => ({
                      ...atuais,
                      [`${abaAtiva}-unidade_curricular`]: evento.target.value,
                    }))
                  }
                />
              </label>

              {campos.map((campo) => {
                const id =
                  campo.tipo === "etiquetas"
                    ? `etiqueta-${abaAtiva.replace(/\s+/g, "-")}`
                    : campo.tipo?.startsWith("arquivo")
                      ? `arquivo-${abaAtiva.replace(/\s+/g, "-")}`
                      : chaveCampo(campo.nome);

                return (
                  <div className="campo-edicao-senai" key={campo.nome}>
                    <label htmlFor={id}>{campo.rotulo}</label>
                    {renderizarCampo(campo)}
                  </div>
                );
              })}

              <p className="destino-edicao-senai">Vai aparecer em: Senai › {abaAtiva}</p>

              <div className="acoes-edicao-senai">
                <div>
                  <button className="botao-salvar-edicao-senai" type="submit">
                    Salvar alterações
                  </button>
                  <button
                    className="botao-cancelar-edicao-senai"
                    type="button"
                    onClick={cancelarAlteracoes}
                  >
                    Cancelar
                  </button>
                </div>
                <button
                  className="botao-excluir-edicao-senai"
                  type="button"
                  onClick={() => setConfirmarExclusao(true)}
                >
                  Excluir atividade
                </button>
              </div>

              {mensagem && (
                <p className="mensagem-edicao-senai" role="status">
                  {mensagem}
                </p>
              )}
            </fieldset>
          </form>
        </section>
      </main>

      <Rodape />

      {confirmarExclusao && (
        <div className="fundo-confirmacao-edicao-senai" role="presentation">
          <section
            className="dialogo-confirmacao-edicao-senai"
            role="alertdialog"
            aria-labelledby="titulo-confirmacao-edicao-senai"
            aria-describedby="texto-confirmacao-edicao-senai"
          >
            <h2 id="titulo-confirmacao-edicao-senai">Excluir atividade?</h2>
            <p id="texto-confirmacao-edicao-senai">
              Esta ação removeria a atividade de {abaAtiva}.
            </p>
            <div className="acoes-confirmacao-edicao-senai">
              <button type="button" onClick={() => setConfirmarExclusao(false)}>
                Manter atividade
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmarExclusao(false);
                  setMensagem("Atividade não excluída: a edição ainda não está conectada ao servidor.");
                }}
              >
                Confirmar exclusão
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default EditarAtividadeSenai;
