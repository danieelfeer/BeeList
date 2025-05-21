import { Tarefa } from "../../models/Tarefa";
import { TarefaRepository } from "../../repositories/tarefa.repository";
import { TarefaService } from "../../services/tarefa.service";


jest.mock("../../repositories/tarefa.repository");

describe("TarefaService", () => {
  let tarefaService: TarefaService;
  let tarefaRepoMock: jest.Mocked<TarefaRepository>;

  beforeEach(() => {
    tarefaRepoMock = new TarefaRepository() as jest.Mocked<TarefaRepository>;
    tarefaService = new TarefaService();
    (tarefaService as any).tarefaRepo = tarefaRepoMock;
  });

  it("should create a new tarefa", async () => {
    const tarefaMock: Tarefa = { id: 1, titulo: "Tarefa Teste", concluida: false, sessao: { id: 1, nome: "Sessão 1", lista: { id: 1, nome: "Lista 1", sessoes: [] }, tarefas: [] } };
    tarefaRepoMock.criar.mockResolvedValue(tarefaMock);

    const tarefa = await tarefaService.criarTarefa("Tarefa Teste", 1);

    expect(tarefaRepoMock.criar).toHaveBeenCalledWith("Tarefa Teste", 1);
    expect(tarefa).toEqual(tarefaMock);
  });

  it("should list all tarefas for a given sessao", async () => {
    const tarefasMock: Tarefa[] = [
      { id: 1, titulo: "Tarefa 1", concluida: false, sessao: { id: 1, nome: "Sessão 1", lista: { id: 1, nome: "Lista 1", sessoes: [] }, tarefas: [] } },
      { id: 2, titulo: "Tarefa 2", concluida: false, sessao: { id: 1, nome: "Sessão 1", lista: { id: 1, nome: "Lista 1", sessoes: [] }, tarefas: [] } },
    ];
    tarefaRepoMock.listarPorSessao.mockResolvedValue(tarefasMock);

    const tarefas = await tarefaService.listarTarefasPorSessao(1);

    expect(tarefaRepoMock.listarPorSessao).toHaveBeenCalledWith(1);
    expect(tarefas).toHaveLength(2);
    expect(tarefas).toEqual(tarefasMock);
  });

  it("should mark a tarefa as completed", async () => {
    const tarefaMock: Tarefa = { id: 1, titulo: "Tarefa Teste", concluida: false, sessao: { id: 1, nome: "Sessão 1", lista: { id: 1, nome: "Lista 1", sessoes: [] }, tarefas: [] } };
    tarefaRepoMock.concluirTarefa.mockResolvedValue({ ...tarefaMock, concluida: true });

    const tarefaConcluida = await tarefaService.concluirTarefa(1);

    expect(tarefaRepoMock.concluirTarefa).toHaveBeenCalledWith(1);
    expect(tarefaConcluida?.concluida).toBe(true);
  });

  it("should delete a tarefa", async () => {
    tarefaRepoMock.excluir.mockResolvedValue(true);

    const resultado = await tarefaService.excluirTarefa(1);

    expect(tarefaRepoMock.excluir).toHaveBeenCalledWith(1);
    expect(resultado).toBe(true);
  });
});
