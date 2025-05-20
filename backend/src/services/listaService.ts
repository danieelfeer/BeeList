import { ListaRepository } from "../repositories/listaRepository";

export class ListaService {
  private readonly listaRepo: ListaRepository;

  constructor() {
    this.listaRepo = new ListaRepository();
  }

  async criarLista(nome: string) {
    return await this.listaRepo.criar(nome);
  }

  async listarListas() {
    return await this.listaRepo.listarTodas();
  }
}
