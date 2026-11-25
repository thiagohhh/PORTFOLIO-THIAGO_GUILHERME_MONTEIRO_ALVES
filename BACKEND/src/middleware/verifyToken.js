import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;


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
    request.usuario = payload; 
    next();
  } catch (err) {
    return response.status(401).json({
      erro: "Token inválido ou expirado",
      message: "Faça login novamente em POST /auth/login",
    });
  }
};
