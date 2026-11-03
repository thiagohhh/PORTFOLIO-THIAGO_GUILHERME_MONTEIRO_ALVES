# Guia dos componentes do frontend

Este guia explica o papel e o fluxo de cada componente. Os comentários no código ficam reservados às decisões menos evidentes; este arquivo serve como mapa para navegar pelo projeto.

## Aplicação e navegação

| Componente | Lógica |
|---|---|
| `src/App.jsx` | Declara as rotas do portfólio e do painel administrativo. `RotaProtegida` verifica o token salvo antes de mostrar uma tela restrita e guarda a rota pretendida para o login poder retornar a ela. |
| `src/main.jsx` | Cria a raiz React e envolve a aplicação com `BrowserRouter`, habilitando a navegação por URL. |
| `src/api.js` | Centraliza as chamadas HTTP para a API e acrescenta o token de autenticação quando existe uma sessão. |
| `src/components/IntroAnimacao.jsx` | Executa a sequência de abertura com GSAP; ao terminar oculta a tela e interrompe a timeline se o componente for desmontado. |
| `src/components/layout/Header.jsx` | Cabeçalho reutilizável com links para a página inicial e para as áreas SESI/SENAI. |
| `src/components/layout/Rodape.jsx` | Renderiza o rodapé informativo comum às páginas. |
| `src/components/layout/LinksIniciais.jsx` | Transforma a instituição recebida por propriedade em um link para a rota correspondente. |
| `src/components/layout/AreaCard.jsx` | Apresenta uma disciplina com ícone, descrição e link de navegação fornecidos por propriedades. |
| `src/components/layout/BotaoSecao.jsx` | Botão controlado pelo componente pai: mostra o estado ativo e chama a função recebida quando selecionado. |
| `src/components/layout/MenuSecoes.jsx` | Percorre a lista fixa de seções do SESI e delega seleção e estilo ativo aos botões de seção. |

## Páginas do portfólio

| Componente | Lógica |
|---|---|
| `src/components/QuemSouEu.jsx` e `src/components/QuemSouEu/QuemSouEu.jsx` | Buscam o perfil na API, usam o primeiro registro retornado e mostram textos padrão enquanto não há dados. Também montam o endereço da foto enviada pelo backend. |
| `src/components/Sesi/Sesi.jsx` | Exibe a entrada do portfólio SESI e oferece navegação para as quatro disciplinas. |
| `src/components/Sesi/ConteudoSesi.jsx` | Mantém a seção e o bimestre selecionados. Escolhe o painel de conteúdo da seção; seções anuais não exibem seletor de bimestre. A disciplina chega por propriedade para reutilizar a mesma página. |
| `src/components/Sesi/ConteudoNatureza.jsx` | Abre o conteúdo comum do SESI para Ciências da Natureza. |
| `src/components/Sesi/ConteudoLinguagens.jsx` | Abre o conteúdo comum do SESI para Linguagens. |
| `src/components/Sesi/ConteudoHumanas.jsx` | Abre o conteúdo comum do SESI para Ciências Humanas. |
| `src/components/Sesi/ConteudoMatematica.jsx` | Abre o conteúdo comum do SESI para Matemática. |
| `src/components/Senai/Senai.jsx` | Mantém a aba do SENAI selecionada e troca o painel central conforme a seção escolhida. |
| `src/components/Senai/MenuSenai.jsx` | Mostra as abas do SENAI e devolve ao pai o nome da aba clicada. |

## Conteúdo do SESI

Os painéis abaixo consultam a API ao montar, guardam o resultado em estado e distinguem carregamento, lista vazia e conteúdo disponível. Quando ocorre uma falha, exibem o estado vazio; alguns também registram o erro no console.

| Componente | Lógica |
|---|---|
| `src/components/Sesi/ConteudoFundamentos.jsx` | Converte o rótulo do bimestre em número, consulta os fundamentos e mostra somente os registros daquele bimestre. |
| `src/components/Sesi/ConteudoParticipacao.jsx` | Filtra a participação pelo bimestre recebido e representa a autoavaliação com até cinco marcadores. |
| `src/components/Sesi/ConteudoProjetos.jsx` | Filtra projetos pelo bimestre e exibe texto e foto; sem foto, mostra um estado alternativo. |
| `src/components/Sesi/ConteudoReflexaoCritica.jsx` | Busca e apresenta os registros anuais de reflexão crítica. |
| `src/components/Sesi/ConteudoEscolaVida.jsx` | Busca os registros anuais de escola para a vida e distribui as respostas nos respectivos cartões. |
| `src/components/Sesi/ConteudoConexoesInterdisciplinares.jsx` | Interpreta o campo textual legado para recuperar área, matérias e explicação; compara áreas ignorando caixa e acentos e prioriza a conexão mais recente da disciplina. |

