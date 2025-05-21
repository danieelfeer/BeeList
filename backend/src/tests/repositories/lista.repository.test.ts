import { AppDataSource } from '../../config/data-source';
import { ListaRepository } from '../../repositories/lista.repository'

describe('ListaRepository', () => {
  let listaRepository: ListaRepository;

  // Configuração do banco de dados antes de executar os testes
  beforeAll(async () => {
    await AppDataSource.initialize(); // Inicializa a conexão com o banco de dados em memória
    listaRepository = new ListaRepository();
  });

  // Limpeza após os testes
  afterAll(async () => {
    await AppDataSource.destroy(); // Fecha a conexão com o banco de dados
  });

  it('should create a new lista', async () => {
    const lista = await listaRepository.criar('Lista de Tarefas');
    
    // Verificações
    expect(lista).toHaveProperty('id'); // Verifica se o id foi gerado
    expect(lista.nome).toBe('Lista de Tarefas'); // Verifica se o nome está correto
  });

  it('should list all listas', async () => {
    // Cria uma nova lista para garantir que existam itens na base
    await listaRepository.criar('Lista 1');
    await listaRepository.criar('Lista 2');
    
    const listas = await listaRepository.listarTodas();
    
    // Verificações
    expect(listas.length).toBeGreaterThan(0); // Verifica se há pelo menos uma lista
    expect(listas).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ nome: 'Lista 1' }),
        expect.objectContaining({ nome: 'Lista 2' }),
      ])
    ); // Verifica se as listas criadas estão presentes
  });
});
