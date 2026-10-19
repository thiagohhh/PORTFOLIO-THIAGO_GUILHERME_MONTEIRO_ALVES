import { useState } from "react";
import { Link } from "react-router-dom";

// o footer do site 
import Rodape from "../../Rodape/Rodape";

// imagens----------------------------

import circuloAmarelo from "../../../assets/imgs/senai/circulo-amarelo.png";
import circuloBranco from "../../../assets/imgs/senai/circulo-branco.png";
import estrelaAmarela from "../../../assets/imgs/senai/estrela-amarela.png";
import estrelaBranca from "../../../assets/imgs/senai/estrela-branca.png";
import iconeRelatorio from "../../../assets/imgs/senai/icone-relatorio.png";
import iconeProjeto from "../../../assets/imgs/senai/icone-projeto.svg";
import iconeGaleria from "../../../assets/imgs/senai/icone-galeria.svg";
// css disso

import "./CadastroAtividadeSenai.css";

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
    { nome: "texto_card", rotulo: "Texto do card", tipo: "textarea", linhas: 2 },
    { nome: "foto", rotulo: "Foto do projeto", tipo: "arquivo-imagem" },
    { nome: "etiquetas", rotulo: "Etiquetas", tipo: "etiquetas" },
  ],
  Códigos: [
    { nome: "titulo_codigo", rotulo: "Título do código" },
    { nome: "descricao_linguagem", rotulo: "Linguagem de programação" },
    { nome: "bloco_codigo", rotulo: "Código", tipo: "codigo", linhas: 8 },
  ],
  Galeria: [
    {
      nome: "tipo_midia",
      rotulo: "Tipo de mídia",
      tipo: "select",
      opcoes: ["Imagem", "Vídeo"],
    },
    { nome: "titulo_midia", rotulo: "Título da mídia" },
    { nome: "explicado_a_midia", rotulo: "Descrição da mídia", tipo: "textarea", linhas: 2 },
    { nome: "arquivo", rotulo: "Arquivo da galeria", tipo: "arquivo-midia" },
  ],
  Relatórios: [
    { nome: "titulo_relatorio", rotulo: "Título do relatório" },
    { nome: "paragrafo_relatorio", rotulo: "Texto do relatório", tipo: "textarea", linhas: 3 },
    { nome: "pdf", rotulo: "Arquivo PDF", tipo: "arquivo-pdf" },
    { nome: "etiquetas", rotulo: "Etiquetas", tipo: "etiquetas" },
  ],
  Aprendizagens: [
    { nome: "titulo_aprendizagem", rotulo: "Título da aprendizagem" },
    {
      nome: "descricao_aprendizagem",
      rotulo: "Descrição da aprendizagem",
      tipo: "textarea",
      linhas: 2,
    },
    { nome: "nivel_estrelas", rotulo: "Avaliação", tipo: "estrelas" },
  ],
  Autoavaliação: [
    { nome: "nota_bolinhas", rotulo: "Avaliação", tipo: "estrelas" },
    {
      nome: "percentual",
      rotulo: "Progresso da barra",
      tipo: "percentual",
      ajuda: "Digite um valor de 0 a 100 para definir o preenchimento da barra.",
    },
    { nome: "justificativa_texto", rotulo: "Justificativa", tipo: "textarea", linhas: 3 },
  ],
  Competências: [{ nome: "titulo_competencia", rotulo: "Título da competência" }],
};

