// Trabalhos e imagens selecionados do repositório classrom.
 // Somente arquivos do próprio aluno; imagens de referência dos desafios foram deixadas de fora.
const imagem = (caminho) =>
  `https://raw.githubusercontent.com/thiagohhh/classrom/main/${caminho
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;

export const projetosDoRepositorio = [
  {
    id: "repositorio-projeto-frontend",
    titulo_projeto: "Projeto de Front-end",
    texto_card:
      "Registro visual do trabalho enviado na unidade curricular Projeto de Front-end. O material original e os arquivos do projeto estão no repositório de atividades.",
    unidade_curricular: "Projeto de Front-end",
    foto: "/images/senai/senai-projeto-front-end.png",
    etiquetas: ["Front-end"],
  },
  {
    id: "repositorio-projeto-backend",
    titulo_projeto: "Projeto de Back-end",
    texto_card:
      "Registro visual da atividade enviada na unidade curricular Projeto de Back-end. O arquivo original permanece no repositório de atividades.",
    unidade_curricular: "Projeto de Back-end",
    foto: "/images/senai/senai-projeto-back-end.png",
    etiquetas: ["Back-end"],
  },
  {
    id: "repositorio-uiux-esportes",
    titulo_projeto: "Projeto Esportes Radicais",
    texto_card: "Projeto visual desenvolvido e enviado na unidade curricular Fundamentos de UI/UX.",
    unidade_curricular: "Fundamentos de UI/UX",
    foto: "/images/senai/senai-esportes-radicais.png",
    etiquetas: ["UI/UX", "Protótipo visual"],
  },
  {
    id: "repositorio-uiux-comida",
    titulo_projeto: "Projeto Comida Saudável",
    texto_card: "Projeto visual desenvolvido e enviado na unidade curricular Fundamentos de UI/UX.",
    unidade_curricular: "Fundamentos de UI/UX",
    foto: "/images/senai/senai-comida-saudavel.png",
    etiquetas: ["UI/UX", "Protótipo visual"],
  },
  {
    id: "repositorio-desenvolvimento-apis",
    titulo_projeto: "Atividade de Desenvolvimento de APIs",
    texto_card:
      "Registro visual de uma atividade da unidade curricular Desenvolvimento de APIs, conforme o material salvo no repositório.",
    unidade_curricular: "Desenvolvimento de APIs",
    foto: "/images/senai/senai-desenvolvimento-apis.png",
    etiquetas: ["APIs"],
  },
];

export const imagensDoRepositorio = [
  {
    id: "galeria-uiux-a4",
    titulo_midia: "Atividade de UI/UX — A4",
    explicado_a_midia: "Imagem enviada na unidade curricular Fundamentos de UI/UX.",
    unidade_curricular: "Fundamentos de UI/UX",
    tipo_midia: "Imagem",
    arquivo: imagem("FUNDAMENTOS DE UI _ UX TEC-040-017/A4 - 1.png"),
  },
  {
    id: "galeria-uiux-esportes",
    titulo_midia: "Projeto Esportes Radicais",
    explicado_a_midia: "Material visual desenvolvido e enviado na unidade curricular Fundamentos de UI/UX.",
    unidade_curricular: "Fundamentos de UI/UX",
    tipo_midia: "Imagem",
    arquivo: imagem("FUNDAMENTOS DE UI _ UX TEC-040-017/ESPORTES RADICAIS.png"),
  },
  {
    id: "galeria-uiux-alimentacao",
    titulo_midia: "Projeto Comida Saudável",
    explicado_a_midia: "Material visual enviado na unidade curricular Fundamentos de UI/UX.",
    unidade_curricular: "Fundamentos de UI/UX",
    tipo_midia: "Imagem",
    arquivo: imagem("FUNDAMENTOS DE UI _ UX TEC-040-017/comida saudavel.png"),
  },
  {
    id: "galeria-uiux-prototipo-iphone",
    titulo_midia: "Protótipo de interface — iPhone",
    explicado_a_midia: "Tela de protótipo salva entre as atividades de Fundamentos de UI/UX.",
    unidade_curricular: "Fundamentos de UI/UX",
    tipo_midia: "Imagem",
    arquivo: imagem("FUNDAMENTOS DE UI _ UX TEC-040-017/iPhone 16 Pro Max - 1.png"),
  },
  {
    id: "galeria-logica-fluxograma",
    titulo_midia: "Fluxograma — Lógica Computacional",
    explicado_a_midia: "Atividade visual de organização de etapas e raciocínio lógico.",
    unidade_curricular: "Lógica Computacional",
    tipo_midia: "Imagem",
    arquivo: imagem("LÓGICA COMPUTACIONAL TEC-040-017/_Fluxograma.png"),
  },
  {
    id: "galeria-logica-fluxograma-2",
    titulo_midia: "Atividade de Fluxograma",
    explicado_a_midia: "Outro registro de atividade enviado em Lógica Computacional.",
    unidade_curricular: "Lógica Computacional",
    tipo_midia: "Imagem",
    arquivo: imagem("LÓGICA COMPUTACIONAL TEC-040-017/_Fluxograma (1).png"),
  },
  {
    id: "galeria-logica-mural",
    titulo_midia: "Atividade — Lógica Computacional",
    explicado_a_midia: "Registro de atividade salvo na unidade curricular Lógica Computacional.",
    unidade_curricular: "Lógica Computacional",
    tipo_midia: "Imagem",
    arquivo: imagem("LÓGICA COMPUTACIONAL TEC-040-017/Novo mural.png"),
  },
];

export const relatoriosDoRepositorio = [
  {
    id: "repositorio-storyboard-battech",
    titulo_relatorio: "Storyboard — BATTECH",
    paragrafo_relatorio:
      "Storyboard enviado na unidade curricular Fundamentos de UI/UX.",
    unidade_curricular: "Fundamentos de UI/UX",
    pdf: imagem("FUNDAMENTOS DE UI _ UX TEC-040-017/Storybord-BATTECH.pdf"),
  },
];

export const codigosDoRepositorio = [
  {
    id: "codigo-html-pagina-pessoal",
    titulo_codigo: "Estrutura de uma página HTML",
    descricao_linguagem: "HTML",
    bloco_codigo: `<h1>Apresentação Pessoal</h1>
