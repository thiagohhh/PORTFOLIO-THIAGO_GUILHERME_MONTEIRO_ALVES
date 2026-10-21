import {
  Aprendizagens,
  Autoavaliacao,
  Codigo,
  Competencia,
  Detalhe,
  Galeria,
  Projeto,
  Relatorio,
} from "../models/index.js";

import tratarErros from "../utils/tratarErros.js";

// Aprendizagens
export const criarAprendizagem = async (request, response) => {
  try {
    const {
      aluno_id,
      unidade_curricular,
      titulo_aprendizagem,
      descricao_aprendizagem,
      nivel_estrelas,
    } = request.body;

    if (!aluno_id) {
      return response
        .status(400)
        .json({ message: "O ID do aluno é obrigatório." });
    }
    if (!unidade_curricular) {
      return response
        .status(400)
        .json({ message: "A unidade curricular é obrigatória." });
    }
    if (!titulo_aprendizagem) {
      return response
        .status(400)
        .json({ message: "O título da aprendizagem é obrigatório." });
    }
    if (!descricao_aprendizagem) {
      return response
        .status(400)
        .json({ message: "A descrição da aprendizagem é obrigatória." });
    }
    if (!nivel_estrelas) {
      return response
        .status(400)
        .json({ message: "O nível de estrelas é obrigatório." });
    }

    const aprendizagem = await Aprendizagens.create({
      aluno_id,
      unidade_curricular,
      titulo_aprendizagem,
      descricao_aprendizagem,
      nivel_estrelas,
    });
    return response.status(201).json(aprendizagem);
  } catch {
    return tratarErros(request, response);
  }
};
export const listarAprendizagens = async (request, response) => {
  try {
    const aprendizagens = await Aprendizagens.findAll();
    return response.status(200).json(aprendizagens);
  } catch {
    return tratarErros(request, response);
  }
};
export const atualizarAprendizagem = async (request, response) => {
  try {
    const { id } = request.params;
    const {
      aluno_id,
      unidade_curricular,
      titulo_aprendizagem,
      descricao_aprendizagem,
      nivel_estrelas,
    } = request.body;

    const aprendizagem = await Aprendizagens.findByPk(id);

    if (!aprendizagem) {
      return response
        .status(404)
        .json({ message: "Aprendizagem não encontrada." });
    }

    await aprendizagem.update({
      aluno_id,
      unidade_curricular,
      titulo_aprendizagem,
      descricao_aprendizagem,
      nivel_estrelas,
    });
    return response.status(200).json(aprendizagem);
  } catch {
    return tratarErros(request, response);
  }
};
export const deletarAprendizagem = async (request, response) => {
  try {
    const aprendizagem = await Aprendizagens.findByPk(request.params.id);
    if (!aprendizagem) {
      return response
        .status(404)
        .json({ message: "Aprendizagem não encontrada." });
    }
    await aprendizagem.destroy();
    return response.status(204).send();
  } catch {
    return tratarErros(request, response);
  }
};

