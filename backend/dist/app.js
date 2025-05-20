"use strict";
// backend/app.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm"); // Importando DataSource
const Usuario_1 = require("./models/Usuario");
const dotenv_1 = __importDefault(require("dotenv"));
// Carregar variáveis de ambiente do arquivo .env
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Configurando o DataSource
const dataSource = new typeorm_1.DataSource({
    type: "mysql", // Tipo de banco de dados
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "beelist",
    entities: [Usuario_1.Usuario], // Modelos de entidades
    synchronize: true, // Sincronizar automaticamente as tabelas (use com cuidado em produção)
    logging: true // Habilitar logs de SQL para debugging
});
// Conectar ao banco de dados
dataSource.initialize()
    .then(() => {
    console.log('Conectado ao banco de dados!');
})
    .catch((error) => {
    console.error('Erro ao conectar ao banco de dados', error);
});
// Rota de exemplo para criação de um usuário
app.post('/usuarios', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, email, senha } = req.body;
    const usuarioRepository = dataSource.getRepository(Usuario_1.Usuario);
    const usuario = new Usuario_1.Usuario();
    usuario.nome = nome;
    usuario.email = email;
    usuario.senha = senha;
    try {
        yield usuarioRepository.save(usuario);
        res.status(201).json(usuario);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao salvar o usuário', error });
    }
}));
// Rota para listar usuários
app.get('/usuarios', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioRepository = dataSource.getRepository(Usuario_1.Usuario);
    try {
        const usuarios = yield usuarioRepository.find();
        res.status(200).json(usuarios);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao listar os usuários', error });
    }
}));
// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
