import { test, expect } from "vitest";
import { criarAluno } from "../controller/alunoController.js";
import { login } from "../controller/autenticacaoController.js";

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
