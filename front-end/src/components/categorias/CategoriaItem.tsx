// Importações do React e ícones para o componente.
import React from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

// Definição da interface de props que o componente espera receber.
interface CategoriaItemProps {
  categoria: { id: number; nome: string };
  editId: number | null;
  editNome: string;
  handleEdit: (id: number, nome: string) => void;
  handleDelete: (id: number) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

// O componente funcional CategoriaItem, que utiliza as props definidas acima.
const CategoriaItem: React.FC<CategoriaItemProps> = ({
  categoria,
  editId,
  editNome,
  handleEdit,
  handleDelete,
  handleInputChange,
  handleBlur,
  handleKeyDown,
}) => {
  // Renderização do componente.
  return (
    // Container do item da categoria com espaçamento e alinhamento.
    <div
      key={categoria.id} // Chave única para cada item da lista (necessária para listas no React).
      className="flex justify-between mx-6 py-2 items-center text-gray-800 dark:text-gray-200"
    >
        {/* Exibe o ID da categoria. */}
      <p>{categoria.id}</p> 
      {editId === categoria.id ? ( // Verifica se a categoria está em modo de edição.
        // Campo de texto para editar o nome da categoria, com estilos e eventos associados.
        <input
          type="text"
          value={editNome}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus // Foca automaticamente no campo quando ele é renderizado.
          className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm w-3/4 md:w-auto dark:bg-gray-700 dark:text-gray-200"
        />
      ) : (
        // Exibe o nome da categoria se não estiver em modo de edição.
        <p>{categoria.nome}</p>
      )}
       {/* Container para os botões de ação. */}
      <div className="flex space-x-2 max-h-[50vh]">
        {/* Botão para ativar o modo de edição da categoria. */}
        <button
          onClick={() => handleEdit(categoria.id, categoria.nome)}
          className="text-green-500 hover:text-green-700"
        >
          <FaPencilAlt /> 
        </button>
        {/* Botão para excluir a categoria. */}
        <button
          onClick={() => handleDelete(categoria.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );  
};

// Exportação do componente para ser utilizado em outros lugares da aplicação.
export default CategoriaItem;
