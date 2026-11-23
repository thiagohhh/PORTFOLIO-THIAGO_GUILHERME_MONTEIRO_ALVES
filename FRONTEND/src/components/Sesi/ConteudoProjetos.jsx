


import { useEffect, useState } from "react";
import "./ConteudoProjetos.css";
import { API } from "../../config.js";

const ConteudoProjetos = ({ bimestre }) => {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);


  const numeroBimestre =
    Number(String(bimestre || "1").replace(/\D/g, "")) || 1;

  useEffect(() => {
    async function buscar() {
      setCarregando(true);
      try {
        const resposta = await fetch(`${API}/sesi/projetosTrabalhos`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
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

  if (carregando) return <p>Carregando projetos...</p>;
  if (lista.length === 0) {
    return <p>Nenhum projeto cadastrado neste bimestre.</p>;
  }

  return (
    <div className="lista-projetos-sesi">
      {lista.map((projeto, index) => (
        <div key={projeto.id} className="item-projeto-sesi">
          {lista.length > 1 && (
            <p className="titulo-registro">Projeto {index + 1}</p>
          )}
          <article className="cartao-projeto-sesi">
            <div className="foto-projeto-sesi">
              {projeto.foto ? (
                <img
                  src={`${API}/${projeto.foto}`}
                  alt={projeto.titulo_projeto}
                />
              ) : (
                "Sem imagem"
              )}
            </div>
            <h3>{projeto.titulo_projeto}</h3>
            <p>{projeto.texto_card}</p>
          </article>

          {index < lista.length - 1 && <hr className="separador-sesi" />}
        </div>
      ))}
    </div>
  );
};

export default ConteudoProjetos;
