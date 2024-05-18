import React, { useEffect, useState } from "react";
// Define os tipos das propriedades esperadas pelo componente
type MensagemCardProps = {
  sucesso: boolean; // Indica se a mensagem é de sucesso ou erro
  mensagem: string; // O texto da mensagem a ser exibida
};
// Componente MensagemCard
const MensagemCard: React.FC<MensagemCardProps> = ({ sucesso, mensagem }) => {
  // Estado para controlar a visibilidade do componente
  const [isVisible, setIsVisible] = useState(false);
  // Efeito para controlar a exibição da mensagem
  useEffect(() => {
    // Verifica se há uma mensagem para exibir
    if (mensagem) {
      // Se houver uma mensagem, define isVisible como true para exibir o componente
      setIsVisible(true);
      // Configura um temporizador para ocultar o componente após 5 segundos
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      // Limpa o temporizador quando o componente é desmontado ou quando a propriedade mensagem muda
      return () => clearTimeout(timeout);
    }
  }, [mensagem]); // O useEffect depende da propriedade mensagem para realizar o monitoramento
  // Renderiza o componente com base no sucesso e na visibilidade
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 p-4 rounded-md ${
        sucesso ? "bg-green-500" : "bg-red-500" //se for sucesso verde se nao vermelho
      } ${isVisible ? "block" : "hidden"}`}
    >
        {/* mesagem a ser exibida */}
      <p className="text-white">{mensagem}</p> 
    </div>
  );
};

export default MensagemCard;
