import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Lista } from "../models/Lista";

export class ListaRepository {
  private readonly repo: Repository<Lista>;

  constructor() {
    this.repo = AppDataSource.getRepository(Lista);
  }

  async create(lista: Lista): Promise<Lista> {
    return await this.repo.save(lista);
  }

  async findAll(): Promise<Lista[]> {
    return await this.repo.find({
      relations: ["sessoes", "sessoes.tarefas"],
    });
  }

  async findOne(id: string): Promise<Lista | null> {
    return await this.repo.findOne({
      where: { id },
      relations: ["sessoes", "sessoes.tarefas"],
    });
  }

  async update(lista: Lista): Promise<Lista> {
    return await this.repo.save(lista);
  }

  async delete(lista: Lista): Promise<Lista> {
    return await this.repo.remove(lista);
  }
}