import TabelaDeTodasAsTarefas from "../components/tabelas/TabelaDeTodasAsTarefas"
import BaseLayout from "../components/layouts/BaseLayout"
import Navbar from "../components/layouts/Navbar"
import Filter from "../components/utils/Filter";
import Search from "../components/utils/Search";
import  { useState } from "react";

//muito similar a agina de home porem os componentes sao diferentes

function TodasAsTarefas() {

  // Define o estado para armazenar a categoria selecionada
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
  //estado para armazenar o texto de busca
  const [searchText, setSearchText] = useState<string>("");
  // Função para lidar com a mudança de categoria
  const handleCategoriaChange = (categoriaId: number | null) => {
    setCategoriaSelecionada(categoriaId); // Atualiza o estado da categoria selecionada
  };
  //funçao para buscar
  const handleSearchTextChange  = (text: string) => {
    setSearchText(text);
  };


  return (
    <BaseLayout>
    <Navbar/>
    <div className="row-span-1 col-span-3 flex py-12 flex-col lg:flex-row lg:justify-between">
        <h1 className="text-2xl font-medium">Todas as suas tarefas estão aqui</h1>
        <div className="flex items-center space-x-4 text-lg mr-4">
          <Filter onCategoriaChange={handleCategoriaChange} />
          <Search onSearchTextChange={handleSearchTextChange} />
        </div>
    </div>
    <TabelaDeTodasAsTarefas categoriaSelecionada={categoriaSelecionada} searchText={searchText}/>
    </BaseLayout>
  )
}

export default TodasAsTarefas