// Autoavaliação
export const criarAutoavaliacao = async (request, response) => {
  try {
    const {
      aluno_id,
      unidade_curricular,
      nota_bolinhas,
      percentual,
      justificativa_texto,
    } = request.body;

    if (!aluno_id) {
      return response
        .status(400)
        .json({ message: "O ID do aluno é obrigatório." });
    }
    if (!unidade_curricular) {
      return response
        .status(400)
        .json({ message: "A unidade curricular é obrigatória." });
    }
    if (!nota_bolinhas) {
      return response.status(400).json({ message: "A nota é obrigatória." });
    }
    if (!percentual) {
      return response
        .status(400)
        .json({ message: "O percentual é obrigatório." });
    }
    if (!justificativa_texto) {
      return response
        .status(400)
        .json({ message: "A justificativa é obrigatória." });
    }

    const autoavaliacao = await Autoavaliacao.create({
      aluno_id,
      unidade_curricular,
      nota_bolinhas,
      percentual,
      justificativa_texto,
    });
    return response.status(201).json(autoavaliacao);
  } catch {
    return tratarErros(request, response);
  }
};
export const listarAutoavaliacoes = async (request, response) => {
  try {
    const autoavaliacoes = await Autoavaliacao.findAll();
    return response.status(200).json(autoavaliacoes);
  } catch {
    return tratarErros(request, response);
  }
};
export const atualizarAutoavaliacao = async (request, response) => {
  try {
    const { id } = request.params;
    const {
      aluno_id,
      unidade_curricular,
      nota_bolinhas,
      percentual,
      justificativa_texto,
    } = request.body;

    const autoavaliacao = await Autoavaliacao.findByPk(id);

    if (!autoavaliacao) {
      return response
        .status(404)
        .json({ message: "Autoavaliação não encontrada." });
    }

    await autoavaliacao.update({
      aluno_id,
      unidade_curricular,
      nota_bolinhas,
      percentual,
      justificativa_texto,
    });
    return response.status(200).json(autoavaliacao);
  } catch {
    return tratarErros(request, response);
  }
};
export const deletarAutoavaliacao = async (request, response) => {
  try {
    const autoavaliacao = await Autoavaliacao.findByPk(request.params.id);
    if (!autoavaliacao) {
      return response
        .status(404)
        .json({ message: "Autoavaliação não encontrada." });
    }
    await autoavaliacao.destroy();
    return response.status(204).send();
  } catch {
    return tratarErros(request, response);
  }
};
// Código
export const criarCodigo = async (request, response) => {
  try {
    const {
      aluno_id,
      unidade_curricular,
      titulo_codigo,
      descricao_linguagem,
      bloco_codigo,
    } = request.body;

    if (!aluno_id) {
      return response
        .status(400)
        .json({ message: "O ID do aluno é obrigatório." });
    }
    if (!unidade_curricular) {
      return response
        .status(400)
        .json({ message: "A unidade curricular é obrigatória." });
    }
    if (!titulo_codigo) {
      return response
        .status(400)
        .json({ message: "O título do código é obrigatório." });
    }
    if (!descricao_linguagem) {
      return response
        .status(400)
        .json({ message: "A linguagem do código é obrigatória." });
    }
    if (!bloco_codigo) {
      return response
        .status(400)
        .json({ message: "O bloco de código é obrigatório." });
    }

    const codigo = await Codigo.create({
      aluno_id,
      unidade_curricular,
      titulo_codigo,
      descricao_linguagem,
      bloco_codigo,
    });
    return response.status(201).json(codigo);
  } catch {
    return tratarErros(request, response);
  }
};
export const listarCodigos = async (request, response) => {
  try {
    const codigos = await Codigo.findAll();
    return response.status(200).json(codigos);
  } catch {
    return tratarErros(request, response);
  }
};
export const atualizarCodigo = async (request, response) => {
  try {
    const { id } = request.params;
    const {
      aluno_id,
      unidade_curricular,
      titulo_codigo,
      descricao_linguagem,
      bloco_codigo,
    } = request.body;

    const codigo = await Codigo.findByPk(id);
    if (!codigo) {
      return response.status(404).json({ message: "Código não encontrado." });
    }

    await codigo.update({
      aluno_id,
      unidade_curricular,
      titulo_codigo,
      descricao_linguagem,
      bloco_codigo,
    });
    return response.status(200).json(codigo);
  } catch {
    return tratarErros(request, response);
  }
};
export const deletarCodigo = async (request, response) => {
  try {
    const codigo = await Codigo.findByPk(request.params.id);
    if (!codigo) {
      return response.status(404).json({ message: "Código não encontrado." });
    }
    await codigo.destroy();
    return response.status(204).send();
  } catch {
    return tratarErros(request, response);
  }
};

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
      return response
        .status(400)
        .json({ message: "A unidade curricular é obrigatória." });
    }
    if (!titulo_competencia) {
      return response
        .status(400)
        .json({ message: "O título da competência é obrigatório." });
    }

    const competencia = await Competencia.create({
      aluno_id,
      unidade_curricular,
      titulo_competencia,
    });
    return response.status(201).json(competencia);
  } catch {
    return tratarErros(request, response);
  }
};
export const listarCompetencia = async (request, response) => {
  try {
    const competencias = await Competencia.findAll();
    return response.status(200).json(competencias);
  } catch {
    return tratarErros(request, response);
  }
};
export const atualizarCompetencia = async (request, response) => {
  try {
    const { id } = request.params;
    const { aluno_id, unidade_curricular, titulo_competencia } = request.body;

    const competencia = await Competencia.findByPk(id);
    if (!competencia) {
      return response
        .status(404)
        .json({ message: "Competência não encontrada." });
    }

    await competencia.update({
      aluno_id,
      unidade_curricular,
      titulo_competencia,
    });
    return response.status(200).json(competencia);
  } catch {
    return tratarErros(request, response);
  }
};
export const deletarCompetencia = async (request, response) => {
  try {
    const competencia = await Competencia.findByPk(request.params.id);
    if (!competencia) {
      return response
        .status(404)
        .json({ message: "Competência não encontrada." });
    }
    await competencia.destroy();
    return response.status(204).send();
  } catch {
    return tratarErros(request, response);
  }
};

