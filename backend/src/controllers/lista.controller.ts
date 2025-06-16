import { Request, Response } from "express";
import { ListaService } from "../services/lista.service";

export class ListaController {
  private listaService = new ListaService();

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const lista = await this.listaService.create(req.body);
      return res.status(201).json(lista);
    } catch (err) {
      console.error("Erro ao criar lista:", err);
      return res.status(500).json({ message: "Erro ao criar lista" });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const listas = await this.listaService.findAll();
      return res.status(200).json(listas);
    } catch (err) {
      console.error("Erro ao buscar listas:", err);
      return res.status(500).json({ message: "Erro ao buscar listas" });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const lista = await this.listaService.findById(req.params.id);
      if (!lista)
        return res.status(404).json({ message: "Lista não encontrada" });
      return res.status(200).json(lista);
    } catch (err) {
      console.error("Erro ao buscar lista por id:", err);
      return res.status(500).json({ message: "Erro ao buscar lista" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const lista = await this.listaService.update(req.params.id, req.body);
      if (!lista)
        return res.status(404).json({ message: "Lista não encontrada" });
      return res.status(200).json(lista);
    } catch (err) {
      console.error("Erro ao atualizar lista:", err);
      return res.status(500).json({ message: "Erro ao atualizar lista" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const deleted = await this.listaService.delete(req.params.id);
      if (!deleted)
        return res.status(404).json({ message: "Lista não encontrada" });
      return res
        .status(200)
        .json({ message: "Lista removida com sucesso" });
    } catch (err) {
      console.error("Erro ao remover lista:", err);
      return res.status(500).json({ message: "Erro ao remover lista" });
    }
  }
}
