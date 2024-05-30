import BaseLayout from "../layouts/BaseLayout";
import Navbar from "../layouts/Navbar";
import CalendarioDia from "../components/Calendario/CalendarioDias";
// Definição dos tipos para as tarefas e categorias
function Calendario ()  {
  //retorno da pagina do calendario
  return (
    <BaseLayout>
      <Navbar />
      <div className="row-span-1 col-span-3 flex justify-between items-center py-8">
        <h1 className="text-2xl font-semibold">
          Essas são suas tarefas distribuídas nos meses
        </h1>
      </div>
      {/* componente "principal" da pagina de calendario ele é bem complexo por isso preferi componentizar ele */}
     <CalendarioDia/> 
    </BaseLayout>
  );
}

export default Calendario;