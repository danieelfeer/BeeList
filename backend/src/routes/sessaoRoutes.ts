import { Router } from "express";
import { SessaoController } from "../controllers/sessao.controller";

const sessaoController = new SessaoController();
const sessaoRoutes = Router();

sessaoRoutes.post("/", sessaoController.criar.bind(sessaoController)); // Criar sessão
sessaoRoutes.get("/lista/:listaId", sessaoController.listarPorLista.bind(sessaoController)); // Listar sessões dentro de uma lista

export { sessaoRoutes };
