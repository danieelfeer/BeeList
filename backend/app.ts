import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';  // O DataSource do TypeORM
import { usuarioRoutes } from './routes/usuarioRoutes'; // As rotas do usuário

dotenv.config();  // Carregar variáveis de ambiente

const app = express();

// Middleware para logar todas as requisições
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);  // Log de cada requisição
  next();  // Passa para o próximo middleware
});

// Middleware para parsear o corpo das requisições em JSON
app.use(express.json());  // Necessário para processar o corpo da requisição como JSON

// Rota para as APIs de usuário (login, cadastro, etc)
app.use('/api/usuarios', usuarioRoutes);

// Inicializar o banco de dados e iniciar o servidor
AppDataSource.initialize()
  .then(() => {
    console.log('Conectado ao banco de dados com sucesso!');
    
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

// Rota de fallback para quando as rotas não forem encontradas
app.use((req, res) => {
  console.log(`Rota não encontrada: ${req.method} ${req.url}`);
  res.status(404).json({ message: 'Rota não encontrada!' });
});
