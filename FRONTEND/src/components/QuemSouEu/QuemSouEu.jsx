import LinksIniciais from "../LinksIniciais/LinksIniciais";
import "./QuemSouEu.css";

const QuemSouEu = () => {
  return (
    <div className="pagina-inicial">
      <div className="coluna-texto">
        <header className="portfolio-header">
          <h1>
            EU SOU <span className="nome">THIAGO GUILHERME</span>
          </h1>
          <p className="intinerario">TÉCNICO EM INFORMÁTICA PARA INTERNET</p>
        </header>

        <p className="descricao-texto">
          Minhas expectativas para este ano estão diretamente conectadas à minha
          paixão por tecnologia e ao desejo de criar soluções reais por meio da
          programação. Como estudante do 3º ano do Ensino Médio, meu principal
          objetivo é consolidar os conhecimentos que venho adquirindo no
          itinerário técnico do SENAI, aprofundando minhas habilidades práticas
          em desenvolvimento Front-end, Back-end e bancos de dados. Busco
          evoluir constantemente, transformando linhas de código e conceitos
          teóricos em aplicações web funcionais e no design de interfaces
          digitais. Minha meta para esta etapa é concluir o ciclo escolar com
          uma base sólida, preparado para os desafios do mercado de trabalho e
          motivado a desenvolver projetos de destaque que façam a diferença.
        </p>
      </div>

      <div className="sesi-senai">
        <img className="foto-perfil" />
        <div className="botoes-instituicoes">
          <LinksIniciais instituicao="Sesi" className="sesi" />
          <LinksIniciais instituicao="Senai" className="senai" />
        </div>
      </div>
    </div>
  );
};

export default QuemSouEu;
