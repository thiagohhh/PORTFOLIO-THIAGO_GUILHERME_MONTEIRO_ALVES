import { useEffect, useState } from "react";
import { chamarApi } from "../../api";
import "./ConteudoConexoesInterdisciplinares.css";

// Lê o texto salvo e separa: área, matérias e explicação
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
        // "Física, Português" vira ["Física", "Português"]
        materias = parte
          .split(",")
          .map((m) => m.trim())
          .filter(Boolean);
      }
    } else if (linha.trim()) {
      // resto do texto = explicação
      outras.push(linha.trim());
    }
  }
  return { area, materias, explicacao: outras.join("\n") };
}

// Tira acento e deixa minúsculo pra comparar nomes
function normalizar(txt) {
  return String(txt || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Confere se a área salva é a mesma da página (ex: Matemática)
function mesmaArea(areaSalva, disciplinaAtual) {
  if (!disciplinaAtual) return true;
  const a = normalizar(areaSalva);
  const d = normalizar(disciplinaAtual);
  if (!a) return false;
  if (a === d) return true;
  // aceita nomes parecidos (ex: "Natureza" e "Ciências da Natureza")
  if (a.includes(d) || d.includes(a)) return true;
  return false;
}

const ConteudoConexoesInterdisciplinares = ({ disciplina }) => {
  const [item, setItem] = useState(null); // conexão que vai aparecer
  const [carregando, setCarregando] = useState(true);

  // Busca as conexões na API quando a página abre
  useEffect(() => {
    async function buscar() {
      try {
        const resposta = await chamarApi("/sesi/conexoesInterdisciplinares");
        const dados = await resposta.json();
        const lista = Array.isArray(dados) ? dados : [];

        // Filtra só as da área desta página
        const daArea = lista.filter((reg) => {
          const { area } = lerTexto(reg.relacoes_interdisciplinares);
          return mesmaArea(area, disciplina);
        });

        // Pega a última da área (ou a última geral se não achar)
        const escolhido = daArea.length
          ? daArea[daArea.length - 1]
          : lista.length
            ? lista[lista.length - 1]
            : null;

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

  // Separa os dados do texto salvo
  const { area, materias, explicacao } = lerTexto(
    item.relacoes_interdisciplinares
  );

  // Até 4 matérias (uma em cada canto da teia)
  const m = [materias[0], materias[1], materias[2], materias[3]];

  return (
    <div className="bloco-conexao">
      {/* Desenho da teia: bolinhas + linhas */}
      <div className="teia-conexoes">
        {/* Linhas do centro até cada matéria */}
        <svg className="linhas-teia" viewBox="0 0 320 240">
          {m[0] && <line x1="160" y1="120" x2="60" y2="50" />}
          {m[1] && <line x1="160" y1="120" x2="260" y2="50" />}
          {m[2] && <line x1="160" y1="120" x2="60" y2="190" />}
          {m[3] && <line x1="160" y1="120" x2="260" y2="190" />}
        </svg>

        {/* Bolinhas laterais (só aparecem se tiver matéria) */}
        {m[0] && <div className="bolinha pos-tl">{m[0]}</div>}
        {m[1] && <div className="bolinha pos-tr">{m[1]}</div>}
        {/* Bolinha do meio = área */}
        <div className="bolinha bolinha-centro">{area || "Área"}</div>
        {m[2] && <div className="bolinha pos-bl">{m[2]}</div>}
        {m[3] && <div className="bolinha pos-br">{m[3]}</div>}
      </div>

      {/* Card com a explicação */}
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
