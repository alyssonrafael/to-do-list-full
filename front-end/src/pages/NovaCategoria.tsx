// Importações necessárias para o componente, incluindo React, componentes personalizados e estilos.
import React, { useState, useEffect } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import Navbar from "../components/layouts/Navbar";
import CategoriaItem from "../components/categorias/CategoriaItem";
import CategoriaForm from "../components/categorias/CategoriaForm";

// Definição da interface 'Categoria' para tipagem das categorias.
interface Categoria {
  id: number;
  nome: string;
}
// Componente funcional 'NovaCategoria'. que exibe a pagina de categorias inicialmente a ideia era so cadrastrar a categoria mais resolvi fazer o crud inteiro
function NovaCategoria() {
  // Estados para gerenciar as categorias, edição e mensagens.
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editNome, setEditNome] = useState<string>("");
  const [mensagem, setMensagem] = useState<{ sucesso: boolean; texto: string }>(
    {
      sucesso: false,
      texto: "",
    }
  );
  const [mensagemCount, setMensagemCount] = useState(0);
  const [nomeCategoria, setNomeCategoria] = useState("");
  // Efeito para buscar as categorias da API quando o componente é montado.
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("http://localhost:3333/api/categories");
        if (!response.ok) {
          throw new Error("Problema ao carregar as categorias");
        }
        const data = await response.json();
        data.sort((a: Categoria, b: Categoria) => a.id - b.id);
        setCategorias(data);
      } catch (error) {
        console.error("Erro ao carregar as categorias:", error);
      }
    };

    fetchCategorias();
  }, []);
  // Função assíncrona para lidar com a exclusão de uma categoria.
  const handleDelete = async (id: number) => {
    // Reseta a mensagem de feedback e incrementa o contador para forçar ele a ser renderizado.
    setMensagem({ sucesso: false, texto: "" });
    setMensagemCount(mensagemCount + 1);
    try {
      // Realiza uma requisição DELETE para a API para excluir a categoria pelo ID.
      const response = await fetch(
        `http://localhost:3333/api/categories/${id}`,
        {
          method: "DELETE",
        }
      );
      // Se a resposta não for bem-sucedida, lança um erro.
      if (!response.ok) {
        throw new Error("Problema ao excluir a categoria");
      }
      // Atualiza o estado das categorias, removendo a categoria excluída.
      setCategorias((prevCategorias) =>
        prevCategorias.filter((categoria) => categoria.id !== id)
      );
      // Define uma mensagem de sucesso após a exclusão bem-sucedida.
      setMensagem({ sucesso: true, texto: "Categoria excluída com sucesso." });
    } catch (error) {
      // Em caso de erro, registra no console e define uma mensagem de erro.
      console.error("Erro ao excluir a categoria:", error);
      setMensagem({
        sucesso: false,
        texto:
          "Erro ao excluir a categoria ela deve estar associada a uma tarefa.",
      });
    }
  };
  // Função para iniciar a edição de uma categoria.
  const handleEdit = (id: number, nome: string) => {
    // Define o ID e o nome da categoria que está sendo editada.
    setEditId(id);
    setEditNome(nome);
  };
  // Função assíncrona para salvar as alterações feitas em uma categoria.
  const handleSaveEdit = async () => {
    // Reseta a mensagem de feedback e incrementa o contador para forçar ele a ser renderizado.
    setMensagem({ sucesso: false, texto: "" });
    setMensagemCount(mensagemCount + 1);
    // Se não houver um ID de edição definido, retorna cedo.
    if (editId === null) return;

    try {
      // Realiza uma requisição PUT para a API para atualizar a categoria.
      const response = await fetch(
        `http://localhost:3333/api/categories/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nome: editNome }),
        }
      );
      // Se a resposta não for bem-sucedida, lança um erro.
      if (!response.ok) {
        throw new Error("Problema ao atualizar a categoria");
      }
      // Atualiza o estado das categorias com as informações da categoria editada.
      setCategorias((prevCategorias) => {
        const updatedCategorias = prevCategorias.map((categoria) =>
          categoria.id === editId ? { ...categoria, nome: editNome } : categoria
        );
        // Ordena as categorias atualizadas pelo ID.
        updatedCategorias.sort((a, b) => a.id - b.id);
        return updatedCategorias;
      });
      // Reseta o ID e o nome de edição e define uma mensagem de sucesso.
      setEditId(null);
      setEditNome("");
      setMensagem({
        sucesso: true,
        texto: "Categoria atualizada com sucesso.",
      });
    } catch (error) {
      // Em caso de erro, registra no console e define uma mensagem de erro.
      console.error("Erro ao atualizar a categoria:", error);
      setMensagem({
        sucesso: false,
        texto: "Erro ao atualizar a categoria. Por favor, tente novamente.",
      });
    }
  };
  // Função para cancelar a edição de uma categoria.
  const handleCancelEdit = () => {
    // Reseta o ID e o nome de edição.
    setEditId(null);
    setEditNome("");
  };
  // Função para lidar com a mudança no campo de entrada durante a edição.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Atualiza o nome de edição com o valor atual do campo de entrada.
    setEditNome(e.target.value);
  };
  // Função para lidar com o evento de desfocar o campo de entrada.
  const handleBlur = () => {
    // Chama a função para salvar a edição quando o campo de entrada perde o foc
    handleSaveEdit();
  };
  // Função para lidar com eventos de teclado no campo de entrada. se a tecla for enter chama a funçao de salvar se for a tecla esc ele sai
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };
  // Função assíncrona para lidar com o envio do formulário de criação de categoria.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Impede o comportamento padrão do formulário.
    e.preventDefault();

    setMensagem({ sucesso: false, texto: "" });
    setMensagemCount(mensagemCount + 1);

    try {
      // Obtém o valor do campo nome do formulário.
      const nome = e.currentTarget.nome.value;
      // Verifica se o campo nome está vazio e define uma mensagem de erro se estiver.
      if (!nome) {
        setMensagem({
          sucesso: false,
          texto: "O campo nome da categoria é obrigatório.",
        });
        return;
      }
      // Realiza uma requisição POST para a API para criar uma nova categoria.
      const response = await fetch("http://localhost:3333/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome }),
      });
      // Se a resposta não for bem-sucedida, lança um erro.
      if (!response.ok) {
        throw new Error("Problema ao criar a categoria");
      }
      // Adiciona a nova categoria ao estado e define uma mensagem de sucesso.
      const novaCategoria: Categoria = await response.json();
      setCategorias((prevCategorias) => [...prevCategorias, novaCategoria]);
      setMensagem({ sucesso: true, texto: "Categoria criada com sucesso." });
      // Reseta o campo de entrada do formulário.
      setNomeCategoria("");
    } catch (error) {
      console.error("Erro ao criar a categoria:", error);
      setMensagem({
        // Em caso de erro, registra no console e define uma mensagem de erro.
        sucesso: false,
        texto: "Erro ao criar a categoria. Por favor, tente novamente.",
      });
    }
  };
  //renderizaçao do componente Novacategoria que vai exibir todo o crud de categoria
  return (
    //uso o baselayout e o navbar componentes base para minhas paginas
    <BaseLayout>
      <Navbar />
      {/* Divisão para o cabeçalho da página de categorias. */}
      <div className="row-span-1 col-span-3 flex justify-between items-center py-8">
        <h1 className="text-2xl font-semibold">
          Essa é a Página de Categorias
        </h1>
      </div>
      {/*Divisão para a lista de categorias com estilos de layout, fundo, bordas e sombra. */}
      <div className="row-span-2 col-span-3 md:col-span-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md max-h-[40vh] overflow-y-auto">
        <div className="flex justify-between mx-6 mb-4 border-b pb-2">
          <p className="font-semibold">ID</p>
          <p className="font-semibold">Categoria</p>
          <p className="font-semibold">Ações</p>
        </div>
        {/*Mapeamento do array de categorias para renderizar cada categoria usando o componente CategoriaItem.*/}
        {categorias.map((categoria) => (
          <CategoriaItem
            key={categoria.id}
            categoria={categoria}
            editId={editId}
            editNome={editNome}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            handleKeyDown={handleKeyDown}
          />
        ))}
      </div>
      {/*Componente CategoriaForm para adicionar novas categorias. */}
      <CategoriaForm
        handleSubmit={handleSubmit}
        mensagem={mensagem}
        mensagemCount={mensagemCount}
        setNomeCategoria={setNomeCategoria}
        nomeCategoria={nomeCategoria}
      />
    </BaseLayout>
  );
}

export default NovaCategoria;
