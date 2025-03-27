const mysql = require('mysql2');
require('dotenv').config();

describe('Teste de Conexão com Banco de Dados', () => {
  let connection;

  beforeAll(() => {
    connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  });

  afterAll(() => {
    if (connection) {
      connection.end();
    }
  });

  it('Deve conectar ao banco de dados com sucesso', (done) => {
    jest.setTimeout(10000); // Aumenta o timeout para evitar erros em conexões lentas
    connection.connect((err) => {
      expect(err).toBeNull(); // Verifica se não há erro na conexão
      done();
    });
  });
});
