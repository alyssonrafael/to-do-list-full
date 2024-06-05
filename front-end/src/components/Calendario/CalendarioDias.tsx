import { useState, useEffect, FunctionComponent, ReactNode } from "react";
import { useCategorias, useTarefas } from "../hooks/useData";
import { Calendar, dateFnsLocalizer, ToolbarProps } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addDays } from "date-fns";
import moment from 'moment';
import DayModal from "./DayModal";
import ptBR from "date-fns/locale/pt-BR";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendario.css"; // Importando o arquivo CSS personalizado

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
  noEventsInRange: "Não há eventos neste intervalo.",
  showMore: (total: number) => `+${total}`,
};

// Componente personalizado para a barra de ferramentas (botões de navegação)
const CustomToolbar: FunctionComponent<ToolbarProps> = ({ label, onNavigate }) => {
  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button onClick={() => onNavigate('TODAY')}>Hoje</button>
        <button onClick={() => onNavigate('PREV')}>Anterior</button>
        <button onClick={() => onNavigate('NEXT')}>Próximo</button>
      </span>
      <span className="rbc-toolbar-label">{label}</span>
    </div>
  );
};

const CalendarioDia: FunctionComponent = () => {
  const [dayModalIsOpen, setDayModalIsOpen] = useState<boolean>(false); // Estado do modal de dia
  const [selectedDayTarefas, setSelectedDayTarefas] = useState<Tarefa[]>([]); // Tarefas do dia selecionado
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Estado do modo (claro/escuro)

  useEffect(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }
  }, []);

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

  // Propriedades do dia no calendário
  const dayPropGetter = (date: Date) => {
    const isToday = moment(date).isSame(new Date(), 'day');
    return {
      style: {
        backgroundColor: isToday ? (isDarkMode ? '#444444' : '#ffeb3b') : 'transparent',
        color: isToday ? (isDarkMode ? '#ffffff' : '#000000') : 'inherit',
      },
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
      <div className={`calendar ${isDarkMode ? "dark-mode" : "light-mode"}`}>
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
            toolbar: CustomToolbar,
          }}
          views={["month"]}
          messages={messages}
          popup
          dayPropGetter={dayPropGetter}
          className="dark:bg-gray-900"
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