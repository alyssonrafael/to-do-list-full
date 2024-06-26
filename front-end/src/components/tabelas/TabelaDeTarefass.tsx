import React, { useState, useEffect } from "react";
import CardDeTarefa from "../cards/CardDeTarefa";
import MensagemCard from "../utils/Message";

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

// Define as propriedades esperadas pelo componente TabelaDeTarefas
interface TabelaDeTarefasProps {
  categoriaSelecionada: number | null;
  searchText: string;
  dataAtual?: string;
}

// Componente funcional TabelaDeTarefas
const TabelaDeTarefas: React.FC<TabelaDeTarefasProps> = ({
  categoriaSelecionada,
  searchText,
  dataAtual,
}) => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]); // Estado para armazenar a lista de tarefas

  const [mensagem, setMensagem] = useState({ sucesso: false, texto: "" });
  //esse estado força a atualizaçao da mensagem quando ouver interaçao com o botao
  const [mensagemCount, setMensagemCount] = useState(0);

  // Função para alternar o status da tarefa para 'realizada'
  const onToggleRealizada = async (id: number) => {
    // Redefina a mensagem
    setMensagem({ sucesso: false, texto: "" });
    // Incrementa o contador de mensagens forçando ela a aparecer
    setMensagemCount(mensagemCount + 1);

    const descricaoAtual = tarefas.find(
      (tarefa) => tarefa.id === id
    )?.descricao;
    if (descricaoAtual) {
      try {
        const response = await fetch(`https://to-do-list-full-alysson-rafaels-projects.vercel.app/api/tasks/${id}`, {
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
        setMensagem({ sucesso: true, texto: "Tarefa realizada com sucesso" });
      } catch (error) {
        console.error("Erro ao atualizar a tarefa:", error);
        setMensagem({
          sucesso: false,
          texto: "erro ao mover tarefa tente mais tarde",
        });
      }
    }
  };
  // Função para alternar o status da tarefa para 'emProgresso'
  const onMoverParaProgresso = async (id: number) => {
    // Redefina a mensagem
    setMensagem({ sucesso: false, texto: "" });
    // Incrementa o contador de mensagens forçando ela a aparecer
    setMensagemCount(mensagemCount + 1);
    // A descrição permanece a mesma, apenas o status e a cor são atualizados
    const descricaoAtual = tarefas.find(
      (tarefa) => tarefa.id === id
    )?.descricao;
    if (descricaoAtual) {
      try {
        const response = await fetch(`https://to-do-list-full-alysson-rafaels-projects.vercel.app/api/tasks/${id}`, {
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
        setMensagem({
          sucesso: true,
          texto: "Tarefa movida para em progresso",
        });
      } catch (error) {
        console.error("Erro ao atualizar a tarefa:", error);
        setMensagem({
          sucesso: false,
          texto: "erro ao mover tarefa tente mais tarde",
        });
      }
    }
  };
  // Função para alternar o status da tarefa para 'não iniciado'
  const onMoverParaNaoRealizada = async (id: number) => {
    // Redefina a mensagem
    setMensagem({ sucesso: false, texto: "" });
    // Incrementa o contador de mensagens forçando ela a aparecer
    setMensagemCount(mensagemCount + 1);
    const descricaoAtual = tarefas.find(
      (tarefa) => tarefa.id === id
    )?.descricao;
    if (descricaoAtual) {
      try {
        const response = await fetch(`https://to-do-list-full-alysson-rafaels-projects.vercel.app/api/tasks/${id}`, {
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
        setMensagem({
          sucesso: true,
          texto: "Tarefa movida para Não realizada",
        });
      } catch (error) {
        console.error("Erro ao atualizar a tarefa:", error);
        setMensagem({
          sucesso: false,
          texto: "erro ao mover tarefa tente mais tarde",
        });
      }
    }
  };
  // Função para apagar tarefa
  const onApagarTarefa = async (id: number) => {
    // Redefina a mensagem
    setMensagem({ sucesso: false, texto: "" });
    // Incrementa o contador de mensagens forçando ela a aparecer
    setMensagemCount(mensagemCount + 1);
    try {
      const response = await fetch(`https://to-do-list-full-alysson-rafaels-projects.vercel.app/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Problema ao apagar a tarefa");
      }

      // Remove a tarefa da lista após a exclusão bem-sucedida
      setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
      setMensagem({ sucesso: true, texto: "Tarefa excluida com sucesso" });
    } catch (error) {
      console.error("Erro ao apagar a tarefa:", error);
      setMensagem({
        sucesso: false,
        texto: "erro ao excluir tarefa tente mais tarde",
      });
    }
  };

  // Função para buscar as tarefas do servidor
  const fetchTarefas = async () => {
    try {
      const response = await fetch("https://to-do-list-full-alysson-rafaels-projects.vercel.app/api/tasks");
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

  // Filtra as tarefas com base na categoria, texto de busca e data se necessario (vou usar a data na pagina tarefa do dia)
  const tarefasFiltradas = tarefas.filter((tarefa) => {
    const categoriaMatch = categoriaSelecionada
      ? tarefa.categoriaId === categoriaSelecionada
      : true;
    const searchMatch = tarefa.descricao
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const dataMatch = dataAtual ? tarefa.dia === dataAtual : true;
    return categoriaMatch && searchMatch && dataMatch;
  });

  return (
    <div className="col-span-3">
      {/* configuraçoes para responsividade */}
      <div
        className="
      space-y-3 pb-4 
      md:grid md:grid-cols-3 md:gap-4 md:pb-0 md:space-y-0 
      "
      >
        {/* Coluna para tarefas não iniciadas */}
        <div className="border border-red-500">
          <div className="flex justify-center">
            <h2 className="text-center text-2xl pt-3">Não Realizadas </h2>
            <small className="text-center pt-3 ml-2">
              (
              {
                tarefasFiltradas.filter((t) => t.status === "não iniciado")
                  .length
              }
              )
            </small>
          </div>
          <div className="md:max-h-[50vh] lg:max-h-[60vh] overflow-y-auto ">
            {tarefasFiltradas
              .filter((t) => t.status === "não iniciado")
              .map((tarefa) => (
                <CardDeTarefa
                  key={tarefa.id}
                  {...tarefa}
                  onToggleRealizada={onToggleRealizada}
                  onMoverParaProgresso={onMoverParaProgresso}
                  onMoverParaNaoRealizada={onMoverParaNaoRealizada}
                  onApagarTarefa={onApagarTarefa}
                />
              ))}
          </div>
        </div>
        {/* Coluna para tarefas em progresso */}
        <div className="border border-yellow-400">
          <div className="flex justify-center">
            <h2 className="text-center text-2xl pt-3">Em Progesso </h2>
            <small className="text-center pt-3 ml-2">
              (
              {
                tarefasFiltradas.filter((t) => t.status === "emProgresso")
                  .length
              }
              )
            </small>
          </div>
          <div className="md:max-h-[50vh] lg:max-h-[60vh] overflow-y-auto">
            {tarefasFiltradas
              .filter((t) => t.status === "emProgresso")
              .map((tarefa) => (
                <CardDeTarefa
                  key={tarefa.id}
                  {...tarefa}
                  onToggleRealizada={onToggleRealizada}
                  onMoverParaProgresso={onMoverParaProgresso}
                  onMoverParaNaoRealizada={onMoverParaNaoRealizada}
                  onApagarTarefa={onApagarTarefa}
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
              ({tarefasFiltradas.filter((t) => t.status === "realizada").length}
              )
            </small>
          </div>
          <div className="md:max-h-[50vh] lg:max-h-[60vh] overflow-y-auto">
            {tarefasFiltradas
              .filter((t) => t.status === "realizada")
              .map((tarefa) => (
                <CardDeTarefa
                  key={tarefa.id}
                  {...tarefa}
                  onToggleRealizada={onToggleRealizada}
                  onMoverParaProgresso={onMoverParaProgresso}
                  onMoverParaNaoRealizada={onMoverParaNaoRealizada}
                  onApagarTarefa={onApagarTarefa}
                />
              ))}
          </div>
        </div>
      </div>
      <MensagemCard
        sucesso={mensagem.sucesso}
        mensagem={mensagem.texto}
        key={mensagemCount}
      />
    </div>
  );
};

export default TabelaDeTarefas;
