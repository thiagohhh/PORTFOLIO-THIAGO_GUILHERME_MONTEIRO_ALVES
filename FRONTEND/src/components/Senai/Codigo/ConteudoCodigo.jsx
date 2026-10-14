import "./ConteudoCodigo.css";

const exemplos = [
  {
    titulo: "Estrutura HTML básica",
    codigo: `<main>\n  <h1>Meu projeto</h1>\n  <p>Descrição do conteúdo</p>\n</main>`,
  },
  {
    titulo: "Manipulação do DOM",
    codigo: `const botao = document.querySelector("button");\n\nbotao.addEventListener("click", () => {\n  console.log("Ação executada");\n});`,
  },
];

const ConteudoCodigo = () => {
  return (
    <div className="grade-senai-codigo">
      {exemplos.map((exemplo) => (
        <article className="cartao-codigo" key={exemplo.titulo}>
          <h3>{exemplo.titulo}</h3>
          <p>Exemplo de código para documentar neste portfólio.</p>
          <pre>
            <code>{exemplo.codigo}</code>
          </pre>
        </article>
      ))}
    </div>
  );
};

export default ConteudoCodigo;
