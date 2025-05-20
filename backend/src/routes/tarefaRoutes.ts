import { Router } from 'express';
import { TarefaController } from '../controllers/tarefaController';

const tarefaController = new TarefaController();
const tarefaRoutes = Router();

// Criar uma nova tarefa
tarefaRoutes.post('/', tarefaController.criar.bind(tarefaController));

// Listar tarefas de uma sessão
tarefaRoutes.get('/sessao/:sessaoId', tarefaController.listarPorSessao.bind(tarefaController));

// Marcar uma tarefa como concluída
tarefaRoutes.put('/:id/concluir', tarefaController.concluir.bind(tarefaController));

// Excluir uma tarefa
tarefaRoutes.delete('/:id', tarefaController.excluir.bind(tarefaController));

export { tarefaRoutes };
