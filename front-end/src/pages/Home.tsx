import React, { useState } from "react";
import BaseLayout from "../layouts/BaseLayout";
import Navbar from "../layouts/Navbar";
import TabelaDeTarefas from "../components/TabelaDeTarefass";
import Filter from "../components/Filter";
import Search from "../components/Search";

const Home: React.FC = () => {
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
      <Navbar />
      <div className="row-span-1 col-span-3 flex justify-between items-end py-12">
        <h1 className="text-2xl font-medium">Essa é sua To-do-List</h1>
        <div className="flex items-center space-x-4 text-lg mr-4">
          {/* Renderiza o componente Filter e passa a função de lidar com a mudança de categoria como prop */}
          <Filter onCategoriaChange={handleCategoriaChange} />
          <Search onSearchTextChange={handleSearchTextChange} />
        </div>
      </div>
      <TabelaDeTarefas categoriaSelecionada={categoriaSelecionada} searchText={searchText} />
    </BaseLayout>
  );
};

export default Home;
