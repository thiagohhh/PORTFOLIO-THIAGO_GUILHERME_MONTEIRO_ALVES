import "./BotaoSecao.css";

const BotaoSecao = ({ numero, texto, ativo, aoClicar }) => {
  return (
    <button
      className={ativo ? "item-menu-conteudo ativo" : "item-menu-conteudo"}
      type="button"
      onClick={aoClicar}
    >
      <span className="numero-menu">{numero}</span>
      <span>{texto}</span>
    </button>
  );
};

export default BotaoSecao;
