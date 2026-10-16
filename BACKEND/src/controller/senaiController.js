import { Competencia, Projeto } from "../models/index.js";

export const criarCompetencia = async (request, response) => {
  try {
    const { aluno_id, unidade_curricular, titulo_competencia } = request.body;

    if (!aluno_id) {
      return response
        .status(400)
        .json({ message: "O ID do aluno é obrigatório." });
    }

    if (!unidade_curricular) {
      return response.status(400).json({
        message: "A unidade curricular é obrigatória e não pode ser vazia.",
      });
    }

    if (!titulo_competencia) {
      return response.status(400).json({
        message: "O título da competência é obrigatório e não pode ser vazio.",
      });
    }

    const competencia = await Competencia.create({
      aluno_id,
      unidade_curricular,
      titulo_competencia,
    });

    return response.status(201).json(competencia);
  } catch (error) {
    return response.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
};

export const listarCompetencia = async (request, response) => {
  try {
    const competencia = await Competencia.findAll();
    return response.status(200).json(competencia);
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Erro ao cadastrar competência.",
    });
  }
};
