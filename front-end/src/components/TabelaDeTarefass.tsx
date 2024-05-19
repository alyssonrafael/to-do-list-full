import React, { useState, useEffect } from "react";
import CardDeTarefa from "./CardDeTarefa";

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

// Componente funcional TabelaDeTarefas
const TabelaDeTarefas: React.FC = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]); // Estado para armazenar a lista de tarefas

  // Função para alternar o status da tarefa para 'realizada'
  const onToggleRealizada = async (id: number) => {
    const descricaoAtual = tarefas.find(
      (tarefa) => tarefa.id === id
    )?.descricao;
    if (descricaoAtual) {
      try {
        const response = await fetch(`http://localhost:3333/api/tasks/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            descricao: descricaoAtual,
            status: "realizada",
            cor: "green",
          }),
        });

        if (!response.ok) {
          throw new Error("Problema ao atualizar a tarefa");
        }

        // Atualiza a lista de tarefas após a atualização bem-sucedida
        await fetchTarefas();
      } catch (error) {
        console.error("Erro ao atualizar a tarefa:", error);
      }
    }
  };
  // Função para alternar o status da tarefa para 'emProgresso'
  const onMoverParaProgresso = async (id: number) => {
    // A descrição permanece a mesma, apenas o status e a cor são atualizados
    const descricaoAtual = tarefas.find(
      (tarefa) => tarefa.id === id
    )?.descricao;
    if (descricaoAtual) {
      try {
        const response = await fetch(`http://localhost:3333/api/tasks/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            descricao: descricaoAtual,
            status: "emProgresso",
            cor: "yellow",
          }),
        });

        if (!response.ok) {
          throw new Error("Problema ao atualizar a tarefa");
        }

        // Atualiza a lista de tarefas após a atualização bem-sucedida
        await fetchTarefas();
      } catch (error) {
        console.error("Erro ao atualizar a tarefa:", error);
      }
    }
  };
  // Função para alternar o status da tarefa para 'não iniciado'
  const onMoverParaNaoRealizada = async (id: number) => {
    const descricaoAtual = tarefas.find(
      (tarefa) => tarefa.id === id
    )?.descricao;
    if (descricaoAtual) {
      try {
        const response = await fetch(`http://localhost:3333/api/tasks/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            descricao: descricaoAtual,
            status: "não iniciado",
            cor: "red",
          }),
        });

        if (!response.ok) {
          throw new Error("Problema ao atualizar a tarefa");
        }

        // Atualiza a lista de tarefas após a atualização bem-sucedida
        await fetchTarefas();
      } catch (error) {
        console.error("Erro ao atualizar a tarefa:", error);
      }
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

  // Efeito para buscar as tarefas quando o componente é montado
  useEffect(() => {
    fetchTarefas();
  }, []);

  return (
    <div className="col-span-3">
      <div className="grid grid-cols-3 gap-4">
        {/* Coluna para tarefas não iniciadas */}
        <div className="border border-red-500">
          <div className="flex justify-center">
            <h2 className="text-center text-2xl pt-3">Não Realizadas </h2>
            <small className="text-center pt-3 ml-2">
              ({tarefas.filter((t) => t.status === "não iniciado").length})
            </small>
          </div>
          <div className="max-h-[60vh] overflow-y-auto ">
            {tarefas
              .filter((t) => t.status === "não iniciado")
              .map((tarefa) => (
                <CardDeTarefa
                  key={tarefa.id}
                  {...tarefa}
                  onToggleRealizada={onToggleRealizada}
                  onMoverParaProgresso={onMoverParaProgresso}
                  onMoverParaNaoRealizada={onMoverParaNaoRealizada}
                />
              ))}
          </div>
        </div>
        {/* Coluna para tarefas em progresso */}
        <div className="border border-yellow-400">
          <div className="flex justify-center">
            <h2 className="text-center text-2xl pt-3">Em Progesso </h2>
            <small className="text-center pt-3 ml-2">
              ({tarefas.filter((t) => t.status === "emProgresso").length})
            </small>
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            {tarefas
              .filter((t) => t.status === "emProgresso")
              .map((tarefa) => (
                <CardDeTarefa
                  key={tarefa.id}
                  {...tarefa}
                  onToggleRealizada={onToggleRealizada}
                  onMoverParaProgresso={onMoverParaNaoRealizada}
                  onMoverParaNaoRealizada={onMoverParaNaoRealizada}
                />
              ))}
          </div>
        </div>
        {/* ... */}
        {/* Coluna para tarefas realizadas */}
        <div className="border border-green-500">
          <div className="flex justify-center">
            <h2 className="text-center text-2xl pt-3">Finalizadas</h2>
            <small className="text-center pt-3 ml-2">
              ({tarefas.filter((t) => t.status === "realizada").length})
            </small>
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            {tarefas
              .filter((t) => t.status === "realizada")
              .map((tarefa) => (
                <CardDeTarefa
                  key={tarefa.id}
                  {...tarefa}
                  onToggleRealizada={onToggleRealizada}
                  onMoverParaProgresso={onMoverParaProgresso}
                  onMoverParaNaoRealizada={onMoverParaNaoRealizada}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabelaDeTarefas;
