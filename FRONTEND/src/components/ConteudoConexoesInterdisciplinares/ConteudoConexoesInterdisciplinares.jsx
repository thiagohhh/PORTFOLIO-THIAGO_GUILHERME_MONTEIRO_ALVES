import { useEffect, useState } from "react";
import { chamarApi } from "../../api";
import "./ConteudoConexoesInterdisciplinares.css";

function lerTexto(texto) {
  const linhas = String(texto || "").split("\n");
  let area = "";
  let materias = [];
  const outras = [];

  for (const linha of linhas) {
    if (linha.startsWith("Área:")) {
      area = linha.replace("Área:", "").trim();
    } else if (linha.startsWith("Matérias:")) {
      const parte = linha.replace("Matérias:", "").trim();
      if (parte && parte !== "nenhuma") {
        materias = parte.split(",").map((m) => m.trim()).filter(Boolean);
      }
    } else if (linha.trim()) {
      outras.push(linha.trim());
    }
  }
  return { area, materias, explicacao: outras.join("\n") };
}

const ConteudoConexoesInterdisciplinares = () => {
  const [item, setItem] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscar() {
      try {
        const resposta = await chamarApi("/sesi/conexoesInterdisciplinares");
        const dados = await resposta.json();
        const lista = Array.isArray(dados) ? dados : [];

        setItem(lista.length ? lista[lista.length - 1] : null);
      } catch {
        setItem(null);
      } finally {
        setCarregando(false);
      }
    }
    buscar();
  }, []);

  if (carregando) return <p>Carregando...</p>; // se tiver carregando el e mostra carrregando
  if (!item) return <p>Nenhuma conexão cadastrada ainda.</p>; // 

  const { area, materias, explicacao } = lerTexto(item.relacoes_interdisciplinares);
  const m = [materias[0], materias[1], materias[2], materias[3]];

  return (
    <div className="bloco-conexao">
      <div className="teia-conexoes">
        <svg className="linhas-teia" viewBox="0 0 320 240">
          {m[0] && <line x1="160" y1="120" x2="60" y2="50" />}
          {m[1] && <line x1="160" y1="120" x2="260" y2="50" />}
          {m[2] && <line x1="160" y1="120" x2="60" y2="190" />}
          {m[3] && <line x1="160" y1="120" x2="260" y2="190" />}
        </svg>

        {m[0] && <div className="bolinha pos-tl">{m[0]}</div>}
        {m[1] && <div className="bolinha pos-tr">{m[1]}</div>}
        <div className="bolinha bolinha-centro">{area || "Área"}</div>
        {m[2] && <div className="bolinha pos-bl">{m[2]}</div>}
        {m[3] && <div className="bolinha pos-br">{m[3]}</div>}
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