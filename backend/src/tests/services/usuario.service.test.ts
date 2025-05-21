import request from 'supertest';
import { app } from '../../app';
import { AppDataSource } from '../../config/data-source';

beforeAll(async () => {
  await AppDataSource.initialize();
});

beforeEach(async () => {
  const usuarioRepo = AppDataSource.getRepository("Usuario");
  await usuarioRepo.clear(); // Limpa a tabela antes de cada teste
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('POST /api/usuarios/cadastro', () => {
  it('Deve cadastrar um usuário com dados válidos', async () => {
    const novoUsuario = { 
      nome: 'Novo Usuario Teste',
      email: 'novoemailteste@example.com',
      senha: '2025',
    };

    const response = await request(app)
      .post('/api/usuarios/cadastro')
      .send(novoUsuario);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      nome: novoUsuario.nome,
      email: novoUsuario.email,
    });
  });

  it('Deve retornar erro ao cadastrar com email já existente', async () => {
    const usuarioExistente = { 
      nome: 'Usuário Existente',
      email: 'emailExistente@example.com',
      senha: 'senha123',
    };

    await request(app).post('/api/usuarios/cadastro').send(usuarioExistente);

    const response = await request(app)
      .post('/api/usuarios/cadastro')
      .send(usuarioExistente);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: 'Email já cadastrado',
    });
  });

  it('Deve retornar erro ao enviar um email com formato inválido', async () => {
    const usuarioComEmailInvalido = {
      nome: 'Usuário Inválido',
      email: 'email-invalido', 
      senha: 'senhaValida123',
    };

    const response = await request(app)
      .post('/api/usuarios/cadastro')
      .send(usuarioComEmailInvalido);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: 'Formato de email inválido!',
    });
  });

  it('Deve retornar erro ao cadastrar usuário com senha curta', async () => {
    const usuarioComSenhaCurta = {
      nome: 'Usuário Senha Fraca',
      email: 'senhafraca@email.com',
      senha: '12',
    };

    const response = await request(app)
      .post('/api/usuarios/cadastro')
      .send(usuarioComSenhaCurta);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: 'A senha deve conter pelo menos 4 caracteres!',
    });
  });
});