// Detalhes
export const criarDetalhe = async (request, response) => {
  try {
    const { item_id, tipo_origem, tag_identificacao } = request.body;

    if (!item_id) {
      return response
        .status(400)
        .json({ message: "O ID do item é obrigatório." });
    }
    if (!tipo_origem) {
      return response
        .status(400)
        .json({ message: "O tipo de origem é obrigatório." });
    }
    if (!tag_identificacao) {
      return response
        .status(400)
        .json({ message: "A tag de identificação é obrigatória." });
    }

    const detalhe = await Detalhe.create({
      item_id,
      tipo_origem,
      tag_identificacao,
    });
    return response.status(201).json(detalhe);
  } catch {
    return tratarErros(request, response);
  }
};
export const listarDetalhes = async (request, response) => {
  try {
    const detalhes = await Detalhe.findAll();
    return response.status(200).json(detalhes);
  } catch {
    return tratarErros(request, response);
  }
};
export const atualizarDetalhe = async (request, response) => {
  try {
    const { id } = request.params;
    const { item_id, tipo_origem, tag_identificacao } = request.body;

    const detalhe = await Detalhe.findByPk(id);
    if (!detalhe) {
      return response.status(404).json({ message: "Detalhe não encontrado." });
    }

    await detalhe.update({ item_id, tipo_origem, tag_identificacao });
    return response.status(200).json(detalhe);
  } catch {
    return tratarErros(request, response);
  }
};
export const deletarDetalhe = async (request, response) => {
  try {
    const detalhe = await Detalhe.findByPk(request.params.id);
    if (!detalhe) {
      return response.status(404).json({ message: "Detalhe não encontrado." });
    }
    await detalhe.destroy();
    return response.status(204).send();
  } catch {
    return tratarErros(request, response);
  }
};

// Galeria
export const criarItemGaleria = async (request, response) => {
  try {
    const {
      aluno_id,
      unidade_curricular,
      tipo_midia,
      titulo_midia,
      explicado_a_midia,
    } = request.body;

    const arquivo = request.file ? request.file.filename : null;

    if (!aluno_id) {
      return response
        .status(400)
        .json({ message: "O ID do aluno é obrigatório." });
    }
    if (!unidade_curricular) {
      return response
        .status(400)
        .json({ message: "A unidade curricular é obrigatória." });
    }
    if (!tipo_midia) {
      return response
        .status(400)
        .json({ message: "O tipo de mídia é obrigatório." });
    }
    if (!titulo_midia) {
      return response
        .status(400)
        .json({ message: "O título da mídia é obrigatório." });
    }
    if (!explicado_a_midia) {
      return response
        .status(400)
        .json({ message: "A explicação da mídia é obrigatória." });
    }
    if (!arquivo) {
      return response.status(400).json({ message: "O arquivo é obrigatório." });
    }

    const itemGaleria = await Galeria.create({
      aluno_id,
      unidade_curricular,
      tipo_midia,
      titulo_midia,
      explicado_a_midia,
      arquivo,
    });
    return response.status(201).json(itemGaleria);
  } catch {
    return tratarErros(request, response);
  }
};
export const listarItensGaleria = async (request, response) => {
  try {
    const itensGaleria = await Galeria.findAll();
    return response.status(200).json(itensGaleria);
  } catch {
    return tratarErros(request, response);
  }
};
export const atualizarItemGaleria = async (request, response) => {
  try {
    const { id } = request.params;
    const {
      aluno_id,
      unidade_curricular,
      tipo_midia,
      titulo_midia,
      explicado_a_midia,
    } = request.body;

    const itemGaleria = await Galeria.findByPk(id);
    if (!itemGaleria) {
      return response
        .status(404)
        .json({ message: "Item da galeria não encontrado." });
    }

    let arquivo = itemGaleria.arquivo;
    if (request.file) {
      arquivo = request.file.filename;
    }

    await itemGaleria.update({
      aluno_id,
      unidade_curricular,
      tipo_midia,
      titulo_midia,
      explicado_a_midia,
      arquivo,
    });
    return response.status(200).json(itemGaleria);
  } catch {
    return tratarErros(request, response);
  }
};
export const deletarItemGaleria = async (request, response) => {
  try {
    const itemGaleria = await Galeria.findByPk(request.params.id);
    if (!itemGaleria) {
      return response
        .status(404)
        .json({ message: "Item da galeria não encontrado." });
    }
    await itemGaleria.destroy();
    return response.status(204).send();
  } catch {
    return tratarErros(request, response);
  }
};

