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

function criarDataLocal(diaString: string) {
  const [ano, mes, dia] = diaString.split('T')[0].split('-').map(Number);
  // Cria a data no fuso horário local
  const dataLocal = new Date(ano, mes - 1, dia);
  return dataLocal;
}

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
        const response = await fetch("https://to-do-list-full-alysson-rafaels-projects.vercel.app/api/categories");
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


  const data = criarDataLocal(dia);
  // Formata a data no formato desejado (DD/MM/YYYY)
  const dataFormatada = data.toLocaleDateString('pt-BR');

  return (
    <div
      className={`flex items-center justify-between border-2 py-2 px-4 m-4 rounded-2xl shadow-lg bg-white dark:bg-gray-800 lg:transition-transform lg:transform lg:hover:translate-y-[-5px] lg:hover:shadow-xl`}
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
          className="ml-4 text-red-500 lg:hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CardParaExibicaoGeral;
