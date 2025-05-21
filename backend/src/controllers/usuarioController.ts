import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuario.service';

export class UsuarioController {
  private usuarioService: UsuarioService;

  constructor() {
    this.usuarioService = new UsuarioService();
    console.log("Controller de Usuario instanciado com sucesso.");
  }

  async cadastrar(req: Request, res: Response): Promise<Response> {
    const { nome, email, senha } = req.body;

    console.log("Dados recebidos para cadastro:", { nome, email, senha });

    if (!nome || !email || !senha) {
      console.error("Campos obrigatórios ausentes.");
      return res.status(400).json({ error: "Todos os campos (nome, email, senha) são obrigatórios!" });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      console.error(`Formato de email inválido: "${email}"`);
      return res.status(400).json({ error: "Formato de email inválido!" });
    }

    try {
      const usuario = await this.usuarioService.cadastrarUsuario(nome, email, senha);
      console.log("Usuário cadastrado com sucesso:", usuario);
      return res.status(201).json(usuario);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);

      return res.status(400).json({
        error: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  }
}