// Projeto
export const criarProjeto = async (request, response) => {
  try {
    const { aluno_id, unidade_curricular, titulo_projeto, texto_card } =
      request.body;

    const foto = request.file ? request.file.filename : null;

    if (!aluno_id) {
      return response
        .status(400)
        .json({ message: "O ID do aluno é obrigatório." });
    }
    if (!unidade_curricular) {
      return response
        .status(400)
        .json({ message: "A unidade curricular é obrigatória." });
    }
    if (!titulo_projeto) {
      return response
        .status(400)
        .json({ message: "O título do projeto é obrigatório." });
    }
    if (!texto_card) {
      return response
        .status(400)
        .json({ message: "O texto do projeto é obrigatório." });
    }
    if (!foto) {
      return response
        .status(400)
        .json({ message: "A foto do projeto é obrigatória." });
    }

    const projeto = await Projeto.create({
      aluno_id,
      unidade_curricular,
      titulo_projeto,
      texto_card,
      foto,
    });
    return response.status(201).json(projeto);
  } catch (err) {
  
    return response.status(500).json({ 
      message: "Erro interno do servidor." 
    });
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
export const atualizarProjeto = async (request, response) => {
  try {
    const { id } = request.params;
    const { aluno_id, unidade_curricular, titulo_projeto, texto_card } =
      request.body;

    const projeto = await Projeto.findByPk(id);
    if (!projeto) {
      return response.status(404).json({ message: "Projeto não encontrado." });
    }

    let foto = projeto.foto;
    if (request.file) {
      foto = request.file.filename;
    }

    await projeto.update({
      aluno_id,
      unidade_curricular,
      titulo_projeto,
      texto_card,
      foto,
    });
    return response.status(200).json(projeto);
  } catch {
    return tratarErros(request, response);
  }
};
export const deletarProjeto = async (request, response) => {
  try {
    const projeto = await Projeto.findByPk(request.params.id);
    if (!projeto) {
      return response.status(404).json({ message: "Projeto não encontrado." });
    }
    await projeto.destroy();
    return response.status(204).send();
  } catch {
    return tratarErros(request, response);
  }
};

// Relatório
export const criarRelatorio = async (request, response) => {
  try {
    const {
      aluno_id,
      unidade_curricular,
      titulo_relatorio,
      paragrafo_relatorio,
    } = request.body;

    const pdf = request.file ? request.file.filename : null;

    if (!aluno_id) {
      return response
        .status(400)
        .json({ message: "O ID do aluno é obrigatório." });
    }
    if (!unidade_curricular) {
      return response
        .status(400)
        .json({ message: "A unidade curricular é obrigatória." });
    }
    if (!titulo_relatorio) {
      return response
        .status(400)
        .json({ message: "O título do relatório é obrigatório." });
    }
    if (!paragrafo_relatorio) {
      return response
        .status(400)
        .json({ message: "O texto do relatório é obrigatório." });
    }
    if (!pdf) {
      return response.status(400).json({ message: "O PDF é obrigatório." });
    }

    const relatorio = await Relatorio.create({
      aluno_id,
      unidade_curricular,
      titulo_relatorio,
      paragrafo_relatorio,
      pdf,
    });
    return response.status(201).json(relatorio);
  } catch {
    return tratarErros(request, response);
  }
};
export const listarRelatorios = async (request, response) => {
  try {
    const relatorios = await Relatorio.findAll();
    return response.status(200).json(relatorios);
  } catch {
    return tratarErros(request, response);
  }
};
export const atualizarRelatorio = async (request, response) => {
  try {
    const { id } = request.params;
    const {
      aluno_id,
      unidade_curricular,
      titulo_relatorio,
      paragrafo_relatorio,
    } = request.body;

    const relatorio = await Relatorio.findByPk(id);

    if (!relatorio) {
      return response
        .status(404)
        .json({ message: "Relatório não encontrado." });
    }

    let pdf = relatorio.pdf;
    if (request.file) {
      pdf = request.file.filename;
    }

    await relatorio.update({
      aluno_id,
      unidade_curricular,
      titulo_relatorio,
      paragrafo_relatorio,
      pdf,
    });
    return response.status(200).json(relatorio);
  } catch {
    return tratarErros(request, response);
  }
};
export const deletarRelatorio = async (request, response) => {
  try {
    const relatorio = await Relatorio.findByPk(request.params.id);
    if (!relatorio) {
      return response
        .status(404)
        .json({ message: "Relatório não encontrado." });
    }
    await relatorio.destroy();
    return response.status(204).send();
  } catch {
    return tratarErros(request, response);
  }
};
