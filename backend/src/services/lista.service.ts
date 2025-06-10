import { ListaRepository } from "../repositories/lista.repository";
import { SessaoRepository } from "../repositories/sessao.repository";
import { TarefaRepository } from "../repositories/tarefa.repository";

export class ListaService {
  private readonly listaRepo: ListaRepository;
  private readonly sessaoRepo: SessaoRepository;
  private readonly tarefaRepo: TarefaRepository;

  constructor() {
    this.listaRepo = new ListaRepository();
    this.sessaoRepo = new SessaoRepository();
    this.tarefaRepo = new TarefaRepository();
  }
  // ListaService
  async buscarListaPorId(id: number) {
    return await this.listaRepo.buscarPorId(id); // Chamando o repositório para buscar a lista pelo ID
  }

  async criarLista(nome: string, sessoes: any[]) {
    const lista = await this.listaRepo.criar(nome);

    for (let sessaoData of sessoes) {
      const sessao = await this.sessaoRepo.criar(sessaoData.titulo, lista.id);

      for (let tarefaData of sessaoData.tarefas) {
        await this.tarefaRepo.criar(
          tarefaData.titulo,
          tarefaData.concluida,
          sessao.id
        );
      }
    }

    return lista;
  }

  async listarListas() {
    return await this.listaRepo.listarTodas();
  }

  // Função para atualizar a lista
  async atualizarLista(id: number, nome: string, sessoes: any[]) {
    return await this.listaRepo.atualizar(id, nome, sessoes);
  }
}
