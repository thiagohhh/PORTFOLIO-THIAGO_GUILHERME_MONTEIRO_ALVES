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

const conteudosSenai = {
  Projetos: ConteudoProjetos,
  Código: ConteudoCodigo,
  Galeria: ConteudoGaleria,
  Relatórios: ConteudoRelatorios,
  Aprendizagens: ConteudoAprendizagens,
  Autoavaliação: ConteudoAutoavaliacao,
};

const Senai = () => {
  const [secaoAtiva, setSecaoAtiva] = useState("Projetos");
  const ConteudoAtivo = conteudosSenai[secaoAtiva];

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

        <section
          className="senai-conteudo"
          id="painel-senai"
          role="tabpanel"
          aria-labelledby={`aba-senai-${secaoAtiva.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
          aria-live="polite"
        >
          <ConteudoAtivo />
        </section>
      </main>

      <Rodape />
    </div>
  );
};

export default Senai;