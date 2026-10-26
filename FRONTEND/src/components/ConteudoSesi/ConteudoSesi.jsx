import { useState } from "react";
import Header from "../Header/Header"; // O header
import Rodape from "../Rodape/Rodape"; // O footer
import MenuSecoes from "../MenuSecoes/MenuSecoes"; // As secoes que ficam do lado
import ConteudoFundamentos from "../ConteudoFundamentos/ConteudoFundamentos"; // Fundamentos teoricos
import ConteudoParticipacao from "../ConteudoParticipacao/ConteudoParticipacao"; // Participacao na sala
import ConteudoProjetos from "../ConteudoProjetos/ConteudoProjetos"; // proejtos e atividades
import ConteudoReflexaoCritica from "../ConteudoReflexaoCritica/ConteudoReflexaoCritica"; // refelxaxoc ritica
import ConteudoConexoesInterdisciplinares from "../ConteudoConexoesInterdisciplinares/ConteudoConexoesInterdisciplinares"; // conexao interdiscplinar
import ConteudoEscolaVida from "../ConteudoEscolaVida/ConteudoEscolaVida"; // da escola pra vida
import "./ConteudoSesi.css";

const secoesAnuais = [
  "Reflexão crítica",
  "Conexões interdisciplinares",
  "Da escola para a vida",
]; // as secoes que nao tem bimestre

const ConteudoSesi = ({ disciplina }) => {
  // Recebe as props de discplina do componetn: natureza, matematica, linguagens e humanas
  const [secaoAtiva, setSecaoAtiva] = useState("Fundamentos teóricos"); //  a primeira secao que aparece qunado entrar em uma area
  const [bimestreAtivo, setBimestreAtivo] = useState("1º bimestre"); // o primeiro bimestre que aparece ao entrar
  const secaoAnual = secoesAnuais.includes(secaoAtiva); /**  Verifica se a seção atual é anual Se for verdadero, sconde os botoes de bimestre se for falso ele mostra.*/

  function tituloDaSecao() { //Mostra o titulo da secao
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
    if (secaoAtiva === "Fundamentos teóricos") return <ConteudoFundamentos bimestre={bimestreAtivo} disciplina={disciplina}/>; //Se a secao ativda for fundamentos ele mostra o componete  e madna o biemstre e displina que aprece la em cima
    if (secaoAtiva === "Participação em sala") return <ConteudoParticipacao bimestre={bimestreAtivo} disciplina={disciplina}/>;//Se a secao ativda for participacao ele mostra o componete  e madna o biemstre e displina que aprece la em cima
    if (secaoAtiva === "Projetos e trabalhos") return <ConteudoProjetos bimestre={bimestreAtivo} disciplina={disciplina}/>;//Se a secao ativda for projetos e tarbalhos ele mostra o componete  e madna o biemstre e displina que aprece la em cima
    if (secaoAtiva === "Reflexão crítica") return <ConteudoReflexaoCritica/>; //Se a secao ativda for refelxao critica ele mostra o componete  e madna o biemstre e displina que aprece la em cima
    // Passa a disciplina da página pra teia filtrar a área certa
    if (secaoAtiva === "Conexões interdisciplinares") return <ConteudoConexoesInterdisciplinares disciplina={disciplina} />; //Se a secao ativda for Conexoe sinterciplinares ele mostra o componete  e madna o biemstre e displina que aprece la em cima
    if (secaoAtiva === "Da escola para a vida") return <ConteudoEscolaVida/>; //Se a secao ativda for escola para a vida ele mostra o componete  e madna o biemstre e displina que aprece la em cima
    return null; //Se a secao não existir ele nao mostra nada
  }

  return (
    <div className="conteudo-sesi-container">

      <Header /> {/**O header */}

      <main className="conteudo-sesi-main">
        <MenuSecoes secaoAtiva={secaoAtiva} aoSelecionarSecao={setSecaoAtiva} />   {/*secaoAtiva: Passa o texto da seção atual para o menu saber qual botão deixar amarela e o
                                                                                    aoSelecionarSecao: Passa a função 'setSecaoAtiva' para que 
                                                                                    o menu possa mudar a seção principal quando o usuário clicar em um botão.*/}

        <section className="painel-conteudo">

          <p className="disciplina-atual">{disciplina}</p> {/**Mostra a displina que esta vendo*/}
          <h1>{tituloDaSecao()}</h1> {/**Mostra o titulo das secao */}

          {!secaoAnual && ( /* Se nao for seção anual, exibe os botões de bimestre */
            <>
              <p className="etiqueta-conteudo">BIMESTRES · 4 PÁGINAS</p>

              <div className="seletor-bimestres">
                
                {["1º bimestre", "2º bimestre", "3º bimestre","4º bimestre",].map((bimestre) => (

                  <button key={bimestre} type="button" className={bimestreAtivo === bimestre ? "botao-bimestre ativo": "botao-bimestre"} /* Se o botão for o bimestre selecionado, adiciona a classe "ativo" */
                  
                  /* Atualiza o bimestre ativo na memória ao clicar */
                    onClick={() => setBimestreAtivo(bimestre)}>

                    <span className="indicador-bimestre"/> {bimestre}
                  </button>
                ))}
              </div>
            </>
          )}

          {mostrarConteudo()}{/* mostra a tela da seção selecionada logo abaixo */}
        </section>
      </main>

      <Rodape /> {/**O foter */}
    </div>
  );
};

export default ConteudoSesi;
