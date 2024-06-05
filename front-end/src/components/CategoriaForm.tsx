// Importação do componente MensagemCard, que é usado para mostrar mensagens de feedback.
import MensagemCard from "./Message";

// Definição da interface de propriedades que o componente CategoriaForm espera receber.
interface CategoriaFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // Função para lidar com o envio do formulário.
  mensagem: { sucesso: boolean; texto: string }; // Objeto para armazenar mensagens de sucesso ou erro.
  mensagemCount: number; // Contador para mensagens, usado como chave para forçar a atualização do componente MensagemCard.
  setNomeCategoria: React.Dispatch<React.SetStateAction<string>>; // Função para atualizar o estado do nome da categoria.
  nomeCategoria: string; // Valor atual do nome da categoria.
}

// O componente funcional CategoriaForm, que utiliza as propriedades definidas acima.
const CategoriaForm: React.FC<CategoriaFormProps> = ({
  handleSubmit,
  mensagem,
  mensagemCount,
  setNomeCategoria,
  nomeCategoria,
}) => {
  // Renderização do componente.
  return (
    // Container principal do formulário com estilização para layout e sombra.
    <div className="row-span-2 col-span-3 md:col-span-1 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* Título do formulário. */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Criar Nova Categoria</h2>
      {/* Formulário com evento de envio ligado à função handleSubmit. */}
      <form onSubmit={handleSubmit} className="space-y-4 pb-4">
        {/* Campo de entrada para o nome da categoria. */}
        <div>
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {/* Nome da Categoria */}
          </label>
          <input
            type="text"
            placeholder="Nome da nova categoria"
            id="nome"
            name="nome"
            value={nomeCategoria}
            onChange={(e) => setNomeCategoria(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
          />
        </div>
        {/* Botão para submeter o formulário. */}
        <div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Criar
          </button>
        </div>
      </form>
      {/* Condicional para exibir o componente MensagemCard se houver uma mensagem para mostrar. */}
      {mensagem.texto && (
        <MensagemCard
          sucesso={mensagem.sucesso}
          mensagem={mensagem.texto}
          key={mensagemCount}
        />
      )}
    </div>
  );
};

// Exportação do componente para ser utilizado em outros lugares
export default CategoriaForm;
