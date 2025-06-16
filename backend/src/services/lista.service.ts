// src/services/ListaService.ts
import { Lista } from "../models/Lista";
import { Sessao } from "../models/Sessao";
import { Tarefa } from "../models/Tarefa";
import { ListaRepository } from "../repositories/lista.repository";

export class ListaService {
  private listaRepository: ListaRepository;

  constructor() {
    this.listaRepository = new ListaRepository();
  }

  async create(data: any): Promise<Lista> {
    const { titulo, sessoes } = data;
    const lista = new Lista();
    lista.titulo = titulo;

    if (sessoes && Array.isArray(sessoes)) {
      lista.sessoes = sessoes.map((sessaoData: any) => {
        const sessao = new Sessao();
        sessao.titulo = sessaoData.titulo;

        if (sessaoData.tarefas && Array.isArray(sessaoData.tarefas)) {
          sessao.tarefas = sessaoData.tarefas.map((tarefaData: any) => {
            const tarefa = new Tarefa();
            tarefa.titulo = tarefaData.titulo;
            tarefa.concluida = tarefaData.concluida || false;
            return tarefa;
          });
        }
        return sessao;
      });
    }

    return await this.listaRepository.create(lista);
  }

  async findAll(): Promise<Lista[]> {
    return await this.listaRepository.findAll();
  }

  async findById(id: string): Promise<Lista | null> {
    return await this.listaRepository.findOne(id);
  }

  async update(id: string, data: any): Promise<Lista | null> {
    let lista = await this.listaRepository.findOne(id);
    if (!lista) return null;

    const { titulo, sessoes } = data;

    if (titulo) {
      lista.titulo = titulo;
    }

    if (sessoes && Array.isArray(sessoes)) {
      // Substituir a estrutura de sessões antiga pela nova
      lista.sessoes = sessoes.map((sessaoData: any) => {
        const sessao = new Sessao();
        sessao.titulo = sessaoData.titulo;

        if (sessaoData.tarefas && Array.isArray(sessaoData.tarefas)) {
          sessao.tarefas = sessaoData.tarefas.map((tarefaData: any) => {
            const tarefa = new Tarefa();
            tarefa.titulo = tarefaData.titulo;
            tarefa.concluida = tarefaData.concluida || false;
            return tarefa;
          });
        }
        return sessao;
      });
    }
    return await this.listaRepository.update(lista);
  }

  async delete(id: string): Promise<boolean> {
    const lista = await this.listaRepository.findOne(id);
    if (!lista) return false;

    await this.listaRepository.delete(lista);
    return true;
  }
}
