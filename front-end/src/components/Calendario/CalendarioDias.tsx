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
// traduções para a barra de navegação do calendario
const messages = {
  previous: "Anterior",
  next: "Próximo",
  today: "Hoje",
  date: "Data",
};

const CalendarioDia: FunctionComponent = () => {
  const [dayModalIsOpen, setDayModalIsOpen] = useState<boolean>(false); // Estado do modal de dia
  const [selectedDayTarefas, setSelectedDayTarefas] = useState<Tarefa[]>([]); // Tarefas do dia selecionado

  const categorias = useCategorias(); // Busca categorias usando o hook personalizado
  const tarefas = useTarefas(); // Busca tarefas usando o hook personalizado

  // Função para abrir o modal de dia com as tarefas do dia selecionado
  const openDayModal = (date: Date) => {
    const tarefasDoDia = tarefas.filter(
      (tarefa) => tarefa.dia.toDateString() === date.toDateString()
    );
    setSelectedDayTarefas(tarefasDoDia);
    setDayModalIsOpen(true);
  };
  // Função para fechar o modal de dia
  const closeDayModal = () => {
    setDayModalIsOpen(false);
    setSelectedDayTarefas([]);
  };
  // Propriedades do evento no calendário
  const eventPropGetter = (event: Tarefa) => {
    const tarefasDoDia = tarefas.filter(
      (tarefa) => tarefa.dia.toDateString() === event.dia.toDateString()
    );
    if (tarefasDoDia.length > 1) {
      return {
        style: {
          backgroundColor: event.cor,
          cursor: "pointer",
          color: "#222222",
        },
        onClick: () => openDayModal(event.dia),
      };
    }
    return {
      style: {
        backgroundColor: event.cor,
        cursor: "pointer",
        color: "#222222",
      },
    };
  };
  // Componente personalizado para o evento no calendário
  const CustomEventWrapper: FunctionComponent<{
    event: Tarefa;
    children?: ReactNode;
  }> = ({ event, children }) => {
    const tarefasDoDia = tarefas.filter(
      (tarefa) => tarefa.dia.toDateString() === event.dia.toDateString()
    );
    const handleClick = () => {
      if (tarefasDoDia.length > 0) {
        openDayModal(event.dia);
      }
    };
    return (
      <div onClick={handleClick} style={{ cursor: "pointer" }}>
        {children}
      </div>
    );
  };
  //retorno da pagina do calendario
  return (
    <>
      <div className="col-span-3 row-span-3">
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