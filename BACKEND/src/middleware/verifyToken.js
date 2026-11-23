import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Exige um token válido no header Authorization: Bearer <token>.
 * Segue a lógica do professor (middleware autenticar).
 * Sem token ou token inválido -> 401.
 * Coloca o payload em request.usuario = { id, nome, email }
 */
export const verifyToken = (request, response, next) => {
  const header = request.headers["authorization"];

  if (!header || !header.startsWith("Bearer ")) {
    return response.status(401).json({
      erro: "Não autenticado",
      message: "Envie o header Authorization no formato: Bearer <token>",
    });
  }

  const token = header.slice("Bearer ".length);

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    request.usuario = payload; // { id, nome, email }
    next();
  } catch (err) {
    return response.status(401).json({
      erro: "Token inválido ou expirado",
      message: "Faça login novamente em POST /auth/login",
    });
  }
};
