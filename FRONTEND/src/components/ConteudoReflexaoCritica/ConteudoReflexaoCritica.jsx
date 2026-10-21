import { useEffect, useState } from "react";
import { chamarApi } from "../../api";
import "./ConteudoReflexaoCritica.css";

const ConteudoReflexaoCritica = () => {
  const [item, setItem] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscar() {
      try {
        const resposta = await chamarApi("/sesi/reflexoesCriticas");
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
  if (!item) return <p>Nenhuma reflexão crítica cadastrada ainda.</p>;

  return (
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
        <div className="etiquetas-reflexao">
          <span>Facilidades</span>
          <span>Desafios</span>
          <span>Aprendizados</span>
        </div>
      </article>
    </div>
  );
};

export default ConteudoReflexaoCritica;