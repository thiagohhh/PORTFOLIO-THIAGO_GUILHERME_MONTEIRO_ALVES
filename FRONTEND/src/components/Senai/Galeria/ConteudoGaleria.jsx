import { useEffect, useState } from "react";
import { chamarApi } from "../../../api";
import "./ConteudoGaleria.css";

const ConteudoGaleria = () => {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscar() {
      try {
        const resposta = await chamarApi("/senai/galeria");
        const dados = await resposta.json();
        setItens(Array.isArray(dados) ? dados : []);
      } catch (erro) {
        console.error(erro);
        setItens([]);
      } finally {
        setCarregando(false);
      }
    }
    buscar();
  }, []);

  if (carregando) return <p>Carregando galeria...</p>;
  if (itens.length === 0) return <p>Nenhuma mídia cadastrada ainda.</p>;

  return (
    <div className="grade-senai-galeria">
      {itens.map((item) => (
        <article className="cartao-galeria" key={item.id}>
          <div className="area-midia">
            {item.arquivo ? (
              <img
                src={`http://localhost:3333/${item.arquivo}`}
                alt={item.titulo_midia}
              />
            ) : (
              "Mídia"
            )}
          </div>
          <h3>{item.titulo_midia}</h3>
          <p>{item.explicado_a_midia}</p>
        </article>
      ))}
    </div>
  );
};

export default ConteudoGaleria;