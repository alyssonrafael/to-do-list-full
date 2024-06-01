import { useState, FunctionComponent, ReactNode } from "react";
import { useCategorias, useTarefas } from "../hooks/useData";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addDays } from "date-fns";
import DayModal from "./DayModal";
import ptBR from "date-fns/locale/pt-BR";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Definição dos tipos para as tarefas e categorias
interface Tarefa {
  id: number;
  descricao: string;
  categoriaId: number;
  dia: Date;
  start: Date;
  end: Date;
  cor?: string;
}
// Configuração do localizador de datas para o calendário
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    "pt-BR": ptBR,
  },
});
// Traduções para a barra de navegação do calendário
const messages = {
  previous: "Anterior",
  next: "Próximo",
  today: "Hoje",
  date: "Data",
  // adicionando nova forma de apresentar +quantidade de tarefas
  noEventsInRange: "Não há eventos neste intervalo.",
  showMore: (total: number) => `+${total}`,
};

const CalendarioDia: FunctionComponent = () => {
  const [dayModalIsOpen, setDayModalIsOpen] = useState<boolean>(false); // Estado do modal de dia
  const [selectedDayTarefas, setSelectedDayTarefas] = useState<Tarefa[]>([]); // Tarefas do dia selecionado

  const categorias = useCategorias(); // Busca categorias usando o hook personalizado
  const tarefas = useTarefas(); // Busca tarefas usando o hook personalizado

// Função para abrir o modal de dia com as tarefas do dia selecionado
const openDayModal = (date: Date) => {
  // Filtra as tarefas para encontrar aquelas cuja data corresponde à data selecionada
  const tarefasDoDia = tarefas.filter(
    (tarefa) => tarefa.dia.toDateString() === date.toDateString()
  );
  // Atualiza o estado selectedDayTarefas com as tarefas filtradas
  setSelectedDayTarefas(tarefasDoDia);
  // Define o estado dayModalIsOpen como true para exibir o modal
  setDayModalIsOpen(true);
};

// Função para fechar o modal de dia
const closeDayModal = () => {
  // Define o estado dayModalIsOpen como false para ocultar o modal
  setDayModalIsOpen(false);
  // Limpa o estado selectedDayTarefas
  setSelectedDayTarefas([]);
};

// Propriedades do evento no calendário
const eventPropGetter = (event: Tarefa) => {
  return {
    style: {
      backgroundColor: "#22C55E", // Fundo verde para o evento
      cursor: "pointer", // Cursor do mouse como ponteiro
      color: "#222222", // Cor do texto
    },
    onClick: () => openDayModal(event.dia), // Ao clicar, abre o modal com as tarefas do dia
  };
};

// Componente personalizado para o evento no calendário
const CustomEventWrapper: FunctionComponent<{
  event: Tarefa;
  children?: ReactNode;
}> = ({ event, children }) => {
  const handleClick = () => {
    openDayModal(event.dia); // Ao clicar, abre o modal com as tarefas do dia
  };
  // Renderiza diferentes elementos com base no tamanho da tela
  return (
    <div
      onClick={handleClick}
      className="mx-2 flex justify-center md:block md:justify-normal"
    >
      <span className="hidden md:block">{children}</span>
      <span className="block md:hidden rounded-full w-4 h-4 bg-green-400"></span>
    </div>
  );
};

  // Renderização do calendario
  return (
    <>
      <div>
        <Calendar
          localizer={localizer}
          events={tarefas.map((tarefa) => ({
            ...tarefa,
            title: tarefa.descricao,
            start: addDays(tarefa.dia, 1),
            end: addDays(tarefa.dia, 1),
          }))}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={eventPropGetter}
          components={{
            eventWrapper: CustomEventWrapper,
          }}
          views={["month"]}
          messages={messages}
          popup
        />
      </div>

      <DayModal
        isOpen={dayModalIsOpen}
        tarefas={selectedDayTarefas}
        categorias={categorias}
        onClose={closeDayModal}
      />
    </>
  );
};

export default CalendarioDia;