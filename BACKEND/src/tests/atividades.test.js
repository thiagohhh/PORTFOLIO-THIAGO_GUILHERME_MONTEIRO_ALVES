import { test, expect, vi } from "vitest";
import { Aprendizagens } from "../models/index.js";
import bcrypt from "bcrypt";
import Aluno from "../models/Aluno.js";
import { criarAluno } from "../controller/alunoController.js";
import { login } from "../controller/autenticacaoController.js";
import {
  criarAprendizagem,
  atualizarAprendizagem,
  deletarAprendizagem,
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

test("cadastra uma aprendizagem", async () => {
  const aprendizagem = {
    id: 1,
    aluno_id: 1,
    unidade_curricular: "Banco de Dados",
    titulo_aprendizagem: "Teste",
    descricao_aprendizagem: "Descrição do teste",
    nivel_estrelas: 3,
  };

  const cadastro = vi.spyOn(Aprendizagens, "create").mockResolvedValue(aprendizagem);

  const request = {
    body: {
      aluno_id: 1,
      unidade_curricular: "Banco de Dados",
      titulo_aprendizagem: "Teste",
      descricao_aprendizagem: "Descrição do teste",
      nivel_estrelas: 3,
    },
  };
  const response = criarResposta();

  await criarAprendizagem(request, response);

  expect(response.codigo).toBe(201);
  expect(cadastro).toHaveBeenCalled();

  cadastro.mockRestore();
});

test("atualiza uma aprendizagem", async () => {
  const aprendizagem = {
    id: 1,
    update: async (dados) => {
      aprendizagem.titulo_aprendizagem = dados.titulo_aprendizagem;
    },
  };

  const busca = vi.spyOn(Aprendizagens, "findByPk").mockResolvedValue(aprendizagem);

  const request = {
    params: { id: 1 },
    body: {
      aluno_id: 1,
      unidade_curricular: "Banco de Dados",
      titulo_aprendizagem: "Título atualizado",
      descricao_aprendizagem: "Descrição do teste",
      nivel_estrelas: 3,
    },
  };
  const response = criarResposta();

  await atualizarAprendizagem(request, response);

  expect(response.codigo).toBe(200);
  expect(aprendizagem.titulo_aprendizagem).toBe("Título atualizado");

  busca.mockRestore();
});

test("deleta uma aprendizagem", async () => {
  let deletado = false;
  const aprendizagem = {
    destroy: async () => {
      deletado = true;
    },
  };

  const busca = vi.spyOn(Aprendizagens, "findByPk").mockResolvedValue(aprendizagem);

  const request = {
    params: { id: 1 },
  };
  const response = criarResposta();

  await deletarAprendizagem(request, response);

  expect(response.codigo).toBe(204);
  expect(deletado).toBe(true);

  busca.mockRestore();
});

test("cadastra um aluno", async () => {
  const total = vi.spyOn(Aluno, "count").mockResolvedValue(0);
  const senha = vi.spyOn(bcrypt, "hash").mockResolvedValue("senha-criptografada");
  const cadastro = vi.spyOn(Aluno, "create").mockResolvedValue({
    id: 1,
    nome: "Aluno teste",
    email: "aluno@teste.com",
  });

  const request = {
    body: {
      nome: "Aluno teste",
      email: "aluno@teste.com",
      senha: "123456",
    },
  };
  const response = criarResposta();

  await criarAluno(request, response);

  expect(response.codigo).toBe(201);
  expect(cadastro).toHaveBeenCalled();

  total.mockRestore();
  senha.mockRestore();
  cadastro.mockRestore();
});

test("faz login com os dados corretos", async () => {
  const aluno = {
    id: 1,
    nome: "Aluno teste",
    email: "aluno@teste.com",
    senha: "senha-criptografada",
  };

  const busca = vi.spyOn(Aluno, "scope").mockReturnValue({
    findOne: async () => aluno,
  });
  const senha = vi.spyOn(bcrypt, "compare").mockResolvedValue(true);
  const chaveAnterior = process.env.JWT_SECRET;
  process.env.JWT_SECRET = "chave-de-teste";

  const request = {
    body: {
      email: "aluno@teste.com",
      senha: "123456",
    },
  };
  const response = criarResposta();

  await login(request, response);

  expect(response.codigo).toBe(200);
  expect(response.dados.usuario.email).toBe("aluno@teste.com");

  busca.mockRestore();
  senha.mockRestore();
  if (chaveAnterior === undefined) {
    delete process.env.JWT_SECRET;
  } else {
    process.env.JWT_SECRET = chaveAnterior;
  }
});

