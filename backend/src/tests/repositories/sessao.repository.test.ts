import { AppDataSource } from "../../config/data-source";
import { Lista } from "../../models/Lista";
import { ListaRepository } from "../../repositories/lista.repository";
import { SessaoRepository } from "../../repositories/sessao.repository";


describe('SessaoRepository', () => {
  let sessaoRepository: SessaoRepository;
  let listaRepository: ListaRepository;

  let lista: Lista;

  // Configuração do banco de dados antes de executar os testes
  beforeAll(async () => {
    await AppDataSource.initialize(); // Inicializa a conexão com o banco de dados em memória
    sessaoRepository = new SessaoRepository();
    listaRepository = new ListaRepository();

    // Cria uma lista antes de testar as sessões
    lista = await listaRepository.criar('Lista de Tarefas');
  });

  // Limpeza após os testes
  afterAll(async () => {
    await AppDataSource.destroy(); // Fecha a conexão com o banco de dados
  });

  it('should list sessions by list id', async () => {
    // Cria sessões associadas à lista
    const sessao1 = await sessaoRepository.criar('Sessão 1', lista.id);
    const sessao2 = await sessaoRepository.criar('Sessão 2', lista.id);

    // Verifica se as sessões foram criadas corretamente
    const sessoes = await sessaoRepository.listarPorLista(lista.id);

    // Verificações
    expect(sessoes.length).toBe(2); // Verifica se duas sessões foram criadas
    expect(sessoes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ nome: 'Sessão 1' }),
        expect.objectContaining({ nome: 'Sessão 2' }),
      ])
    );
  });

  it('should throw an error when creating a sessao with invalid list id', async () => {
    await expect(sessaoRepository.criar('Sessão Inválida', 9999)).rejects.toThrow(/SQLITE_CONSTRAINT/);
  });
});