## Conteúdo do SENAI

Os painéis consultam uma rota própria e apresentam os dados recebidos, com estados de carregamento e ausência de registros.

| Componente | Lógica |
|---|---|
| `src/components/Senai/ConteudoProjetos.jsx` | Aceita a lista de projetos tanto diretamente quanto dentro da propriedade `projetos`; apresenta foto, título e descrição. |
| `src/components/Senai/ConteudoCodigo.jsx` | Lista os códigos com linguagem e bloco de código formatado. |
| `src/components/Senai/ConteudoGaleria.jsx` | Lista mídias e constrói o endereço de cada arquivo armazenado no backend. |
| `src/components/Senai/ConteudoRelatorios.jsx` | Lista relatórios com links para abrir ou baixar o PDF. |
| `src/components/Senai/ConteudoAprendizagens.jsx` | Lista aprendizagens e representa o nível de estrelas com ícones preenchidos ou vazios. |
| `src/components/Senai/ConteudoAutoavaliacao.jsx` | Lista autoavaliações, converte nota em marcadores e percentual em largura de barra de progresso. |

## Área administrativa

| Componente | Lógica |
|---|---|
| `src/components/Admin/Login.jsx` | Envia credenciais, guarda token e ID do aluno e retorna à rota protegida original quando disponível. A resposta da API pode fornecer o ID em mais de um formato. |
| `src/components/Admin/CadastroAtividadeSenai.jsx` | Mantém dados separados por aba, valida a unidade curricular e monta o cadastro específico da seção. Projetos, galeria e relatórios usam `FormData` para arquivos; as outras abas usam JSON. |
| `src/components/Admin/CadastroAtividadeSesi.jsx` | Mantém a seção, bimestre, disciplina, campos e autoavaliação. Separa seções anuais das bimestrais e monta payloads diferentes para projeto com foto, conexão interdisciplinar e demais seções. |
| `src/components/Admin/EditarAtividadeSenai.jsx` | Recebe seção e ID pela navegação, carrega o registro correspondente e envia atualização como multipart quando há arquivo ou JSON nas demais abas. |
| `src/components/Admin/EditarAtividadeSesi.jsx` | Recebe seção, ID e bimestre pela navegação, carrega os dados editáveis e diferencia atualizações anuais, bimestrais e de projeto com foto. |
| `src/components/Admin/EditarQuemSouEu.jsx` | Carrega o perfil existente; escolhe POST para criar ou PUT para alterar e permite pré-visualizar a foto local antes do envio. |
| `src/components/Admin/MinhasAtividades.jsx` | Consulta as várias rotas de atividades, normaliza os registros para uma lista comum e isola falhas por fonte. Depois filtra por instituição, seção, área, bimestre ou unidade curricular e oferece edição/exclusão. |

## Componentes compartilhados

| Componente | Lógica |
|---|---|
| `src/components/layout/AreaCard.jsx` | Recebe título, descrição, ícone e destino por propriedades para evitar cartões de disciplina duplicados. |
| `src/components/layout/BotaoSecao.jsx` | Recebe o estado ativo e o callback do menu pai; não mantém estado próprio. |
| `src/components/layout/MenuSecoes.jsx` | Transforma a configuração das seções SESI em uma lista de botões controlados pelo pai. |
| `src/components/layout/LinksIniciais.jsx` | Recebe o nome da instituição e forma a URL de destino. |
| `src/components/layout/Header.jsx` | Disponibiliza navegação comum entre início, SESI e SENAI. |
| `src/components/layout/Rodape.jsx` | Exibe informações fixas de identificação do portfólio. |

## Observação sobre versões alternativas

As telas administrativas ativas ficam diretamente em `components/Admin/`; as cópias antigas em subpastas foram removidas. No SENAI, os painéis ativos ficam diretamente em `components/Senai/`. No SESI, as páginas e conteúdos ativos ficam em `components/Sesi/`; estruturas antigas paralelas foram removidas.
