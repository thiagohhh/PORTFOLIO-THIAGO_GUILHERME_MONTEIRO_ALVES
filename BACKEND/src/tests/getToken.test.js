import { test } from "node:test";
import assert from "node:assert/strict";
import { getToken } from "../utils/getToken.js";

test("retorna o token quando ele está correto", () => {
  const request = {
    headers: {
      authorization: "Bearer meu-token",
    },
  };

  assert.equal(getToken(request), "meu-token");
});

test("retorna null quando não existe token", () => {
  const request = {
    headers: {},
  };

  assert.equal(getToken(request), null);
});

test("retorna null quando o formato do token está incorreto", () => {
  const request = {
    headers: {
      authorization: "meu-token",
    },
  };

  assert.equal(getToken(request), null);
});
