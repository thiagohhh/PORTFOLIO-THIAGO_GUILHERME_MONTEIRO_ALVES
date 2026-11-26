import "./MenuSenai.css";

const abas = [
  "Projetos",
  "Galeria",
  "Código",
  "Relatórios",
  "Aprendizagens",
  "Autoavaliação",
  "Competências",
];

const MenuSenai = ({ abaAtual, aoClicarNaAba }) => {
  return (
    <nav className="menu-senai" aria-label="Seções do portfólio SENAI">
      {abas.map((nome) => (
        <button
          key={nome}
          type="button"
          className={`botao-senai ${abaAtual === nome ? "ativo" : ""}`}
          onClick={() => aoClicarNaAba(nome)}
          aria-current={abaAtual === nome ? "page" : undefined}
        >
          {nome}
        </button>
      ))}
    </nav>
  );
};

export default MenuSenai;
