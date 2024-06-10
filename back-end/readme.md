<h1 align="center" style="font-weight: bold;">To-do-list Full  * back-end * 💻</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js Badge">
  <img src="https://img.shields.io/badge/Express-005CFE?style=for-the-badge&logo=express&logoColor=white" alt="Express Badge">
  <img src="https://img.shields.io/badge/Javascript-000?style=for-the-badge&logo=javascript" alt="JavaScript Badge">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Badge">
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL Badge">
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma Badge">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel Badge">
</p>

<p align="center">
 <a href="#started">Primeiros passos</a> • 
  <a href="#routes">API Endpoints</a> •
 <a href="#colab">Autor</a>
</p>

<p align="center">
  <b>Minha API é o coração da minha aplicação, oferecendo endpoints para acessar e manipular dados. Desenvolvida com Node.js e Express, ela utiliza PostgreSQL como banco de dados e Docker para fácil implantação. Hospedada na Vercel, garante alta disponibilidade. O acesso aos dados é gerenciado eficientemente com Prisma.</b>
</p>

<h2 id="started">🚀 Primeiros passos</h2>

Nesta etapa, vou descrever como você pode executar a API localmente em seu ambiente de desenvolvimento.

<h3>Pré-requisitos</h3>

- [NodeJS](https://nodejs.org/en)
- [Docker ](https://docker.com)
- [Git 2](https://github.com)

<h3>Clonagem do Repositório:</h3>

```bash
git clone https://github.com/alyssonrafael/to-do-list-full
```

<h3>Navegando para o Back-end:</h3>

```bash
cd ./to-do-list-full/back-end
```

<h3>Instalando as dependencias</h3>
com o comando vc garante a instalação das dependências

```bash
npm install
```

<h3> Environment Variables</h2>

Use o arquivo `.env.exemple` como referência para criar seu arquivo de configuração. O mais importante é o `DATABASE_URL`, onde estarão os parâmetros para que o Prisma possa se conectar ao seu banco de dados. Você pode usar este exemplo como padrão, que é o mesmo definido no arquivo docker-compose:

```yaml
DATABASE_URL="postgresql://root:123456@localhost:5432/to-do-list-full?schema=public"
```

Para iniciar o banco de dados via docker, execute o seguinte comando diretamente no terminal:

```yaml
docker-compose up
```

<h3>Migrações</h3>
Após o banco de dados estar em execução, execute o seguinte comando para aplicar as migrações do Prisma:

```bash
npx prisma migrate dev
```

<h3>Starting</h3>

Com tudo isso feito resta apenas iniciar o projeto. com o seguinte comando:

```bash
npm run dev
```

<h2 id="routes">📍 API Endpoints</h2>

Essas são minhas rotas principais: tenho duas tabelas relacionadas a categorias e tarefas

<h1>Tasks</h1>

| Route                                                | description                                                             |
| ---------------------------------------------------- | ----------------------------------------------------------------------- |
| <kbd>GET/http://localhost:3333/api/tasks</kbd>       | Retorna todas minhas tarefas cadastradas [response details](#get-tasks) |
| <kbd>GET/http://localhost:3333/api/tasks/id</kbd>    | Retorna tarefa espeefica [response details](#get-tasks-id)              |
| <kbd>POST/http://localhost:3333/api/tasks</kbd>      | Cadastro de Tarefa [response details](#post-tasks)                      |
| <kbd>PUT/http://localhost:3333/api/tasks/id</kbd>    | Atualização de Tarefa [response details](#put-tasks)                    |
| <kbd>DELETE/http://localhost:3333/api/tasks/id</kbd> | Exclusão de Tarefa                                                      |

<h3 id="get-tasks">GET api/tasks</h3>

```json
[
  {
    "id": 1,
    "descricao": "Essa é uma tarefa de teste",
    "dia": "2024-06-10T00:00:00.000Z",
    "categoriaId": 1,
    "status": "não iniciado",
    "cor": "red",
    "createdAt": "2024-06-10T14:21:00.023Z",
    "updatedAt": "2024-06-10T15:12:59.799Z"
  }
]
```

<h3 id="get-tasks-id">GET api/tasks/id</h3>

```json
[
  {
    "id": 8,
    "descricao": "Essa é uma tarefa de teste",
    "dia": "2024-06-10T00:00:00.000Z",
    "categoriaId": 1,
    "status": "não iniciado",
    "cor": "red",
    "createdAt": "2024-06-10T14:21:00.023Z",
    "updatedAt": "2024-06-10T15:12:59.799Z"
  }
]
```

<h3 id="post-tasks">POST api/tasks</h3>

```json
{
  "descricao": "Comprar leite",
  "dia": "2024-05-20T00:00:00Z",
  "categoriaId": 1
}
```

<h3 id="put-tasks">PUT api/tasks/id</h3>

```json
{
  "descricao": "Comprar alimentos",
  "status": "em andamento",
  "cor": "amarelo"
}
```

<h1>Categories</h1>

| Route                                                     | description                                                                     |
| --------------------------------------------------------- | ------------------------------------------------------------------------------- |
| <kbd>GET/http://localhost:3333/api/categories</kbd>       | Retorna todas minhas categorias cadastradas [response details](#get-categories) |
| <kbd>GET/http://localhost:3333/api/categories/id</kbd>    | Retorna categoria especifica [response details](#get-categories-id)             |
| <kbd>POST/http://localhost:3333/api/categories</kbd>      | Cadastro de categoria [response details](#post-categories)                      |
| <kbd>PUT/http://localhost:3333/api/categories/id</kbd>    | atualização de categoria [response details](#put-categories)                    |
| <kbd>DELETE/http://localhost:3333/api/categories/id</kbd> | Exclusão de categoria                                                           |

<h3 id="get-categories">GET api/categories</h3>

```json
[
  {
    "id": 2,
    "nome": "Lazer",
    "createdAt": "2024-06-10T04:24:04.431Z",
    "updatedAt": "2024-06-10T14:07:33.310Z"
  }
]
```

<h3 id="get-categories-id">GET api/categories/id</h3>

```json
[
  {
    "id": 1,
    "nome": "Hobbies",
    "createdAt": "2024-06-10T04:24:02.809Z",
    "updatedAt": "2024-06-10T14:57:52.808Z"
  }
]
```

<h3 id="post-categories">POST api/categories</h3>

```json
{
  "nome": "teste de exclusao"
}
```

<h3 id="put-categories">PUT api/categories/id</h3>

```json
{
  "nome": "escola"
}
```

<h2 id="colab">✒️ Autor</h2>

<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <td style="padding: 20px; border: 1px solid #ccc; text-align: center;">
      <a href="https://github.com/alyssonrafael" style="text-decoration: none;">
        <img src="https://avatars.githubusercontent.com/u/128101121?s=400&u=133d3afb5a5d6ef6411bc63742e3202995d3cfad&v=4" width="100px" style="border-radius: 50%;" alt="Alysson Rafael Profile Picture"/><br>
        <b>Alysson Rafael</b>
      </a>
    </td>
    <td style="padding: 20px; border: 1px solid #ccc;">
      Gostaria de expressar minha sincera gratidão a todos que contribuíram para este projeto! Seja com sugestões, correções de bugs ou simplesmente com palavras de incentivo, cada um de vocês fez a diferença. 🚀 Obrigado pelo seu apoio !
    </td>
  </tr>
</table>
