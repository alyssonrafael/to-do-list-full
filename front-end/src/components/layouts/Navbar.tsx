import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import ThemeToggleSwitch from './TonggleTheme';

function Navbar() {
  // Estado para controlar a abertura e fechamento do menu
  const [menuOpen, setMenuOpen] = useState(false);
  // Obtém a localização atual da rota
  const location = useLocation();

 // Mapeia os nomes das páginas para as rotas correspondentes para poder ser exibido o nome em telas pequenas
  const pageNames: { [key: string]: string } = {
    '/': 'Home',
    '/nova-tarefa': 'Nova tarefa',
    '/nova-categoria': 'Categorias',
    '/tarefa-do-dia': 'Tarefa do dia',
    '/todas-as-tarefas': 'Todas as Tarefas',
    '/calendario': 'Calendario',
    '/sobre-o-projeto': 'Sobre o projeto',
  };

  // Obtém o nome da página atual ou define como 'Home' se não corresponder a nenhuma rota
  const currentPage = pageNames[location.pathname] || 'Home';

  // Função para lidar com o clique nos links de navegação
  const handleNavLinkClick = () => {
    // Fecha o menu ao clicar em um link
    setMenuOpen(false);
  };

  return (
    <div
      className="
        col-span-3 row-span-1
        lg:col-span-1 lg:row-span-3 lg:flex lg:flex-col lg:items-center
      "
    >
      <div className="flex items-center justify-between w-full lg:flex-col lg:items-center lg:justify-center">
        <div>
          <h1 className="text-3xl font-bold underline text-center lg:pb-10 pt-5 lg:pt-0">
            To-Do-List
          </h1>
          {/* Exibe o nome da página atual so em telas medias e pequenas */}
          <p className="text-green-500 text-base font-normal mr-4 lg:hidden">
            {currentPage}
          </p>
        </div>
         {/* Botão para abrir ou fechar o menu em telas pequenas */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none pointer-events-auto"
            >
            <FaBars size={24} />
          </button>
        </div>
      </div>
      {/* Lista de links de navegação */}
      <ul
        className={`
        absolute top-20 right-0 py-2 px-4 bg-white dark:bg-gray-900 dark:border dark:lg:border-none rounded-lg shadow-lg mr-3 mt-4
        text-center space-y-7 text-2xl font-semibold z-50
        transform transition-transform duration-300 ease-in-out
        ${menuOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-0 opacity-0 pointer-events-none'}
        lg:static lg:bg-transparent lg:shadow-none lg:py-0 lg:mt-0 lg:space-y-7 lg:block lg:transform-none lg:opacity-100 lg:pointer-events-auto
        `}
        >
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'underline text-green-500 md:text-3xl text-xl'
                : 'no-underline'
            }
            onClick={handleNavLinkClick} // Fecha o menu ao clicar em um link
            >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/nova-tarefa"
            className={({ isActive }) =>
              isActive
            ? 'underline text-green-500 md:text-3xl text-xl'
                : 'no-underline'
            }
            onClick={handleNavLinkClick}
            >
            Nova tarefa
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/nova-categoria"
            className={({ isActive }) =>
              isActive
                ? 'underline text-green-500 md:text-3xl text-xl'
                : 'no-underline'
            }
            onClick={handleNavLinkClick}
            >
            Categorias
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tarefa-do-dia"
            className={({ isActive }) =>
              isActive
            ? 'underline text-green-500 md:text-3xl text-xl'
            : 'no-underline'
            }
            onClick={handleNavLinkClick}
            >
            Tarefa do dia
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/todas-as-tarefas"
            className={({ isActive }) =>
              isActive
            ? 'underline text-green-500 md:text-2xl text-xl'
            : 'no-underline'
          }
          onClick={handleNavLinkClick}
          >
            Todas as Tarefas
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/calendario"
            className={({ isActive }) =>
              isActive
                ? 'underline text-green-500 md:text-3xl text-xl'
                : 'no-underline'
            }
            onClick={handleNavLinkClick}
          >
            Calendario
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sobre-o-projeto"
            className={({ isActive }) =>
              isActive
                ? 'underline text-green-500 md:text-2xl text-xl'
                : 'no-underline'
              }
              onClick={handleNavLinkClick}
              >
            Sobre o projeto
          </NavLink>
        </li>
        <li>
        <ThemeToggleSwitch/>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
