import React, { ChangeEvent } from 'react';
type Option = {
  label: string;
  value: string;
};
// Define os tipos das propriedades esperadas pelo componente
type InputProps = {
  type: string;
  placeholder: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // Função para lidar com mudanças no input
  name: string;
  options?: Option[]; // Use o novo tipo Option[]
};
// Componente Input
const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, name, options }) => {
  // Estilos comuns para todos os inputs
  const commonStyles = "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-400 focus:ring focus:ring-green-400 focus:ring-opacity-50 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-600";
  // Se o tipo for 'select' e houver opções, renderiza um campo de seleção
  if (type === 'select' && options) {
    return (
      <select
        className={commonStyles}
        value={value}
        onChange={onChange}
        name={name}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
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
