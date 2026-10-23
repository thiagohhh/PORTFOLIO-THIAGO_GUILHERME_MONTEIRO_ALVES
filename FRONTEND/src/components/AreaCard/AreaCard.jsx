import "./AreaCard.css";
import { Link } from "react-router-dom";

const AreaCard = ({ titulo, descricao, icone, to }) => { //recebe props do componete sesi
  return (
    <div className="card-area">
      <div className="card-header">
        <img src={icone} alt="" className="icon-area" /> {/** O icone amarelinho que aparece */}
        <h3>{titulo}</h3> {/**o nome da area  */}
      </div>

      <p>{descricao}</p> {/**um texto falando algunas coisas */}

      <Link className="btn-area" to={to}> Abrir</Link>
    </div>
  );
};

export default AreaCard;
