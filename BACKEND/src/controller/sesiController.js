import {
  ConexaoInterdisciplinar,
  ConexaoTeia,
  EscolaParaVida,
  FundamentoTeorico,
  ParticipacaoEmSala,
  ProjetoTrabalho,
  ProjetoTrabalhoTag,
  ReflexaoCritica,
  ReflexaoHabilidade,
} from "../models/index.js";
import tratarErros from "../utils/tratarErros.js";

// Conexão interdisciplinar
export const criarConexaoInterdisciplinar = async (request, response) => {
  try {
    const { aluno_id, relacoes_interdisciplinares } = request.body;

    if (!aluno_id) {
      return response.status(400).json({ message: "O ID do aluno é obrigatório." });
    }
    if (!relacoes_interdisciplinares) {
      return response.status(400).json({ message: "As relações interdisciplinares são obrigatórias." });
    }

    const conexao = await ConexaoInterdisciplinar.create({
      aluno_id,
      relacoes_interdisciplinares,
    });
    return response.status(201).json(conexao);
  } catch {
    return tratarErros(request, response);
  }
};
export const listarConexoesInterdisciplinares = async (request, response) => {
  try {
    const conexoes = await ConexaoInterdisciplinar.findAll();
    return response.status(200).json(conexoes);
  } catch {
    return tratarErros(request, response);
  }
};
export const atualizarConexaoInterdisciplinar = async (request, response) => {
  try {
    const { id } = request.params;
    const { aluno_id, relacoes_interdisciplinares } = request.body;

    const conexao = await ConexaoInterdisciplinar.findByPk(id);
    if (!conexao) {
      return response.status(404).json({ message: "Conexão interdisciplinar não encontrada." });
    }

    await conexao.update({ aluno_id, relacoes_interdisciplinares });
    return response.status(200).json(conexao);
  } catch {
    return tratarErros(request, response);
  }
};
export const deletarConexaoInterdisciplinar = async (request, response) => {
  try {
    const conexao = await ConexaoInterdisciplinar.findByPk(request.params.id);
    if (!conexao) {
      return response.status(404).json({ message: "Conexão interdisciplinar não encontrada." });
    }
    await conexao.destroy();
    return response.status(204).send();
  } catch {
    return tratarErros(request, response);
  }
};

// Conexões entre matérias
export const criarConexaoTeia = async (request, response) => {
  try {
    const { conexao_id, materia_conectada } = request.body;

    if (!conexao_id) {
      return response.status(400).json({ message: "O ID da conexão é obrigatório." });
    }
    if (!materia_conectada) {
      return response.status(400).json({ message: "A matéria conectada é obrigatória." });
    }

    const conexao = await ConexaoTeia.create({ conexao_id, materia_conectada });
    return response.status(201).json(conexao);
  } catch {
    return tratarErros(request, response);
  }
};
export const listarConexoesTeia = async (request, response) => {
  try {
    const conexoes = await ConexaoTeia.findAll();
    return response.status(200).json(conexoes);
  } catch {
    return tratarErros(request, response);
  }
};
export const atualizarConexaoTeia = async (request, response) => {
  try {
    const { id } = request.params;
    const { conexao_id, materia_conectada } = request.body;

    const conexao = await ConexaoTeia.findByPk(id);
    if (!conexao) {
      return response.status(404).json({ message: "Conexão não encontrada." });
    }

    await conexao.update({ conexao_id, materia_conectada });
    return response.status(200).json(conexao);
  } catch {
    return tratarErros(request, response);
  }
};
export const deletarConexaoTeia = async (request, response) => {
  try {
    const conexao = await ConexaoTeia.findByPk(request.params.id);
    if (!conexao) {
      return response.status(404).json({ message: "Conexão não encontrada." });
    }
    await conexao.destroy();
    return response.status(204).send();
  } catch {
    return tratarErros(request, response);
  }
};

