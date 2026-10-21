import { useEffect, useState } from "react";
import { chamarApi } from "../../api";
import "./ConteudoConexoesInterdisciplinares.css";

const ConteudoConexoesInterdisciplinares = () => {
  const [item, setItem] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscar() {
      try {
        const resposta = await chamarApi("/sesi/conexoesInterdisciplinares");
        const dados = await resposta.json();
        const lista = Array.isArray(dados) ? dados : [];
        setItem(lista[0] || null);
      } catch (erro) {
        console.error(erro);
        setItem(null);
      } finally {
        setCarregando(false);
      }
    }
    buscar();
  }, []);

  if (carregando) return <p>Carregando...</p>;

  return (
    <div className="conteudo-conexoes">
      {/* Mapa visual (só decoração) */}
      <div className="mapa-conexoes">
        <div className="linha-disciplinas">
          <div className="no-conexao">Física</div>
          <div className="no-conexao">Português</div>
        </div>
        <div className="no-conexao destaque-conexao">Matemática</div>
        <div className="linha-disciplinas">
          <div className="no-conexao">Geografia</div>
          <div className="no-conexao">História</div>
        </div>
      </div>

      <article className="cartao-conexoes">
        <h2>Relações interdisciplinares</h2>
        {item ? (
          <p>{item.relacoes_interdisciplinares}</p>
        ) : (
          <p>Nenhuma conexão cadastrada ainda.</p>
        )}
      </article>
    </div>
  );
};

export default ConteudoConexoesInterdisciplinares;