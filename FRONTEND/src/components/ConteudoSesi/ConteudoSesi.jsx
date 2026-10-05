import { useState } from "react";
import Header from "../Header/Header";
import Rodape from "../Rodape/Rodape";
import MenuSecoes from "../MenuSecoes/MenuSecoes"; //mostra os botões laterais para escolher a seção.
import ConteudoFundamentos from "../ConteudoFundamentos/ConteudoFundamentos";
import ConteudoParticipacao from "../ConteudoParticipacao/ConteudoParticipacao";
import ConteudoProjetos from "../ConteudoProjetos/ConteudoProjetos";
import "./ConteudoSesi.css";

const ConteudoSesi = ({ disciplina }) => {
  const [secaoAtiva, setSecaoAtiva] = useState("Fundamentos teóricos");
  const [bimestreAtivo, setBimestreAtivo] = useState("1º bimestre");

  return (
    <div className="conteudo-sesi-container">
      <Header />

      <main className="conteudo-sesi-main">
        <MenuSecoes secaoAtiva={secaoAtiva} aoSelecionarSecao={setSecaoAtiva} />

        <section className="painel-conteudo">
          <p className="disciplina-atual">{disciplina}</p>
          <h1>
            {secaoAtiva === "Fundamentos teóricos" && (
              <>
                Fundamentos
                <br />
                <span className="texto-amarelo">teóricos</span>
              </>
            )}
            {secaoAtiva === "Participação em sala" && (
              <>
                Participação
                <br />
                <span className="texto-amarelo">em sala</span>
              </>
            )}
            {secaoAtiva === "Projetos e trabalhos" && (
              <>
                Projetos
                <br />
                <span className="texto-amarelo">e trabalhos</span>
              </>
            )}
            {secaoAtiva === "Reflexão crítica" && (
              <>
                Reflexão
                <br />
                <span className="texto-amarelo">crítica</span>
              </>
            )}
            {secaoAtiva === "Conexões interdisciplinares" && (
              <>
                Conexões
                <br />
                <span className="texto-amarelo">interdisciplinares</span>
              </>
            )}
            {secaoAtiva === "Da escola para a vida" && (
              <>
                Da escola
                <br />
                <span className="texto-amarelo">para a vida</span>
              </>
            )}
          </h1>
          <p className="etiqueta-conteudo">BIMESTRES · 4 PÁGINAS</p>

          <div className="seletor-bimestres">
            <button
              className={
                bimestreAtivo === "1º bimestre"
                  ? "botao-bimestre ativo"
                  : "botao-bimestre"
              }
              type="button"
              onClick={() => setBimestreAtivo("1º bimestre")}
            >
              <span className="indicador-bimestre" />
              1º bimestre
            </button>

            <button
              className={
                bimestreAtivo === "2º bimestre"
                  ? "botao-bimestre ativo"
                  : "botao-bimestre"
              }
              type="button"
              onClick={() => setBimestreAtivo("2º bimestre")}
            >
              <span className="indicador-bimestre" />
              2º bimestre
            </button>

            <button
              className={
                bimestreAtivo === "3º bimestre"
                  ? "botao-bimestre ativo"
                  : "botao-bimestre"
              }
              type="button"
              onClick={() => setBimestreAtivo("3º bimestre")}
            >
              <span className="indicador-bimestre" />
              3º bimestre
            </button>

            <button
              className={
                bimestreAtivo === "4º bimestre"
                  ? "botao-bimestre ativo"
                  : "botao-bimestre"
              }
              type="button"
              onClick={() => setBimestreAtivo("4º bimestre")}
            >
              <span className="indicador-bimestre" />
              4º bimestre
            </button>
          </div>

          {secaoAtiva === "Fundamentos teóricos" && <ConteudoFundamentos />}
          {secaoAtiva === "Participação em sala" && <ConteudoParticipacao />}
          {secaoAtiva === "Projetos e trabalhos" && <ConteudoProjetos />}
          {secaoAtiva === "Reflexão crítica" && <ConteudoFundamentos />}
          {secaoAtiva === "Conexões interdisciplinares" && (
            <ConteudoFundamentos />
          )}
          {secaoAtiva === "Da escola para a vida" && <ConteudoFundamentos />}
        </section>
      </main>

      <Rodape />
    </div>
  );
};

export default ConteudoSesi;
