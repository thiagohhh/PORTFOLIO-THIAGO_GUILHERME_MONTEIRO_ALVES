import { afterEach, describe, expect, it, vi } from "vitest";
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

describe("tratarErro", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("retorna erro 400 quando o JSON está incorreto", () => {
    const response = criarResposta();
    const error = { type: "entity.parse.failed" };

    tratarErro(error, response);

    expect(response.statusCode).toBe(400);
    expect(response.dados.message).toBe("O corpo da requisição contém JSON inválido.");
  });

  it("retorna erro 500 quando acontece um erro inesperado", () => {
    const response = criarResposta();
    const error = new Error("Erro de teste");

    vi.spyOn(console, "error").mockImplementation(() => {});

    tratarErro(error, response);

    expect(response.statusCode).toBe(500);
    expect(response.dados.message).toBe("Erro interno do servidor.");
  });
});
