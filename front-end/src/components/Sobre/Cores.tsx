// Define a interface para as propriedades do componente
interface CoresProps {
    color: string;
    label: string;
  }
// Componente funcional para exibir dos quadrados das cores do projeto 
const Cores: React.FC<CoresProps> = ({ color, label }) => {
    return (
      <div className={`relative w-24 h-24 ${color}/60 flex justify-center items-center rounded-br-xl rounded-tl-xl rounded-tr-sm rounded-bl-sm transition duration-300 ease-in-out hover:${color}`}>
        <p className="text-white">{label}</p>
      </div>
    );
  }
  
  export default Cores;