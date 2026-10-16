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

const router = Router();

router.post("/aprendizagens", criarAprendizagem);
router.get("/aprendizagens", listarAprendizagens);
router.put("/aprendizagens/:id", atualizarAprendizagem);
router.delete("/aprendizagens/:id", deletarAprendizagem);

router.post("/autoavaliacoes", criarAutoavaliacao);
router.get("/autoavaliacoes", listarAutoavaliacoes);
router.put("/autoavaliacoes/:id", atualizarAutoavaliacao);
router.delete("/autoavaliacoes/:id", deletarAutoavaliacao);

router.post("/codigos", criarCodigo);
router.get("/codigos", listarCodigos);
router.put("/codigos/:id", atualizarCodigo);
router.delete("/codigos/:id", deletarCodigo);

router.post("/competencias", criarCompetencia);
router.get("/competencias", listarCompetencia);
router.put("/competencias/:id", atualizarCompetencia);
router.delete("/competencias/:id", deletarCompetencia);

router.post("/detalhes", criarDetalhe);
router.get("/detalhes", listarDetalhes);
router.put("/detalhes/:id", atualizarDetalhe);
router.delete("/detalhes/:id", deletarDetalhe);

router.post("/galeria", criarItemGaleria);
router.get("/galeria", listarItensGaleria);
router.put("/galeria/:id", atualizarItemGaleria);
router.delete("/galeria/:id", deletarItemGaleria);

router.post("/projetos", criarProjeto);
router.get("/projetos", listarProjetos);
router.put("/projetos/:id", atualizarProjeto);
router.delete("/projetos/:id", deletarProjeto);

router.post("/relatorios", criarRelatorio);
router.get("/relatorios", listarRelatorios);
router.put("/relatorios/:id", atualizarRelatorio);
router.delete("/relatorios/:id", deletarRelatorio);

export default router;
