import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";

const usuarioController = new UsuarioController();  // Instancia o controller
const usuarioRoutes = Router();

usuarioRoutes.post('/cadastro', usuarioController.cadastrar.bind(usuarioController));
usuarioRoutes.post('/login', usuarioController.login.bind(usuarioController));

export default usuarioRoutes;