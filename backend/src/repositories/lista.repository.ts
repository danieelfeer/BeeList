import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Lista } from "../models/Lista";

export class ListaRepository {
  private readonly repo: Repository<Lista>;

  constructor() {
    this.repo = AppDataSource.getRepository(Lista);
  }

  async criar(nome: string): Promise<Lista> {
    const lista = this.repo.create({ nome });
    return await this.repo.save(lista);
  }

  async listarTodas(): Promise<Lista[]> {
    // Aqui usamos o "relations" para buscar as sessões associadas
    return await this.repo.find({
      relations: {
        sessoes: {
          tarefas: true,  // Aqui estamos também buscando as tarefas associadas à sessão
        },
      },
    });
  }
}
