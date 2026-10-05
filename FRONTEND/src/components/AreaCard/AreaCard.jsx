import "./AreaCard.css";
import { Link } from "react-router-dom";

const AreaCard = ({ titulo, descricao, icone, to }) => {
  return (
    <article className="card-area">
      <div className="card-header">
        <img src={icone} alt="" className="icon-area" />
        <h3>{titulo}</h3>
      </div>

      <p>{descricao}</p>

      <Link className="btn-area" to={to}>
        Abrir
      </Link>
    </article>
  );
};

export default AreaCard;