<p>Olá! Meu nome é Thiago.</p>
<hr>
<p>Esta é minha primeira página.</p>`,
  },
  {
    id: "codigo-html-cartao-qr",
    titulo_codigo: "Cartão com imagem e textos",
    descricao_linguagem: "HTML",
    bloco_codigo: `<div class="caixa">
  <img src="./images/image-qr-code.png" alt="QR Code">
  <p><strong>Melhore suas habilidades</strong></p>
  <p>Escaneie o QR Code para continuar.</p>
</div>`,
  },
  {
    id: "codigo-css-centralizar-cartao",
    titulo_codigo: "Centralização e estilo de um cartão",
    descricao_linguagem: "CSS",
    bloco_codigo: `body {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d6e2f0;
}

.caixa {
  width: 350px;
  background-color: white;
  border-radius: 20px;
  text-align: center;
}`,
  },
  {
    id: "codigo-react-estado",
    titulo_codigo: "Estado e interação com botão",
    descricao_linguagem: "React",
    bloco_codigo: `import { useState } from "react";

function Contador() {
  const [cliques, setCliques] = useState(0);

  return (
    <div>
      <p>Cliques: {cliques}</p>
      <button onClick={() => setCliques(cliques + 1)}>
        Adicionar
      </button>
    </div>
  );
}

export default Contador;`,
  },
  {
    id: "codigo-sql-consulta",
    titulo_codigo: "Criar tabela e consultar dados",
    descricao_linguagem: "SQL",
    bloco_codigo: `CREATE DATABASE loja_roupas;

USE loja_roupas;

CREATE TABLE roupas (
  cor VARCHAR(255),
  tamanho VARCHAR(2),
  pr_quem VARCHAR(255)
);

SELECT * FROM roupas;`,
  },
];
