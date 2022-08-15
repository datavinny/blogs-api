# Boas-vindas ao repositório do projeto API de Blogs!

  Neste projeto você vai desenvolver uma API e um banco de dados para a produção de conteúdo para um blog! 

  Você deverá desenvolver uma aplicação em `Node.js` usando o pacote `sequelize` para fazer um `CRUD` de posts.

  1. Você deverá desenvolver endpoints que estarão conectados ao seu banco de dados seguindo os princípios do REST;

  2. Para fazer um post é necessário usuário e login, portanto será trabalhada a **relação entre** `user` e `post`; 

  3. Será necessária a utilização de categorias para os posts, trabalhando, assim, a **relação de** `posts` para `categories` e de `categories` para `posts`.

# Orientações

Rodando no Docker 
 
  > :information_source: Rode os serviços `node` e `db` com o comando `docker-compose up -d --build`.
  - Esses serviços irão inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`;
  - A partir daqui você pode rodar o container `blogs_api` via CLI ou abri-lo no VS Code;
  > :information_source: Use o comando `docker exec -it blogs_api bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.
  > :information_source: Instale as dependências com `npm install`. (Instale dentro do container)
  
  - **:warning: Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 
  - **:warning: Atenção:** O **git** dentro do container não vem configurado com suas credenciais. Ou faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

 
  