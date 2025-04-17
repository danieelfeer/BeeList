import { AppDataSource } from '../config/data-source';
import { Usuario } from '../models/Usuario';

export class UsuarioService {
  private usuarioRepo = AppDataSource.getRepository(Usuario);

  // Método para cadastrar um usuário
  async cadastrarUsuario(nome: string, email: string, senha: string): Promise<Usuario> {
    console.log(`Verificando se o email ${email} já está em uso...`);

    const usuarioExistente = await this.usuarioRepo.findOneBy({ email });
    if (usuarioExistente) {
      console.log(`Email já cadastrado: ${email}`);
      throw new Error('Email já cadastrado');
    }

    console.log(`Criando novo usuário com email: ${email}`);
    const usuario = this.usuarioRepo.create({ nome, email, senha });
    await this.usuarioRepo.save(usuario);

    console.log(`Usuário criado: ${JSON.stringify(usuario)}`);
    return usuario;
  }
}
