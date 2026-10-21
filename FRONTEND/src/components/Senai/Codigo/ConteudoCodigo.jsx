import { useEffect, useState } from "react";
import { chamarApi } from "../../../api";
import "./ConteudoCodigo.css";

const ConteudoCodigo = () => {
  const [codigos, setCodigos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscar() {
      try {
        const resposta = await chamarApi("/senai/codigos");
        const dados = await resposta.json();
        setCodigos(Array.isArray(dados) ? dados : []);
      } catch (erro) {
        console.error(erro);
        setCodigos([]);
      } finally {
        setCarregando(false);
      }
    }
    buscar();
  }, []);

  if (carregando) return <p>Carregando códigos...</p>;
  if (codigos.length === 0) return <p>Nenhum código cadastrado ainda.</p>;

  return (
    <div className="grade-senai-codigo">
      {codigos.map((item) => (
        <article className="cartao-codigo" key={item.id}>
          <h3>{item.titulo_codigo}</h3>
          <p>{item.descricao_linguagem}</p>
          <pre>
            <code>{item.bloco_codigo}</code>
          </pre>
        </article>
      ))}
    </div>
  );
};

export default ConteudoCodigo;