import { tratarErro } from "../utils/errorHandle.js";
import { getToken } from "../utils/getToken.js";
import { getUserByToken } from "../utils/getUserByToken.js";

export const verifyToken = async (request, response, next) => {
  try {
    const token = getToken(request);
    if (!token) {
      return response.status(401).json({
        message:
          "O cabeçalho 'Authorization' é obrigatório e deve conter um token Bearer",
      });
    }

    request.usuario = await getUserByToken(token);
    return next();
  } catch (error) {
    if (
      error.statusCode === 401 ||
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return response.status(401).json({
        message: error.name === "TokenExpiredError"
          ? "Token expirado. Faça login novamente."
          : "Token inválido ou acesso negado.",
      });
    }

    return tratarErro(error, response);
  }
};
