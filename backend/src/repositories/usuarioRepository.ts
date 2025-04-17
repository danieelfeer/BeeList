import { AppDataSource } from '../config/data-source';
import { Usuario } from '../models/Usuario';

export class UsuarioRepository {
  private repo = AppDataSource.getRepository(Usuario);  // Usando o DataSource para pegar o repositório

  async findByEmail(email: string): Promise<Usuario | null> {
    return await this.repo.findOne({ where: { email } });
  }

  async createUsuario(nome: string, email: string, senha: string): Promise<Usuario> {
    const usuario = this.repo.create({ nome, email, senha });
    return await this.repo.save(usuario);
  }
}

export const usuarioRepository = new UsuarioRepository();
