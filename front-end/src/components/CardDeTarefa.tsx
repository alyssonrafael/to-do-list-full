import React from "react";
import { FaArrowRight, FaArrowLeft, FaCheck } from "react-icons/fa6";

// Definição do tipo para a tarefa
type Tarefa = {
  id: number;
  descricao: string;
  dia: string;
  categoriaId: number;
  status: string;
  cor: string;
  createdAt: string;
  updatedAt: string;
};

// Props do componente, que incluem as propriedades da tarefa e funções de callback
type CardDeTarefaProps = Tarefa & {
  onToggleRealizada: (id: number) => void;
  onMoverParaProgresso: (id: number) => void;
  onMoverParaNaoRealizada: (id: number) => void;
};

// Componente CardTarefa
const CardDeTarefa: React.FC<CardDeTarefaProps> = ({
  id,
  descricao,
  dia,
  status,
  cor,
  onToggleRealizada,
  onMoverParaProgresso,
  onMoverParaNaoRealizada,
}) => {
  // Renderização do card com as informações da tarefa
  return (
    // container principal
    <div
      className={`flex items-center justify-between border-2 py-2 px-4 m-4 rounded-2xl shadow-lg bg-white transition-transform transform hover:translate-y-[-5px] hover:shadow-xl`}
      style={{ borderColor: cor }} //define a cor de borda dinamicamente
    >
      {/* Botão para mover a tarefa para 'não realizada', visível apenas quando o status é 'emProgresso' */}
      <div className="flex items-center">
        {status === "emProgresso" && (
          <button
            onClick={() => onMoverParaNaoRealizada(id)}
            className="mr-4 text-red-500 hover:text-red-700"
          >
            <FaArrowLeft />
          </button>
        )}
        {/* Descrição da tarefa, com texto e data riscado se a tarefa está 'realizada' */}
        <div>
          <p
            className={`text-gray-800 text-sm font-semibold ${
              status === "realizada" ? "line-through" : ""
            }`}
          >
            {descricao}
          </p>
          <small
            className={`text-gray-500 ${
              status === "realizada" ? "line-through" : ""
            }`}
          >
            {new Date(dia).toLocaleDateString()}
          </small>
        </div>
      </div>
      {/* Botão para mover a tarefa para 'emProgresso', visível apenas quando o status é 'não iniciado' */}
      <div className="flex items-center">
        {status === "não iniciado" && (
          <button
            onClick={() => onMoverParaProgresso(id)}
            className="ml-4 text-yellow-500 hover:text-yellow-700"
          >
            <FaArrowRight />
          </button>
        )}
        {/* Botão para marcar a tarefa como 'realizada', visível apenas quando o status é 'emProgresso' */}
        {status === "emProgresso" && (
          <>
            <button
              onClick={() => onToggleRealizada(id)}
              className="ml-4 text-green-500 hover:text-green-700"
            >
              <FaCheck />
            </button>
          </>
        )}
        {/* Botão para mover a tarefa para 'emProgresso', visível apenas quando o status é 'realizada' */}
        {status === "realizada" && (
          <button
            onClick={() => onMoverParaProgresso(id)}
            className="ml-4 text-yellow-500 hover:text-yellow-700"
          >
            <FaArrowLeft />
          </button>
        )}
      </div>
    </div>
  );
};

export default CardDeTarefa;