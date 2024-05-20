import React, { useState, useEffect } from "react";
import CardParaExibicaoGeral from "./CardParaExibicaoGeral";

// Define o tipo de uma tarefa
type Tarefa = {
  id: number;
  descricao: string;
  dia: string;
  categoriaId: number;
  status: "não iniciado" | "realizada" | "emProgresso";
  cor: string;
  createdAt: string;
  updatedAt: string;
};

// Define as propriedades esperadas pelo componente TabelaDeTodasAsTarefas
interface TabelaDeTodasAsTarefasProps {
  categoriaSelecionada: number | null;
  searchText: string;
}

// Componente funcional TabelaDeTodasAsTarefas
const TabelaDeTodasAsTarefas: React.FC<TabelaDeTodasAsTarefasProps> = ({
  categoriaSelecionada,
  searchText,
}) => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]); // Estado para armazenar a lista de tarefas

  // Função para apagar tarefa
  const onApagarTarefa = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3333/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Problema ao apagar a tarefa");
      }

      // Remove a tarefa da lista após a exclusão bem-sucedida
      setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
    } catch (error) {
      console.error("Erro ao apagar a tarefa:", error);
    }
  };

  // Função para buscar as tarefas do servidor
  const fetchTarefas = async () => {
    try {
      const response = await fetch("http://localhost:3333/api/tasks");
      if (!response.ok) {
        throw new Error("Problema ao buscar as tarefas");
      }
      const data: Tarefa[] = await response.json();
      setTarefas(data);
    } catch (error) {
      console.error("Erro ao buscar as tarefas:", error);
    }
  };

  // Efeito para buscar as tarefas quando o componente é montado ou quando há mudanças nas dependências
  useEffect(() => {
    fetchTarefas();
  }, [categoriaSelecionada, searchText]); // e montado quando o filtro e selecionado ou quando ha pesquisa

  // Filtra as tarefas com base no texto de busca e na categoria selecionada
  const tarefasFiltradas = tarefas.filter((tarefa) => {
    const searchMatch = tarefa.descricao
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const categoriaMatch =
      categoriaSelecionada === null ||
      tarefa.categoriaId === categoriaSelecionada;
    return searchMatch && categoriaMatch;
  });

  // Agrupa as tarefas por status
  const tarefasAgrupadas: { [key: string]: Tarefa[] } = {};
  tarefasFiltradas.forEach((tarefa) => {
    if (!tarefasAgrupadas[tarefa.status]) {
      tarefasAgrupadas[tarefa.status] = [];
    }
    tarefasAgrupadas[tarefa.status].push(tarefa);
  });

  // Ordena as tarefas por status desejado
  const ordemStatus = ["não iniciado", "emProgresso", "realizada"];
  const tarefasOrdenadas: Tarefa[] = [];
  ordemStatus.forEach((status) => {
    if (tarefasAgrupadas[status]) {
      tarefasOrdenadas.push(...tarefasAgrupadas[status]);
    }
  });

  return (
    <div className="col-span-3">
      <div className="flex pb-2 space-x-2">
        <p>Total de todas as tarefas:</p>  
        {/* todas as tarefas independente de status*/}
        <small className=" text-green-600">
          (
          {
            tarefas.filter(
              (t) =>
                t.status === "não iniciado" ||
                t.status === "emProgresso" ||
                t.status === "realizada"
            ).length
          }
          )
        </small>
      </div>
      <div className="grid grid-cols-1 max-h-[60vh] overflow-y-auto">
        {/* Exibe as tarefas filtradas */}
        {tarefasOrdenadas.map((tarefa) => (
          <CardParaExibicaoGeral
            key={tarefa.id}
            {...tarefa}
            onApagarTarefa={onApagarTarefa}
          />
        ))}
      </div>
    </div>
  );
};

export default TabelaDeTodasAsTarefas;
