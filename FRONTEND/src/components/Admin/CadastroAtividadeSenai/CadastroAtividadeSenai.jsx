import { useState } from "react";
import { Link } from "react-router-dom";
import Rodape from "../../Rodape/Rodape";
import { chamarApi } from "../../../api";

import circuloAmarelo from "../../../assets/imgs/senai/circulo-amarelo.png";
import circuloBranco from "../../../assets/imgs/senai/circulo-branco.png";
import estrelaAmarela from "../../../assets/imgs/senai/estrela-amarela.png";
import estrelaBranca from "../../../assets/imgs/senai/estrela-branca.png";
import iconeRelatorio from "../../../assets/imgs/senai/icone-relatorio.png";
import iconeProjeto from "../../../assets/imgs/senai/icone-projeto.svg";
import iconeGaleria from "../../../assets/imgs/senai/icone-galeria.svg";

import "./CadastroAtividadeSenai.css";

// Abas e rotas da API
const abas = [
  "Projetos",
  "Códigos",
  "Galeria",
  "Relatórios",
  "Aprendizagens",
  "Autoavaliação",
  "Competências",
];

const rotas = {
  Projetos: "/senai/projetos",
  Códigos: "/senai/codigos",
  Galeria: "/senai/galeria",
  Relatórios: "/senai/relatorios",
  Aprendizagens: "/senai/aprendizagens",
  Autoavaliação: "/senai/autoavaliacoes",
  Competências: "/senai/competencias",
};

// Quais abas enviam arquivo
const abasComArquivo = ["Projetos", "Galeria", "Relatórios"];

