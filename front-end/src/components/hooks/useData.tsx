import { useEffect, useState } from "react";

// Definição dos tipos para as tarefas e categorias
interface Tarefa {
  id: number;
  descricao: string;
  categoriaId: number;
  dia: Date;
  start: Date;
  end: Date;
  cor?: string;
}

interface Categoria {
  id: number;
  nome: string;
}

// Hook para buscar categorias
export const useCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("https://to-do-list-full-alysson-rafaels-projects.vercel.app/api/categories");
        if (!response.ok) {
          throw new Error("Falha ao obter categorias");
        }
        const data: Categoria[] = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategorias();
  }, []);

  return categorias; // Retorna as categorias buscadas
};
// Hook para buscar tarefas
export const useTarefas = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const response = await fetch("https://to-do-list-full-alysson-rafaels-projects.vercel.app/api/tasks");
        const data: Tarefa[] = await response.json();
        const formattedData = data.map((tarefa) => ({
          ...tarefa,
          dia: new Date(tarefa.dia),
        }));
        setTarefas(formattedData);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };
    fetchTarefas();
  }, []);

  return tarefas; // Retorna as tarefas buscadas
};
