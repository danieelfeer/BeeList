import { Sessao } from "../../models/Sessao";
import { SessaoRepository } from "../../repositories/sessao.repository";
import { SessaoService } from "../../services/sessao.service";


jest.mock("../../repositories/sessao.repository");

describe("SessaoService", () => {
  let sessaoService: SessaoService;
  let sessaoRepoMock: jest.Mocked<SessaoRepository>;

  beforeEach(() => {
    sessaoRepoMock = new SessaoRepository() as jest.Mocked<SessaoRepository>;
    sessaoService = new SessaoService();
    (sessaoService as any).sessaoRepo = sessaoRepoMock;
  });

  it("should create a new sessao", async () => {
    const sessaoMock: Sessao = { id: 1, nome: "Sessão Teste", lista: { id: 1, nome: "Lista 1", sessoes: [] }, tarefas: [] };
    sessaoRepoMock.criar.mockResolvedValue(sessaoMock);

    const sessao = await sessaoService.criarSessao("Sessão Teste", 1);

    expect(sessaoRepoMock.criar).toHaveBeenCalledWith("Sessão Teste", 1);
    expect(sessao).toEqual(sessaoMock);
  });

  it("should list all sessoes for a given lista", async () => {
    const sessoesMock: Sessao[] = [
      { id: 1, nome: "Sessão 1", lista: { id: 1, nome: "Lista 1", sessoes: [] }, tarefas: [] },
      { id: 2, nome: "Sessão 2", lista: { id: 1, nome: "Lista 1", sessoes: [] }, tarefas: [] },
    ];
    sessaoRepoMock.listarPorLista.mockResolvedValue(sessoesMock);

    const sessoes = await sessaoService.listarSessoesPorLista(1);

    expect(sessaoRepoMock.listarPorLista).toHaveBeenCalledWith(1);
    expect(sessoes).toHaveLength(2);
    expect(sessoes).toEqual(sessoesMock);
  });
});
