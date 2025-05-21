import { Request, Response } from "express";
import { ListaService } from "../services/lista.service";

export class ListaController {
  private readonly listaService: ListaService;

  constructor() {
    this.listaService = new ListaService();
  }

  async criar(req: Request, res: Response) {
    try {
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ error: "O nome da lista é obrigatório!" });
      }

      const lista = await this.listaService.criarLista(nome);
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
}
