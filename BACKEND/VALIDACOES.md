# Validações dos models

As validações são executadas pelo Sequelize antes de salvar os dados no banco.
Cada regra possui uma mensagem em português, retornada quando o valor informado
não atende ao critério.

## Regras usadas

- `allowNull: false`: impede que o campo fique sem valor (`null`). A rejeição
  de `null` é feita pelo Sequelize e pelo banco.
- `notNull`: impede valor `null` e permite definir uma mensagem personalizada
  para esse caso.
- `notEmpty`: impede que um texto obrigatório seja enviado vazio (`""`) e
  informa na mensagem que o campo não pode ser vazio.
- `isEmail`: verifica se o e-mail tem um formato válido.
- `isInt`: exige um número inteiro.
- `min`: define o menor número permitido. Nos IDs, `1` exige um número positivo;
  em notas e bimestres, indica o limite inferior da escala.
- `max`: define o maior número permitido. As estrelas vão de 1 a 5, os
  percentuais de 0 a 100 e os bimestres de 1 a 4.
- `unique: true`: impede que o e-mail de um aluno seja repetido no banco. Essa
  regra é uma restrição de unicidade, não uma validação de formato.
- `primaryKey` e `autoIncrement`: identificam cada registro com um ID gerado
  pelo banco; não são validações de entrada.

## Campos validados

- **Aluno**: nome, e-mail e senha não podem ficar vazios; o e-mail precisa ter
  formato válido e ser único.
- **QuemSouEu**: `aluno_id` precisa ser inteiro positivo; título, itinerário,
  biografia, texto em negrito e URL da foto são obrigatórios.
- **Aprendizagens**: `aluno_id` inteiro positivo; unidade curricular, título e
  descrição obrigatórios; nível de estrelas inteiro de 1 a 5.
- **Autoavaliacao**: `aluno_id` inteiro positivo; unidade curricular e
  justificativa obrigatórias; nota inteira de 1 a 5; percentual inteiro de 0
  a 100.
- **Codigo**: `aluno_id` inteiro positivo; unidade curricular, título,
  linguagem e bloco de código obrigatórios.
- **Competencia**: `aluno_id` inteiro positivo; unidade curricular e título
  obrigatórios.
- **Detalhe**: `item_id` inteiro positivo; tipo de origem preenchido com o texto
  informado pelo administrador; tag de identificação obrigatória.
- Em **Detalhe**, `item_id` é uma referência lógica ao registro indicado por
  `tipo_origem`. Como `tipo_origem` é livre, o banco não garante uma chave
  estrangeira para essa referência; a aplicação deve interpretar os dois
  valores quando precisar localizar o registro de origem.
- **Galeria**: `aluno_id` inteiro positivo; unidade curricular, tipo e título da
  mídia, explicação e URL do arquivo obrigatórios.
- **Projeto**: `aluno_id` inteiro positivo; unidade curricular, título, texto
  do card e URL da foto obrigatórios.
- **Relatorio**: `aluno_id` inteiro positivo; unidade curricular, título,
  texto do relatório e URL do PDF obrigatórios.
- **ConexaoInterdisciplinar**: `aluno_id` inteiro positivo e relações
  interdisciplinares obrigatórias.
- **ConexaoTeia**: `conexao_id` inteiro positivo e matéria conectada obrigatória.
- **EscolaParaVida**: `aluno_id` inteiro positivo; reflexão, aplicação dos
  conhecimentos, influência, habilidades e desafios obrigatórios.
- **FundamentoTeorico**: `aluno_id` inteiro positivo; bimestre inteiro de 1 a 4;
  resumo, teorias, conceitos e metodologias obrigatórios.
- Nos formulários do SESI, o bimestre é escolhido em botões numerados de 1 a 4.
  Portanto, o model recebe um número inteiro entre 1 e 4, não o texto como
  `"1º bimestre"`.
- **ParticipacaoEmSala**: `aluno_id` inteiro positivo; bimestre inteiro de 1 a
  4; registro de atividades, atenção, reflexão, autoavaliação e justificativa
  obrigatórios. A autoavaliação deve ser um inteiro positivo.
- **ProjetoTrabalho**: `aluno_id` inteiro positivo; bimestre inteiro de 1 a 4;
  título, texto do card e URL da foto obrigatórios.
- **ProjetoTrabalhoTag**: `projeto_id` inteiro positivo e tag de identificação
  obrigatória.
- **ReflexaoCritica**: `aluno_id` inteiro positivo; aprendizado, aplicação
  prática, melhorias e momentos desafiadores obrigatórios.
- **ReflexaoHabilidade**: `reflexao_id` inteiro positivo e nome da habilidade
  obrigatório.

## Observação

As validações dos models são executadas nas operações de criação e atualização
feitas pelo Sequelize. Uma alteração direta no banco pode não passar pelas
validações de aplicação; restrições importantes também devem existir no schema
do banco.
