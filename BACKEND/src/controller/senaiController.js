import { Competencia, Projeto } from "../models/index.js";
import tratarErros from "../utils/tratarErros.js";

// Aprendizagens
export const criarAprendizagem = async (request, response) => {};
export const listarAprendizagens = async (request, response) => {};
export const atualizarAprendizagem = async (request, response) => {};
export const deletarAprendizagem = async (request, response) => {};

// Autoavaliacao
export const criarAutoavaliacao = async (request, response) => {};
export const listarAutoavaliacoes = async (request, response) => {};
export const atualizarAutoavaliacao = async (request, response) => {};
export const deletarAutoavaliacao = async (request, response) => {};

// Codigo
export const criarCodigo = async (request, response) => {};
export const listarCodigos = async (request, response) => {};
export const atualizarCodigo = async (request, response) => {};
export const deletarCodigo = async (request, response) => {};

// Competência
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
      message: "Erro interno do servidor.",
    });
  }
};
export const atualizarCompetencia = async (request, response) => {
  try {
    const { id } = request.params;
    const { unidade_curricular, titulo_competencia } = request.body;

    const competencia = await Competencia.findByPk(id);

    if (!competencia) {
      return response.status(404).json({
        message: "Competência não encontrada.",
      });
    }

    await competencia.update({ unidade_curricular, titulo_competencia });

    return response.status(200).json(competencia);
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Erro interno do servidor ao tentar atualizar." });
  }
};
export const deletarCompetencia = async (request, response) => {
  try {
    const { id } = request.params;

    const competencia = await Competencia.findByPk(id);

    if (!competencia) {
      return response.status(404).json({
        message: "Competência não encontrada.",
      });
    }

    await competencia.destroy();

    return response.status(204).send();
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Erro interno do servidor ao tentar deletar." });
  }
};

// Detalhes
export const criarDetalhe = async (request, response) => {};
export const listarDetalhes = async (request, response) => {};
export const atualizarDetalhe = async (request, response) => {};
export const deletarDetalhe = async (request, response) => {};

// Galeria
export const criarItemGaleria = async (request, response) => {};
export const listarItensGaleria = async (request, response) => {};
export const atualizarItemGaleria = async (request, response) => {};
export const deletarItemGaleria = async (request, response) => {};

// Projeto
export const criarProjeto = async (request, response) => {
  const {
    aluno_id,
    unidade_curricular,
    titulo_projeto,
    texto_card,
    url_foto,
  } = request.body;

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

  if (!titulo_projeto) {
    return response.status(400).json({
      message: "O título do projeto é obrigatório e não pode ser vazio.",
    });
  }

  if (!texto_card) {
    return response.status(400).json({
      message: "O texto do projeto é obrigatório e não pode ser vazio.",
    });
  }

  if (!url_foto) {
    return response.status(400).json({
      message: "A foto do projeto é obrigatória.",
    });
  }

  try {
    const projeto = await Projeto.create({
      aluno_id,
      unidade_curricular,
      titulo_projeto,
      texto_card,
      url_foto,
    });

    return response.status(201).json(projeto);
  } catch {
    return tratarErros(request, response);
  }
};
export const listarProjetos = async (request, response) => {
  try {
    const projetos = await Projeto.findAll();

    return response.status(200).json(projetos);
  } catch {
    return tratarErros(request, response);
  }
};
export const atualizarProjeto = async (request, response) => {};
export const deletarProjeto = async (request, response) => {};

// Relatorio
export const criarRelatorio = async (request, response) => {};
export const listarRelatorios = async (request, response) => {};
export const atualizarRelatorio = async (request, response) => {};
export const deletarRelatorio = async (request, response) => {};
