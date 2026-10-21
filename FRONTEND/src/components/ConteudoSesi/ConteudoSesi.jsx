import { useState } from "react";
import Header from "../Header/Header";
import Rodape from "../Rodape/Rodape";
import MenuSecoes from "../MenuSecoes/MenuSecoes";
import ConteudoFundamentos from "../ConteudoFundamentos/ConteudoFundamentos";
import ConteudoParticipacao from "../ConteudoParticipacao/ConteudoParticipacao";
import ConteudoProjetos from "../ConteudoProjetos/ConteudoProjetos";
import ConteudoReflexaoCritica from "../ConteudoReflexaoCritica/ConteudoReflexaoCritica";
import ConteudoConexoesInterdisciplinares from "../ConteudoConexoesInterdisciplinares/ConteudoConexoesInterdisciplinares";
import ConteudoEscolaVida from "../ConteudoEscolaVida/ConteudoEscolaVida";
import "./ConteudoSesi.css";

const secoesAnuais = [
  "Reflexão crítica",
  "Conexões interdisciplinares",
  "Da escola para a vida",
];

const ConteudoSesi = ({ disciplina }) => {
  const [secaoAtiva, setSecaoAtiva] = useState("Fundamentos teóricos");
  const [bimestreAtivo, setBimestreAtivo] = useState("1º bimestre");

  const ehSecaoAnual = secoesAnuais.includes(secaoAtiva);

  function tituloDaSecao() {
    if (secaoAtiva === "Fundamentos teóricos") {
      return (
        <>
          Fundamentos
          <br />
          <span className="texto-amarelo">teóricos</span>
        </>
      );
    }
    if (secaoAtiva === "Participação em sala") {
      return (
        <>
          Participação
          <br />
          <span className="texto-amarelo">em sala</span>
        </>
      );
    }
    if (secaoAtiva === "Projetos e trabalhos") {
      return (
        <>
          Projetos
          <br />
          <span className="texto-amarelo">e trabalhos</span>
        </>
      );
    }
    if (secaoAtiva === "Reflexão crítica") {
      return (
        <>
          Reflexão
          <br />
          <span className="texto-amarelo">crítica</span>
        </>
      );
    }
    if (secaoAtiva === "Conexões interdisciplinares") {
      return (
        <>
          Conexões
          <br />
          <span className="texto-amarelo">interdisciplinares</span>
        </>
      );
    }
    if (secaoAtiva === "Da escola para a vida") {
      return (
        <>
          Da escola
          <br />
          <span className="texto-amarelo">para a vida</span>
        </>
      );
    }
    return secaoAtiva;
  }

  function mostrarConteudo() {
    // Passa o bimestre para as seções que usam
    const props = { bimestre: bimestreAtivo, disciplina };

    if (secaoAtiva === "Fundamentos teóricos") {
      return <ConteudoFundamentos {...props} />;
    }
    if (secaoAtiva === "Participação em sala") {
      return <ConteudoParticipacao {...props} />;
    }
    if (secaoAtiva === "Projetos e trabalhos") {
      return <ConteudoProjetos {...props} />;
    }
    if (secaoAtiva === "Reflexão crítica") {
      return <ConteudoReflexaoCritica />;
    }
    if (secaoAtiva === "Conexões interdisciplinares") {
      return <ConteudoConexoesInterdisciplinares />;
    }
    if (secaoAtiva === "Da escola para a vida") {
      return <ConteudoEscolaVida />;
    }
    return null;
  }

  return (
    <div className="conteudo-sesi-container">
      <Header />

      <main className="conteudo-sesi-main">
        <MenuSecoes secaoAtiva={secaoAtiva} aoSelecionarSecao={setSecaoAtiva} />

        <section className="painel-conteudo">
          <p className="disciplina-atual">{disciplina}</p>
          <h1>{tituloDaSecao()}</h1>

          {/* Bimestres: classe seletor-bimestres = 4 colunas na horizontal */}
          {!ehSecaoAnual && (
            <>
              <p className="etiqueta-conteudo">BIMESTRES · 4 PÁGINAS</p>

              <div className="seletor-bimestres">
                {["1º bimestre", "2º bimestre", "3º bimestre", "4º bimestre"].map(
                  (bimestre) => (
                    <button
                      key={bimestre}
                      type="button"
                      className={
                        bimestreAtivo === bimestre
                          ? "botao-bimestre ativo"
                          : "botao-bimestre"
                      }
                      onClick={() => setBimestreAtivo(bimestre)}
                    >
                      <span className="indicador-bimestre" />
                      {bimestre}
                    </button>
                  )
                )}
              </div>
            </>
          )}

          {mostrarConteudo()}
        </section>
      </main>

      <Rodape />
    </div>
  );
};

export default ConteudoSesi;