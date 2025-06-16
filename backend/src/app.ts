// src/app.ts

import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import listaRoutes from './routes/listaRoutes';

dotenv.config();

export const app: Express = express();

app.use(cors());
app.use(express.json());

// Registra as rotas para os endpoints de listas
app.use("/api/listas", listaRoutes);
