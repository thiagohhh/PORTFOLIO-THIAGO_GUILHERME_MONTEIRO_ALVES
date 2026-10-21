import jwt from "jsonwebtoken";
import { Aluno } from "../models/index.js";

export const getUserByToken = async (token) => {

  const dados = jwt.verify(token, process.env.JWT_SECRET);

  const aluno = await Aluno.findByPk(dados.id);
  if (!aluno) {
    const erro = new Error("Usuário não encontrado.");
    erro.statusCode = 401;
    throw erro;
  }

  return aluno;
};