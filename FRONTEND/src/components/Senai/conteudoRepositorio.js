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
    foto: imagem("PROJETO DE FRONT-END TEC-040-017/Captura de tela 2026-05-30 115025.png"),
    etiquetas: ["Front-end"],
  },
  {
    id: "repositorio-projeto-backend",
    titulo_projeto: "Projeto de Back-end",
    texto_card:
      "Registro visual da atividade enviada na unidade curricular Projeto de Back-end. O arquivo original permanece no repositório de atividades.",
    unidade_curricular: "Projeto de Back-end",
    foto: imagem("PROJETO DE BACK-END TEC-040-017/Captura de tela 2026-09-14 160047.png"),
    etiquetas: ["Back-end"],
  },
  {
    id: "repositorio-desenvolvimento-apis",
    titulo_projeto: "Atividade de Desenvolvimento de APIs",
    texto_card:
      "Registro visual de uma atividade da unidade curricular Desenvolvimento de APIs, conforme o material salvo no repositório.",
    unidade_curricular: "Desenvolvimento de APIs",
    foto: imagem("DESENVOLVIMENTO DE APIS TEC-040-017/Captura de tela 2026-06-08 172405.png"),
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
