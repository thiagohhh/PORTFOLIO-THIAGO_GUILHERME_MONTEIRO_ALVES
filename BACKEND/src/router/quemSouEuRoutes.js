import { Router } from "express";
import {
  criarQuemSouEu,
  listarQuemSouEu,
  atualizarQuemSouEu,
  deletarQuemSouEu,
} from "../controller/quemSouEuController.js";

const router = Router();

router.post("/", criarQuemSouEu);
router.get("/", listarQuemSouEu);
router.put("/:id", atualizarQuemSouEu);
router.delete("/:id", deletarQuemSouEu);

export default router;