// Escola para vida
export const criarEscolaParaVida = async (request, response) => {
  try {
    const {
      aluno_id,
      reflexao_experiencia,
      aplicacao_conhecimentos,
      influencia_forma_agir_pensar,
      habilidades_desenvolvidas,
      desafios_novas_etapas,
    } = request.body;

    if (!aluno_id) {
      return response.status(400).json({ message: "O ID do aluno é obrigatório." });
    }
    if (!reflexao_experiencia) {
      return response.status(400).json({ message: "A reflexão sobre a experiência é obrigatória." });
    }
    if (!aplicacao_conhecimentos) {
      return response.status(400).json({ message: "A aplicação dos conhecimentos é obrigatória." });
    }
    if (!influencia_forma_agir_pensar) {
      return response.status(400).json({ message: "A influência na forma de agir e pensar é obrigatória." });
    }
    if (!habilidades_desenvolvidas) {
      return response.status(400).json({ message: "As habilidades desenvolvidas são obrigatórias." });
    }
    if (!desafios_novas_etapas) {
      return response.status(400).json({ message: "Os desafios e novas etapas são obrigatórios." });
    }

    const escolaParaVida = await EscolaParaVida.create({
      aluno_id,
      reflexao_experiencia,
      aplicacao_conhecimentos,
      influencia_forma_agir_pensar,
      habilidades_desenvolvidas,
      desafios_novas_etapas,
    });
    return response.status(201).json(escolaParaVida);
  } catch {
    return tratarErros(request, response);
  }
};
export const listarEscolaParaVida = async (request, response) => {
  try {
    const registros = await EscolaParaVida.findAll();
    return response.status(200).json(registros);
  } catch {
    return tratarErros(request, response);
  }
};
export const atualizarEscolaParaVida = async (request, response) => {
  try {
    const { id } = request.params;
    const {
      aluno_id,
      reflexao_experiencia,
      aplicacao_conhecimentos,
      influencia_forma_agir_pensar,
      habilidades_desenvolvidas,
      desafios_novas_etapas,
    } = request.body;

    const registro = await EscolaParaVida.findByPk(id);
    if (!registro) {
      return response.status(404).json({ message: "Registro de escola para vida não encontrado." });
    }

    await registro.update({
      aluno_id,
      reflexao_experiencia,
      aplicacao_conhecimentos,
      influencia_forma_agir_pensar,
      habilidades_desenvolvidas,
      desafios_novas_etapas,
    });
    return response.status(200).json(registro);
  } catch {
    return tratarErros(request, response);
  }
};
export const deletarEscolaParaVida = async (request, response) => {
  try {
    const registro = await EscolaParaVida.findByPk(request.params.id);
    if (!registro) {
      return response.status(404).json({ message: "Registro de escola para vida não encontrado." });
    }
    await registro.destroy();
    return response.status(204).send();
  } catch {
    return tratarErros(request, response);
  }
};

// Fundamento teórico
export const criarFundamentoTeorico = async (request, response) => {
  try {
    const { aluno_id, bimestre, resumo_teorico, teorias, conceitos, metodologias } =
      request.body;

    if (!aluno_id) {
      return response.status(400).json({ message: "O ID do aluno é obrigatório." });
    }
    if (!bimestre) {
      return response.status(400).json({ message: "O bimestre é obrigatório." });
    }
    if (!resumo_teorico) {
      return response.status(400).json({ message: "O resumo teórico é obrigatório." });
    }
    if (!teorias) {
      return response.status(400).json({ message: "As teorias são obrigatórias." });
    }
    if (!conceitos) {
      return response.status(400).json({ message: "Os conceitos são obrigatórios." });
    }
    if (!metodologias) {
      return response.status(400).json({ message: "As metodologias são obrigatórias." });
    }

    const fundamento = await FundamentoTeorico.create({
      aluno_id,
      bimestre,
      resumo_teorico,
      teorias,
      conceitos,
      metodologias,
    });
    return response.status(201).json(fundamento);
  } catch {
    return tratarErros(request, response);
  }
};
export const listarFundamentosTeoricos = async (request, response) => {
  try {
    const fundamentos = await FundamentoTeorico.findAll();
    return response.status(200).json(fundamentos);
  } catch {
    return tratarErros(request, response);
  }
};
export const atualizarFundamentoTeorico = async (request, response) => {
  try {
    const { id } = request.params;
    const { aluno_id, bimestre, resumo_teorico, teorias, conceitos, metodologias } =
      request.body;

    const fundamento = await FundamentoTeorico.findByPk(id);
    if (!fundamento) {
      return response.status(404).json({ message: "Fundamento teórico não encontrado." });
    }

    await fundamento.update({
      aluno_id,
      bimestre,
      resumo_teorico,
      teorias,
      conceitos,
      metodologias,
    });
    return response.status(200).json(fundamento);
  } catch {
    return tratarErros(request, response);
  }
};
export const deletarFundamentoTeorico = async (request, response) => {
  try {
    const fundamento = await FundamentoTeorico.findByPk(request.params.id);
    if (!fundamento) {
      return response.status(404).json({ message: "Fundamento teórico não encontrado." });
    }
    await fundamento.destroy();
    return response.status(204).send();
  } catch {
    return tratarErros(request, response);
  }
};

