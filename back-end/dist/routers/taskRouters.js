// src/routes/taskRoutes.js
import express from 'express';

import {  createTask, getAllTasks, getTaskById, updateTask, deleteTask } from '../api/controllers/taskController.js';

const router = express.Router();
// Rota para criar uma nova tarefa
router.post('/tasks', createTask);

// Rota para obter todas as tarefas
router.get('/tasks', getAllTasks);

// Rota para obter uma tarefa por ID
router.get('/tasks/:id', getTaskById);

// Rota para atualizar uma tarefa
router.put('/tasks/:id', updateTask);

// Rota para excluir uma tarefa
router.delete('/tasks/:id', deleteTask);

export default router;
