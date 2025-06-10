import { Request, Response } from "express";
import { ListaService } from "../services/lista.service";

export class ListaController {
  private readonly listaService: ListaService;

  constructor() {
    this.listaService = new ListaService();
  }

  async buscarPorId(req: Request, res: Response) {
     const listId: number = Number(req.params.id); 
  
    try {
      const lista = await this.listaService.buscarListaPorId(listId);
      if (!lista) {
        return res.status(404).json({ message: "Lista não encontrada!" });
      }
      return res.status(200).json(lista);
    } catch (error) {
      console.error("Erro ao buscar lista:", error);
      return res.status(500).json({ error: "Erro interno ao buscar lista." });
    }
  }
  
  

  async criar(req: Request, res: Response) {
    const { nome, sessoes } = req.body;
    try {
      const lista = await this.listaService.criarLista(nome, sessoes);
      return res.status(201).json(lista);
    } catch (error) {
      console.error("Erro ao criar lista:", error);
      return res.status(500).json({ error: "Erro interno ao criar lista." });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const listas = await this.listaService.listarListas();
      return res.status(200).json(listas);
    } catch (error) {
      console.error("Erro ao listar listas:", error);
      return res.status(500).json({ error: "Erro interno ao listar listas." });
    }
  }

  // Método para atualizar a lista
  async atualizar(req: Request, res: Response) {
    const { listaId } = req.params; // Recebe o ID da lista da URL
    const { nome, sessoes } = req.body; // Recebe os dados no corpo da requisição
  
    console.log("Recebendo atualização para lista ID:", listaId); // Verifica o ID recebido
    console.log("Dados recebidos para atualização:", { nome, sessoes }); // Verifica os dados recebidos
  
    try {
      const listaAtualizada = await this.listaService.atualizarLista(
        Number(listaId), // Converte ID para número
        nome,
        sessoes
      );
  
      if (!listaAtualizada) {
        console.log("Lista não encontrada para atualização!");
        return res.status(404).json({ message: "Lista não encontrada!" });
      }
  
      console.log("Lista foi atualizada com sucesso:", listaAtualizada);
      return res.status(200).json(listaAtualizada);
    } catch (error) {
      console.error("Erro ao atualizar lista:", error);
      return res.status(500).json({ error: "Erro interno ao atualizar lista." });
    }
  }
  
}
