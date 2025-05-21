import { AppDataSource } from "../../config/data-source";
import { UsuarioRepository } from "../../repositories/usuario.repository";

describe('UsuarioRepository', () => {
  let usuarioRepository: UsuarioRepository;

  // Configuração do banco de dados antes de executar os testes
  beforeAll(async () => {
    await AppDataSource.initialize(); // Inicializa a conexão com o banco de dados em memória
    usuarioRepository = new UsuarioRepository();
  });

  // Limpeza após os testes
  afterAll(async () => {
    await AppDataSource.destroy(); // Fecha a conexão com o banco de dados
  });

  it('should create a new usuario', async () => {
    const usuario = await usuarioRepository.createUsuario('João Silva', 'joao.silva@example.com', 'senha123');

    // Verificações
    expect(usuario).toHaveProperty('id'); // Verifica se o id foi gerado
    expect(usuario.nome).toBe('João Silva'); // Verifica se o nome está correto
    expect(usuario.email).toBe('joao.silva@example.com'); // Verifica se o email está correto
    expect(usuario.senha).toBe('senha123'); // Verifica se a senha está correta
  });

  it('should find a usuario by email', async () => {
    const usuario = await usuarioRepository.createUsuario('Maria Oliveira', 'maria.oliveira@example.com', 'senha456');
    
    const usuarioEncontrado = await usuarioRepository.findByEmail('maria.oliveira@example.com');

    // Verificações
    expect(usuarioEncontrado).toBeDefined(); // Verifica se o usuário foi encontrado
    expect(usuarioEncontrado?.email).toBe('maria.oliveira@example.com'); // Verifica se o email está correto
    expect(usuarioEncontrado?.nome).toBe('Maria Oliveira'); // Verifica se o nome está correto
  });

  it('should return null if usuario not found by email', async () => {
    const usuario = await usuarioRepository.findByEmail('nao.existe@example.com');
    
    // Verificações
    expect(usuario).toBeNull(); // Verifica se não foi encontrado nenhum usuário
  });
});
