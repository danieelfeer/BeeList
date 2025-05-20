import { DataSource } from 'typeorm';
import { Usuario } from '../models/Usuario';


describe('Teste de Conexão com Banco de Dados SQLite', () => {
  let connection: DataSource;

  beforeAll(async () => {
    connection = new DataSource({
      type: "sqlite",
      database: ":memory:", // Banco de dados em memória
      entities: [Usuario],
      synchronize: true,
      logging: false,
    });

    await connection.initialize(); // Inicializa a conexão
  });

  afterAll(async () => {
    if (connection) {
      await connection.destroy(); // Encerra a conexão ao fim dos testes
    }
  });

  it('Deve conectar ao banco de dados SQLite com sucesso', async () => {
    expect(connection.isInitialized).toBe(true); // Verifica se a conexão foi iniciada corretamente
  });
});
