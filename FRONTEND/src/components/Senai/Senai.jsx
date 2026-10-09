import { useState } from "react";
import Header from "../Header/Header";
import Rodape from "../Rodape/Rodape";
import MenuSenai from "./MenuSenai";
import "./Senai.css";

const Senai = () => {
  const [secaoAtiva, setSecaoAtiva] = useState("Projetos");

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

        <MenuSenai
          secaoAtiva={secaoAtiva}
          aoSelecionarSecao={setSecaoAtiva}
        />

        <section className="senai-conteudo" aria-live="polite">
          <h2 className="senai-conteudo-titulo">{secaoAtiva}</h2>
          <p className="senai-conteudo-descricao">
            O conteúdo da seção “{secaoAtiva}” será adicionado aqui.
          </p>
        </section>
      </main>

      <Rodape />
    </div>
  );
};

export default Senai;