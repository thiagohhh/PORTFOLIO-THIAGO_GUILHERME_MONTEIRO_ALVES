import { Router } from "express";
import {
  criarQuemSouEu,
  listarQuemSouEu,
  atualizarQuemSouEu,
  deletarQuemSouEu,
} from "../controller/quemSouEuController.js";
import upload from "../config/multer.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.post("/", verifyToken, upload.single("foto"), criarQuemSouEu);
router.get("/", listarQuemSouEu);
router.put("/:id", verifyToken, upload.single("foto"), atualizarQuemSouEu);
router.delete("/:id", verifyToken, deletarQuemSouEu);

export default router;
