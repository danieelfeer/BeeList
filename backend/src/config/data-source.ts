import "reflect-metadata";
import { DataSource } from 'typeorm';
import { Usuario } from "../models/Usuario";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:", 
  entities: [Usuario],
  synchronize: true,
  logging: true,
});
