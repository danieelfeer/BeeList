import { Request, Response } from "express";
import { ListaService } from "../services/lista.service";

export class ListaController {
  private readonly listaService: ListaService;

  constructor() {
    this.listaService = new ListaService();
  }

  async criar(req: Request, res: Response) {
    const { nome, sessoes } = req.body;
    console.log('Recebido:', req.body);  // Verifique o que foi enviado
  
    try {
      // Criação da lista
      const lista = await this.listaService.criarLista(nome, sessoes);
      console.log('Lista criada:', lista);  // Verifique se a lista foi criada
  
      return res.status(201).json(lista);  // Retorne a lista que foi criada
    } catch (error) {
      console.error("Erro ao criar lista:", error);
      return res.status(500).json({ error: "Erro interno ao criar lista." });
    }
  }
  
  async listar(req: Request, res: Response) {
    try {
      const listas = await this.listaService.listarListas();
      return res.status(200).json(listas);  // Lista agora vem com as sessões e tarefas
    } catch (error) {
      console.error("Erro ao listar listas:", error);
      return res.status(500).json({ error: "Erro interno ao listar listas." });
    }
  }
}
