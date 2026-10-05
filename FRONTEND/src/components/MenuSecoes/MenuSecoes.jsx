import BotaoSecao from "../BotaoSecao/BotaoSecao";
import "./MenuSecoes.css";

const MenuSecoes = ({ secaoAtiva, aoSelecionarSecao }) => {
  return (
    <nav className="menu-conteudo">
      <BotaoSecao
        numero="1"
        texto="Fundamentos teóricos"
        ativo={secaoAtiva === "Fundamentos teóricos"}
        aoClicar={() => aoSelecionarSecao("Fundamentos teóricos")}
      />

      <BotaoSecao
        numero="2"
        texto="Participação em sala"
        ativo={secaoAtiva === "Participação em sala"}
        aoClicar={() => aoSelecionarSecao("Participação em sala")}
      />

      <BotaoSecao
        numero="3"
        texto="Projetos e trabalhos"
        ativo={secaoAtiva === "Projetos e trabalhos"}
        aoClicar={() => aoSelecionarSecao("Projetos e trabalhos")}
      />

      <BotaoSecao
        numero="4"
        texto="Reflexão crítica"
        ativo={secaoAtiva === "Reflexão crítica"}
        aoClicar={() => aoSelecionarSecao("Reflexão crítica")}
      />

      <BotaoSecao
        numero="5"
        texto="Conexões interdisciplinares"
        ativo={secaoAtiva === "Conexões interdisciplinares"}
        aoClicar={() => aoSelecionarSecao("Conexões interdisciplinares")}
      />

      <BotaoSecao
        numero="6"
        texto="Da escola para a vida"
        ativo={secaoAtiva === "Da escola para a vida"}
        aoClicar={() => aoSelecionarSecao("Da escola para a vida")}
      />
    </nav>
  );
};

export default MenuSecoes;
