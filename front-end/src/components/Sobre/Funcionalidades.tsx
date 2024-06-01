import { FaPlus, FaEdit, FaTrash, FaCalendar } from "react-icons/fa";
import { BiFilterAlt } from "react-icons/bi";
import { MdToday } from "react-icons/md";
import { Link } from "react-router-dom";

function Funcionalidades() {
  return (
    <section className="my-6">
      {/* Título da seção */}
      <h2 className="text-xl font-semibold my-4 text-center">
        Funcionalidades da Lista de Tarefas
      </h2>
      {/* Lista de funcionalidades cada elemento da lista tem seu icone e leva para a pagina corespondente a funcionalidade */}
      <ul className=" ml-6 mt-3 space-y-1 text-base font-medium lg:text-lg">
        <li className="block">
          <Link
            to="/nova-tarefa"
            className="inline-flex items-center lg:transition-transform lg:hover:translate-x-2 lg:hover:underline"
          >
            <FaPlus className="mr-2 text-green-400" /> Adicionar tarefas
          </Link>
        </li>
        <li className="block">
          <Link
            to="/"
            className="inline-flex items-center lg:transition-transform lg:hover:translate-x-2 lg:hover:underline"
          >
            <FaEdit className="mr-2 text-yellow-400" /> Marcar tarefas como Em
            Progresso
          </Link>
        </li>
        <li className="block">
          <Link
            to="/"
            className="inline-flex items-center lg:transition-transform lg:hover:translate-x-2 lg:hover:underline"
          >
            <FaEdit className="mr-2 text-yellow-400" /> Marcar tarefas como
            Concluídas
          </Link>
        </li>
        <li className="block">
          <Link
            to="/todas-as-tarefas"
            className="inline-flex items-center lg:transition-transform lg:hover:translate-x-2 lg:hover:underline"
          >
            <FaTrash className="mr-2 text-red-400" /> Excluir tarefas
          </Link>
        </li>
        <li className="block">
          <Link
            to="/nova-categoria"
            className="inline-flex items-center lg:transition-transform lg:hover:translate-x-2 lg:hover:underline"
          >
            <FaPlus className="mr-2 text-green-400" /> Adicionar categoria
          </Link>
        </li>
        <li className="block">
          <Link
            to="/nova-categoria"
            className="inline-flex items-center lg:transition-transform lg:hover:translate-x-2 lg:hover:underline"
          >
            <FaEdit className="mr-2 text-yellow-400" /> Editar categoria
          </Link>
        </li>
        <li className="block">
          <Link
            to="/nova-categoria"
            className="inline-flex items-center lg:transition-transform lg:hover:translate-x-2 lg:hover:underline"
          >
            <FaTrash className="mr-2 text-red-400" /> Excluir categoria
          </Link>
        </li>
        <li className="block">
          <Link
            to="/"
            className="inline-flex items-center lg:transition-transform lg:hover:translate-x-2 lg:hover:underline"
          >
            <BiFilterAlt className="mr-2 text-blue-400" /> Filtrar tarefas por
            nome ou categoria
          </Link>
        </li>
        <li className="block">
          <Link
            to="/calendario"
            className="inline-flex items-center lg:transition-transform lg:hover:translate-x-2 lg:hover:underline"
          >
            <FaCalendar className="mr-2 text-blue-400" /> Visualizar tarefas no
            calendário
          </Link>
        </li>
        <li className="block">
          <Link
            to="/tarefa-do-dia"
            className="inline-flex items-center lg:transition-transform lg:hover:translate-x-2 lg:hover:underline"
          >
            <MdToday className="mr-2 text-blue-400" /> Visualizar tarefas do dia
            atual
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Funcionalidades;
