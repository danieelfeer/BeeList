import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Tarefa } from "../models/Tarefa";
import { Sessao } from "../models/Sessao";

export class TarefaRepository {
  private readonly repo: Repository<Tarefa>;

  constructor() {
    this.repo = AppDataSource.getRepository(Tarefa);
  }

  // Criar uma nova tarefa (corrigido)
  async criar(titulo: string, sessaoId: number): Promise<Tarefa> {
    // Verifica se a sessão existe antes de criar a tarefa
    const sessao = await AppDataSource.getRepository(Sessao).findOne({ where: { id: sessaoId } });
    if (!sessao) throw new Error("Sessão não encontrada");

    const tarefa = this.repo.create({ titulo, concluida: false, sessao });
    return await this.repo.save(tarefa);
  }

  // Listar todas as tarefas de uma sessão
  async listarPorSessao(sessaoId: number): Promise<Tarefa[]> {
    return await this.repo.find({ where: { sessao: { id: sessaoId } } });
  }

  // Marcar uma tarefa como concluída
  async concluirTarefa(id: number): Promise<Tarefa | null> {
    const tarefa = await this.repo.findOne({ where: { id } });
    if (!tarefa) return null;

    tarefa.concluida = true;
    return await this.repo.save(tarefa);
  }

  // Excluir uma tarefa
  async excluir(id: number): Promise<boolean> {
    const resultado = await this.repo.delete(id);
    return resultado.affected !== 0;
  }
}
