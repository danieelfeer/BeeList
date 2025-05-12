import { Request, Response } from "express";
import { TarefaService } from "../services/tarefaService";

export class TarefaController { 
  private readonly tarefaService: TarefaService;

  constructor() {
    this.tarefaService = new TarefaService();
  }

  // Criar uma nova tarefa
  async criar(req: Request, res: Response) {
    const { titulo, sessaoId } = req.body;
    const tarefa = await this.tarefaService.criarTarefa(titulo, sessaoId);
    res.status(201).json(tarefa);
  }

  // Listar tarefas de uma sessão
  async listarPorSessao(req: Request, res: Response) {
    const { sessaoId } = req.params;
    const tarefas = await this.tarefaService.listarTarefasPorSessao(Number(sessaoId));
    res.json(tarefas);
  }

  // Marcar uma tarefa como concluída
  async concluir(req: Request, res: Response) {
    const { id } = req.params;
    const tarefa = await this.tarefaService.concluirTarefa(Number(id));
    tarefa ? res.json(tarefa) : res.status(404).json({ error: "Tarefa não encontrada" });
  }

  // Excluir uma tarefa
  async excluir(req: Request, res: Response) {
    const { id } = req.params;
    const sucesso = await this.tarefaService.excluirTarefa(Number(id));
    sucesso ? res.status(204).send() : res.status(404).json({ error: "Tarefa não encontrada" });
  }
}
