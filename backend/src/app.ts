import express, { Express } from 'express';
import dotenv from 'dotenv';
import { usuarioRoutes } from './routes/usuarioRoutes';
import { tarefaRoutes } from './routes/tarefaRoutes'; 
import { listaRoutes } from './routes/listaRoutes';
import { sessaoRoutes } from './routes/sessaoRoutes';
import cors from 'cors';

dotenv.config();

export const app: Express = express();

app.use(cors());
app.use(express.json());

// Registra as rotas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/tarefas", tarefaRoutes);
app.use("/api/listas", listaRoutes);
app.use("/api/sessoes", sessaoRoutes);