import { useEffect, useState } from "react";
import { chamarApi } from "../../api";
import "./ConteudoParticipacao.css";

const ConteudoParticipacao = ({ bimestre }) => {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const numeroBimestre =
    Number(String(bimestre || "1").replace(/\D/g, "")) || 1;

  useEffect(() => {
    async function buscar() {
      setCarregando(true);
      try {
        const resposta = await chamarApi("/sesi/participacoesEmSala");
        const dados = await resposta.json();
        const todos = Array.isArray(dados) ? dados : [];
        setLista(
          todos.filter((item) => Number(item.bimestre) === numeroBimestre)
        );
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
    return <p>Nenhuma participação cadastrada neste bimestre.</p>;
  }

  return (
    <div className="lista-participacoes">
      {lista.map((item, index) => (
        <div key={item.id} className="item-participacao">
          <div className="conteudo-participacao">
            <article className="cartao-participacao">
              <h2>Registro de atividades</h2>
              <p>{item.registro_atividades}</p>
            </article>

            <article className="cartao-participacao">
              <h2>O que mais chamou minha atenção</h2>
              <p>{item.o_que_chamou_atencao}</p>
            </article>

            <article className="cartao-participacao">
              <h2>Reflexão prática</h2>
              <p>{item.reflexao_pratica}</p>
            </article>

            <article className="cartao-participacao">
              <h2>Autoavaliação do engajamento</h2>
              <div className="avaliacao-engajamento">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className={
                      n <= (item.autoavaliacao || 0)
                        ? "ponto-avaliacao marcado"
                        : "ponto-avaliacao"
                    }
                  />
                ))}
              </div>
              <p>{item.justificativa_autoavaliacao}</p>
            </article>
          </div>

          {index < lista.length - 1 && <hr className="separador-sesi" />}
        </div>
      ))}
    </div>
  );
};

export default ConteudoParticipacao;