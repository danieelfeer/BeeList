import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Lista } from "../models/Lista";

export class ListaRepository {
  private readonly repo: Repository<Lista>;

  constructor() {
    this.repo = AppDataSource.getRepository(Lista);
  }
  // ListaRepository
  async buscarPorId(id: number): Promise<Lista | null> {
    return await this.repo.findOne({
      where: { id },
      relations: {
        sessoes: {  // Incluindo as sessões
          tarefas: true,  // Incluindo as tarefas dentro das sessões
        },
      },
    });
  }
  

  async criar(nome: string): Promise<Lista> {
    const lista = this.repo.create({ nome });
    return await this.repo.save(lista);
  }

  async listarTodas(): Promise<Lista[]> {
    return await this.repo.find({
      relations: {
        sessoes: {
          tarefas: true,
        },
      },
    });
  }

  // Método para atualizar a lista
  async atualizar(
    id: number,
    nome: string,
    sessoes: any[]
  ): Promise<Lista | null> {
    const lista = await this.repo.findOne({
      where: { id:id },
      relations: { sessoes: true }, // Carregando as sessões associadas
    });

    if (!lista) {
      return null; // Se a lista não existir, retorna null
    }

    lista.nome = nome;

    // Atualizando as sessões e tarefas associadas
    for (const sessaoData of sessoes) {
      const sessao = lista.sessoes.find((s) => s.id === sessaoData.id);

      if (sessao) {
        // Atualizando os dados da sessão
        sessao.titulo = sessaoData.titulo;

        // Atualizando as tarefas da sessão
        for (const tarefaData of sessaoData.tarefas) {
          const tarefa = sessao.tarefas.find((t) => t.id === tarefaData.id);
          if (tarefa) {
            tarefa.titulo = tarefaData.titulo;
            tarefa.concluida = tarefaData.concluida;
          }
        }
      }
    }

    return await this.repo.save(lista); // Salva as atualizações no banco
  }
}
  