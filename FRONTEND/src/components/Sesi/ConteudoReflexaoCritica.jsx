

import { useEffect, useState } from "react";
import "./ConteudoReflexaoCritica.css";
import { API } from "../../config.js";

function normalizarArea(valor) {
  return String(valor || "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").trim();
}

const ConteudoReflexaoCritica = ({ disciplina }) => {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscar() {
      try {
        const resposta = await fetch(`${API}/sesi/reflexoesCriticas`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const dados = await resposta.json();
        const todos = Array.isArray(dados) ? dados : [];
        setLista(todos.filter((item) => normalizarArea(item.area) === normalizarArea(disciplina)));
      } catch (erro) {
        console.error(erro);
        setLista([]);
      } finally {
        setCarregando(false);
      }
    }
    buscar();
  }, [disciplina]);

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
