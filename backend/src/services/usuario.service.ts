import { AppDataSource } from '../config/data-source';
import { Usuario } from '../models/Usuario';

export class UsuarioService {
  private usuarioRepo = AppDataSource.getRepository(Usuario);

  async cadastrarUsuario(nome: string, email: string, senha: string): Promise<Usuario> {
    if (senha.length < 4) {
      throw new Error("A senha deve conter pelo menos 4 caracteres!");
    }

    const usuarioExistente = await this.usuarioRepo.findOneBy({ email });
    if (usuarioExistente) {
      throw new Error("Email já cadastrado");
    }

    const usuario = this.usuarioRepo.create({ nome, email, senha });
    await this.usuarioRepo.save(usuario);
    return usuario;
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return await this.usuarioRepo.findOneBy({ email });
  }
}
