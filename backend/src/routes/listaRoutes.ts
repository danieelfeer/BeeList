import { Router } from "express";
import { ListaController } from "../controllers/lista.controller";

const listaController = new ListaController();
const listaRoutes = Router();

listaRoutes.post("/", listaController.criar.bind(listaController)); // Criar lista
listaRoutes.get("/", listaController.listar.bind(listaController)); // Listar todas as listas
listaRoutes.get("/:id", listaController.buscarPorId.bind(listaController));
listaRoutes.put("/:listaId", listaController.atualizar.bind(listaController)); // Atualizar lista

export { listaRoutes };
