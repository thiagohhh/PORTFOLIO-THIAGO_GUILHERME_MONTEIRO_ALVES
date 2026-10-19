import bcrypt from "bcrypt";
import Aluno from "../models/Aluno.js";
import tratarErros from "../utils/tratarErros.js";

export const criarAluno = async (request, response) => {
  try {
    const { nome, email, senha } = request.body;

    if (!nome) {
      return response.status(400).json({
        message: "O nome é obrigatório.",
      });
    }

    if (!email) {
      return response.status(400).json({
        message: "O e-mail é obrigatório.",
      });
    }

    if (!senha) {
      return response.status(400).json({
        message: "A senha é obrigatória.",
      });
    }

    const aluno = await Aluno.create({
      nome,
      email,
      senha: await bcrypt.hash(senha, 12),
    });

    return response.status(201).json({
      id: aluno.id,
      nome: aluno.nome,
      email: aluno.email,
    });
  } catch {
    return tratarErros(request, response);
  }
};
