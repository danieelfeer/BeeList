import { app } from './app';
import { AppDataSource } from './config/data-source';

const port = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Conectado ao banco de dados com sucesso!');
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1); // Finaliza o processo em caso de erro
  });
