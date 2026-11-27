import { test } from "node:test";
import assert from "node:assert/strict";
import { tratarErro } from "../utils/errorHandle.js";

const criarResposta = () => {
  const response = {
    statusCode: 200,
    dados: null,
    status(codigo) {
      this.statusCode = codigo;
      return this;
    },
    json(dados) {
      this.dados = dados;
      return this;
    },
  };

  return response;
};

test("retorna erro 400 quando o JSON está incorreto", () => {
  const response = criarResposta();
  const error = { type: "entity.parse.failed" };

  tratarErro(error, response);

  assert.equal(response.statusCode, 400);
  assert.equal(response.dados.message, "O corpo da requisição contém JSON inválido.");
});

test("retorna erro 500 quando acontece um erro inesperado", () => {
  const response = criarResposta();
  const error = new Error("Erro de teste");
  const consoleOriginal = console.error;

  console.error = () => {};

  try {
    tratarErro(error, response);
  } finally {
    console.error = consoleOriginal;
  }

  assert.equal(response.statusCode, 500);
  assert.equal(response.dados.message, "Erro interno do servidor.");
});
