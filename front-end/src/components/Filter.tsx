import { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";

// Define o tipo para uma categoria
interface Categoria {
  id: number;
  nome: string;
}
// Define as propriedades esperadas pelo componente Filter
interface FilterProps {
  onCategoriaChange: (categoriaId: number | null) => void;
}
// Componente funcional Filter
function Filter({ onCategoriaChange }: FilterProps) {
  // Estado para controlar a abertura e fechamento do menu suspenso
  const [isOpen, setIsOpen] = useState(false);
  // Estado para armazenar a lista de categorias recuperadas da API
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Efeito para buscar as categorias da API quando o componente é montado
  useEffect(() => {
    const fetchCategorias = async () => {
      // Faz uma requisição à API para buscar as categorias
      try {
        const response = await fetch("http://localhost:3333/api/categories");
        if (!response.ok) {
          throw new Error("Problema ao carregar as categorias");
        }
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Erro ao carregar as categorias:", error);
      }
    };

    fetchCategorias();
  }, []);
  // Função para alternar o estado do menu suspenso
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left z-10">
      {/* Botão de filtro que abre o menu suspenso */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
      >
        <FaFilter />
      </button>
      {/* Renderiza o menu suspenso quando isOpen é verdadeiro */}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {/* Mapeia as categorias e renderiza um botão para cada uma */}
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                // Quando uma categoria é clicada, chama a função onCategoriaChange com o ID da categoria
                onClick={() => {
                  onCategoriaChange(categoria.id);
                  // Fecha o menu suspenso após a seleção de uma categoria
                  toggleDropdown();
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                role="menuitem"
              >
                {categoria.nome}
              </button>
            ))}
            {/* Botão para mostrar todas as categorias */}
            <button
              // Quando "Todas as Categorias" é clicado, chama a função onCategoriaChange com null
              onClick={() => {
                onCategoriaChange(null);
                toggleDropdown();
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
            >
              Todas as Categorias
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;
