import bcrypt from "bcrypt";
import { Aluno } from "../models/index.js";
import { createUserToken } from "../utils/createUserToken.js";
import { tratarErro } from "../utils/errorHandle.js";

export const login = async (request, response) => {
  const { email, senha } = request.body;

  if (!email || !senha) {
    return response.status(400).json({
      message: "Informe o e-mail e a senha.",
    });
  }

  try {
    const aluno = await Aluno.scope("comSenha").findOne({
      where: { email },
    });

    if (!aluno || !(await bcrypt.compare(senha, aluno.senha))) {
      return response.status(401).json({
        message: "E-mail ou senha inválidos.",
      });
    }

    return createUserToken(aluno, response);
  } catch (error) {
    return tratarErro(error, response);
  }
};
