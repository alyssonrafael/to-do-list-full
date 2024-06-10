import React from "react";
import { FaArrowRight, FaArrowLeft, FaCheck, FaTrash } from "react-icons/fa6";
import useWindowWidth from '../hooks/useWindowWidth';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

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
  onApagarTarefa: (id: number) => void;
};

function criarDataLocal(diaString: string) {
  const [ano, mes, dia] = diaString.split('T')[0].split('-').map(Number);
  // Cria a data no fuso horário local
  const dataLocal = new Date(ano, mes - 1, dia);
  return dataLocal;
}

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
  onApagarTarefa,
}) => {

  const data = criarDataLocal(dia);
  // Formata a data no formato desejado (DD/MM/YYYY)
  const dataFormatada = data.toLocaleDateString('pt-BR');
  // usando hook para obter o tamanho da tela para mudar os icones a serem exibidos
  const windowWidth = useWindowWidth(); 

  // Função para escolher a seta correta com base no tamanho da tela
  const ArrowRight = windowWidth < 768 ? FaArrowDown : FaArrowRight;
  const ArrowLeft = windowWidth < 768 ? FaArrowUp : FaArrowLeft;

  // Renderização do card com as informações da tarefa
  return (
    // container principal
    <div
      className={`flex items-center justify-between border-2 py-2 px-4 m-4 rounded-2xl shadow-lg bg-white dark:bg-gray-800 lg:transition-transform lg:transform lg:hover:translate-y-[-5px] lg:hover:shadow-xl`}
      style={{ borderColor: cor }} //define a cor de borda dinamicamente
    >
      {/* Botão para mover a tarefa para 'não realizada', visível apenas quando o status é 'emProgresso' */}
      <div className="flex items-center">
        {status === "emProgresso" && (
          <button
            onClick={() => onMoverParaNaoRealizada(id)}
            className="mr-4 text-red-500 lg:hover:text-red-700"
            // titulo para dizer oque a setinha faz
            title="Mover para Não Realizada" 
          >
            <ArrowLeft />
          </button>
        )}
        {/* Descrição da tarefa, com texto e data riscado se a tarefa está 'realizada' */}
        <div>
          <p
            className={`text-gray-800 dark:text-gray-200 text-sm font-semibold ${
              status === "realizada" ? "line-through" : ""
            }`}
          >
            {descricao}
          </p>
          <small
            className={`text-gray-500 dark:text-gray-400 ${
              status === "realizada" ? "line-through" : ""
            }`}
          >
            {dataFormatada}
          </small>
        </div>
      </div>
      {/* Botão para mover a tarefa para 'emProgresso', visível apenas quando o status é 'não iniciado' */}
      <div className="flex items-center">
        {status === "não iniciado" && (
          <button
            onClick={() => onMoverParaProgresso(id)}
            className="ml-4 text-yellow-500 lg:hover:text-yellow-700"
            title="Mover para Em Progresso"
          >
            <ArrowRight />
          </button>
        )}
        {/* Botão para marcar a tarefa como 'realizada', visível apenas quando o status é 'emProgresso' */}
        {status === "emProgresso" && (
          <>
            <button
              onClick={() => onToggleRealizada(id)}
              className="ml-4 text-green-500 lg:hover:text-green-700"
              title="Mover Finalizada"
            >
              <FaCheck />
            </button>
          </>
        )}
        {/* Botão para mover a tarefa para 'emProgresso', visível apenas quando o status é 'realizada' */}
        {status === "realizada" && (
          <>
            <button
              onClick={() => onMoverParaProgresso(id)}
              className="ml-4 text-yellow-500 lg:hover:text-yellow-700"
              title="Mover para Em Progresso"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={() => onApagarTarefa(id)}
              className="ml-4 text-red-500 lg:hover:text-red-700"
              title="Excluir Tarefa"
            >
              <FaTrash />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CardDeTarefa;
