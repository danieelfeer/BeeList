import { Router } from "express";
import { ListaController } from "../controllers/listaController";

const listaController = new ListaController();
const listaRoutes = Router();

listaRoutes.post("/", listaController.criar.bind(listaController)); // Criar lista
listaRoutes.get("/", listaController.listar.bind(listaController)); // Listar todas as listas

export { listaRoutes };
