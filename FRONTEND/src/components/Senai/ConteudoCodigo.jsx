


import { useEffect, useState } from "react";
import "./ConteudoCodigo.css";
import { API } from "../../config.js";
import { codigosDoRepositorio } from "./conteudoRepositorio.js";

const ConteudoCodigo = () => {
  const [codigos, setCodigos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscar() {
      try {
        const resposta = await fetch(`${API}/senai/codigos`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const dados = await resposta.json();
        const cadastrados = Array.isArray(dados) ? dados : [];
        const chaves = new Set(cadastrados.map((item) =>
          (item.titulo_codigo || "").trim().toLowerCase() + "|" + (item.descricao_linguagem || "").trim().toLowerCase()
        ));
        const complementares = codigosDoRepositorio.filter((item) =>
          !chaves.has(item.titulo_codigo.toLowerCase() + "|" + item.descricao_linguagem.toLowerCase())
        );
        setCodigos([...cadastrados, ...complementares]);
      } catch (erro) {
        console.error(erro);
        setCodigos([]);
      } finally {
        setCarregando(false);
      }
    }
    buscar();
  }, []);

  if (carregando) return <p>Carregando códigos...</p>;
  if (codigos.length === 0) return <p>Nenhum código cadastrado ainda.</p>;

  return (
    <div className="grade-senai-codigo">
      {codigos.map((item) => (
        <article className="cartao-codigo" key={item.id}>
          <h3>{item.titulo_codigo}</h3>
          <p>{item.descricao_linguagem}</p>
          <pre>
            <code>{item.bloco_codigo}</code>
          </pre>
        </article>
      ))}
    </div>
  );
};

export default ConteudoCodigo;
