// Define a interface para as propriedades do componente
interface CoresProps {
    color: string;
    label: string;
  }
// Componente funcional para exibir dos quadrados das cores do projeto 
const Cores: React.FC<CoresProps> = ({ color, label }) => {
    return (
      <div className={`relative w-24 h-24 ${color} flex justify-center items-center rounded-br-xl rounded-tl-xl rounded-tr-sm rounded-bl-sm duration-200 hover:scale-125`}>
        <p className="text-white">{label}</p>
      </div>
    );
  }
  
  export default Cores;