const CadastroAtividadeSenai = () => {
  const [abaAtiva, setAbaAtiva] = useState("Projetos");
  const [valores, setValores] = useState({});
  const [avaliacoes, setAvaliacoes] = useState({});
  const [etiquetas, setEtiquetas] = useState({});
  const [etiquetaDigitada, setEtiquetaDigitada] = useState("");
  const [mensagem, setMensagem] = useState("");
  const campos = camposPorAba[abaAtiva];

  const chaveCampo = (nome) => `${abaAtiva}-${nome}`;
  const etiquetasAtuais = etiquetas[abaAtiva] || [];

  const atualizarCampo = (nome, valor) => {
    setValores((valoresAtuais) => ({
      ...valoresAtuais,
      [chaveCampo(nome)]: valor,
    }));
  };

  const adicionarEtiqueta = () => {
    const novaEtiqueta = etiquetaDigitada.trim();
    if (!novaEtiqueta || etiquetasAtuais.includes(novaEtiqueta)) return;

    setEtiquetas((atuais) => ({
      ...atuais,
      [abaAtiva]: [...(atuais[abaAtiva] || []), novaEtiqueta],
    }));
    setEtiquetaDigitada("");
  };

  const enviarFormulario = (evento) => {
    evento.preventDefault();
    setMensagem("Atividade não enviada: o cadastro ainda não está conectado ao servidor.");
  };

  const cancelarFormulario = () => {
    setValores({});
    setAvaliacoes({});
    setEtiquetas([]);
    setEtiquetaDigitada("");
    setMensagem("");
  };

  const renderizarCampo = (campo) => {
    const chave = chaveCampo(campo.nome);
    const valor = valores[chave] || "";

    if (campo.tipo === "etiquetas") {
      return (
        <div className="entrada-etiquetas-senai">
          <input
            id={chave}
            type="text"
            placeholder="Digite e clique em Adicionar"
            value={etiquetaDigitada}
            onChange={(evento) => setEtiquetaDigitada(evento.target.value)}
            onKeyDown={(evento) => {
              if (evento.key === "Enter") {
                evento.preventDefault();
                adicionarEtiqueta();
              }
            }}
          />
          <button type="button" onClick={adicionarEtiqueta}>
            Adicionar
          </button>
          {etiquetasAtuais.length > 0 && (
            <div className="etiquetas-senai">
              {etiquetasAtuais.map((etiqueta) => (
                <button
                  type="button"
                  key={etiqueta}
                  aria-label={`Remover etiqueta ${etiqueta}`}
                  onClick={() =>
                    setEtiquetas((atuais) => ({
                      ...atuais,
                      [abaAtiva]: (atuais[abaAtiva] || []).filter((item) => item !== etiqueta),
                    }))
                  }
                >
                  {etiqueta} ×
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (campo.tipo === "estrelas" || campo.tipo === "bolinhas") {
      const nota = avaliacoes[chave] || 0;
      const ehEstrela = campo.tipo === "estrelas";
      const imagemSelecionada = ehEstrela ? estrelaAmarela : circuloAmarelo;
      const imagemVazia = ehEstrela ? estrelaBranca : circuloBranco;

      return (
        <div
          className={`marcadores-senai ${ehEstrela ? "marcadores-estrelas-senai" : ""}`}
          role="group"
          aria-label={`${campo.rotulo}: ${nota} de 5`}
        >
          {[1, 2, 3, 4, 5].map((opcao) => (
            <button
              type="button"
              key={opcao}
              aria-label={`${opcao} de 5`}
              aria-pressed={nota === opcao}
              onClick={() =>
                setAvaliacoes((atuais) => ({ ...atuais, [chave]: opcao }))
              }
            >
              <img src={opcao <= nota ? imagemSelecionada : imagemVazia} alt="" />
            </button>
          ))}
        </div>
      );
    }

    if (campo.tipo === "percentual") {
      return (
        <div className="entrada-percentual-senai">
          <input
            id={chave}
            name={campo.nome}
            type="number"
            min="0"
            max="100"
            required
            aria-describedby={`${chave}-ajuda`}
            placeholder="0"
            value={valor}
            onChange={(evento) => atualizarCampo(campo.nome, evento.target.value)}
          />
          <span>%</span>
          <small id={`${chave}-ajuda`}>
            {campo.ajuda}
          </small>
        </div>
      );
    }

    if (campo.tipo?.startsWith("arquivo")) {
      const aceita = campo.tipo === "arquivo-pdf" ? ".pdf,application/pdf" : "image/*,video/*";
      const iconeArquivo =
        campo.tipo === "arquivo-pdf"
          ? iconeRelatorio
          : campo.tipo === "arquivo-imagem"
            ? iconeProjeto
            : iconeGaleria;
      return (
        <label
          className="area-arquivo-senai"
          htmlFor={chave}
          onDragOver={(evento) => evento.preventDefault()}
          onDrop={(evento) => {
            evento.preventDefault();
            const arquivo = evento.dataTransfer.files?.[0];
            if (arquivo) atualizarCampo(campo.nome, arquivo.name);
          }}
        >
          <img src={iconeArquivo} alt="" />
          <strong>Clique ou arraste para enviar</strong>
          <span>{valores[chave] || "Nenhum arquivo selecionado"}</span>
          <input
            id={chave}
            name={campo.nome}
            type="file"
            accept={aceita}
            onChange={(evento) =>
              atualizarCampo(campo.nome, evento.target.files?.[0]?.name || "")
            }
          />
        </label>
      );
    }

    if (campo.tipo === "select") {
      return (
        <select
          id={chave}
          name={campo.nome}
          value={valor}
          onChange={(evento) => atualizarCampo(campo.nome, evento.target.value)}
        >
          <option value="">Selecione...</option>
          {campo.opcoes.map((opcao) => (
            <option key={opcao} value={opcao}>
              {opcao}
            </option>
          ))}
        </select>
      );
    }

    if (campo.tipo === "textarea" || campo.tipo === "codigo") {
      return (
        <textarea
          id={chave}
          name={campo.nome}
          rows={campo.linhas}
          className={campo.tipo === "codigo" ? "editor-codigo-senai" : ""}
          placeholder={campo.tipo === "codigo" ? "Escreva ou cole o código..." : "Escreva aqui..."}
          value={valor}
          onChange={(evento) => atualizarCampo(campo.nome, evento.target.value)}
        />
      );
    }

    return (
      <input
        id={chave}
        name={campo.nome}
        type="text"
        placeholder="Escreva aqui..."
        value={valor}
        onChange={(evento) => atualizarCampo(campo.nome, evento.target.value)}
      />
    );
  };

  return (
    <div className="pagina-admin-senai">
      <header className="cabecalho-admin-senai">
        <Link className="voltar-admin-senai" to="/">
          ← Portfólio
        </Link>
        <span>Área do aluno</span>
      </header>

      <main className="conteudo-admin-senai">
        <aside className="navegacao-admin-senai" aria-label="Navegação administrativa">
          <button className="item-navegacao-senai ativo" type="button" aria-current="page">
            <span className="icone-navegacao-senai">+</span>
            Enviar atividade
          </button>
          <button className="item-navegacao-senai" type="button" disabled>
            <span className="icone-navegacao-senai">≡</span>
            Minhas atividades
          </button>
          <Link className="item-navegacao-senai sair-admin-senai" to="/admin/login">
            <span className="icone-navegacao-senai">↪</span>
            Sair
          </Link>
        </aside>

        <section className="area-cadastro-senai" aria-labelledby="titulo-cadastro-senai">
          <header className="titulo-cadastro-senai">
            <h1 id="titulo-cadastro-senai">
              Enviar
              <br />
              <span>atividade</span>
            </h1>
            <p>Nova atividade · {abaAtiva}</p>
          </header>

          <form className="formulario-cadastro-senai" onSubmit={enviarFormulario}>
            <fieldset className="grupo-selecao-senai">
              <legend>
                <span className="numero-etapa-senai">1</span>
                Instituição
              </legend>
              <div className="opcoes-senai">
                <Link className="opcao-senai" to="/admin/atividades/nova/sesi">
                  Sesi
                </Link>
                <button className="opcao-senai selecionada" type="button" aria-pressed="true">
                  Senai
                </button>
              </div>
            </fieldset>

            <fieldset className="grupo-selecao-senai">
              <legend>
                <span className="numero-etapa-senai">2</span>
                Aba
              </legend>
              <div className="opcoes-senai opcoes-abas-senai">
                {abas.map((aba) => (
                  <button
                    className={`opcao-senai ${abaAtiva === aba ? "selecionada" : ""}`}
                    key={aba}
                    type="button"
                    aria-pressed={abaAtiva === aba}
                    onClick={() => {
                      setAbaAtiva(aba);
                      setMensagem("");
                    }}
                  >
                    {aba}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="bloco-conteudo-senai">
              <legend>
                <span className="numero-etapa-senai">3</span>
                Conteúdo
              </legend>

              <label className="campo-senai" htmlFor={`unidade-${abaAtiva}`}>
                <span>Unidade curricular</span>
                <input
                  id={`unidade-${abaAtiva}`}
                  type="text"
                  placeholder="Digite a unidade curricular"
                  value={valores[`${abaAtiva}-unidade_curricular`] || ""}
                  onChange={(evento) =>
                    setValores((atuais) => ({
                      ...atuais,
                      [`${abaAtiva}-unidade_curricular`]: evento.target.value,
                    }))
                  }
                />
              </label>

              {campos.map((campo) => (
                <div className="campo-senai" key={campo.nome}>
                  {campo.tipo?.startsWith("arquivo") ? (
                    <span>{campo.rotulo}</span>
                  ) : campo.tipo === "estrelas" || campo.tipo === "bolinhas" || campo.tipo === "etiquetas" ? (
                    <span>{campo.rotulo}</span>
                  ) : (
                    <label htmlFor={chaveCampo(campo.nome)}>{campo.rotulo}</label>
                  )}
                  {renderizarCampo(campo)}
                </div>
              ))}

              <p className="destino-senai">Vai aparecer em: Senai › {abaAtiva}</p>

              <div className="acoes-senai">
                <button className="botao-enviar-senai" type="submit">
                  Enviar
                </button>
                <button
                  className="botao-cancelar-senai"
                  type="reset"
                  onClick={cancelarFormulario}
                >
                  Cancelar
                </button>
              </div>

              {mensagem && (
                <p className="mensagem-senai" role="status">
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

export default CadastroAtividadeSenai;
