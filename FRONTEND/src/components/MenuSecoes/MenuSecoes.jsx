import BotaoSecao from "../BotaoSecao/BotaoSecao";
import "./MenuSecoes.css";


const secoes = [
  { numero: "1", texto: "Fundamentos teóricos" },
  { numero: "2", texto: "Participação em sala" },
  { numero: "3", texto: "Projetos e trabalhos" },
  { numero: "4", texto: "Reflexão crítica" },
  { numero: "5", texto: "Conexões interdisciplinares" },
  { numero: "6", texto: "Da escola para a vida" },
];

const MenuSecoes = ({ secaoAtiva, aoSelecionarSecao }) => {
  return (
    <nav className="menu-conteudo">
      {secoes.map((secao) => (
        <BotaoSecao
          key={secao.texto}
          numero={secao.numero}
          texto={secao.texto}
          ativo={secaoAtiva === secao.texto}
          aoClicar={() => aoSelecionarSecao(secao.texto)}
        />
      ))}
    </nav>
  );
};

export default MenuSecoes;