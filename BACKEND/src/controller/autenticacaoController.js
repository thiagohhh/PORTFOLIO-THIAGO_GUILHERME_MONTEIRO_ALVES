import bcrypt from "bcrypt";
import { Aluno } from "../models/index.js";
import { createUserToken } from "../utils/createUserToken.js";
import { tratarErro } from "../utils/errorHandle.js";


export const login = async (request, response) => {
  try {
    const { email, senha } = request.body || {};

    if (!email || !senha) {
      return response.status(400).json({
        erro: "Campos obrigatórios ausentes",
        message: "Informe email e senha no corpo da requisição.",
      });
    }

    const emailLimpo = String(email).trim().toLowerCase();

    const aluno = await Aluno.scope("comSenha").findOne({
      where: { email: emailLimpo },
    });


    if (!aluno || !(await bcrypt.compare(senha, aluno.senha))) {
      return response.status(401).json({
        erro: "Credenciais inválidas",
        message: "Email ou senha incorretos.",
      });
    }

    return createUserToken(aluno, response);
  } catch (error) {
    return tratarErro(error, response);
  }
};
