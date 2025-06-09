import { ListaRepository } from "../repositories/lista.repository";
import { SessaoRepository } from "../repositories/sessao.repository"; // Importando o repositório de Sessão
import { TarefaRepository } from "../repositories/tarefa.repository"; // Importando o repositório de Tarefa

export class ListaService {
  private readonly listaRepo: ListaRepository;
  private readonly sessaoRepo: SessaoRepository;
  private readonly tarefaRepo: TarefaRepository;

  constructor() {
    this.listaRepo = new ListaRepository();
    this.sessaoRepo = new SessaoRepository();
    this.tarefaRepo = new TarefaRepository();
  }

  async criarLista(nome: string, sessoes: any[]) {
    console.log("Criando lista com nome:", nome);
    console.log("Sessoes:", sessoes);
  
    // Criação da lista
    const lista = await this.listaRepo.criar(nome);
    console.log("Lista salva:", lista);
  
    // Criação das sessões e tarefas associadas à lista
    for (let sessaoData of sessoes) {
      const tituloSessao = sessaoData.titulo;
  
      // Verifique se o título da sessão está presente
      if (!tituloSessao) {
        console.log("Erro: Título da sessão não fornecido.");
        throw new Error("Título da sessão não fornecido.");
      }
  
      // Criação da sessão
      const sessao = await this.sessaoRepo.criar(tituloSessao, lista.id);
      console.log("Sessão criada:", sessao);
  
      // Criação das tarefas associadas à sessão
      for (let tarefaData of sessaoData.tarefas) {
        const tarefa = await this.tarefaRepo.criar(tarefaData.titulo, tarefaData.concluida, sessao.id);
        console.log("Tarefa criada:", tarefa);
      }
    }
  
    return lista;  // Retorne a lista criada
  }
  
  
  

  async listarListas() {
    return await this.listaRepo.listarTodas();
  }
}
