import "./ConteudoAutoavaliacao.css";
import circuloAmarelo from "../../../assets/imgs/senai/circulo-amarelo.png";
import circuloBranco from "../../../assets/imgs/senai/circulo-branco.png";

const competencias = [
  { nome: "Front-end", avaliacao: 4, progresso: 75 },
  { nome: "Back-end", avaliacao: 3, progresso: 50 },
  { nome: "Banco de dados", avaliacao: 4, progresso: 75 },
];

const ConteudoAutoavaliacao = () => {
  return (
    <div className="grade-autoavaliacao">
      {competencias.map((competencia) => (
        <article className="cartao-autoavaliacao" key={competencia.nome}>
          <h3>{competencia.nome}</h3>
          <span className="rotulo-autoavaliacao">Avaliação</span>
          <div
            className="marcadores-autoavaliacao"
            aria-label={`${competencia.avaliacao} de 5 círculos selecionados`}
          >
            {Array.from({ length: 5 }, (_, indice) => (
              <img
                key={indice}
                src={indice < competencia.avaliacao ? circuloAmarelo : circuloBranco}
                alt=""
              />
            ))}
          </div>
          <span className="rotulo-autoavaliacao">Progresso</span>
          <div className="barra-autoavaliacao" aria-hidden="true">
            <span style={{ width: `${competencia.progresso}%` }} />
          </div>
          <span className="rotulo-autoavaliacao">Justificativa</span>
          <div className="linha-autoavaliacao" />
        </article>
      ))}
    </div>
  );
};

export default ConteudoAutoavaliacao;
