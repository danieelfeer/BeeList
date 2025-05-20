import { SessaoRepository } from "../repositories/sessaoRepository";

export class SessaoService {
  private readonly sessaoRepo: SessaoRepository;

  constructor() {
    this.sessaoRepo = new SessaoRepository();
  }

  async criarSessao(nome: string, listaId: number) {
    return await this.sessaoRepo.criar(nome, listaId);
  }

  async listarSessoesPorLista(listaId: number) {
    return await this.sessaoRepo.listarPorLista(listaId);
  }
}
