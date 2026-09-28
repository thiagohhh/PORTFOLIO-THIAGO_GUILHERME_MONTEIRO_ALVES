import { Link } from "react-router-dom";
import "./LinksIniciais.css";

const LinksIniciais = ({ instituicao }) => {
  const rotaFormatada = `/${instituicao}`;

  return (
    <div className="caixa-links">
   
      <Link className="links" to={rotaFormatada} viewTransition>
        {instituicao}
      </Link>
    </div>
  );
};

export default LinksIniciais;
