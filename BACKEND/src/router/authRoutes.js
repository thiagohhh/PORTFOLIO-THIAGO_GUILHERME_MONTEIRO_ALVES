import { Router } from "express";
import { login } from "../controller/autenticacaoController.js";

const router = Router();

// POST /auth/login  — igual ao que o professor ensinou
router.post("/login", login);

export default router;
