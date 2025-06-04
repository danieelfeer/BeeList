import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuario.service';

export class UsuarioController {
  private usuarioService: UsuarioService;

  constructor() {
    this.usuarioService = new UsuarioService();
  }

  async cadastrar(req: Request, res: Response): Promise<Response> {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    try {
      const usuario = await this.usuarioService.cadastrarUsuario(nome, email, senha);
      return res.status(201).json(usuario);
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido" });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    try {
      const usuario = await this.usuarioService.buscarPorEmail(email);

      if (!usuario || usuario.senha !== password) {
        return res.status(401).json({ error: "Credenciais inválidas." });
      }

      return res.status(200).json({ message: "Login realizado com sucesso", usuario });
    } catch (error) {
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
}
