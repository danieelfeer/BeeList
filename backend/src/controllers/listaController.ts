import { Request, Response } from "express";
import { ListaService } from "../services/listaService";

export class ListaController {
  private readonly listaService: ListaService;

  constructor() {
    this.listaService = new ListaService();
  }

  async criar(req: Request, res: Response) {
    const { nome } = req.body;
    const lista = await this.listaService.criarLista(nome);
    res.status(201).json(lista);
  }

  async listar(req: Request, res: Response) {
    const listas = await this.listaService.listarListas();
    res.json(listas);
  }
}
