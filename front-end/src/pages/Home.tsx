import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import Navbar from "../layouts/Navbar";
import TabelaDeTarefas from "../components/TabelaDeTarefass";
// Componente funcional Home, representando a página inicial
const Home: React.FC = () => {
  return (
    // Usa o layout base para a estrutura da página
    <BaseLayout>
      {/* // Usa a navbar base para a estrutura da página */}
      <Navbar />
      <div className=" row-span-1 col-span-3 flex justify-between items-end py-12">
        <h1 className="text-2xl font-medium">Essa é sua To-do-List</h1>
        {/* componente da tabela de tarefas */}
      </div>
      <TabelaDeTarefas />
    </BaseLayout>
  );
};

export default Home;
