import { AppDataSource } from '../config/data-source';
import { Usuario } from '../models/Usuario';

export class UsuarioService {
  private usuarioRepo = AppDataSource.getRepository(Usuario);

  async cadastrarUsuario(nome: string, email: string, senha: string): Promise<Usuario> {
    console.log(`Verificando se o email "${email}" já está em uso...`);

    if (senha.length < 4) {
      console.error(`Senha muito curta: "${senha}"`);
      throw new Error("A senha deve conter pelo menos 4 caracteres!");
    }

    const usuarioExistente = await this.usuarioRepo.findOneBy({ email });
    if (usuarioExistente) {
      console.error(`Email já cadastrado: "${email}"`);
      throw new Error("Email já cadastrado");
    }

    console.log(`Criando novo usuário com email: "${email}"`);
    const usuario = this.usuarioRepo.create({ nome, email, senha });
    await this.usuarioRepo.save(usuario);

    console.log(`Usuário criado: ${JSON.stringify(usuario)}`);
    return usuario;
  }
}
