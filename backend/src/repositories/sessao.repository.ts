import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Sessao } from "../models/Sessao";

export class SessaoRepository {
  private readonly repo: Repository<Sessao>;

  constructor() {
    this.repo = AppDataSource.getRepository(Sessao);
  }

  async criar(nome: string, listaId: number): Promise<Sessao> {
    const sessao = this.repo.create({ nome, lista: { id: listaId } });
    return await this.repo.save(sessao);
  }

  async listarPorLista(listaId: number): Promise<Sessao[]> {
    return await this.repo.find({ where: { lista: { id: listaId } } });
  }
}
