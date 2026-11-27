import { describe, expect, it } from "vitest";
import { getToken } from "../utils/getToken.js";

describe("getToken", () => {
  it("retorna o token quando ele está correto", () => {
    const request = {
      headers: {
        authorization: "Bearer meu-token",
      },
    };

    expect(getToken(request)).toBe("meu-token");
  });

  it("retorna null quando não existe token", () => {
    const request = {
      headers: {},
    };

    expect(getToken(request)).toBeNull();
  });

  it("retorna null quando o formato do token está incorreto", () => {
    const request = {
      headers: {
        authorization: "meu-token",
      },
    };

    expect(getToken(request)).toBeNull();
  });
});
