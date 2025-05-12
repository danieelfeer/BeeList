import { AppDataSource } from "../../src/config/data-source";
import { ListaRepository } from "../repositories/listaRepository";
import { SessaoRepository } from "../repositories/sessaoRepository";
import { TarefaRepository } from "../repositories/tarefaRepository";

describe("TarefaRepository", () => {
  let tarefaRepo: TarefaRepository;
  let sessaoRepo: SessaoRepository;
  let listaRepo: ListaRepository;

  beforeAll(async () => {
    await AppDataSource.initialize(); // Inicia banco de dados
    tarefaRepo = new TarefaRepository();
    sessaoRepo = new SessaoRepository();
    listaRepo = new ListaRepository();
  });

  beforeEach(async () => {
    await AppDataSource.getRepository("Sessao").clear();
    await AppDataSource.getRepository("Tarefa").clear();
    await AppDataSource.getRepository("Lista").clear(); // Agora limpamos Listas também
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("Deve criar uma tarefa corretamente", async () => {
    // 1️⃣ Criar Lista antes de criar Sessão
    const lista = await listaRepo.criar("Lista Teste");

    // 2️⃣ Criar Sessão vinculada à Lista
    const sessao = await sessaoRepo.criar("Sessão Teste", lista.id);

    // 3️⃣ Criar Tarefa vinculada à Sessão
    const tarefa = await tarefaRepo.criar("Comprar leite", sessao.id);

    // 4️⃣ Testar se a tarefa foi criada corretamente
    expect(tarefa).toBeDefined();
    expect(tarefa.titulo).toBe("Comprar leite");
    expect(tarefa.concluida).toBe(false);
    expect(tarefa.sessao.id).toBe(sessao.id);
  });
});
