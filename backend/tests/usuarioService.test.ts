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
    const novoUsuario = { // Dados válidos para um usuário que não existe no banco
      nome: 'Novo Usuario Teste',
      email: 'novoemailteste@example.com',
      senha: '2025',
    };

    const response = await request(app)
      .post('/api/usuarios/cadastro')
      .send(novoUsuario);

    expect(response.status).toBe(201); // Confirma status de sucesso
    expect(response.body).toHaveProperty('id'); // Verifica se um ID foi retornado
    expect(response.body.nome).toBe(novoUsuario.nome);
    expect(response.body.email).toBe(novoUsuario.email);
  });

  it('Deve retornar erro ao cadastrar com email já existente', async () => {
    const usuarioExistente = { 
      nome: 'Usuário Existente',
      email: 'emailExistente@example.com', // Email que já está cadastrado no banco
      senha: 'senha123',
    };

    const response = await request(app)
      .post('/api/usuarios/cadastro')
      .send(usuarioExistente);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Email já cadastrado');
  });

  it('Deve retornar erro ao enviar um email com formato inválido', async () => {
    const usuarioComEmailInvalido = {
      nome: 'Usuário Inválido',
      email: 'email-invalido', // Formato incorreto
      senha: 'senhaValida123',
    };

    const response = await request(app)
      .post('/api/usuarios/cadastro')
      .send(usuarioComEmailInvalido);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Formato de email inválido!');
  });
});
