// components/TechItem.tsx
import React from "react";

// Define a interface para as propriedades do componente
interface TechItemProps {
  icon: React.ReactElement; //recebe um icone que sera exibido
  name: string; //nome da tecnologia
  className?: string; //classe para estilizaçao opcional
}

// Componente funcional para exibir um item de tecnologia
const TechItem: React.FC<TechItemProps> = ({ icon, name, className }) => {
  return (
    // o techitem vem do css
    <li className={`tech-item ${className}`}>
      {icon}{/* Renderiza o ícone */}
      <span className="ml-2">{name}</span> {/* Exibe o nome da tecnologia */}
    </li>
  );
};

export default TechItem;
