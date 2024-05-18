import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="col-span-1 row-span-3 flex flex-col items-center">
      <h1 className="text-3xl font-bold underline text-center pb-10">
        To-Do-List
      </h1>
      <ul className="text-center space-y-7 text-lg font-semibold hover:">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "underline text-green-500 text-2xl" : "no-underline"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tarefa-do-dia"
            className={({ isActive }) =>
              isActive ? "underline text-green-500 text-2xl" : "no-underline"
            }
          >
            Tarefa do dia
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/nova-tarefa"
            className={({ isActive }) =>
              isActive ? "underline text-green-500 text-2xl " : "no-underline"
            }
          >
            Nova tarefa
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/todas-as-tarefas"
            className={({ isActive }) =>
              isActive ? "underline text-green-500 text-2xl" : "no-underline"
            }
          >
            Todas as Tarefas
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sobre-o-projeto"
            className={({ isActive }) =>
              isActive ? "underline text-green-500 text-2xl" : "no-underline"
            }
          >
            Sobre o projeto
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
