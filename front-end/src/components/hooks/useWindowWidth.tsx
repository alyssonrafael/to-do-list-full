import { useState, useEffect } from "react";

// Função customizada para obter a largura da janela
function useWindowWidth() {
  // Estado para armazenar a largura da janela
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Efeito para atualizar a largura da janela quando ela é redimensionada
  useEffect(() => {
    // Função para lidar com o redimensionamento da janela
    const handleResize = () => {
      // Atualiza o estado com a largura atual da janela
      setWindowWidth(window.innerWidth);
    };

    // Adiciona um ouvinte de evento para o redimensionamento da janela
    window.addEventListener("resize", handleResize);

    // Remove o ouvinte de evento quando o componente é desmontado
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Array vazio indica que este efeito é executado apenas uma vez, após a montagem do componente

  // Retorna a largura atual da janela
  return windowWidth;
}

export default useWindowWidth;
