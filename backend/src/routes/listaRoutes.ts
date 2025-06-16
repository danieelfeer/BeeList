// src/routes/listaRoutes.ts
import { Router } from 'express';
import { ListaController } from '../controllers/lista.controller';

const router = Router();
const listaController = new ListaController();

router.post('/', (req, res) => listaController.create(req, res));
router.get('/', (req, res) => listaController.getAll(req, res));
router.get('/:id', (req, res) => listaController.getById(req, res));
router.put('/:id', (req, res) => listaController.update(req, res));
router.delete('/:id', (req, res) => listaController.delete(req, res));

export default router;
