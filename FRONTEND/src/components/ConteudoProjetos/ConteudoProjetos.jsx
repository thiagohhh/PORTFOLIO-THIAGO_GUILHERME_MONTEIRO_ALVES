import { useEffect, useState } from "react";
import { chamarApi } from "../../api";
import "./ConteudoProjetos.css";

const ConteudoProjetos = ({ bimestre }) => {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const numeroBimestre =
    Number(String(bimestre || "1").replace(/\D/g, "")) || 1;

  useEffect(() => {
    async function buscar() {
      setCarregando(true);
      try {
        const resposta = await chamarApi("/sesi/projetosTrabalhos");
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
        <div key={projeto.id}>
          <article className="cartao-projeto-sesi">
            <div className="foto-projeto-sesi">
              {projeto.foto ? (
                <img
                  src={`http://localhost:3333/${projeto.foto}`}
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