import { FunctionComponent } from "react";
import { FaCircle } from "react-icons/fa6";
import { format, addDays } from "date-fns";

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

interface DayModalProps {
  isOpen: boolean; // Indica se o modal está aberto
  tarefas: Tarefa[]; // Lista de tarefas do dia
  categorias: Categoria[]; // Lista de categorias
  onClose: () => void; // Função para fechar o modal
}

const DayModal: FunctionComponent<DayModalProps> = ({ isOpen, tarefas, categorias, onClose }) => {

// Função para obter o texto do status da tarefa baseado na cor
  const getTextoDaTarefa = (tarefa: Tarefa) => {
    switch (tarefa.cor) {
      case "green":
        return "Tarefa concluída";
      case "yellow":
        return "Tarefa em andamento";
      case "red":
        return "Tarefa não realizada";
      default:
        return "Status desconhecido";
    }
  };
// Função para obter o nome da categoria pelo ID
  const getNomeCategoria = (categoriaId: number) => {
    const categoria = categorias.find((cat) => cat.id === categoriaId);
    return categoria ? categoria.nome : "Sem Categoria";
  };

  if (!isOpen) return null; // Não renderiza o modal se não estiver aberto

  //retorno do modal com as informações de cada tarefa 
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full max-h-[60vh] overflow-y-auto relative m-3 md:m-0">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Tarefas do dia</h2>
        <div className="relative">
          {tarefas.map((tarefa) => (
            <div key={tarefa.id} className="mb-4 space-y-1">
              <h3 className="text-lg font-semibold">
                {tarefa.descricao.toLocaleUpperCase()}
              </h3>
              <p>
                <strong>Data:</strong> {format(addDays(tarefa.dia, 1), "dd/MM/yyyy")}
              </p>
              <div className="flex items-center space-x-4">
                <p><strong>Status: </strong> {getTextoDaTarefa(tarefa)}</p>
                <span className="text-xl">
                  <FaCircle style={{ color: tarefa.cor }} />
                </span>
              </div>
              <p>
                <strong>Categoria:</strong> {getNomeCategoria(tarefa.categoriaId)}
              </p>
              <hr className="border-gray-300 dark:border-gray-700" />
            </div>
          ))}
          <div className="sticky bottom-0 z-10 text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayModal;
