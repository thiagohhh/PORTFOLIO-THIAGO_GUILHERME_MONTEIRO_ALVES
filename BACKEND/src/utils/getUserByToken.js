import jwt from "jsonwebtoken";
import Aluno from "../models/Aluno.js";

export const getUserByToken = async (token) => {
  if (!token) {
    const error = new Error("Acesso negado.");
    error.statusCode = 401;
    throw error;
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET não foi configurado.");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET, {
    algorithms: ["HS256"],
  });
  const aluno = await Aluno.findByPk(decoded.id);

  if (!aluno) {
    const error = new Error("Aluno não encontrado.");
    error.statusCode = 401;
    throw error;
  }

  return aluno;
};
