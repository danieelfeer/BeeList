import mysql, { Connection } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

describe('Teste de Conexão com Banco de Dados', () => {
  let connection: Connection;

  beforeAll(() => {
    connection = mysql.createConnection({
      host: process.env.DB_HOST as string,
      port: Number(process.env.DB_PORT), // Convertendo para número
      user: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_NAME as string,
    });
  });

  afterAll(() => {
    if (connection) {
      connection.end(); // Finaliza a conexão ao término dos testes
    }
  });

  it('Deve conectar ao banco de dados com sucesso', (done) => {
    jest.setTimeout(10000); // Aumenta o timeout para conexões lentas
    connection.connect((err) => {
      expect(err).toBeNull(); // Verifica se não há erro na conexão
      done(); // Chama o done para indicar que o teste foi concluído
    });
  });
});
