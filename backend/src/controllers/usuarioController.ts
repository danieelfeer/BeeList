import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuarioService';

export class UsuarioController {
  private usuarioService: UsuarioService;

  constructor() {
    try {
      // Garantir que a instância do serviço seja criada
      this.usuarioService = new UsuarioService();
      console.log('Controller de Usuario instanciado com sucesso');
    } catch (error) {
      // Log de erro caso a instância falhe
      console.error('Erro ao instanciar o UsuarioService:', error);
    }
  }

  // Método para cadastro de usuário
  async cadastrar(req: Request, res: Response): Promise<Response> {
    const { nome, email, senha } = req.body;

    console.log('Dados recebidos para cadastro:', { nome, email, senha });

    // Verificar se os dados obrigatórios estão presentes
    if (!nome || !email || !senha) {
      console.error('Campos obrigatórios ausentes:', { nome, email, senha });
      return res.status(400).json({ error: 'Todos os campos (nome, email, senha) são obrigatórios!' });
    }

    try {
      // Tentar cadastrar o usuário
      console.log('Tentando cadastrar usuário...');
      const usuario = await this.usuarioService.cadastrarUsuario(nome, email, senha);
      console.log('Usuário cadastrado com sucesso:', usuario);
      return res.status(201).json(usuario);
    } catch (error) {
      // Tratar erros durante o cadastro
      console.error('Erro ao cadastrar usuário:', error);
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(400).json({ error: 'Erro desconhecido' });
      }
    }
  }

}
