import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggleSwitch: React.FC = () => {
  // State para controlar se o modo escuro está ativado ou não
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Verifica se há um tema salvo no localStorage, se não houver, usa o modo claro por padrão
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Efeito para atualizar o tema na mudança de isDarkMode
  useEffect(() => {
    // Obtém a referência ao elemento html
    const html = document.documentElement;
    // Adiciona ou remove a classe 'dark' do elemento html com base no estado do modo escuro
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    // Salva o estado atual do modo escuro no localStorage
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Função para lidar com o clique no botão de alternar tema
  const handleClick = () => {
    // Inverte o estado atual do modo escuro
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="mt-5">
      {/* Componente de comutação do tema */}
      <label className="relative inline-flex cursor-pointer items-center">
        {/* Input checkbox para alternar entre os modos */}
        <input
          type="checkbox"
          className="peer sr-only"
          checked={isDarkMode}
          onChange={handleClick}
        />
        {/* Componente visual para exibir o botão de alternância do tema */}
        <div className="flex h-10 w-48 text-3xl items-center justify-between lg:bg-white bg-gray-200 dark:bg-slate-800 rounded-full px-2 transition-all">
          <FaSun className="pr-2" /> {/* Ícone do sol */}
          <FaMoon className="pl-2" /> {/* Ícone da lua */}
        </div>
        {/* Componente visual para exibir a animação de transição */}
        <div
          className={`absolute left-0 h-6 w-6 bg-green-500 rounded-full transform transition-all block ${
            isDarkMode ? 'translate-x-32' : 'translate-x-10'
          }`}
        ></div>
      </label>
    </div>
  );
};

export default ThemeToggleSwitch;
