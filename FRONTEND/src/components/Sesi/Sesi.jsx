import Header from "../Header/Header"; // o header
import AreaCard from "../AreaCard/AreaCard"; // o componete que aparece na tela do sesi 
import Rodape from "../Rodape/Rodape";  // O footer
import bookOpen from "../../assets/imgs/book-open.png"; // icone que aparece em linguagens
import globe from "../../assets/imgs/globe.png"; // icone que apoareca em humanas
import matematica from "../../assets/imgs/matematica.png"; // icone que apoareca em matematica
import vector from "../../assets/imgs/Vector.png"; // icone que apoareca em natureza
import "./Sesi.css";

const Sesi = () => {
  return (
    <div className="sesi-container">
      <Header /> {/**O header que pode mudar par ao senai e o sesi ou voltar */}

      <main className="sesi-main">
        <header className="disciplinas-header">
          <h1>
            Portfólio <span className="nome">Sesi</span>
          </h1>
          <p className="intinerario">TÉCNICO EM INFORMÁTICA PARA INTERNET</p>
        </header> {/**O titulo da página */}

        <p className="descricao-area">
          Escolha uma disciplina para conhecer minhas atividades e aprendizados.
        </p> {/**texto logo abaixo do titulo */}

        <div className="materias-caixa"> {/**caixa onde guarda as areas de conhecimmento */}

          <AreaCard titulo="Ciências da Natureza" descricao="A vida, a matéria e os fenômenos do mundo natural." 
           icone={vector} to="/Sesi/conteudo/natureza"/> {/**Manda as porps para area card colocar no component de natureza*/}

          <AreaCard titulo="Linguagens" descricao="Comunicação, expressão e diferentes formas de criar."
            icone={bookOpen} to="/Sesi/conteudo/linguagens"/> {/**Manda as porps para area card colocar no component de lingaunges*/}

          <AreaCard titulo="Ciências Humanas" descricao="Sociedade, história e nosso lugar no mundo."
            icone={globe} to="/Sesi/conteudo/humanas"/> {/**Manda as porps para area card colocar no component de humanas*/}

          <AreaCard titulo="Matemática" descricao="Números, lógica e caminhos para resolver problemas." 
          icone={matematica} to="/Sesi/conteudo/matematica"/> {/**Manda as porps para area card colocar no component de matematica*/}
        </div>
      </main>

      <Rodape /> {/**O foter */}
    </div>
  );
};

export default Sesi;
