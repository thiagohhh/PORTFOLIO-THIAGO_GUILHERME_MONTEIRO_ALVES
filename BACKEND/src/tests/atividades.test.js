import { test, expect, vi } from "vitest";
import { Aprendizagens } from "../models/index.js";
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
