import { Link } from "react-router-dom";
import "./Header.css"
import  Separador from "../../assets/imgs/Separador.png";


const Header = () => {
  return (
    <header className="cabeario-sesi-senai">
         <Link to="/" className="voltar">← Início</Link>

         <div className="sesi-senai-separacao">
            <Link to="/Sesi" className="sesi-separacao">Sesi</Link>
            <img src={Separador} className="separador" alt="" />
            <Link to="/Senai" className="senai-separacao">Senai</Link>
         </div>
      
    </header>
  )
}

export default Header