// Participação em sala
export const criarParticipacaoEmSala = async (request, response) => {
  try {
    const {
      aluno_id,
      bimestre,
      registro_atividades,
      o_que_chamou_atencao,
      reflexao_pratica,
      autoavaliacao,
      justificativa_autoavaliacao,
    } = request.body;

    if (!aluno_id) {
      return response.status(400).json({ message: "O ID do aluno é obrigatório." });
    }
    if (!bimestre) {
      return response.status(400).json({ message: "O bimestre é obrigatório." });
    }
    if (!registro_atividades) {
      return response.status(400).json({ message: "O registro de atividades é obrigatório." });
    }
    if (!o_que_chamou_atencao) {
      return response.status(400).json({ message: "O que chamou atenção é obrigatório." });
    }
    if (!reflexao_pratica) {
      return response.status(400).json({ message: "A reflexão da prática é obrigatória." });
    }
    if (!autoavaliacao) {
      return response.status(400).json({ message: "A autoavaliação é obrigatória." });
    }
    if (!justificativa_autoavaliacao) {
      return response.status(400).json({ message: "A justificativa da autoavaliação é obrigatória." });
    }

    const participacao = await ParticipacaoEmSala.create({
      aluno_id,
      bimestre,
      registro_atividades,
      o_que_chamou_atencao,
      reflexao_pratica,
      autoavaliacao,
      justificativa_autoavaliacao,
    });
    return response.status(201).json(participacao);
  } catch {
    return tratarErros(request, response);
  }
};
export const listarParticipacoesEmSala = async (request, response) => {
  try {
    const participacoes = await ParticipacaoEmSala.findAll();
    return response.status(200).json(participacoes);
  } catch {
    return tratarErros(request, response);
  }
};
export const atualizarParticipacaoEmSala = async (request, response) => {
  try {
    const { id } = request.params;
    const {
      aluno_id,
      bimestre,
      registro_atividades,
      o_que_chamou_atencao,
      reflexao_pratica,
      autoavaliacao,
      justificativa_autoavaliacao,
    } = request.body;

    const participacao = await ParticipacaoEmSala.findByPk(id);
    if (!participacao) {
      return response.status(404).json({ message: "Participação em sala não encontrada." });
    }

    await participacao.update({
      aluno_id,
      bimestre,
      registro_atividades,
      o_que_chamou_atencao,
      reflexao_pratica,
      autoavaliacao,
      justificativa_autoavaliacao,
    });
    return response.status(200).json(participacao);
  } catch {
    return tratarErros(request, response);
  }
};
export const deletarParticipacaoEmSala = async (request, response) => {
  try {
    const participacao = await ParticipacaoEmSala.findByPk(request.params.id);
    if (!participacao) {
      return response.status(404).json({ message: "Participação em sala não encontrada." });
    }
    await participacao.destroy();
    return response.status(204).send();
  } catch {
    return tratarErros(request, response);
  }
};

