import "./ConteudoRelatorios.css";
import iconeRelatorio from "../../../assets/imgs/senai/icone-relatorio.png";

const relatorios = ["Relatório técnico 01", "Relatório técnico 02", "Relatório técnico 03"];

const ConteudoRelatorios = () => {
  return (
    <div className="grade-senai-relatorios">
      {relatorios.map((relatorio) => (
        <article className="cartao-relatorio" key={relatorio}>
          <img className="icone-relatorio" src={iconeRelatorio} alt="" />
          <h3>{relatorio}</h3>
          <p>Inclua um resumo e o arquivo correspondente a este relatório.</p>
          <span className="estado-relatorio">Arquivo a adicionar</span>
        </article>
      ))}
    </div>
  );
};

export default ConteudoRelatorios;
