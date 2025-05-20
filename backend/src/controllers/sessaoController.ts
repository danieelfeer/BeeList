import { Request, Response } from "express";
import { SessaoService } from "../services/sessaoService";

export class SessaoController {
  private readonly sessaoService: SessaoService;

  constructor() {
    this.sessaoService = new SessaoService();
  }

  async criar(req: Request, res: Response) {
    const { nome, listaId } = req.body;
    const sessao = await this.sessaoService.criarSessao(nome, listaId);
    res.status(201).json(sessao);
  }

  async listarPorLista(req: Request, res: Response) {
    const { listaId } = req.params;
    const sessoes = await this.sessaoService.listarSessoesPorLista(Number(listaId));
    res.json(sessoes);
  }
}