// Projeto e trabalho
export const criarProjetoTrabalho = async (request, response) => {
  try {
    const { aluno_id, bimestre, titulo_projeto, texto_card } = request.body;

    const foto = request.file ? request.file.filename : null;

    if (!aluno_id) {
      return response.status(400).json({ message: "O ID do aluno é obrigatório." });
    }
    if (!bimestre) {
      return response.status(400).json({ message: "O bimestre é obrigatório." });
    }
    if (!titulo_projeto) {
      return response.status(400).json({ message: "O título do projeto é obrigatório." });
    }
    if (!texto_card) {
      return response.status(400).json({ message: "O texto do projeto é obrigatório." });
    }
    if (!foto) {
      return response.status(400).json({ message: "A foto do projeto é obrigatória." });
    }

    const projeto = await ProjetoTrabalho.create({
      aluno_id,
      bimestre,
      titulo_projeto,
      texto_card,
      foto,
    });
    return response.status(201).json(projeto);
  } catch {
    return tratarErros(request, response);
  }
};
export const listarProjetosTrabalho = async (request, response) => {
  try {
    const projetos = await ProjetoTrabalho.findAll();
    return response.status(200).json(projetos);
  } catch {
    return tratarErros(request, response);
  }
};
export const atualizarProjetoTrabalho = async (request, response) => {
  try {
    const { id } = request.params;
    const { aluno_id, bimestre, titulo_projeto, texto_card } = request.body;

    const projeto = await ProjetoTrabalho.findByPk(id);
    if (!projeto) {
      return response.status(404).json({ message: "Projeto e trabalho não encontrado." });
    }

    let foto = projeto.foto;
    if (request.file) {
      foto = request.file.filename;
    }

    await projeto.update({
      aluno_id,
      bimestre,
      titulo_projeto,
      texto_card,
      foto,
    });
    return response.status(200).json(projeto);
  } catch {
    return tratarErros(request, response);
  }
};
export const deletarProjetoTrabalho = async (request, response) => {
  try {
    const projeto = await ProjetoTrabalho.findByPk(request.params.id);
    if (!projeto) {
      return response.status(404).json({ message: "Projeto e trabalho não encontrado." });
    }
    await projeto.destroy();
    return response.status(204).send();
  } catch {
    return tratarErros(request, response);
  }
};

// Tags do projeto e trabalho
export const criarTagProjetoTrabalho = async (request, response) => {
  try {
    const { projetoId } = request.params;
    const { tag_identificacao } = request.body;

    if (!projetoId) {
      return response.status(400).json({ message: "O ID do projeto é obrigatório." });
    }
    if (!tag_identificacao) {
      return response.status(400).json({ message: "A tag de identificação é obrigatória." });
    }

    const tag = await ProjetoTrabalhoTag.create({
      projeto_id: projetoId,
      tag_identificacao,
    });
    return response.status(201).json(tag);
  } catch {
    return tratarErros(request, response);
  }
};
export const listarTagsProjetoTrabalho = async (request, response) => {
  try {
    const { projetoId } = request.params;
    const tags = await ProjetoTrabalhoTag.findAll({
      where: { projeto_id: projetoId },
    });
    return response.status(200).json(tags);
  } catch {
    return tratarErros(request, response);
  }
};
export const atualizarTagProjetoTrabalho = async (request, response) => {
  try {
    const { id } = request.params;
    const { projeto_id, tag_identificacao } = request.body;

    const tag = await ProjetoTrabalhoTag.findByPk(id);
    if (!tag) {
      return response.status(404).json({ message: "Tag do projeto não encontrada." });
    }

    await tag.update({ projeto_id, tag_identificacao });
    return response.status(200).json(tag);
  } catch {
    return tratarErros(request, response);
  }
};
export const deletarTagProjetoTrabalho = async (request, response) => {
  try {
    const tag = await ProjetoTrabalhoTag.findByPk(request.params.id);
    if (!tag) {
      return response.status(404).json({ message: "Tag do projeto não encontrada." });
    }
    await tag.destroy();
    return response.status(204).send();
  } catch {
    return tratarErros(request, response);
  }
};

