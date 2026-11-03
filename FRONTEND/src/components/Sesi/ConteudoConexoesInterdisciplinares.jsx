import { useEffect, useState } from "react";
import { chamarApi } from "../../api";
import "./ConteudoConexoesInterdisciplinares.css";

function lerTexto(texto) {
  // Lê o formato legado "Área/Matérias" e separa o restante como explicação livre.
  const linhas = String(texto || "").split("\n");

  let area = "";
  let materias = [];
  const outras = [];

  for (const linha of linhas) {
    const linhaLimpa = linha.trim();

    if (!linhaLimpa) continue; 

    if (linhaLimpa.startsWith("Área:")) {
      area = linhaLimpa.replace("Área:", "").trim();
    } else if (linhaLimpa.startsWith("Matérias:")) {
      const parte = linhaLimpa.replace("Matérias:", "").trim();

      if (parte && parte !== "nenhuma") {
        materias = parte.split(",").map((m) => m.trim());
      }
    } else {
      outras.push(linhaLimpa);
    }
  }

  return { area, materias, explicacao: outras.join("\n") };
}

function normalizar(txt) {
  // Uniformiza acentos e caixa para comparar disciplinas com nomes gravados manualmente.
  return String(txt || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function mesmaArea(areaSalva, disciplinaAtual) {
  if (!disciplinaAtual) return true;
  const a = normalizar(areaSalva);
  const d = normalizar(disciplinaAtual);

  return a && (a === d || a.includes(d) || d.includes(a));
}

const CONFIG_POSICOES = [
  { classe: "pos-tl", x: 60, y: 50 },
  { classe: "pos-tr", x: 260, y: 50 },
  { classe: "pos-bl", x: 60, y: 190 },
  { classe: "pos-br", x: 260, y: 190 },
];

const ConteudoConexoesInterdisciplinares = ({ disciplina }) => {
  const [item, setItem] = useState(null);

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscar() {
      try {
        const resposta = await chamarApi("/sesi/conexoesInterdisciplinares");

        const dados = await resposta.json();

        const lista = Array.isArray(dados) ? dados : [];

        const daArea = lista.filter((reg) => {
          const { area } = lerTexto(reg.relacoes_interdisciplinares);

          return mesmaArea(area, disciplina);
        });

        // Prioriza a conexão mais recente da disciplina; se não houver, mostra a última disponível.
        const escolhido = daArea.at(-1) || lista.at(-1) || null;

        setItem(escolhido);
      } catch {
        setItem(null);
      } finally {
        setCarregando(false);
      }
    }
    buscar();
  }, [disciplina]);

  if (carregando) return <p>Carregando...</p>;
  if (!item) return <p>Nenhuma conexão cadastrada ainda.</p>;

  const { area, materias, explicacao } = lerTexto(
    item.relacoes_interdisciplinares,
  );

  return (
    <div className="bloco-conexao">
      <div className="teia-conexoes">
        <svg className="linhas-teia" viewBox="0 0 320 240">
          {materias.slice(0, 4).map((_, index) => (
            <line
              key={index}
              x1="160"
              y1="120"
              x2={CONFIG_POSICOES[index].x}
              y2={CONFIG_POSICOES[index].y}
            />
          ))}
        </svg>

        <div className="bolinha bolinha-centro">{area || "Área"}</div>

        {materias.slice(0, 4).map((materia, index) => (
          <div
            key={index}
            className={`bolinha ${CONFIG_POSICOES[index].classe}`}
          >
            {materia}
          </div>
        ))}
      </div>

      {explicacao && (
        <article className="cartao-conexoes">
          <h2>Relações interdisciplinares</h2>

          <p>{explicacao}</p>
        </article>
      )}
    </div>
  );
};

export default ConteudoConexoesInterdisciplinares;
