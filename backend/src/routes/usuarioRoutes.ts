import { Router } from 'express';
import { UsuarioController } from '../controllers/usuarioController';  // Importa o controller do usuário

const usuarioController = new UsuarioController();  // Instancia o controller

const usuarioRoutes = Router();  // Instancia o router

// Rota de cadastro de usuário
usuarioRoutes.post('/cadastro', usuarioController.cadastrar.bind(usuarioController));

// Rota de login de usuário

export { usuarioRoutes };  // Exporta as rotas para o app.ts
