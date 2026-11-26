import { useState } from "react";
import Header from "../layout/Header";
import Rodape from "../layout/Rodape";
import MenuSenai from "./MenuSenai";
import ConteudoProjetos from "./ConteudoProjetos";
import ConteudoCodigo from "./ConteudoCodigo";
import ConteudoRelatorios from "./ConteudoRelatorios";
import ConteudoAprendizagens from "./ConteudoAprendizagens";
import ConteudoAutoavaliacao from "./ConteudoAutoavaliacao";
import ConteudoCompetencias from "./ConteudoCompetencias";
import "./Senai.css";

const Senai = () => {
  const [abaAtual, setAbaAtual] = useState("Projetos");

  function mostrarConteudo() {
    if (abaAtual === "Projetos") return <ConteudoProjetos />;
    if (abaAtual === "Código") return <ConteudoCodigo />;
    if (abaAtual === "Relatórios") return <ConteudoRelatorios />;
    if (abaAtual === "Aprendizagens") return <ConteudoAprendizagens />;
    if (abaAtual === "Autoavaliação") return <ConteudoAutoavaliacao />;
    if (abaAtual === "Competências") return <ConteudoCompetencias />;
    return <ConteudoProjetos />;
  }

  return (
    <div className="senai-container">
      <Header />
      <main className="senai-main">
        <header className="senai-titulo">
          <h1 className="senai-titulo-principal">
            Portfólio <span className="senai-nome">SENAI</span>
          </h1>
          <p className="senai-subtitulo">TECNOLOGIA, APRENDIZADOS E PROJETOS</p>
        </header>
        <MenuSenai abaAtual={abaAtual} aoClicarNaAba={setAbaAtual} />
        <section className="senai-conteudo">{mostrarConteudo()}</section>
      </main>
      <Rodape />
    </div>
  );
};

export default Senai;
