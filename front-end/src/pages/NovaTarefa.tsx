import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Input from "../components/Input"; //import do input para envio do formulario com a novas tarefa
import BaseLayout from "../layouts/BaseLayout"; //import do baselayout padrao de todas as paginas
import Navbar from "../layouts/Navbar"; // import do navbar padrao de todas as paginas
import MensagemCard from "../components/Message"; // Importe do componente da mensagem

//tipos da minha categooria que vou pegar do banco de dados para lista para bosibilitar o usuario associar a tarefa a categoria
type Categoria = {
  id: number;
  nome: string;
  createdAt: string;
  updatedAt: string;
};

//componente de nova tarefa
const NovaTarefa: React.FC = () => {
  //estado para armazzenar os dados do formulario
  const [formData, setFormData] = useState({
    descricao: "",
    data: "",
    categoria: "",
  });
  //estado para armazzenar as categorias que vieram do servidor
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  //estado para monitorar e controlar a mensagem para o usuario e tem duas propriedades o sucesso que e boleano e o texto que sera passsado
  const [mensagem, setMensagem] = useState({ sucesso: false, texto: "" });
  //esse estado força a atualizaçao da mensagem quando ouver interaçao com o botao
  const [mensagemCount, setMensagemCount] = useState(0);
  // Efeito para carregar as categorias ao montar o componente
  useEffect(() => {
    fetch("http://localhost:3333/api/categories")
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error("Erro ao buscar categorias:", error));
  }, []);
  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Redefina a mensagem
    setMensagem({ sucesso: false, texto: "" });
    // Incrementa o contador de mensagens forçando ela a aparecer
    setMensagemCount(mensagemCount + 1);

    try {
      // Verifique se algum campo está vazio
      if (!formData.descricao || !formData.data || !formData.categoria) {
        //se estiver e seta a mensagem vermelha para o usuario
        setMensagem({ sucesso: false, texto: "Preencha todos os campos." });
        return;
      }

      // Formata a data para ISO 8601 que e o padrao no banco de dados logo o formato tem que ir o mesmo para nao erro 400
      const dataFormatada = new Date(formData.data).toISOString();
      // Envia a requisição para criar a tarefa
      const response = await fetch("http://localhost:3333/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          descricao: formData.descricao, //descriçao da tarefa
          dia: dataFormatada, // Use a data formatada
          categoriaId: formData.categoria, //id da categoria para o banco de dados
          cor: "red", // Cor padrão que sera usada na borda do card para indicaar que nao foi iniciada
        }),
      });

      if (response.ok) {
        // Limpe os inputs após a submissão bem-sucedida
        setFormData({
          descricao: "",
          data: "",
          categoria: "",
        });
        //manda a mensagem de criaçao bem sucedida
        setMensagem({ sucesso: true, texto: "Tarefa criada com sucesso." });
        console.log("Tarefa criada com sucesso!");
      } else {
        setMensagem({
          sucesso: false,
          texto: "Falha ao criar tarefa. Por favor, tente novamente.",
        });
        console.error("Falha ao criar tarefa:", response.statusText);
      }
    } catch (error) {
      // Exibe mensagem de erro
      setMensagem({
        sucesso: false,
        texto: "Erro ao criar tarefa. Por favor, tente novamente.",
      });
      console.error("Erro ao criar tarefa:", error);
    }
  };
  // Função para lidar com mudanças nos inputs
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement> // Função para lidar com mudanças nos campos de entrada do formulário
  ) => {
    // Extrai o nome e o valor do campo do formulário que foi alterado
    const { name, value } = e.target;

    // Atualiza o estado 'formData' com os dados do formulário atualizados
    setFormData({
      ...formData, // Mantém os dados existentes do 'formData'
      [name]: name === "categoria" ? Number(value) : value, // Atualiza o valor do campo do formulário
      // Se o campo do formulário alterado for 'categoria', converte o valor para número antes de atribuir
    });
  };

  return (
    <BaseLayout>
      <Navbar />
      {/* titulo da pagina */}
      <div className="row-span-1 col-span-3 justify-between items-end py-8">
        <h1 className="text-2xl font-medium">Criar Nova Tarefa</h1>
      </div>
      {/*Inputs para descrição, data e categoria*/}
      <form onSubmit={handleSubmit} className="p-4 col-span-3 row-span-2">
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Digite sua Tarefa..."
            value={formData.descricao}
            onChange={handleInputChange}
            name="descricao"
          />
          <Input
            type="date"
            placeholder="Insira a data dessa tarefa..."
            value={formData.data}
            onChange={handleInputChange}
            name="data"
          />
          <Input
            type="select"
            placeholder="Selecione a categoria dessa tarefa"
            value={formData.categoria}
            onChange={handleInputChange}
            name="categoria"
            options={categorias.map((categoria) => ({
              label: categoria.nome,
              value: categoria.id.toString(),
            }))}
          />
          {/* Mensagem de sucesso ou erro */}
          <MensagemCard
            sucesso={mensagem.sucesso}
            mensagem={mensagem.texto}
            key={mensagemCount}
          />
          {/* botao para fazer a criaçao da tarefa*/}
          <button
            type="submit"
            className="mt-2 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
          >
            Criar nova Tarefa
          </button>
        </div>
      </form>
    </BaseLayout>
  );
};

export default NovaTarefa;
