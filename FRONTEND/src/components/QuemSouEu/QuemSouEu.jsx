import LinksIniciais from "../LinksIniciais/LinksIniciais";
import "./QuemSouEu.css";
import traco from "../../assets/imgs/Traço.png";
import simbolo from "../../assets/imgs/Símbolo.png";

const QuemSouEu = () => {
  return (
    <div className="pagina-inicial">
      <header className="cabecalho-pagina">
        <div className="marca-portfolio">
          <img src={simbolo} alt="" className="simbolo-marca" />
          <strong>PORTFÓLIO ESCOLAR</strong>
        </div>
        <span className="texto-cabecalho">Ensino médio + formação técnica</span>
      </header>

      <main className="conteudo-inicial">
        <section className="coluna-texto">
          <header className="portfolio-header">
            <h1>
              EU SOU <br />
              <span className="nome">THIAGO GUILHERME</span>
            </h1>
            <p className="intinerario">TÉCNICO EM INFORMÁTICA PARA INTERNET</p>
          </header>

          <p className="descricao-texto">
            Sou Thiago Guilherme, estudante do ensino médio e do curso Técnico
            em Informática para Internet. Neste portfólio, reúno atividades,
            projetos e reflexões da minha trajetória de aprendizagem, conectando
            os conhecimentos da escola ao universo da tecnologia.
          </p>

          <div className="explorar-portfolio">
            <img src={traco} alt="" className="traco" />
            <strong>Explore meu portfólio: Sesi ou Senai.</strong>
          </div>
        </section>

        <section className="sesi-senai">
          <div className="foto-perfil" />
          <div className="botoes-instituicoes">
            <LinksIniciais instituicao="Sesi" />
            <LinksIniciais instituicao="Senai" />
          </div>
        </section>
      </main>

      <footer className="rodape-pagina">
        <span>Thiago Guilherme · Portfólio escolar</span>
        <span>Aprendizados, atividades e projetos.</span>
      </footer>
    </div>
  );
};

export default QuemSouEu;