const CadastroAtividadeSenai = () => {
  const [abaAtiva, setAbaAtiva] = useState("Projetos");
  const [mensagem, setMensagem] = useState("");

  // Campos em comum
  const [unidadeCurricular, setUnidadeCurricular] = useState("");

  // Projetos
  const [tituloProjeto, setTituloProjeto] = useState("");
  const [textoCard, setTextoCard] = useState("");
  const [nomeFoto, setNomeFoto] = useState("");
  const [etiquetas, setEtiquetas] = useState([]);
  const [novaEtiqueta, setNovaEtiqueta] = useState("");

  // Códigos
  const [tituloCodigo, setTituloCodigo] = useState("");
  const [linguagem, setLinguagem] = useState("");
  const [blocoCodigo, setBlocoCodigo] = useState("");

  // Galeria
  const [tipoMidia, setTipoMidia] = useState("");
  const [tituloMidia, setTituloMidia] = useState("");
  const [descricaoMidia, setDescricaoMidia] = useState("");
  const [nomeArquivoGaleria, setNomeArquivoGaleria] = useState("");

  // Relatórios
  const [tituloRelatorio, setTituloRelatorio] = useState("");
  const [textoRelatorio, setTextoRelatorio] = useState("");
  const [nomePdf, setNomePdf] = useState("");

  // Aprendizagens
  const [tituloAprendizagem, setTituloAprendizagem] = useState("");
  const [descricaoAprendizagem, setDescricaoAprendizagem] = useState("");
  const [estrelas, setEstrelas] = useState(0);

  // Autoavaliação
  const [bolinhas, setBolinhas] = useState(0);
  const [percentual, setPercentual] = useState("");
  const [justificativa, setJustificativa] = useState("");

  // Competências
  const [tituloCompetencia, setTituloCompetencia] = useState("");

  // ---------- Etiquetas ----------
  function adicionarEtiqueta() {
    const texto = novaEtiqueta.trim();
    if (!texto || etiquetas.includes(texto)) return;
    setEtiquetas([...etiquetas, texto]);
    setNovaEtiqueta("");
  }

  function removerEtiqueta(etiqueta) {
    setEtiquetas(etiquetas.filter((e) => e !== etiqueta));
  }

  // ---------- Limpar formulário ----------
  function limparFormulario() {
    setUnidadeCurricular("");
    setTituloProjeto("");
    setTextoCard("");
    setNomeFoto("");
    setEtiquetas([]);
    setNovaEtiqueta("");
    setTituloCodigo("");
    setLinguagem("");
    setBlocoCodigo("");
    setTipoMidia("");
    setTituloMidia("");
    setDescricaoMidia("");
    setNomeArquivoGaleria("");
    setTituloRelatorio("");
    setTextoRelatorio("");
    setNomePdf("");
    setTituloAprendizagem("");
    setDescricaoAprendizagem("");
    setEstrelas(0);
    setBolinhas(0);
    setPercentual("");
    setJustificativa("");
    setTituloCompetencia("");
    setMensagem("");
  }

  // ---------- Enviar ----------
  async function enviarFormulario(evento) {
    evento.preventDefault();
    setMensagem("");

    const alunoId = localStorage.getItem("alunoId");
    let opcoes;

    // Abas com arquivo usam FormData
    if (abasComArquivo.includes(abaAtiva)) {
      const dados = new FormData(evento.currentTarget);
      dados.append("aluno_id", alunoId);

      // etiquetas (se tiver)
      etiquetas.forEach((et) => dados.append("etiquetas[]", et));

      opcoes = { method: "POST", body: dados };
    } else {
      // Abas sem arquivo usam JSON
      const dados = {
        aluno_id: alunoId,
        unidade_curricular: unidadeCurricular,
      };

      if (abaAtiva === "Códigos") {
        dados.titulo_codigo = tituloCodigo;
        dados.descricao_linguagem = linguagem;
        dados.bloco_codigo = blocoCodigo;
      }
      if (abaAtiva === "Aprendizagens") {
        dados.titulo_aprendizagem = tituloAprendizagem;
        dados.descricao_aprendizagem = descricaoAprendizagem;
        dados.nivel_estrelas = estrelas;
      }
      if (abaAtiva === "Autoavaliação") {
        dados.nota_bolinhas = bolinhas;
        dados.percentual = percentual;
        dados.justificativa_texto = justificativa;
      }
      if (abaAtiva === "Competências") {
        dados.titulo_competencia = tituloCompetencia;
      }

      opcoes = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      };
    }

    try {
      const resposta = await chamarApi(rotas[abaAtiva], opcoes);
      const resultado = await resposta.json();
      setMensagem(resposta.ok ? "Atividade enviada!" : resultado.message || "Erro ao enviar");
      if (resposta.ok) limparFormulario();
    } catch {
      setMensagem("Não foi possível conectar ao servidor.");
    }
  }

  // ---------- Área de arquivo (clique + arrastar) ----------
  function AreaArquivo({ id, name, accept, icone, rotulo, nomeArquivo, setNomeArquivo }) {
    return (
      <div
        className="area-arquivo-senai"
        onClick={() => document.getElementById(id)?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const arquivo = e.dataTransfer.files?.[0];
          if (!arquivo) return;
          const input = document.getElementById(id);
          if (input) {
            const dt = new DataTransfer();
            dt.items.add(arquivo);
            input.files = dt.files;
          }
          setNomeArquivo(arquivo.name);
        }}
      >
        <img src={icone} alt="" />
        <strong>Clique ou arraste para enviar ({rotulo})</strong>
        <span>{nomeArquivo || "Nenhum arquivo selecionado"}</span>
        <input
          id={id}
          name={name}
          type="file"
          accept={accept}
          style={{ display: "none" }}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setNomeArquivo(e.target.files?.[0]?.name || "")}
        />
      </div>
    );
  }

  // ---------- Estrelas / bolinhas ----------
  function Marcadores({ valor, setValor, tipo }) {
    const ativo = tipo === "estrelas" ? estrelaAmarela : circuloAmarelo;
    const inativo = tipo === "estrelas" ? estrelaBranca : circuloBranco;

    return (
      <div className={`marcadores-senai ${tipo === "estrelas" ? "marcadores-estrelas-senai" : ""}`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button type="button" key={n} onClick={() => setValor(n)}>
            <img src={n <= valor ? ativo : inativo} alt="" />
          </button>
        ))}
      </div>
    );
  }

  // ---------- Campos de cada aba ----------
  function camposDaAba() {
    if (abaAtiva === "Projetos") {
      return (
        <>
          <div className="campo-senai">
            <input
              name="titulo_projeto"
              type="text"
              placeholder="Digite o título do projeto..."
              value={tituloProjeto}
              onChange={(e) => setTituloProjeto(e.target.value)}
            />
          </div>
          <div className="campo-senai">
            <textarea
              name="texto_card"
              rows={2}
              placeholder="Escreva o texto do card aqui..."
              value={textoCard}
              onChange={(e) => setTextoCard(e.target.value)}
            />
          </div>
          <div className="campo-senai">
            <AreaArquivo
              id="foto-projeto"
              name="foto"
              accept="image/*"
              icone={iconeProjeto}
              rotulo="foto do projeto"
              nomeArquivo={nomeFoto}
              setNomeArquivo={setNomeFoto}
            />
          </div>
          <div className="campo-senai">
            <div className="entrada-etiquetas-senai">
              <input
                type="text"
                placeholder="Digite e pressione Enter ou Adicionar"
                value={novaEtiqueta}
                onChange={(e) => setNovaEtiqueta(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    adicionarEtiqueta();
                  }
                }}
              />
              <button type="button" onClick={adicionarEtiqueta}>
                Adicionar
              </button>
              {etiquetas.length > 0 && (
                <div className="etiquetas-senai">
                  {etiquetas.map((et) => (
                    <button type="button" key={et} onClick={() => removerEtiqueta(et)}>
                      {et} ×
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      );
    }

    if (abaAtiva === "Códigos") {
      return (
        <>
          <div className="campo-senai">
            <input
              type="text"
              placeholder="Digite o título do código..."
              value={tituloCodigo}
              onChange={(e) => setTituloCodigo(e.target.value)}
            />
          </div>
          <div className="campo-senai">
            <input
              type="text"
              placeholder="Digite a linguagem de programação..."
              value={linguagem}
              onChange={(e) => setLinguagem(e.target.value)}
            />
          </div>
          <div className="campo-senai">
            <textarea
              className="editor-codigo-senai"
              rows={8}
              placeholder="Escreva ou cole o código..."
              value={blocoCodigo}
              onChange={(e) => setBlocoCodigo(e.target.value)}
            />
          </div>
        </>
      );
    }

    if (abaAtiva === "Galeria") {
      return (
        <>
          <div className="campo-senai">
            <select
              name="tipo_midia"
              value={tipoMidia}
              onChange={(e) => setTipoMidia(e.target.value)}
            >
              <option value="">Selecione tipo de mídia...</option>
              <option value="Imagem">Imagem</option>
              <option value="Vídeo">Vídeo</option>
            </select>
          </div>
          <div className="campo-senai">
            <input
              name="titulo_midia"
              type="text"
              placeholder="Digite o título da mídia..."
              value={tituloMidia}
              onChange={(e) => setTituloMidia(e.target.value)}
            />
          </div>
          <div className="campo-senai">
            <textarea
              name="explicado_a_midia"
              rows={2}
              placeholder="Escreva a descrição da mídia aqui..."
              value={descricaoMidia}
              onChange={(e) => setDescricaoMidia(e.target.value)}
            />
          </div>
          <div className="campo-senai">
            <AreaArquivo
              id="arquivo-galeria"
              name="arquivo"
              accept="image/*,video/*"
              icone={iconeGaleria}
              rotulo="arquivo da galeria"
              nomeArquivo={nomeArquivoGaleria}
              setNomeArquivo={setNomeArquivoGaleria}
            />
          </div>
        </>
      );
    }

    if (abaAtiva === "Relatórios") {
      return (
        <>
          <div className="campo-senai">
            <input
              name="titulo_relatorio"
              type="text"
              placeholder="Digite o título do relatório..."
              value={tituloRelatorio}
              onChange={(e) => setTituloRelatorio(e.target.value)}
            />
          </div>
          <div className="campo-senai">
            <textarea
              name="paragrafo_relatorio"
              rows={3}
              placeholder="Escreva o texto do relatório aqui..."
              value={textoRelatorio}
              onChange={(e) => setTextoRelatorio(e.target.value)}
            />
          </div>
          <div className="campo-senai">
            <AreaArquivo
              id="arquivo-pdf"
              name="pdf"
              accept=".pdf,application/pdf"
              icone={iconeRelatorio}
              rotulo="arquivo pdf"
              nomeArquivo={nomePdf}
              setNomeArquivo={setNomePdf}
            />
          </div>
          <div className="campo-senai">
            <div className="entrada-etiquetas-senai">
              <input
                type="text"
                placeholder="Digite e pressione Enter ou Adicionar"
                value={novaEtiqueta}
                onChange={(e) => setNovaEtiqueta(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    adicionarEtiqueta();
                  }
                }}
              />
              <button type="button" onClick={adicionarEtiqueta}>
                Adicionar
              </button>
              {etiquetas.length > 0 && (
                <div className="etiquetas-senai">
                  {etiquetas.map((et) => (
                    <button type="button" key={et} onClick={() => removerEtiqueta(et)}>
                      {et} ×
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      );
    }

    if (abaAtiva === "Aprendizagens") {
      return (
        <>
          <div className="campo-senai">
            <input
              type="text"
              placeholder="Digite o título da aprendizagem..."
              value={tituloAprendizagem}
              onChange={(e) => setTituloAprendizagem(e.target.value)}
            />
          </div>
          <div className="campo-senai">
            <textarea
              rows={2}
              placeholder="Escreva a descrição da aprendizagem aqui..."
              value={descricaoAprendizagem}
              onChange={(e) => setDescricaoAprendizagem(e.target.value)}
            />
          </div>
          <div className="campo-senai">
            <Marcadores valor={estrelas} setValor={setEstrelas} tipo="estrelas" />
          </div>
        </>
      );
    }

    if (abaAtiva === "Autoavaliação") {
      return (
        <>
          <div className="campo-senai">
            <Marcadores valor={bolinhas} setValor={setBolinhas} tipo="bolinhas" />
          </div>
          <div className="campo-senai">
            <div className="entrada-percentual-senai">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="0"
                value={percentual}
                onChange={(e) => setPercentual(e.target.value)}
              />
              <span>%</span>
              <small>Digite um valor de 0 a 100 para definir o preenchimento da barra.</small>
            </div>
          </div>
          <div className="campo-senai">
            <textarea
              rows={3}
              placeholder="Escreva a justificativa aqui..."
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
            />
          </div>
        </>
      );
    }

    if (abaAtiva === "Competências") {
      return (
        <div className="campo-senai">
          <input
            type="text"
            placeholder="Digite o título da competência..."
            value={tituloCompetencia}
            onChange={(e) => setTituloCompetencia(e.target.value)}
          />
        </div>
      );
    }

    return null;
  }

  // ---------- Tela ----------
  return (
    <div className="pagina-admin-senai">
      <header className="cabecalho-admin-senai">
        <Link className="voltar-admin-senai" to="/">
          ← Portfólio
        </Link>
        <span>Área do aluno</span>
      </header>

      <main className="conteudo-admin-senai">
        <aside className="navegacao-admin-senai">
          <button className="item-navegacao-senai ativo" type="button">
            <span className="icone-navegacao-senai">+</span> Enviar atividade
          </button>
          <button className="item-navegacao-senai" type="button" disabled>
            <span className="icone-navegacao-senai">≡</span> Minhas atividades
          </button>
          <Link
            className="item-navegacao-senai sair-admin-senai"
            to="/admin/login"
            onClick={() => localStorage.removeItem("token")}
          >
            <span className="icone-navegacao-senai">↪</span> Sair
          </Link>
        </aside>

        <section className="area-cadastro-senai">
          <header className="titulo-cadastro-senai">
            <h1>
              Enviar
              <br />
              <span>atividade</span>
            </h1>
            <p>Nova atividade · {abaAtiva}</p>
          </header>

          <form className="formulario-cadastro-senai" onSubmit={enviarFormulario}>
            {/* 1 - Instituição */}
            <fieldset className="grupo-selecao-senai">
              <legend>
                <span className="numero-etapa-senai">1</span>Instituição
              </legend>
              <div className="opcoes-senai">
                <Link className="opcao-senai" to="/admin/atividades/nova/sesi">
                  Sesi
                </Link>
                <button className="opcao-senai selecionada" type="button">
                  Senai
                </button>
              </div>
            </fieldset>

            {/* 2 - Aba */}
            <fieldset className="grupo-selecao-senai">
              <legend>
                <span className="numero-etapa-senai">2</span>Aba
              </legend>
              <div className="opcoes-senai opcoes-abas-senai">
                {abas.map((aba) => (
                  <button
                    key={aba}
                    type="button"
                    className={`opcao-senai ${abaAtiva === aba ? "selecionada" : ""}`}
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

            {/* 3 - Conteúdo */}
            <fieldset className="bloco-conteudo-senai">
              <legend>
                <span className="numero-etapa-senai">3</span>Conteúdo
              </legend>

              <div className="campo-senai">
                <label htmlFor="unidade-curricular">Unidade Curricular</label>
                <input
                  id="unidade-curricular"
                  name="unidade_curricular"
                  type="text"
                  placeholder="Digite a unidade curricular..."
                  value={unidadeCurricular}
                  onChange={(e) => setUnidadeCurricular(e.target.value)}
                />
              </div>

              {camposDaAba()}

              <p className="destino-senai">
                Vai aparecer em: Senai › {abaAtiva}
              </p>

              <div className="acoes-senai">
                <button className="botao-enviar-senai" type="submit">
                  Enviar
                </button>
                <button
                  className="botao-cancelar-senai"
                  type="button"
                  onClick={limparFormulario}
                >
                  Cancelar
                </button>
              </div>

              {mensagem && <p className="mensagem-senai">{mensagem}</p>}
            </fieldset>
          </form>
        </section>
      </main>

      <Rodape />
    </div>
  );
};

export default CadastroAtividadeSenai;