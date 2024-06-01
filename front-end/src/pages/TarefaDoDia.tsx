import { useState } from "react";
import BaseLayout from "../layouts/BaseLayout";
import Navbar from "../layouts/Navbar";
import Filter from "../components/Filter";
import Search from "../components/Search";
import TabelaDeTarefas from "../components/TabelaDeTarefass";

// data atual no formato "YYYY-MM-DD"
const hoje = new Date();
// Zera o horário no fuso horário local para ficar no padrao do banco de dados
hoje.setHours(-3, 0, 0, 0);
// Cria uma string no formato ISO com o horário zerado em UTC para ficar no padrao do banco de dados
const dataAtualISO = hoje.toISOString();
// Divide a data ISO em partes (ano, mês e dia) para formatar a data para ser apresentada no formato br
const partesDaData = dataAtualISO.split('T')[0].split('-');
const ano = partesDaData[0];
const mes = partesDaData[1];
const dia = partesDaData[2];
// Formata a data para o formato "DD/MM/YYYY"
const dataPadronizada = `${dia}/${mes}/${ano}`
  
// Componente funcional TarefaDoDia
const TarefaDoDia: React.FC = () => {
  // Estado para armazenar a categoria selecionada
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
 // Estado para armazenar o texto de busca
  const [searchText, setSearchText] = useState<string>("");
// Função para lidar com a mudança de categoria
  const handleCategoriaChange = (categoriaId: number | null) => {
    setCategoriaSelecionada(categoriaId);
  };
// Função para lidar com a mudança no texto de busca
  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };
  return (
    <BaseLayout>
      <Navbar />
      {/* Cabeçalho com título e data atual */}
      <div className="row-span-1 col-span-3 flex py-12 flex-col  lg:block">
        <h1 className="text-2xl font-medium">
          Tarefas do dia
          {/* Exibe a data atual formatada */}
          <small className="block font-normal">
            Hoje é dia:
            <p className="inline text-sm text-green-600"> {dataPadronizada}</p>
          </small>
        </h1>
         {/* Componentes de filtro e busca */}
        <div className="flex items-center space-x-4 text-lg mr-4">
          <Filter onCategoriaChange={handleCategoriaChange} />
          <Search onSearchTextChange={handleSearchTextChange} />
        </div>
      </div>
      {/* Componente TabelaDeTarefas com as props necessárias diferente da home o data atual para pegar apenas as tarefas do dia */}
      <TabelaDeTarefas
        categoriaSelecionada={categoriaSelecionada}
        searchText={searchText}
        dataAtual={dataAtualISO}
      />
    </BaseLayout>
  );
};

export default TarefaDoDia;
