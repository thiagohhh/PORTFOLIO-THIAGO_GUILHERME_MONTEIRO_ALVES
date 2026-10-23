import { useEffect, useState } from "react";
import { chamarApi } from "../../../api";
import iconeRelatorio from "../../../assets/imgs/senai/icone-relatorio.png";
import "./ConteudoRelatorios.css";

const ConteudoRelatorios = () => {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscar() {
      try {
        const resposta = await chamarApi("/senai/relatorios");
        const dados = await resposta.json();
        setLista(Array.isArray(dados) ? dados : []);
      } catch {
        setLista([]);
      } finally {
        setCarregando(false);
      }
    }
    buscar();
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (lista.length === 0) return <p>Nenhum relatório cadastrado.</p>;

  return (
    <div className="grade-senai-relatorios">
      {lista.map((item) => (
        <article className="cartao-relatorio" key={item.id}>
          <div className="icone-topo-relatorio">
            <img src={iconeRelatorio} alt="" />
          </div>
          <h3>{item.titulo_relatorio}</h3>
          <p>{item.paragrafo_relatorio}</p>
          <div className="acoes-relatorio">
            <a
              className="botao-relatorio claro"
              href={`http://localhost:3333/${item.pdf}`}
              target="_blank"
              rel="noreferrer"
            >
              Visualizar
            </a>
            <a
              className="botao-relatorio escuro"
              href={`http://localhost:3333/${item.pdf}`}
              download
            >
              Baixar PDF
            </a>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ConteudoRelatorios;