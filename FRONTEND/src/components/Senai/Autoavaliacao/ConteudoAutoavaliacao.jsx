import { useEffect, useState } from "react";
import { chamarApi } from "../../../api";
import circuloAmarelo from "../../../assets/imgs/senai/circulo-amarelo.png";
import circuloBranco from "../../../assets/imgs/senai/circulo-branco.png";
import "./ConteudoAutoavaliacao.css";

const ConteudoAutoavaliacao = () => {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscar() {
      try {
        const resposta = await chamarApi("/senai/autoavaliacoes");
        const dados = await resposta.json();
        setLista(Array.isArray(dados) ? dados : []);
      } catch (erro) {
        console.error(erro);
        setLista([]);
      } finally {
        setCarregando(false);
      }
    }
    buscar();
  }, []);

  if (carregando) return <p>Carregando autoavaliações...</p>;
  if (lista.length === 0) return <p>Nenhuma autoavaliação cadastrada ainda.</p>;

  return (
    <div className="grade-autoavaliacao">
      {lista.map((item) => (
        <article className="cartao-autoavaliacao" key={item.id}>
          <h3>{item.unidade_curricular || "Autoavaliação"}</h3>

          <span className="rotulo-autoavaliacao">Avaliação</span>
          <div className="marcadores-autoavaliacao">
            {[1, 2, 3, 4, 5].map((n) => (
              <img
                key={n}
                src={n <= (item.nota_bolinhas || 0) ? circuloAmarelo : circuloBranco}
                alt=""
              />
            ))}
          </div>

          <div className="cabecalho-progresso-autoavaliacao">
            <span className="rotulo-autoavaliacao">Progresso</span>
            <strong>{item.percentual || 0}%</strong>
          </div>

          <div className="barra-autoavaliacao">
            <span style={{ width: `${item.percentual || 0}%` }} />
          </div>

          <span className="rotulo-autoavaliacao">Justificativa</span>
          <p>{item.justificativa_texto || ""}</p>
        </article>
      ))}
    </div>
  );
};

export default ConteudoAutoavaliacao;