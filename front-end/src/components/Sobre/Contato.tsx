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
      <div className="md:grid md:grid-cols-2">
        <div>
          {/* Parágrafo de agradecimento */}
          <p>
            Agradeço por esta jornada de aprendizado no meu projeto individual.
            Cada desafio superado contribuiu para o meu crescimento como
            desenvolvedor. Estou animado com as possibilidades futuras e aberto
            a novas oportunidades e desafios. 
          </p>
          <small>Entre em contato pelos links abaixo.</small>
          <br />
        </div>
        {/* Imagem */}
        <img
          src="/undraw_completed_tasks_vs6q.svg"
          alt="unDrawimage"
          className="
           m-auto my-6
           w-48 h-48
           md:w-52 md:h-52 md:my-0
           "
        />
        <ul className="col-span-2 flex justify-center gap-4 my-5">
          <li className="flex items-center space-x-2">
            <a
              href="https://www.linkedin.com/in/alysson-rafael-485540290/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 flex items-center space-x-1"
            >
              <FaLinkedin />
              <span>LinkedIn</span>
            </a>
          </li>
          <li className="flex items-center space-x-2 ">
            <a
              href="https://github.com/alyssonrafael"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800  flex items-center space-x-1 dark:text-gray-100"
            >
              <FaGithub />
              <span>GitHub</span>
            </a>
          </li>
          <li className="flex items-center space-x-2">
            <a
              href="mailto:alyssonrafaelf@outlook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 flex items-center space-x-1"
            >
              <MdEmail />
              <span>E-mail</span>
            </a>
          </li>
        </ul>
      </div>
      {/* Rodapé */}
      <footer className=" text-center text-lg">
        <p>&copy; 2024 <span className="text-green-400">Alysson Rafael</span>. Todos os direitos reservados.</p> 
      </footer>
    </>
  );
}

export default Contato;
