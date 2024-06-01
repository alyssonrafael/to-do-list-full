import { forwardRef } from "react";
import TechItem from "./TechItem";
//import dos icones
import { FaReact, FaCss3, FaNodeJs, FaDocker } from "react-icons/fa";
import { SiTailwindcss, SiVite, SiPrisma, SiExpress } from "react-icons/si";
import { BiLogoPostgresql, BiLogoTypescript } from "react-icons/bi";

// Definindo as tecnologias front-end
const frontEndTechnologies = [
  { icon: <FaReact className="tech-icon text-react" />, name: "React" },
  {icon: <SiTailwindcss className="tech-icon text-tailwindcss" />, name: "Tailwind"},
  { icon: <FaCss3 className="tech-icon text-css3" />, name: "CSS3" },
  { icon: <SiVite className="tech-icon text-vite" />, name: "Vite" },
  {icon: <BiLogoTypescript className="tech-icon text-typescript" />, name: "TypeScript"},
];

// Definindo as tecnologias back-end
const backEndTechnologies = [
  { icon: <FaNodeJs className="tech-icon text-nodejs" />, name: "Node.js" },
  {
    icon: <BiLogoPostgresql className="tech-icon text-postgresql" />,
    name: "PostgreSQL",
  },
  { icon: <SiPrisma className="tech-icon text-prisma" />, name: "Prisma" },
  { icon: <FaDocker className="tech-icon text-docker" />, name: "Docker" },
  { icon: <SiExpress className="tech-icon text-express" />, name: "Express" },
];

// Componente funcional para exibir as tecnologias usadas
const TechSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className="technologies-section mx-2">
      <h2 className="text-xl font-semibold my-6 text-center">
        Tecnologias Usadas
      </h2>
      {/* divisao para responsividade */}
      <ul className="
      my-8 text-sm flex-col space-y-6
      md:grid md:grid-cols-2 md:gap-8 md:space-y-0
      ">
        {/* Lista de tecnologias front-end */}
        <li>
          <h3 className="font-medium text-lg mb-2 text-center">Front-end</h3>
          <ul className="flex flex-wrap justify-center gap-4">
            {frontEndTechnologies.map((tech, index) => (
              <TechItem key={index} icon={tech.icon} name={tech.name} />
            ))}
          </ul>
        </li>
        {/* Lista de tecnologias back-end */}
        <li>
          <h3 className="font-medium text-lg mb-2 text-center">Back-end</h3>
          <ul className="flex flex-wrap justify-center gap-4">
            {backEndTechnologies.map((tech, index) => (
              <TechItem key={index} icon={tech.icon} name={tech.name} />
            ))}
          </ul>
        </li>
      </ul>
    </section>
  );
});

export default TechSection;
