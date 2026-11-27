import { test, expect } from "vitest";
import {
  criarAprendizagem,
  criarAutoavaliacao,
  criarCodigo,
  criarCompetencia,
  criarDetalhe,
  criarProjeto,
  criarRelatorio,
} from "../controller/senaiController.js";

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
