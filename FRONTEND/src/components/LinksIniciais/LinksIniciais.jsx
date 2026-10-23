import { Link } from "react-router-dom";
import "./LinksIniciais.css";

const LinksIniciais = ({ instituicao }) => {
   //  Se a instituição for  senai o endereço vira "/senai" se for sesi vira "/sesi"
  const rotaFormatada = `/${instituicao}`;

  return (
    <div className="caixa-links">
   {/* Cria o botão na tela que leva a pessoa para o endereço que criamos acima */}
      <Link className="links" to={rotaFormatada}>
        {instituicao}  {/* Mostra o nome da instituição escrito no botão */} 
      </Link>
    </div>
  );
};

export default LinksIniciais;
