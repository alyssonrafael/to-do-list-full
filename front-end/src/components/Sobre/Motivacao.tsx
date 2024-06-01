function Motivacao() {
  return (
    <section>
       {/* Título da seção
          sao 3 listas dentro de outra lista com informaçoes do projeto e minhas motivaçoes
       */}
            <h2 className="text-xl font-semibold my-2 text-center">
              Motivação, Desafios e Lições Aprendidas
            </h2>
            <ul className="space-y-4 mt-5">
              <li>
                <h4 className="font-semibold text-center"> A Motivação 💪</h4>
                <ul className="space-y-2 text-left list-disc ml-6 mt-3">
                  <li>
                    Inicialmente para criar essa aplicação foi aprimorar minhas
                    habilidades em programação fullstack. Queria trabalhar tanto
                    no back-end quanto no front-end, explorando todas as etapas
                    do desenvolvimento.
                  </li>
                  <li>
                    Além disso, estava ansioso para entender como consumir dados
                    do back-end e distribuí-los de forma elegante no front-end.
                    Afinal, a apresentação dos dados é tão importante quanto a
                    funcionalidade em si.
                  </li>
                  <li>
                    O React é um playground incrível! Eu queria experimentar
                    várias funções, desde renderização condicional até
                    componentização e hooks personalizados.
                  </li>
                </ul>
              </li>

              <li>
                <h4 className="font-semibold text-center">Os Desafios 🚀</h4>
                <ul className="space-y-2 text-left list-disc ml-6 mt-3">
                  <li>
                    Datas e Tipagem em TypeScript : Dominar as nuances das datas
                    e da tipagem em TypeScript foi um obstáculo inicial. No
                    entanto, com o auxílio de pesquisas e bibliotecas como
                    Date-fns, consegui superar essa dificuldade. Ela facilitou a
                    manipulação de datas e garantiram tipagem precisa.
                  </li>
                  <li>
                    Calendario : No início, o React Big Calendar me intimidou.
                    Mas, com tutoriais, dicas e pesquisa, superei os desafios e
                    dominei a biblioteca.
                  </li>
                  <li>
                    Estados : O gerenciamento de estados no React com Typescript
                    também foi um obstáculo, mas encontrei soluções através da
                    pesquisa.
                  </li>
                </ul>
              </li>

              <li>
                <h4 className="font-semibold text-center">Lições Aprendidas 🌟</h4>
                <ul className="space-y-2 text-left list-disc ml-6 mt-3">
                  <li>
                    Me aprofundei nos conhecimentos em React. Entendi como criar
                    componentes reutilizáveis, gerenciar estados locais e lidar
                    com eventos. Explorei diferentes técnicas de gerenciamento
                    de estados, como o uso de useState e useEffect. Aprendi a
                    lidar com datas e formatações, essenciais para a
                    funcionalidade de um aplicativo de lista de tarefas.
                  </li>
                  <li>
                    Aprendi a utilizar o Prisma, uma ferramenta de mapeamento
                    objeto-relacional (ORM), para interagir com o banco de dados
                    no back end.
                  </li>
                  <li>
                    Integrar o back end (com Prisma) e o front end (com React)
                    me proporcionou uma visão completa do desenvolvimento de
                    aplicativos. Compreendi como as partes se comunicam por meio
                    de APIs REST
                  </li>
                  <li>
                    Aprendi a seguir boas práticas de organização de código,
                    como dividir componentes, modularizar funcionalidades e
                    manter um código limpo e legível.
                  </li>
                </ul>
              </li>
            </ul>
          </section>
  )
}

export default Motivacao