import "./MenuSenai.css";

const secoesSenai = [
  { nome: "Projetos", id: "projetos" },
  { nome: "Código", id: "codigo" },
  { nome: "Galeria", id: "galeria" },
  { nome: "Relatórios", id: "relatorios" },
  { nome: "Aprendizagens", id: "aprendizagens" },
  { nome: "Autoavaliação", id: "autoavaliacao" },
];

const MenuSenai = ({ secaoAtiva, aoSelecionarSecao }) => {
  return (
    <nav className="menu-senai" role="tablist" aria-label="Seções do portfólio Senai">
      {secoesSenai.map((secao) => (
        <button
          key={secao.nome}
          id={`aba-senai-${secao.id}`}
          className={`botao-senai ${secaoAtiva === secao.nome ? "ativo" : ""}`}
          role="tab"
          aria-selected={secaoAtiva === secao.nome}
          aria-controls="painel-senai"
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
