// backend/app.ts

import express from 'express';
import cors from 'cors';
import { DataSource } from 'typeorm'; 
import { Usuario } from './models/Usuario';
import dotenv from 'dotenv';
import { env } from 'process';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Configuração do DataSource para MySQL
const dataSource = new DataSource({
  type: "mysql",                
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "beelist",
  entities: [Usuario],          // Entidades (Modelos) a serem usadas
  synchronize: true,            // Sincronizar as tabelas (não use em produção sem testes)
  logging: true                 // Habilitar logs para debugar
});

// Conectar ao banco de dados
dataSource.initialize()
  .then(() => {
    console.log('Conectado ao banco de dados!');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados', error);
    process.exit(1);  // Encerra o processo caso a conexão falhe
  });

// Rota para criar um usuário
app.post('/usuarios', async (req, res) => {
  const { nome, email, senha } = req.body;
  const usuarioRepository = dataSource.getRepository(Usuario);

  const usuario = new Usuario();
  usuario.nome = nome;
  usuario.email = email;
  usuario.senha = senha;  // **Lembre-se de hash a senha em produção**

  try {
    await usuarioRepository.save(usuario);
    res.status(201).json(usuario);
  } catch (error) {
    console.error("Erro ao salvar o usuário:", error);
    res.status(500).json({ message: 'Erro ao salvar o usuário', error });
  }
});

// Rota para listar todos os usuários
app.get('/usuarios', async (req, res) => {
  const usuarioRepository = dataSource.getRepository(Usuario);

  try {
    const usuarios = await usuarioRepository.find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({ message: 'Erro ao listar os usuários', error });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
