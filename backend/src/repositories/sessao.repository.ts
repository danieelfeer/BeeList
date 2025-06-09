import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Sessao } from "../models/Sessao";

export class SessaoRepository {
  private readonly repo: Repository<Sessao>;

  constructor() {
    this.repo = AppDataSource.getRepository(Sessao);
  }

  // Método corrigido para aceitar 'titulo' e 'listaId'
  async criar(titulo: string, listaId: number): Promise<Sessao> {
    if (!titulo) {
      throw new Error("Título da sessão é obrigatório.");
    }
    const sessao = this.repo.create({ titulo, lista: { id: listaId } });
    return await this.repo.save(sessao);
  }
  

  async listarPorLista(listaId: number): Promise<Sessao[]> {
    return await this.repo.find({ where: { lista: { id: listaId } } });
  }
}
