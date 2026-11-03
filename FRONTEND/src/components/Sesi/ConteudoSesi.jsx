

import { useState } from "react";
import Header from "../layout/Header"; 
import Rodape from "../layout/Rodape"; 
import MenuSecoes from "../layout/MenuSecoes"; 
import ConteudoFundamentos from "./ConteudoFundamentos"; 
import ConteudoParticipacao from "./ConteudoParticipacao"; 
import ConteudoProjetos from "./ConteudoProjetos"; 
import ConteudoReflexaoCritica from "./ConteudoReflexaoCritica"; 
import ConteudoConexoesInterdisciplinares from "./ConteudoConexoesInterdisciplinares"; 
import ConteudoEscolaVida from "./ConteudoEscolaVida"; 
import "./ConteudoSesi.css";

const secoesAnuais = [
  "Reflexão crítica",
  "Conexões interdisciplinares",
  "Da escola para a vida",
]; 

const ConteudoSesi = ({ disciplina }) => {
  const [secaoAtiva, setSecaoAtiva] = useState("Fundamentos teóricos"); 
  const [bimestreAtivo, setBimestreAtivo] = useState("1º bimestre"); 
  const secaoAnual = secoesAnuais.includes(secaoAtiva); 

  function tituloDaSecao() { 
    if (secaoAtiva === "Fundamentos teóricos") {
      return (
        <>
          <span>Fundamentos</span>
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
    
    if (secaoAtiva === "Fundamentos teóricos") return <ConteudoFundamentos bimestre={bimestreAtivo} disciplina={disciplina}/>; 
    if (secaoAtiva === "Participação em sala") return <ConteudoParticipacao bimestre={bimestreAtivo} disciplina={disciplina}/>;
    if (secaoAtiva === "Projetos e trabalhos") return <ConteudoProjetos bimestre={bimestreAtivo} disciplina={disciplina}/>;
    if (secaoAtiva === "Reflexão crítica") return <ConteudoReflexaoCritica/>; 
    if (secaoAtiva === "Conexões interdisciplinares") return <ConteudoConexoesInterdisciplinares disciplina={disciplina} />; 
    if (secaoAtiva === "Da escola para a vida") return <ConteudoEscolaVida/>; 
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

          {!secaoAnual && ( 
            <>
              <p className="etiqueta-conteudo">BIMESTRES · 4 PÁGINAS</p>

              <div className="seletor-bimestres">
                
                {["1º bimestre", "2º bimestre", "3º bimestre","4º bimestre",].map((bimestre) => (

                  <button key={bimestre} type="button" className={bimestreAtivo === bimestre ? "botao-bimestre ativo": "botao-bimestre"} 
                  
                  
                    onClick={() => setBimestreAtivo(bimestre)}>

                    <span className="indicador-bimestre"/> {bimestre}
                  </button>
                ))}
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
