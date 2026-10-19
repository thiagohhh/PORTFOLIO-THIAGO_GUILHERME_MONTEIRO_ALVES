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
import upload from "../config/multer.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.post("/conexoesInterdisciplinares", verifyToken, criarConexaoInterdisciplinar);
router.get("/conexoesInterdisciplinares", listarConexoesInterdisciplinares);
router.put("/conexoesInterdisciplinares/:id", verifyToken, atualizarConexaoInterdisciplinar);
router.delete("/conexoesInterdisciplinares/:id", verifyToken, deletarConexaoInterdisciplinar);

router.post("/conexoesTeia", verifyToken, criarConexaoTeia);
router.get("/conexoesTeia", listarConexoesTeia);
router.put("/conexoesTeia/:id", verifyToken, atualizarConexaoTeia);
router.delete("/conexoesTeia/:id", verifyToken, deletarConexaoTeia);

router.post("/escolaParaVida", verifyToken, criarEscolaParaVida);
router.get("/escolaParaVida", listarEscolaParaVida);
router.put("/escolaParaVida/:id", verifyToken, atualizarEscolaParaVida);
router.delete("/escolaParaVida/:id", verifyToken, deletarEscolaParaVida);

router.post("/fundamentosTeoricos", verifyToken, criarFundamentoTeorico);
router.get("/fundamentosTeoricos", listarFundamentosTeoricos);
router.put("/fundamentosTeoricos/:id", verifyToken, atualizarFundamentoTeorico);
router.delete("/fundamentosTeoricos/:id", verifyToken, deletarFundamentoTeorico);

router.post("/participacoesEmSala", verifyToken, criarParticipacaoEmSala);
router.get("/participacoesEmSala", listarParticipacoesEmSala);
router.put("/participacoesEmSala/:id", verifyToken, atualizarParticipacaoEmSala);
router.delete("/participacoesEmSala/:id", verifyToken, deletarParticipacaoEmSala);

router.post("/projetosTrabalhos", verifyToken, upload.single("foto"), criarProjetoTrabalho);
router.get("/projetosTrabalhos", listarProjetosTrabalho);
router.put("/projetosTrabalhos/:id", verifyToken, upload.single("foto"), atualizarProjetoTrabalho);
router.delete("/projetosTrabalhos/:id", verifyToken, deletarProjetoTrabalho);

router.post("/projetosTrabalhos/:projetoId/tags", verifyToken, criarTagProjetoTrabalho);
router.get("/projetosTrabalhos/:projetoId/tags", listarTagsProjetoTrabalho);
router.put("/projetosTrabalhos/tags/:id", verifyToken, atualizarTagProjetoTrabalho);
router.delete("/projetosTrabalhos/tags/:id", verifyToken, deletarTagProjetoTrabalho);

router.post("/reflexoesCriticas", verifyToken, criarReflexaoCritica);
router.get("/reflexoesCriticas", listarReflexoesCriticas);
router.put("/reflexoesCriticas/:id", verifyToken, atualizarReflexaoCritica);
router.delete("/reflexoesCriticas/:id", verifyToken, deletarReflexaoCritica);

router.post("/reflexoesHabilidades", verifyToken, criarReflexaoHabilidade);
router.get("/reflexoesHabilidades", listarReflexoesHabilidades);
router.put("/reflexoesHabilidades/:id", verifyToken, atualizarReflexaoHabilidade);
router.delete("/reflexoesHabilidades/:id", verifyToken, deletarReflexaoHabilidade);

export default router;
