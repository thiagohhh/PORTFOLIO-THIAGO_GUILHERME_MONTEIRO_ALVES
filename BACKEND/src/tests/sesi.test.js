import { test, expect } from "vitest";
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
