import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTask = async (req, res) => {
    try{
        const{ descricao, dia, categoriaId,  } = req.body;
        const task = await prisma.task.create({
            data:{
                descricao,
                dia,
                categoriaId,
            },
        });
        res.status(201).json(task);
    }catch (error) {
        res.status(400).json({ error: error.message })
    }
    
}

// Função para listar todas as tarefas
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Função para obter uma tarefa por ID
export const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await prisma.task.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Função para atualizar uma tarefa
export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { descricao, dia, categoriaId, status, cor, horario } = req.body;
    try {
        const updatedTask = await prisma.task.update({
            where: {
                id: parseInt(id)
            },
            data: {
                descricao,
                status,
                cor
            }
        });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Função para excluir uma tarefa
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.task.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.status(204).send(); // No Content
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};