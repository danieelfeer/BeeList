import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controller';

const usuarioController = new UsuarioController();  // Instancia o controller

const usuarioRoutes = Router();  // Instancia o router

// Rota de cadastro de usuário
usuarioRoutes.post('/cadastro', usuarioController.cadastrar.bind(usuarioController));
// Rota de login de usuário
usuarioRoutes.post('/login', usuarioController.login.bind(usuarioController));

// Rota de login de usuário

export { usuarioRoutes };  // Exporta as rotas para o app.ts
