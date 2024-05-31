import { useEffect, useRef } from "react";
import BaseLayout from "../layouts/BaseLayout";
import Navbar from "../layouts/Navbar";
import Funcionalidades from "../components/Sobre/Funcionalidades";
import Motivacao from "../components/Sobre/Motivacao";
import TechSection from "../components/Sobre/TechSection";
import Cores from "../components/Sobre/Cores";
import "../components/Sobre/TecnologiasUsadas.css";
import Contato from "../components/Sobre/Contato";

function SobreOProjeto() {
  //referências para as seções
  const sectionRef = useRef<HTMLElement>(null);
  const colorsRef = useRef<HTMLDivElement>(null);

  // Configuração de um observador para a seçao de tecnologia
  useEffect(() => {
    const section = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            section?.classList.add("visible");
          }, 100);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  // Configuração um observador para a seção de cores
  useEffect(() => {
    const colorsSection = colorsRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            colorsSection?.classList.add("visible");
          }, 100);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (colorsSection) {
      observer.observe(colorsSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <BaseLayout>
      <Navbar />
      <h1 className="text-3xl font-semibold col-span-3 text-center">
        Sobre o Projeto To-Do List
      </h1>
      <div className="row-span-3 col-span-3 justify-between items-end p-6 max-h-[65vh] overflow-y-auto">
        {/* Renderiza outros componentes */}
        <Funcionalidades />
        <Motivacao />
        <TechSection ref={sectionRef} />
        <section
          ref={colorsRef}
          className="technologies-section mx-2 text-center"
        >
          <h2 className="text-lg font-semibold my-4">
            Padrão de cores do Projeto
          </h2>
          {/* Renderiza blocos de cores */}
          <div className="flex justify-center space-x-6">
            <Cores color="bg-green-500" label="#22C55E" />
            <Cores color="bg-yellow-500" label="#FFDE59" />
            <Cores color="bg-red-500" label="#E4080A" />
            <Cores color="bg-black" label="#000000" />
          </div>
        </section>
        <section className="my-8">
          {/* Renderiza a seção de contato */}
          <Contato />
        </section>
      </div>
    </BaseLayout>
  );
}

export default SobreOProjeto;
