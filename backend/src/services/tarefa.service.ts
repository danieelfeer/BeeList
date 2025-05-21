import { TarefaRepository } from "../repositories/tarefa.repository";

export class TarefaService {
  private readonly tarefaRepo: TarefaRepository;

  constructor() {
    this.tarefaRepo = new TarefaRepository();
  }

  // Criar uma nova tarefa
  async criarTarefa(titulo: string, sessaoId: number) {
    return await this.tarefaRepo.criar(titulo, sessaoId);
  }

  // Listar todas as tarefas de uma sessão
  async listarTarefasPorSessao(sessaoId: number) {
    return await this.tarefaRepo.listarPorSessao(sessaoId);
  }

  // Marcar uma tarefa como concluída
  async concluirTarefa(id: number) {
    return await this.tarefaRepo.concluirTarefa(id);
  }

  // Excluir uma tarefa
  async excluirTarefa(id: number) {
    return await this.tarefaRepo.excluir(id);
  }
}
