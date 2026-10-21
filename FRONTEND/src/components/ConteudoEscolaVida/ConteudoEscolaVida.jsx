import { useEffect, useState } from "react";
import { chamarApi } from "../../api";
import "./ConteudoEscolaVida.css";

const ConteudoEscolaVida = () => {
  const [item, setItem] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscar() {
      try {
        const resposta = await chamarApi("/sesi/escolaParaVida");
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
  if (!item) return <p>Nenhum registro cadastrado ainda.</p>;

  return (
    <div className="conteudo-escola-vida">
      <article className="cartao-escola-vida">
        <h2>Reflexão sobre experiências</h2>
        <p>{item.reflexao_experiencia}</p>
      </article>

      <article className="cartao-escola-vida">
        <h2>Aplicação dos conhecimentos</h2>
        <p>{item.aplicacao_conhecimentos}</p>
      </article>

      <article className="cartao-escola-vida">
        <h2>Como a escola influenciou minha forma de pensar e agir?</h2>
        <p>{item.influencia_forma_agir_pensar}</p>
      </article>

      <article className="cartao-escola-vida">
        <h2>Que habilidades desenvolvi para o meu futuro?</h2>
        <p>{item.habilidades_desenvolvidas}</p>
      </article>

      <article className="cartao-escola-vida cartao-escola-completo">
        <h2>Como os desafios me prepararam para novas etapas?</h2>
        <p>{item.desafios_novas_etapas}</p>
      </article>
    </div>
  );
};

export default ConteudoEscolaVida;