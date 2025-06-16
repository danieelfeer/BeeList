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

  async login(req: Request, res: Response) {
    const { email, senha } = req.body;
    const usuarioRepo = AppDataSource.getRepository(Usuario); // Adicione esta linha
    const usuario = await usuarioRepo.findOneBy({ email });   // Use usuarioRepo

    if (!usuario) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    // Verifique a senha aqui (ajuste conforme sua lógica)
    if (usuario.senha !== senha) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    return res.json({
      message: "Login realizado com sucesso!",
      usuario: {
        nome: usuario.nome,
        email: usuario.email
      }
    });
  }

}