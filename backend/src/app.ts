import express, { Express } from 'express';
import dotenv from 'dotenv';
import { usuarioRoutes } from './routes/usuarioRoutes';

dotenv.config();
export const app: Express = express();

app.use(express.json());
app.use('/api/usuarios', usuarioRoutes);
