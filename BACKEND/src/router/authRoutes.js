import { Router } from "express";
import { login } from "../controller/autenticacaoController.js";

const router = Router();


router.post("/login", login);

export default router;
