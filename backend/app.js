const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

// Carregar as variáveis do arquivo .env
dotenv.config();

// Criar o aplicativo Express
const app = express();

// Permitir requisições de qualquer origem (CORS)
app.use(cors());

// Middleware para processar JSON
app.use(bodyParser.json());

// Conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida.');
});

// Rota de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  // Verifica se o e-mail e a senha foram enviados
  if (!email || !senha) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
  }

  // Verifica no banco de dados se o e-mail e a senha são válidos
  connection.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados:', err.stack);
      return res.status(500).json({ message: 'Erro interno no servidor.' });
    }

    // Se o usuário não for encontrado
    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    // Login bem-sucedido
    return res.status(200).json({ message: 'Login realizado com sucesso!' });
  });
});

// Configura o servidor para rodar na porta 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app; // Exporta o app para ser usado nos testes
