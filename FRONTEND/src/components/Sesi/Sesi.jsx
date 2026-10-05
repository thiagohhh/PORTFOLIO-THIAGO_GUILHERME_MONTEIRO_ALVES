import Header from "../Header/Header";
import AreaCard from "../AreaCard/AreaCard";
import Rodape from "../Rodape/Rodape";
import "./Sesi.css";
import bookOpen from "../../assets/imgs/book-open.png";
import globe from "../../assets/imgs/globe.png";
import matematica from "../../assets/imgs/matematica.png";
import vector from "../../assets/imgs/Vector.png";


const Sesi = () => {
  return (
    <div className="sesi-container">
      <Header />

      <main className="sesi-main">
        <header className="disciplinas-header">
          <h1>
            Portfólio <span className="nome">Sesi</span>
          </h1>
          <p className="intinerario">TÉCNICO EM INFORMÁTICA PARA INTERNET</p>
        </header>

        <p className="descricao-area">
          Escolha uma disciplina para conhecer minhas atividades e aprendizados
          no ensino médio.
        </p>

        <div className="materias-caixa">
          <AreaCard
            titulo="Ciências da Natureza"
            descricao="A vida, a matéria e os fenômenos do mundo natural."
            icone={vector}
            to="/Sesi/conteudo/natureza"
          />

          <AreaCard
            titulo="Linguagens"
            descricao="Comunicação, expressão e diferentes formas de criar."
            icone={bookOpen}
            to="/Sesi/conteudo/linguagens"
          />

          <AreaCard
            titulo="Ciências Humanas"
            descricao="Sociedade, história e nosso lugar no mundo."
            icone={globe}
            to="/Sesi/conteudo/humanas"
          />

          <AreaCard
            titulo="Matemática"
            descricao="Números, lógica e caminhos para resolver problemas."
            icone={matematica}
            to="/Sesi/conteudo/matematica"
          />
        </div>
      </main>

      <Rodape />
    </div>
  );
};

export default Sesi;
