import { Router } from "express";
import {
  criarAprendizagem,
  listarAprendizagens,
  atualizarAprendizagem,
  deletarAprendizagem,
  criarAutoavaliacao,
  listarAutoavaliacoes,
  atualizarAutoavaliacao,
  deletarAutoavaliacao,
  criarCodigo,
  listarCodigos,
  atualizarCodigo,
  deletarCodigo,
  criarCompetencia,
  listarCompetencia,
  atualizarCompetencia,
  deletarCompetencia,
  criarDetalhe,
  listarDetalhes,
  atualizarDetalhe,
  deletarDetalhe,
  criarItemGaleria,
  listarItensGaleria,
  atualizarItemGaleria,
  deletarItemGaleria,
  criarProjeto,
  listarProjetos,
  atualizarProjeto,
  deletarProjeto,
  criarRelatorio,
  listarRelatorios,
  atualizarRelatorio,
  deletarRelatorio,
} from "../controller/senaiController.js";
import upload from "../config/multer.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

// Aprendizagens
router.post("/aprendizagens", verifyToken, criarAprendizagem);
router.get("/aprendizagens", listarAprendizagens);
router.put("/aprendizagens/:id", verifyToken, atualizarAprendizagem);
router.delete("/aprendizagens/:id", verifyToken, deletarAprendizagem);

// Autoavaliação
router.post("/autoavaliacoes", verifyToken, criarAutoavaliacao);
router.get("/autoavaliacoes", listarAutoavaliacoes);
router.put("/autoavaliacoes/:id", verifyToken, atualizarAutoavaliacao);
router.delete("/autoavaliacoes/:id", verifyToken, deletarAutoavaliacao);

// Codigos
router.post("/codigos", verifyToken, criarCodigo);
router.get("/codigos", listarCodigos);
router.put("/codigos/:id", verifyToken, atualizarCodigo);
router.delete("/codigos/:id", verifyToken, deletarCodigo);

router.post("/competencias", verifyToken, criarCompetencia);
router.get("/competencias", listarCompetencia);
router.put("/competencias/:id", verifyToken, atualizarCompetencia);
router.delete("/competencias/:id", verifyToken, deletarCompetencia);

router.post("/detalhes", verifyToken, criarDetalhe);
router.get("/detalhes", listarDetalhes);
router.put("/detalhes/:id", verifyToken, atualizarDetalhe);
router.delete("/detalhes/:id", verifyToken, deletarDetalhe);

router.post("/galeria", verifyToken, upload.single("arquivo"), criarItemGaleria);
router.get("/galeria", listarItensGaleria);
router.put("/galeria/:id", verifyToken, upload.single("arquivo"), atualizarItemGaleria);
router.delete("/galeria/:id", verifyToken, deletarItemGaleria);

router.post("/projetos", verifyToken, upload.single("foto"), criarProjeto);
router.get("/projetos", listarProjetos);
router.put("/projetos/:id", verifyToken, upload.single("foto"), atualizarProjeto);
router.delete("/projetos/:id", verifyToken, deletarProjeto);

router.post("/relatorios", verifyToken, upload.single("pdf"), criarRelatorio);
router.get("/relatorios", listarRelatorios);
router.put("/relatorios/:id", verifyToken, upload.single("pdf"), atualizarRelatorio);
router.delete("/relatorios/:id", verifyToken, deletarRelatorio);

export default router;
