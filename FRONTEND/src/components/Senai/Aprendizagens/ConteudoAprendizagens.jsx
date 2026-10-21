import { useEffect, useState } from "react";
import { chamarApi } from "../../../api";
import estrelaAmarela from "../../../assets/imgs/senai/estrela-amarela.png";
import estrelaBranca from "../../../assets/imgs/senai/estrela-branca.png";
import "./ConteudoAprendizagens.css";

const ConteudoAprendizagens = () => {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscar() {
      try {
        const resposta = await chamarApi("/senai/aprendizagens");
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

  if (carregando) return <p>Carregando aprendizagens...</p>;
  if (lista.length === 0) return <p>Nenhuma aprendizagem cadastrada ainda.</p>;

  return (
    <div className="grade-senai-aprendizagens">
      {lista.map((item) => (
        <article className="cartao-aprendizagem" key={item.id}>
          <h3>{item.titulo_aprendizagem}</h3>
          <p>{item.descricao_aprendizagem}</p>
          <div className="estrelas-aprendizagem">
            {[1, 2, 3, 4, 5].map((n) => (
              <img
                key={n}
                src={n <= (item.nivel_estrelas || 0) ? estrelaAmarela : estrelaBranca}
                alt=""
              />
            ))}
          </div>
        </article>
      ))}
    </div>
  );
};

export default ConteudoAprendizagens;