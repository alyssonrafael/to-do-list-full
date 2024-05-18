import React, { ChangeEvent } from 'react';
// Define os tipos das propriedades esperadas pelo componente
type InputProps = {
  type: string;
  placeholder: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // Função para lidar com mudanças no input
  name: string;
  options?: string[]; // Array de opções para o campo de seleção (opcional)
};

// Componente Input
const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, name, options }) => {
  // Estilos comuns para todos os inputs
  const commonStyles = "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-400 focus:ring focus:ring-green-400 focus:ring-opacity-50";
// Se o tipo for 'select' e houver opções, renderiza um campo de seleção
  if (type === 'select' && options) {
    return (
      <select
        className={commonStyles}
        value={value}
        onChange={onChange}
        name={name}
      >
        {/* Opção padrão com o placeholder */}
        <option value="">{placeholder}</option>
        {/* Mapeia as opções e cria uma option para cada uma */}
        {options.map((option, index) => (
          <option key={index} value={index}>{option}</option>
        ))}
      </select>
    );
  }
  // Se não for um campo de seleção, renderiza um campo de input padrão
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className={commonStyles}
    />
  );
};

export default Input;
