import { test, expect } from "vitest";
import { criarAluno } from "../controller/alunoController.js";
import { login } from "../controller/autenticacaoController.js";
import {
  criarAprendizagem,
  criarAutoavaliacao,
  criarCodigo,
  criarCompetencia,
  criarDetalhe,
  criarProjeto,
  criarRelatorio,
} from "../controller/senaiController.js";
import {
  criarConexaoInterdisciplinar,
  criarConexaoTeia,
  criarEscolaParaVida,
  criarFundamentoTeorico,
  criarParticipacaoEmSala,
  criarProjetoTrabalho,
  criarTagProjetoTrabalho,
  criarReflexaoCritica,
  criarReflexaoHabilidade,
} from "../controller/sesiController.js";

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

test("valida o cadastro de aluno", async () => {
  const response = criarResposta();
  await criarAluno({ body: {} }, response);
  expect(response.codigo).toBe(400);
});

test("valida o login", async () => {
  const response = criarResposta();
  await login({ body: {} }, response);
  expect(response.codigo).toBe(400);
});

test("valida os dados de aprendizagem", async () => {
  const response = criarResposta();
  await criarAprendizagem({ body: {} }, response);
  expect(response.codigo).toBe(400);
});

test("valida os dados de autoavaliação", async () => {
  const response = criarResposta();
  await criarAutoavaliacao({ body: {} }, response);
  expect(response.codigo).toBe(400);
});

test("valida os dados de código", async () => {
  const response = criarResposta();
  await criarCodigo({ body: {} }, response);
  expect(response.codigo).toBe(400);
});

test("valida os dados de competência", async () => {
  const response = criarResposta();
  await criarCompetencia({ body: {} }, response);
  expect(response.codigo).toBe(400);
});

test("valida os dados de detalhe", async () => {
  const response = criarResposta();
  await criarDetalhe({ body: {} }, response);
  expect(response.codigo).toBe(400);
});

test("valida os dados de projeto do SENAI", async () => {
  const response = criarResposta();
  await criarProjeto({ body: {} }, response);
  expect(response.codigo).toBe(400);
});

test("valida os dados de relatório", async () => {
  const response = criarResposta();
  await criarRelatorio({ body: {} }, response);
  expect(response.codigo).toBe(400);
});

test("valida os dados de conexão interdisciplinar", async () => {
  const response = criarResposta();
  await criarConexaoInterdisciplinar({ body: {} }, response);
  expect(response.codigo).toBe(400);
});

test("valida os dados de conexão teia", async () => {
  const response = criarResposta();
  await criarConexaoTeia({ body: {} }, response);
  expect(response.codigo).toBe(400);
});

test("valida os dados de escola para vida", async () => {
  const response = criarResposta();
  await criarEscolaParaVida({ body: {} }, response);
  expect(response.codigo).toBe(400);
});

test("valida os dados de fundamento teórico", async () => {
  const response = criarResposta();
  await criarFundamentoTeorico({ body: {} }, response);
  expect(response.codigo).toBe(400);
});

test("valida os dados de participação em sala", async () => {
  const response = criarResposta();
  await criarParticipacaoEmSala({ body: {} }, response);
  expect(response.codigo).toBe(400);
});

test("valida os dados de projeto e trabalho", async () => {
  const response = criarResposta();
  await criarProjetoTrabalho({ body: {} }, response);
  expect(response.codigo).toBe(400);
});

test("valida os dados de tag do projeto e trabalho", async () => {
  const response = criarResposta();
  await criarTagProjetoTrabalho({ params: {}, body: {} }, response);
  expect(response.codigo).toBe(400);
});

test("valida os dados de reflexão crítica", async () => {
  const response = criarResposta();
  await criarReflexaoCritica({ body: {} }, response);
  expect(response.codigo).toBe(400);
});

test("valida os dados de habilidade da reflexão", async () => {
  const response = criarResposta();
  await criarReflexaoHabilidade({ body: {} }, response);
  expect(response.codigo).toBe(400);
});
