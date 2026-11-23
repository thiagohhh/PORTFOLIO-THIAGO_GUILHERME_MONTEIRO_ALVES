import { Router } from "express";
import { criarAluno } from "../controller/alunoController.js";
import { login } from "../controller/autenticacaoController.js";

const router = Router();

// Login antigo continua funcionando (compatibilidade)
router.post("/login", login);
router.post("/", criarAluno);

export default router;
