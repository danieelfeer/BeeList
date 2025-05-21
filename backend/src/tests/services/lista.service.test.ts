import { Lista } from "../../models/Lista";
import { ListaRepository } from "../../repositories/lista.repository";
import { ListaService } from "../../services/lista.service";    


jest.mock("../../repositories/lista.repository.ts");

describe("ListaService", () => {
  let listaService: ListaService;
  let listaRepoMock: jest.Mocked<ListaRepository>;

  beforeEach(() => {
    listaRepoMock = new ListaRepository() as jest.Mocked<ListaRepository>;
    listaService = new ListaService();
    (listaService as any).listaRepo = listaRepoMock;
  });

  it("should create a new lista", async () => {
    const listaMock: Lista = { id: 1, nome: "Lista de Teste", sessoes: [] };
    listaRepoMock.criar.mockResolvedValue(listaMock);

    const lista = await listaService.criarLista("Lista de Teste");

    expect(listaRepoMock.criar).toHaveBeenCalledWith("Lista de Teste");
    expect(lista).toEqual(listaMock);
  });

  it("should list all listas", async () => {
    const listasMock: Lista[] = [
      { id: 1, nome: "Lista 1", sessoes: [] },
      { id: 2, nome: "Lista 2", sessoes: [] },
    ];
    listaRepoMock.listarTodas.mockResolvedValue(listasMock);

    const listas = await listaService.listarListas();

    expect(listaRepoMock.listarTodas).toHaveBeenCalled();
    expect(listas).toHaveLength(2);
    expect(listas).toEqual(listasMock);
  });
});
