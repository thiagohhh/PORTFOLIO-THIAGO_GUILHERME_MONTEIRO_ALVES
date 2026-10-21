import { useEffect, useState } from "react";
import { chamarApi } from "../../api";
import "./ConteudoProjetos.css";

const ConteudoProjetos = ({ bimestre }) => {
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const numeroBimestre = Number(String(bimestre || "1").replace(/\D/g, "")) || 1;

  useEffect(() => {
    async function buscar() {
      setCarregando(true);
      try {
        const resposta = await chamarApi("/sesi/projetosTrabalhos");
        const dados = await resposta.json();
        const todos = Array.isArray(dados) ? dados : [];
        const doBimestre = todos.filter(
          (p) => Number(p.bimestre) === numeroBimestre
        );
        setProjetos(doBimestre);
      } catch (erro) {
        console.error(erro);
        setProjetos([]);
      } finally {
        setCarregando(false);
      }
    }
    buscar();
  }, [numeroBimestre]);

  if (carregando) return <p>Carregando projetos...</p>;
  if (projetos.length === 0) {
    return <p>Nenhum projeto cadastrado neste bimestre.</p>;
  }

  return (
    <div className="grade-projetos-sesi">
      {projetos.map((projeto) => (
        <article className="cartao-projeto-sesi" key={projeto.id}>
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
      ))}
    </div>
  );
};

export default ConteudoProjetos;