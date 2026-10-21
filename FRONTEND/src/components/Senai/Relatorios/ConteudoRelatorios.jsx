import { useEffect, useState } from "react";
import { chamarApi } from "../../../api";
import "./ConteudoRelatorios.css";

const ConteudoRelatorios = () => {
  const [relatorios, setRelatorios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscar() {
      try {
        const resposta = await chamarApi("/senai/relatorios");
        const dados = await resposta.json();
        setRelatorios(Array.isArray(dados) ? dados : []);
      } catch (erro) {
        console.error(erro);
        setRelatorios([]);
      } finally {
        setCarregando(false);
      }
    }
    buscar();
  }, []);

  if (carregando) return <p>Carregando relatórios...</p>;
  if (relatorios.length === 0) return <p>Nenhum relatório cadastrado ainda.</p>;

  return (
    <div className="grade-senai-relatorios">
      {relatorios.map((item) => (
        <article className="cartao-relatorio" key={item.id}>
          <h3>{item.titulo_relatorio}</h3>
          <p>{item.paragrafo_relatorio}</p>
          {item.pdf && (
            <a href={`http://localhost:3333/${item.pdf}`} target="_blank" rel="noreferrer">
              Ver PDF
            </a>
          )}
        </article>
      ))}
    </div>
  );
};

export default ConteudoRelatorios;