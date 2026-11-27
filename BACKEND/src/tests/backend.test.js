import "dotenv/config";
import { test, expect, afterAll } from "vitest";
import mysql from "mysql2/promise";

// Os testes usam um banco separado para não mexer nos dados do projeto.
const bancoDeTeste = (process.env.DB_NAME || "portifolio_senaiEsesi") + "_testes";

const conexaoMySQL = await mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "123456789",
});

await conexaoMySQL.query(`CREATE DATABASE IF NOT EXISTS \`${bancoDeTeste}\``);
await conexaoMySQL.end();

delete process.env.DATABASE_URL;
process.env.DB_NAME = bancoDeTeste;
process.env.JWT_SECRET = "chave-dos-testes";

const { default: conn } = await import("../config/conn.js");
const modelos = await import("../models/index.js");
const { criarAluno } = await import("../controller/alunoController.js");
const { login } = await import("../controller/autenticacaoController.js");

await conn.sync({ force: true });

const criarResposta = () => {
  return {
    codigo: 200,
    dados: null,
    status(codigo) {
      this.codigo = codigo;
      return this;
    },
    json(dados) {
      this.dados = dados;
      return this;
    },
    send() {
      return this;
    },
  };
};

test("cadastra um aluno", async () => {
  const response = criarResposta();

  await criarAluno({
    body: {
      nome: "Aluno de teste",
      email: "aluno@teste.com",
      senha: "123456",
    },
  }, response);

  expect(response.codigo).toBe(201);
  expect(response.dados.email).toBe("aluno@teste.com");
});

test("faz login com os dados corretos", async () => {
  const response = criarResposta();

  await login({
    body: {
      email: "aluno@teste.com",
      senha: "123456",
    },
  }, response);

  expect(response.codigo).toBe(200);
  expect(response.dados.usuario.email).toBe("aluno@teste.com");
  expect(response.dados.token).toBeTruthy();
});

test("não faz login com a senha errada", async () => {
  const response = criarResposta();

  await login({
    body: {
      email: "aluno@teste.com",
      senha: "senha-errada",
    },
  }, response);

  expect(response.codigo).toBe(401);
});

test("cadastra, atualiza e exclui uma aprendizagem", async () => {
  const registro = await modelos.Aprendizagens.create({
    aluno_id: 1,
    unidade_curricular: "Banco de Dados",
    titulo_aprendizagem: "Teste",
    descricao_aprendizagem: "Descrição",
    nivel_estrelas: 3,
  });
  await registro.update({ titulo_aprendizagem: "Título atualizado" });
  expect(registro.titulo_aprendizagem).toBe("Título atualizado");
  await registro.destroy();
  expect(await modelos.Aprendizagens.findByPk(registro.id)).toBeNull();
});

test("cadastra, atualiza e exclui uma autoavaliação", async () => {
  const registro = await modelos.Autoavaliacao.create({
    aluno_id: 1,
    unidade_curricular: "Banco de Dados",
    nota_bolinhas: 4,
    percentual: 80,
    justificativa_texto: "Teste",
  });
  await registro.update({ percentual: 90 });
  expect(registro.percentual).toBe(90);
  await registro.destroy();
  expect(await modelos.Autoavaliacao.findByPk(registro.id)).toBeNull();
});

test("cadastra, atualiza e exclui um código", async () => {
  const registro = await modelos.Codigo.create({
    aluno_id: 1,
    unidade_curricular: "Codificação",
    titulo_codigo: "Teste",
    descricao_linguagem: "JavaScript",
    bloco_codigo: "console.log('teste')",
  });
  await registro.update({ titulo_codigo: "Código atualizado" });
  expect(registro.titulo_codigo).toBe("Código atualizado");
  await registro.destroy();
  expect(await modelos.Codigo.findByPk(registro.id)).toBeNull();
});

test("cadastra, atualiza e exclui uma competência", async () => {
  const registro = await modelos.Competencia.create({
    aluno_id: 1,
    unidade_curricular: "Banco de Dados",
    titulo_competencia: "Teste",
  });
  await registro.update({ titulo_competencia: "Competência atualizada" });
  expect(registro.titulo_competencia).toBe("Competência atualizada");
  await registro.destroy();
  expect(await modelos.Competencia.findByPk(registro.id)).toBeNull();
});

test("cadastra, atualiza e exclui um detalhe", async () => {
  const registro = await modelos.Detalhe.create({
    item_id: 1,
    tipo_origem: "projeto",
    tag_identificacao: "Teste",
  });
  await registro.update({ tag_identificacao: "Atualizado" });
  expect(registro.tag_identificacao).toBe("Atualizado");
  await registro.destroy();
  expect(await modelos.Detalhe.findByPk(registro.id)).toBeNull();
});

test("cadastra, atualiza e exclui um projeto do SENAI", async () => {
  const registro = await modelos.Projeto.create({
    aluno_id: 1,
    unidade_curricular: "Projeto de Back-end",
    titulo_projeto: "Teste",
    texto_card: "Descrição",
    foto: "teste.jpg",
  });
  await registro.update({ titulo_projeto: "Projeto atualizado" });
  expect(registro.titulo_projeto).toBe("Projeto atualizado");
  await registro.destroy();
  expect(await modelos.Projeto.findByPk(registro.id)).toBeNull();
});

