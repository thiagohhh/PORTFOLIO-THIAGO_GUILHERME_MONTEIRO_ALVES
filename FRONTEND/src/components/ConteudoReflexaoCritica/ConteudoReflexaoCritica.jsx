import { useEffect, useState } from "react";
import { chamarApi } from "../../api";
import "./ConteudoReflexaoCritica.css";

const ConteudoReflexaoCritica = () => {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscar() {
      try {
        const resposta = await chamarApi("/sesi/reflexoesCriticas");
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

  if (carregando) return <p>Carregando...</p>;
  if (lista.length === 0) {
    return <p>Nenhuma reflexão crítica cadastrada ainda.</p>;
  }

  return (
    <div className="lista-reflexoes">
      {lista.map((item, index) => (
        <div key={item.id}>
          <div className="conteudo-reflexao-critica">
            <article className="cartao-reflexao">
              <h2>Aprendizado acadêmico</h2>
              <p>{item.aprendizado_academico}</p>
            </article>
            <article className="cartao-reflexao">
              <h2>Aplicação prática</h2>
              <p>{item.aplicacao_pratica}</p>
            </article>
            <article className="cartao-reflexao">
              <h2>Melhorias necessárias</h2>
              <p>{item.melhorias_necessarias}</p>
            </article>
            <article className="cartao-reflexao">
              <h2>Momentos desafiadores</h2>
              <p>{item.momentos_desafiadores}</p>
            </article>
          </div>

          {index < lista.length - 1 && <hr className="separador-sesi" />}
        </div>
      ))}
    </div>
  );
};

export default ConteudoReflexaoCritica;