import { useEffect, useState } from "react";
import { chamarApi } from "../../api";
import "./ConteudoFundamentos.css";

const ConteudoFundamentos = ({ bimestre }) => {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const numeroBimestre =
    Number(String(bimestre || "1").replace(/\D/g, "")) || 1;

  useEffect(() => {
    async function buscar() {
      setCarregando(true);
      try {
        const resposta = await chamarApi("/sesi/fundamentosTeoricos");
        const dados = await resposta.json();
        const todos = Array.isArray(dados) ? dados : [];
        const doBimestre = todos.filter(
          (item) => Number(item.bimestre) === numeroBimestre
        );
        setLista(doBimestre);
      } catch (erro) {
        console.error(erro);
        setLista([]);
      } finally {
        setCarregando(false);
      }
    }
    buscar();
  }, [numeroBimestre]);

  if (carregando) return <p>Carregando...</p>;
  if (lista.length === 0) {
    return <p>Nenhum fundamento cadastrado neste bimestre.</p>;
  }

  return (
    <div className="lista-fundamentos">
      {lista.map((item, index) => (
        <div key={item.id} className="item-fundamento">
          <article className="resumo-conteudo">
            <h2>Resumo teórico</h2>
            <p>{item.resumo_teorico}</p>
          </article>

          <div className="blocos-conteudo">
            <article className="bloco-conteudo">
              <h2>Teorias</h2>
              <p>{item.teorias}</p>
            </article>
            <article className="bloco-conteudo">
              <h2>Conceitos</h2>
              <p>{item.conceitos}</p>
            </article>
            <article className="bloco-conteudo">
              <h2>Metodologias</h2>
              <p>{item.metodologias}</p>
            </article>
          </div>

          {/* linha entre um cadastro e o próximo */}
          {index < lista.length - 1 && <hr className="separador-fundamento" />}
        </div>
      ))}
    </div>
  );
};

export default ConteudoFundamentos;