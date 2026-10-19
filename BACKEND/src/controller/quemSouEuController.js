import QuemSouEu from "../models/QuemSouEu.js";
import tratarErros from "../utils/tratarErros.js";

const obterFoto = (request) =>
  request.file ? `/uploads/${request.file.filename}` : request.body.foto;

export const criarQuemSouEu = async (request, response) => {
  try {
    const {
      aluno_id,
      titulo,
      itinerario,
      paragrafo_biografia,
      texto_negrito,
    } = request.body;
    const foto = obterFoto(request);

    if (!aluno_id) {
      return response.status(400).json({
        message: "O ID do aluno é obrigatório.",
      });
    }

    if (!titulo) {
      return response.status(400).json({
        message: "O título é obrigatório.",
      });
    }

    if (!itinerario) {
      return response.status(400).json({
        message: "O itinerário é obrigatório.",
      });
    }

    if (!paragrafo_biografia) {
      return response.status(400).json({
        message: "A biografia é obrigatória.",
      });
    }

    if (!texto_negrito) {
      return response.status(400).json({
        message: "O texto em negrito é obrigatório.",
      });
    }

    if (!foto) {
      return response.status(400).json({
        message: "A foto é obrigatória.",
      });
    }

    const quemSouEu = await QuemSouEu.create({
      aluno_id,
      titulo,
      itinerario,
      paragrafo_biografia,
      texto_negrito,
      foto,
    });

    return response.status(201).json(quemSouEu);
  } catch {
    return tratarErros(request, response);
  }
};

export const listarQuemSouEu = async (request, response) => {
  try {
    const quemSouEu = await QuemSouEu.findAll();

    return response.status(200).json(quemSouEu);
  } catch {
    return tratarErros(request, response);
  }
};

export const atualizarQuemSouEu = async (request, response) => {
  try {
    const { id } = request.params;
    const {
      aluno_id,
      titulo,
      itinerario,
      paragrafo_biografia,
      texto_negrito,
    } = request.body;

    const quemSouEu = await QuemSouEu.findByPk(id);

    if (!quemSouEu) {
      return response.status(404).json({
        message: "Quem sou eu não encontrado.",
      });
    }

    await quemSouEu.update({
      aluno_id,
      titulo,
      itinerario,
      paragrafo_biografia,
      texto_negrito,
      foto: obterFoto(request) ?? quemSouEu.foto,
    });

    return response.status(200).json(quemSouEu);
  } catch {
    return tratarErros(request, response);
  }
};

export const deletarQuemSouEu = async (request, response) => {
  try {
    const { id } = request.params;
    const quemSouEu = await QuemSouEu.findByPk(id);

    if (!quemSouEu) {
      return response.status(404).json({
        message: "Quem sou eu não encontrado.",
      });
    }

    await quemSouEu.destroy();

    return response.status(204).send();
  } catch {
    return tratarErros(request, response);
  }
};
