import { useState } from "react";
import Header from "../Header/Header";
import Rodape from "../Rodape/Rodape";
import MenuSenai from "./MenuSenai";
import ConteudoProjetos from "./Projetos/ConteudoProjetos";
import ConteudoCodigo from "./Codigo/ConteudoCodigo";
import ConteudoGaleria from "./Galeria/ConteudoGaleria";
import ConteudoRelatorios from "./Relatorios/ConteudoRelatorios";
import ConteudoAprendizagens from "./Aprendizagens/ConteudoAprendizagens";
import ConteudoAutoavaliacao from "./Autoavaliacao/ConteudoAutoavaliacao";
import "./Senai.css";

const Senai = () => {

  const [abaAtual, setAbaAtual] = useState("Projetos");


  function mostrarConteudo() {
    if (abaAtual === "Projetos") return <ConteudoProjetos />;
    if (abaAtual === "Código") return <ConteudoCodigo />;
    if (abaAtual === "Galeria") return <ConteudoGaleria />;
    if (abaAtual === "Relatórios") return <ConteudoRelatorios />;
    if (abaAtual === "Aprendizagens") return <ConteudoAprendizagens />;
    if (abaAtual === "Autoavaliação") return <ConteudoAutoavaliacao />;
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