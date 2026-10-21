import "./MenuSenai.css";

const abas = [
  "Projetos",
  "Código",
  "Galeria",
  "Relatórios",
  "Aprendizagens",
  "Autoavaliação",
];

const MenuSenai = ({ abaAtual, aoClicarNaAba }) => {
  return (
    <nav className="menu-senai">
      {abas.map((nome) => (
        <button
          key={nome}
          type="button"
          className={`botao-senai ${abaAtual === nome ? "ativo" : ""}`}
          onClick={() => aoClicarNaAba(nome)}
        >
          {nome}
        </button>
      ))}
    </nav>
  );
};

export default MenuSenai;