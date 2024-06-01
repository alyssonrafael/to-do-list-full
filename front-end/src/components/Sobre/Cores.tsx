// Define a interface para as propriedades do componente
interface CoresProps {
  color: string;
  label: string;
}
// Componente funcional para exibir dos quadrados das cores do projeto
const Cores: React.FC<CoresProps> = ({ color, label }) => {
  return (
    // responsividade da caixa de cores
    <div
      className={`
    relative w-24 h-24 m-2 ${color} flex justify-center items-center
    rounded-br-xl rounded-tl-xl rounded-tr-sm rounded-bl-sm
    md:w-38 md:h-38
    lg:hover:scale-125 lg:duration-500 `}
    >
      <p className="text-white">{label}</p>
    </div>
  );
};

export default Cores;