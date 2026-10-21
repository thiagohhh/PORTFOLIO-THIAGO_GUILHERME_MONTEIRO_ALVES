import bcrypt from "bcrypt";
import { Aluno } from "../models/index.js";
import { createUserToken } from "../utils/createUserToken.js";
import { tratarErro } from "../utils/errorHandle.js";

export const login = async (request, response) => {
  try {
    const { email, senha } = request.body;

    // 
    if (!email || !String(email).trim()) {
      return response.status(400).json({
        message: "O e-mail é obrigatório.",
      });
    }

    if (!senha || !String(senha).trim()) {
      return response.status(400).json({
        message: "A senha é obrigatória.",
      });
    }

  
    const emailLimpo = String(email).trim().toLowerCase();
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo);

    if (!emailValido) {
      return response.status(400).json({
        message: "Informe um e-mail válido.",
      });
    }

    
    if (String(senha).length < 6) {
      return response.status(400).json({
        message: "A senha deve ter no mínimo 6 caracteres.",
      });
    }

    
    const aluno = await Aluno.scope("comSenha").findOne({
      where: { email: emailLimpo },
    });

   
    if (!aluno) {
      return response.status(401).json({
        message: "E-mail ou senha inválidos.",
      });
    }

    const senhaCorreta = await bcrypt.compare(senha, aluno.senha);

    if (!senhaCorreta) {
      return response.status(401).json({
        message: "E-mail ou senha inválidos.",
      });
    }


    return createUserToken(aluno, response);
  } catch (error) {
    return tratarErro(error, response);
  }
};