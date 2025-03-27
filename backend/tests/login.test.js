const request = require('supertest');
const app = require('../app'); 

describe('Teste de Login', () => {
  it('Deve realizar login com credenciais válidas', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'usuario@email.com',
        senha: 'Senha123',
      });

    expect(response.status).toBe(200); // Espera-se um status de sucesso
    expect(response.body.message).toBe('Login realizado com sucesso!');
  });

  it('Não deve realizar login com credenciais inválidas', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'usuario@email.com',
        senha: 'SenhaErrada',
      });

    expect(response.status).toBe(401); // Espera-se um status de não autorizado
    expect(response.body.message).toBe('Usuário não encontrado.');
  });
});
