import { AppDataSource } from "../../config/data-source";
import { Lista } from "../../models/Lista";
import { Sessao } from "../../models/Sessao";
import { Tarefa } from "../../models/Tarefa";
import { ListaRepository } from "../../repositories/lista.repository";
import { SessaoRepository } from "../../repositories/sessao.repository";
import { TarefaRepository } from "../../repositories/tarefa.repository";

describe('TarefaRepository', () => {
  let tarefaRepository: TarefaRepository;
  let sessaoRepository: SessaoRepository;
  let listaRepository: ListaRepository;

  let lista: Lista;
  let sessao: Sessao;

  beforeAll(async () => {
    await AppDataSource.initialize();
    tarefaRepository = new TarefaRepository();
    sessaoRepository = new SessaoRepository();
    listaRepository = new ListaRepository();

    lista = await listaRepository.criar('Lista de Tarefas');
    sessao = await sessaoRepository.criar('Sessão 1', lista.id);
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should create a new tarefa', async () => {
    const tarefa = await tarefaRepository.criar('Tarefa 1', sessao.id);

    expect(tarefa).toHaveProperty('id');
    expect(tarefa.titulo).toBe('Tarefa 1');
    expect(tarefa.sessao.id).toBe(sessao.id);
  });

  it('should list tarefas by sessao id', async () => {
    await tarefaRepository.criar('Tarefa 2', sessao.id);
    await tarefaRepository.criar('Tarefa 3', sessao.id);

    const tarefas = await tarefaRepository.listarPorSessao(sessao.id);

    expect(tarefas.length).toBe(3);
    expect(tarefas).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ titulo: 'Tarefa 1' }),
        expect.objectContaining({ titulo: 'Tarefa 2' }),
        expect.objectContaining({ titulo: 'Tarefa 3' }),
      ])
    );
  });

  it('should mark a tarefa as completed', async () => {
    const tarefa = await tarefaRepository.criar('Tarefa para Concluir', sessao.id);
    const tarefaConcluida = await tarefaRepository.concluirTarefa(tarefa.id);

    expect(tarefaConcluida).toHaveProperty('concluida', true);
  });

  it('should delete a tarefa', async () => {
    const tarefa = await tarefaRepository.criar('Tarefa a ser excluída', sessao.id);
    const resultado = await tarefaRepository.excluir(tarefa.id);

    expect(resultado).toBe(true);
    const tarefaExcluida = await AppDataSource.getRepository(Tarefa).findOne({ where: { id: tarefa.id } });
    expect(tarefaExcluida).toBeNull();
  });

  it('should throw an error if session is not found when creating a tarefa', async () => {
    await expect(tarefaRepository.criar('Tarefa Inválida', 9999)).rejects.toThrow(/Sessão não encontrada/);
  });
});
