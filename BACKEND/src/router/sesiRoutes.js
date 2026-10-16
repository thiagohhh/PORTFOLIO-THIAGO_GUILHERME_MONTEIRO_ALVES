import { Router } from "express";
import {
  criarConexaoInterdisciplinar,
  listarConexoesInterdisciplinares,
  atualizarConexaoInterdisciplinar,
  deletarConexaoInterdisciplinar,
  criarConexaoTeia,
  listarConexoesTeia,
  atualizarConexaoTeia,
  deletarConexaoTeia,
  criarEscolaParaVida,
  listarEscolaParaVida,
  atualizarEscolaParaVida,
  deletarEscolaParaVida,
  criarFundamentoTeorico,
  listarFundamentosTeoricos,
  atualizarFundamentoTeorico,
  deletarFundamentoTeorico,
  criarParticipacaoEmSala,
  listarParticipacoesEmSala,
  atualizarParticipacaoEmSala,
  deletarParticipacaoEmSala,
  criarProjetoTrabalho,
  listarProjetosTrabalho,
  atualizarProjetoTrabalho,
  deletarProjetoTrabalho,
  criarTagProjetoTrabalho,
  listarTagsProjetoTrabalho,
  atualizarTagProjetoTrabalho,
  deletarTagProjetoTrabalho,
  criarReflexaoCritica,
  listarReflexoesCriticas,
  atualizarReflexaoCritica,
  deletarReflexaoCritica,
  criarReflexaoHabilidade,
  listarReflexoesHabilidades,
  atualizarReflexaoHabilidade,
  deletarReflexaoHabilidade,
} from "../controller/sesiController.js";

const router = Router();

router.post("/conexoesInterdisciplinares", criarConexaoInterdisciplinar);
router.get("/conexoesInterdisciplinares", listarConexoesInterdisciplinares);
router.put("/conexoesInterdisciplinares/:id", atualizarConexaoInterdisciplinar);
router.delete("/conexoesInterdisciplinares/:id", deletarConexaoInterdisciplinar);

router.post("/conexoesTeia", criarConexaoTeia);
router.get("/conexoesTeia", listarConexoesTeia);
router.put("/conexoesTeia/:id", atualizarConexaoTeia);
router.delete("/conexoesTeia/:id", deletarConexaoTeia);

router.post("/escolaParaVida", criarEscolaParaVida);
router.get("/escolaParaVida", listarEscolaParaVida);
router.put("/escolaParaVida/:id", atualizarEscolaParaVida);
router.delete("/escolaParaVida/:id", deletarEscolaParaVida);

router.post("/fundamentosTeoricos", criarFundamentoTeorico);
router.get("/fundamentosTeoricos", listarFundamentosTeoricos);
router.put("/fundamentosTeoricos/:id", atualizarFundamentoTeorico);
router.delete("/fundamentosTeoricos/:id", deletarFundamentoTeorico);

router.post("/participacoesEmSala", criarParticipacaoEmSala);
router.get("/participacoesEmSala", listarParticipacoesEmSala);
router.put("/participacoesEmSala/:id", atualizarParticipacaoEmSala);
router.delete("/participacoesEmSala/:id", deletarParticipacaoEmSala);

router.post("/projetosTrabalhos", criarProjetoTrabalho);
router.get("/projetosTrabalhos", listarProjetosTrabalho);
router.put("/projetosTrabalhos/:id", atualizarProjetoTrabalho);
router.delete("/projetosTrabalhos/:id", deletarProjetoTrabalho);

router.post("/projetosTrabalhos/:projetoId/tags", criarTagProjetoTrabalho);
router.get("/projetosTrabalhos/:projetoId/tags", listarTagsProjetoTrabalho);
router.put("/projetosTrabalhos/tags/:id", atualizarTagProjetoTrabalho);
router.delete("/projetosTrabalhos/tags/:id", deletarTagProjetoTrabalho);

router.post("/reflexoesCriticas", criarReflexaoCritica);
router.get("/reflexoesCriticas", listarReflexoesCriticas);
router.put("/reflexoesCriticas/:id", atualizarReflexaoCritica);
router.delete("/reflexoesCriticas/:id", deletarReflexaoCritica);

router.post("/reflexoesHabilidades", criarReflexaoHabilidade);
router.get("/reflexoesHabilidades", listarReflexoesHabilidades);
router.put("/reflexoesHabilidades/:id", atualizarReflexaoHabilidade);
router.delete("/reflexoesHabilidades/:id", deletarReflexaoHabilidade);

export default router;
