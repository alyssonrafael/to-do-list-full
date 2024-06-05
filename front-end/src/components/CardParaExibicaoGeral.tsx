import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
// Define o tipo Categoria 
type Categoria = {
  id: number;
  nome: string;
};
// Define as propriedades  CardParaExibicaoGeral
type CardDeTarefaProps = {
  id: number;
  descricao: string;
  dia: string;
  categoriaId: number;
  status: string;
  cor: string;
  onApagarTarefa: (id: number) => void;
};
// componente funcional CardParaExibicaoGeral
const CardParaExibicaoGeral: React.FC<CardDeTarefaProps> = ({
  id,
  descricao,
  dia,
  categoriaId,
  status,
  cor,
  onApagarTarefa,
}) => {
  // Estado local para armazenar o nome da categoria
  const [nomeCategoria, setNomeCategoria] = useState<string>("Sem Categoria");
// efeito para buscar a categoria com base no categoriaId
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("http://localhost:3333/api/categories");
        if (!response.ok) {
          throw new Error("Falha ao obter categorias");
        }
        const data: Categoria[] = await response.json();
        // Encontra a categoria correspondente ao categoriaId
        const categoriaEncontrada = data.find((cat) => cat.id === categoriaId);
        if (categoriaEncontrada) {
          setNomeCategoria(categoriaEncontrada.nome);
        }
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategorias();
  }, [categoriaId]); // O useEffect depende de categoriaId, executa novamente quando categoriaId muda

  // Formata a data no formato "pt-BR"
  const data = new Date(dia);
  const dataFormatada = data.toLocaleDateString("pt-BR");

  return (
    <div
      className={`flex items-center justify-between border-2 py-2 px-4 m-4 rounded-2xl shadow-lg bg-white dark:bg-gray-800 transition-transform transform hover:translate-y-[-5px] hover:shadow-xl`}
      style={{ borderColor: cor }}
    >
      <div className="flex items-center">
        <div>
          {/* Exibe a descrição da tarefa */}
          <p
            className={`text-gray-800 dark:text-gray-200 text-lg font-semibold ${
              status === "realizada" ? "line-through" : ""
            }`}
          >
            {descricao}
          </p>
          {/* Exibe o nome da categoria */}
          <p
            className={`text-gray-600 dark:text-gray-400 text-sm font-semibold ${
              status === "realizada" ? "line-through" : ""
            }`}
          >
            Categoria: {nomeCategoria}
          </p>
          {/* Exibe a data formatada */}
          <small
            className={`text-gray-500 dark:text-gray-400 ${
              status === "realizada" ? "line-through" : ""
            }`}
          >
            {dataFormatada}
          </small>
        </div>
      </div>
      {/* Botão para apagar a tarefa */}
      <div className="flex items-center">
        <button
          onClick={() => onApagarTarefa(id)}
          className="ml-4 text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CardParaExibicaoGeral;
