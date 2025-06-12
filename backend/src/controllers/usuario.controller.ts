import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Usuario } from '../models/Usuario';

export class UsuarioController {
  async cadastrar(req: Request, res: Response) {
    const { nome, email, dataNascimento, senha } = req.body;

    try {
      const usuarioRepo = AppDataSource.getRepository(Usuario);

      const novoUsuario = usuarioRepo.create({
        nome,
        email,
        dataNascimento,
        senha
      });

      await usuarioRepo.save(novoUsuario);

      res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
  }

  // ...existing code...

  async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
      const usuarioRepo = AppDataSource.getRepository(Usuario);
      const usuario = await usuarioRepo.findOneBy({ email, senha });

      if (!usuario) {
        return res.status(401).json({ error: 'Email ou senha inválidos.' });
      }

      res.status(200).json({ message: 'Login realizado com sucesso!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao realizar login.' });
    }
  }

// ...existing code...
}