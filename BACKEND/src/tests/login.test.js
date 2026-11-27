import { test, expect } from "vitest";
import { criarAluno } from "../controller/alunoController.js";
import { login } from "../controller/autenticacaoController.js";

const criarResposta = () => {
  const resposta = {
    codigo: 200,
    dados: null,
    status(codigo) {
      resposta.codigo = codigo;
      return resposta;
    },
    json(dados) {
      resposta.dados = dados;
      return resposta;
    },
    send() {
      return resposta;
    },
  };

  return resposta;
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