// Reflexão crítica
export const criarReflexaoCritica = async (request, response) => {
  try {
    const {
      aluno_id,
      aprendizado_academico,
      aplicacao_pratica,
      melhorias_necessarias,
      momentos_desafiadores,
    } = request.body;

    if (!aluno_id) {
      return response.status(400).json({ message: "O ID do aluno é obrigatório." });
    }
    if (!aprendizado_academico) {
      return response.status(400).json({ message: "O aprendizado acadêmico é obrigatório." });
    }
    if (!aplicacao_pratica) {
      return response.status(400).json({ message: "A aplicação prática é obrigatória." });
    }
    if (!melhorias_necessarias) {
      return response.status(400).json({ message: "As melhorias necessárias são obrigatórias." });
    }
    if (!momentos_desafiadores) {
      return response.status(400).json({ message: "Os momentos desafiadores são obrigatórios." });
    }

    const reflexao = await ReflexaoCritica.create({
      aluno_id,
      aprendizado_academico,
      aplicacao_pratica,
      melhorias_necessarias,
      momentos_desafiadores,
    });
    return response.status(201).json(reflexao);
  } catch {
    return tratarErros(request, response);
  }
};
export const listarReflexoesCriticas = async (request, response) => {
  try {
    const reflexoes = await ReflexaoCritica.findAll();
    return response.status(200).json(reflexoes);
  } catch {
    return tratarErros(request, response);
  }
};
export const atualizarReflexaoCritica = async (request, response) => {
  try {
    const { id } = request.params;
    const {
      aluno_id,
      aprendizado_academico,
      aplicacao_pratica,
      melhorias_necessarias,
      momentos_desafiadores,
    } = request.body;

    const reflexao = await ReflexaoCritica.findByPk(id);
    if (!reflexao) {
      return response.status(404).json({ message: "Reflexão crítica não encontrada." });
    }

    await reflexao.update({
      aluno_id,
      aprendizado_academico,
      aplicacao_pratica,
      melhorias_necessarias,
      momentos_desafiadores,
    });
    return response.status(200).json(reflexao);
  } catch {
    return tratarErros(request, response);
  }
};
export const deletarReflexaoCritica = async (request, response) => {
  try {
    const reflexao = await ReflexaoCritica.findByPk(request.params.id);
    if (!reflexao) {
      return response.status(404).json({ message: "Reflexão crítica não encontrada." });
    }
    await reflexao.destroy();
    return response.status(204).send();
  } catch {
    return tratarErros(request, response);
  }
};

// Habilidades da reflexão
export const criarReflexaoHabilidade = async (request, response) => {
  try {
    const { reflexao_id, nome_habilidade } = request.body;

    if (!reflexao_id) {
      return response.status(400).json({ message: "O ID da reflexão é obrigatório." });
    }
    if (!nome_habilidade) {
      return response.status(400).json({ message: "O nome da habilidade é obrigatório." });
    }

    const habilidade = await ReflexaoHabilidade.create({ reflexao_id, nome_habilidade });
    return response.status(201).json(habilidade);
  } catch {
    return tratarErros(request, response);
  }
};
export const listarReflexoesHabilidades = async (request, response) => {
  try {
    const habilidades = await ReflexaoHabilidade.findAll();
    return response.status(200).json(habilidades);
  } catch {
    return tratarErros(request, response);
  }
};
export const atualizarReflexaoHabilidade = async (request, response) => {
  try {
    const { id } = request.params;
    const { reflexao_id, nome_habilidade } = request.body;

    const habilidade = await ReflexaoHabilidade.findByPk(id);
    if (!habilidade) {
      return response.status(404).json({ message: "Habilidade da reflexão não encontrada." });
    }

    await habilidade.update({ reflexao_id, nome_habilidade });
    return response.status(200).json(habilidade);
  } catch {
    return tratarErros(request, response);
  }
};
export const deletarReflexaoHabilidade = async (request, response) => {
  try {
    const habilidade = await ReflexaoHabilidade.findByPk(request.params.id);
    if (!habilidade) {
      return response.status(404).json({ message: "Habilidade da reflexão não encontrada." });
    }
    await habilidade.destroy();
    return response.status(204).send();
  } catch {
    return tratarErros(request, response);
  }
};