test("cadastra, atualiza e exclui um relatório", async () => {
  const registro = await modelos.Relatorio.create({
    aluno_id: 1,
    unidade_curricular: "Projeto de Back-end",
    titulo_relatorio: "Teste",
    paragrafo_relatorio: "Descrição",
    pdf: "teste.pdf",
  });
  await registro.update({ titulo_relatorio: "Relatório atualizado" });
  expect(registro.titulo_relatorio).toBe("Relatório atualizado");
  await registro.destroy();
  expect(await modelos.Relatorio.findByPk(registro.id)).toBeNull();
});

test("cadastra, atualiza e exclui uma conexão interdisciplinar", async () => {
  const registro = await modelos.ConexaoInterdisciplinar.create({
    aluno_id: 1,
    relacoes_interdisciplinares: "Teste",
  });
  await registro.update({ relacoes_interdisciplinares: "Atualizado" });
  expect(registro.relacoes_interdisciplinares).toBe("Atualizado");
  await registro.destroy();
  expect(await modelos.ConexaoInterdisciplinar.findByPk(registro.id)).toBeNull();
});

test("cadastra, atualiza e exclui uma conexão teia", async () => {
  const registro = await modelos.ConexaoTeia.create({
    conexao_id: 1,
    materia_conectada: "Matemática",
  });
  await registro.update({ materia_conectada: "Português" });
  expect(registro.materia_conectada).toBe("Português");
  await registro.destroy();
  expect(await modelos.ConexaoTeia.findByPk(registro.id)).toBeNull();
});

test("cadastra, atualiza e exclui um registro escola para vida", async () => {
  const registro = await modelos.EscolaParaVida.create({
    aluno_id: 1,
    reflexao_experiencia: "Teste",
    aplicacao_conhecimentos: "Teste",
    influencia_forma_agir_pensar: "Teste",
    habilidades_desenvolvidas: "Teste",
    desafios_novas_etapas: "Teste",
  });
  await registro.update({ reflexao_experiencia: "Atualizado" });
  expect(registro.reflexao_experiencia).toBe("Atualizado");
  await registro.destroy();
  expect(await modelos.EscolaParaVida.findByPk(registro.id)).toBeNull();
});

test("cadastra, atualiza e exclui um fundamento teórico", async () => {
  const registro = await modelos.FundamentoTeorico.create({
    aluno_id: 1,
    bimestre: 1,
    resumo_teorico: "Teste",
    teorias: "Teste",
    conceitos: "Teste",
    metodologias: "Teste",
  });
  await registro.update({ resumo_teorico: "Atualizado" });
  expect(registro.resumo_teorico).toBe("Atualizado");
  await registro.destroy();
  expect(await modelos.FundamentoTeorico.findByPk(registro.id)).toBeNull();
});

test("cadastra, atualiza e exclui uma participação em sala", async () => {
  const registro = await modelos.ParticipacaoEmSala.create({
    aluno_id: 1,
    bimestre: 1,
    registro_atividades: "Teste",
    o_que_chamou_atencao: "Teste",
    reflexao_pratica: "Teste",
    autoavaliacao: 4,
    justificativa_autoavaliacao: "Teste",
  });
  await registro.update({ registro_atividades: "Atualizado" });
  expect(registro.registro_atividades).toBe("Atualizado");
  await registro.destroy();
  expect(await modelos.ParticipacaoEmSala.findByPk(registro.id)).toBeNull();
});

test("cadastra, atualiza e exclui um projeto e trabalho", async () => {
  const registro = await modelos.ProjetoTrabalho.create({
    aluno_id: 1,
    bimestre: 1,
    titulo_projeto: "Teste",
    texto_card: "Descrição",
    foto: "teste.jpg",
  });
  await registro.update({ titulo_projeto: "Projeto atualizado" });
  expect(registro.titulo_projeto).toBe("Projeto atualizado");
  await registro.destroy();
  expect(await modelos.ProjetoTrabalho.findByPk(registro.id)).toBeNull();
});

test("cadastra, atualiza e exclui uma tag de projeto e trabalho", async () => {
  const registro = await modelos.ProjetoTrabalhoTag.create({
    projeto_id: 1,
    tag_identificacao: "Teste",
  });
  await registro.update({ tag_identificacao: "Atualizada" });
  expect(registro.tag_identificacao).toBe("Atualizada");
  await registro.destroy();
  expect(await modelos.ProjetoTrabalhoTag.findByPk(registro.id)).toBeNull();
});

test("cadastra, atualiza e exclui uma reflexão crítica", async () => {
  const registro = await modelos.ReflexaoCritica.create({
    aluno_id: 1,
    aprendizado_academico: "Teste",
    aplicacao_pratica: "Teste",
    melhorias_necessarias: "Teste",
    momentos_desafiadores: "Teste",
  });
  await registro.update({ aprendizado_academico: "Atualizado" });
  expect(registro.aprendizado_academico).toBe("Atualizado");
  await registro.destroy();
  expect(await modelos.ReflexaoCritica.findByPk(registro.id)).toBeNull();
});

test("cadastra, atualiza e exclui uma habilidade da reflexão", async () => {
  const registro = await modelos.ReflexaoHabilidade.create({
    reflexao_id: 1,
    nome_habilidade: "Trabalho em equipe",
  });
  await registro.update({ nome_habilidade: "Comunicação" });
  expect(registro.nome_habilidade).toBe("Comunicação");
  await registro.destroy();
  expect(await modelos.ReflexaoHabilidade.findByPk(registro.id)).toBeNull();
});

afterAll(async () => {
  await conn.close();
});
