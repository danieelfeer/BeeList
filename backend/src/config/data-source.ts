import "reflect-metadata";
import { DataSource } from 'typeorm';
import { Usuario } from "../models/Usuario";
import { Lista } from "../models/Lista";
import { Sessao } from "../models/Sessao";
import { Tarefa } from "../models/Tarefa";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:", 
  entities: [Usuario, Lista, Sessao, Tarefa], 
  synchronize: true,
  logging: true,
});
