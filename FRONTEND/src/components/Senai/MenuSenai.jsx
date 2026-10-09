import "./MenuSenai.css";

const secoesSenai = [
  { nome: "Projetos", classe: "botao-projetos" },
  { nome: "Código", classe: "botao-codigo" },
  { nome: "Galeria", classe: "botao-galeria" },
  { nome: "Relatórios", classe: "botao-relatorios" },
  { nome: "Aprendizagens", classe: "botao-aprendizagens" },
  { nome: "Autoavaliação", classe: "botao-autoavaliacao" },
];

const MenuSenai = ({ secaoAtiva, aoSelecionarSecao }) => {
  return (
    <nav className="menu-senai" >
      {secoesSenai.map((secao) => (
        <button
          key={secao.nome}
          className={`botao-senai ${secao.classe} ${secaoAtiva === secao.nome ? "ativo" : ""}`}
          type="button"
          onClick={() => aoSelecionarSecao(secao.nome)}
        >
          {secao.nome}
        </button>
      ))}
    </nav>
  );
};

export default MenuSenai;
