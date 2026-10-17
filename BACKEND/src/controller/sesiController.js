

import { ProjetoTrabalho } from "../models/index.js";
import tratarErros from "../utils/tratarErros.js";

// Conexão Interdisplinar
export const criarConexaoInterdisciplinar = async (request, response) => {};
export const listarConexoesInterdisciplinares = async (request, response) => {};
export const atualizarConexaoInterdisciplinar = async (request, response) => {};
export const deletarConexaoInterdisciplinar = async (request, response) => {};

// Disciplinas que se conecta com a area de conhecimento
export const criarConexaoTeia = async (request, response) => {};
export const listarConexoesTeia = async (request, response) => {};
export const atualizarConexaoTeia = async (request, response) => {};
export const deletarConexaoTeia = async (request, response) => {};

// Escola para vida
export const criarEscolaParaVida = async (request, response) => {};
export const listarEscolaParaVida = async (request, response) => {};
export const atualizarEscolaParaVida = async (request, response) => {};
export const deletarEscolaParaVida = async (request, response) => {};

// Fundamento Teorico
export const criarFundamentoTeorico = async (request, response) => {};
export const listarFundamentosTeoricos = async (request, response) => {};
export const atualizarFundamentoTeorico = async (request, response) => {};
export const deletarFundamentoTeorico = async (request, response) => {};

// Participação em sala
export const criarParticipacaoEmSala = async (request, response) => {};
export const listarParticipacoesEmSala = async (request, response) => {};
export const atualizarParticipacaoEmSala = async (request, response) => {};
export const deletarParticipacaoEmSala = async (request, response) => {};

// Projeto e trabalho
export const criarProjetoTrabalho = async (request, response) => {
    const {
        aluno_id,
        bimestre,
        titulo_projeto,
        texto_card,
        foto
    } = request.body;

    if (!aluno_id) {
        return response
            .status(400)
            .json({ message: "O ID do aluno é obrigatório." });
    }

    if (!bimestre) {
        return response.status(400).json({
            message: "O bimestre é obrigatório."
        });
    }

    if (!titulo_projeto) {
        return response.status(400).json({
            message: "O título do projeto é obrigatório e não pode ser vazio."
        });
    }

    if (!texto_card) {
        return response.status(400).json({
            message: "O texto do projeto é obrigatório e não pode ser vazio."
        });
    }

    if (!foto) {
        return response.status(400).json({
            message: "A foto do projeto é obrigatória."
        });
    }

    try {
        const projeto = await ProjetoTrabalho.create({
            aluno_id,
            bimestre,
            titulo_projeto,
            texto_card,
            foto
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
export const atualizarProjetoTrabalho = async (request, response) => {};
export const deletarProjetoTrabalho = async (request, response) => {};

// detalhezinho do projeto e trabalhos do sesi
export const criarTagProjetoTrabalho = async (request, response) => {};
export const listarTagsProjetoTrabalho = async (request, response) => {};
export const atualizarTagProjetoTrabalho = async (request, response) => {};
export const deletarTagProjetoTrabalho = async (request, response) => {};

// Reflexão Critica
export const criarReflexaoCritica = async (request, response) => {};
export const listarReflexoesCriticas = async (request, response) => {};
export const atualizarReflexaoCritica = async (request, response) => {};
export const deletarReflexaoCritica = async (request, response) => {};

// Detalhezinho da reflexão habilidade
export const criarReflexaoHabilidade = async (request, response) => {};
export const listarReflexoesHabilidades = async (request, response) => {};
export const atualizarReflexaoHabilidade = async (request, response) => {};
export const deletarReflexaoHabilidade = async (request, response) => {};