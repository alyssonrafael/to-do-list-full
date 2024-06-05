import Navbar from "../layouts/Navbar";
import CalendarioDia from "../components/Calendario/CalendarioDias";

function Calendario() {
  return (
    // o Base layout nao foi utilizado pois em telas pequenas o componente calendarioDia estava com um bug que nao permitia ele se ajustar a
    //telas pequenas como solução basicamente repliquei o Baselayout para telas grandes e ajustei o layout para telas pequenas
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-950 dark:text-white pt-10 lg:pt-24">
      <main className="mx-auto max-w-screen-2xl">
        <div
          className="
        flex-col mx-6
        lg:grid lg:grid-cols-4 lg:rows-3 lg:max-h-screen lg:overflow-hidden
        "
        >
          {/* Componente de navegação */}
          <nav className="lg:row-span-3 lg:col-span-1">
            <Navbar />
          </nav>
          {/* Título */}
          <header className=" font-semibold mb-4 pt-6 lg:row-span-1 lg:col-span-3 ">
            <h1 className="text-xl md:text-3xl">Essas são suas tarefas distribuídas nos meses.</h1>
            <small className="text-base md:text-lg">Clique nas atividades para mais detalhes </small>
          </header>
          {/* Componente de calendário */}
          <section className="lg:row-span-2 lg:col-span-3">
            <CalendarioDia />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Calendario;
