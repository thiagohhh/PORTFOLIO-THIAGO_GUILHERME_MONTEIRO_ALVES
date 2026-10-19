import { Router } from "express";
import {
  criarQuemSouEu,
  listarQuemSouEu,
  atualizarQuemSouEu,
  deletarQuemSouEu,
} from "../controller/quemSouEuController.js";
import upload from "../config/multer.js";

const router = Router();

router.post("/", upload.single("foto"), criarQuemSouEu);
router.get("/", listarQuemSouEu);
router.put("/:id", upload.single("foto"), atualizarQuemSouEu);
router.delete("/:id", deletarQuemSouEu);

export default router;
