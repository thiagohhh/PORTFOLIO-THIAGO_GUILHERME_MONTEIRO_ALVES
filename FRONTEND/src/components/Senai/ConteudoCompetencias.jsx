import { useEffect, useState } from "react";
import "./ConteudoCompetencias.css";
import { API } from "../../config.js";

const ConteudoCompetencias = () => {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscar() {
      try {
        const resposta = await fetch(`${API}/senai/competencias`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!resposta.ok) throw new Error("Falha ao carregar competências");
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

  if (carregando) return <p>Carregando competências...</p>;
  if (lista.length === 0) return <p>Nenhuma competência cadastrada ainda.</p>;

  return (
    <div className="grade-competencias-senai">
      {lista.map((item) => (
        <article className="cartao-competencia-senai" key={item.id}>
          <h3>{item.titulo_competencia}</h3>
          {item.unidade_curricular && (
            <span>{item.unidade_curricular}</span>
          )}
        </article>
      ))}
    </div>
  );
};

export default ConteudoCompetencias;
