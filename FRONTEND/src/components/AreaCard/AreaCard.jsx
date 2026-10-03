import "./AreaCard.css";

const AreaCard = ({ titulo, descricao, icone }) => {
  return (
    <article className="card-area">
      <div className="card-header">
        <img src={icone} alt="" className="icon-area" />
        <h3>{titulo}</h3>
      </div>

      <p>{descricao}</p>

      <button type="button" className="btn-area">
        Abrir
      </button>
    </article>
  );
};

export default AreaCard;
