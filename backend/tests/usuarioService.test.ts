import request from 'supertest';
import { app } from '../src/app';
import { AppDataSource } from '../src/config/data-source';

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('POST /api/usuarios/cadastro', () => {
  it('Deve cadastrar um usuário com dados válidos', async () => {
    const novoUsuario = { //Colocar usuário que não existe no banco de dados
      nome: 'uuusuarioooooNovo',
      email: 'uuuusuariooovalidoDeMais@example.com',
      senha: '112390',
    };

    const response = await request(app)
      .post('/api/usuarios/cadastro')
      .send(novoUsuario);

    // Verifica se a resposta tem status 201
    expect(response.status).toBe(201);

    // Verifica se os dados retornados estão corretos
    expect(response.body).toHaveProperty('id'); // O ID do usuário deve ser retornado
    expect(response.body.nome).toBe(novoUsuario.nome); // Nome deve ser o mesmo
    expect(response.body.email).toBe(novoUsuario.email); // Email deve ser o mesmo
    expect(response.body.senha).toBe(novoUsuario.senha); // Senha deve ser igual, pois não há criptografia
  });

  it('Deve retornar erro ao cadastrar com email já existente', async () => {
    const usuarioExistente = { 
      nome: 'uuusuario',
      email: 'uuuusuariooovalido@example.com', // Email já utilizado
      senha: '112390',
    };

    const response = await request(app)
      .post('/api/usuarios/cadastro')
      .send(usuarioExistente);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Email já cadastrado');
  });
});
