// Contato.tsx
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Contato() {
  return (
    <>
      {/* Título da seção */}
      <h1 className="text-xl font-semibold mb-4 text-center">
        Gostou do meu projeto?
      </h1>
      <div className="grid grid-cols-2">
        <div>
          {/* Parágrafo de agradecimento e crescimento */}
          <p>
            Agradeço por esta jornada de aprendizado no meu projeto individual.
            Cada desafio superado contribuiu para o meu crescimento como
            desenvolvedor. Estou animado com as possibilidades futuras e aberto
            a novas oportunidades e desafios.
          </p>
          <br />
          <p className="mb-2">Conecte-se comigo:</p>
          {/* Lista de opções de contato */}
          <ul className="space-y-2">
            <li className="block">
              <a
                href="https://www.linkedin.com/in/alysson-rafael-485540290/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2"
              >
                <FaLinkedin className="text-blue-600" />
                <span>LinkedIn</span>
              </a>
            </li>
            <li className="block">
              <a
                href="https://github.com/alyssonrafael"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2"
              >
                <FaGithub className="text-gray-800" />
                <span>GitHub</span>
              </a>
            </li>
            <li className="block">
              <a
                href="mailto:alyssonrafaelf@outlook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2"
              >
                <MdEmail className="text-gray-800" />
                <span>E-mail</span>
              </a>
            </li>
          </ul>
        </div>
        {/* Imagem */}
        <img
          src="../../../public/undraw_completed_tasks_vs6q.svg"
          alt="unDrawimage"
          className=" w-44 h-44 m-auto"
        />
      </div>
      {/* Rodapé */}
      <footer className=" text-center">
        <p>&copy; 2024 Alysson Rafael. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}

export default Contato;
