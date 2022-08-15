# Boas vindas ao repositório do projeto API de Blogs!

## 👨‍💻 O que foi desenvolvido
  Uma aplicação em `Node.js` usando o pacote `sequelize` para fazer um `CRUD` de posts.
  
  Esse projeto contem uma API e um banco de dados para a produção de conteúdo para um blog! 

## :memo: Contexto
Este projeto foi feito enquanto estudava na @betrybe.

## :wrench: Técnologias usadas

Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, MYSQL, ES6, Sequelize

## Habilidades

Neste projeto, foi testado/treinado habilidades de:

- princípios do REST

# Orientações
## :rocket:  Rodando o Projeto

> Backend

  > :information_source: Rode os serviços `node` e `db` com o comando `docker-compose up -d --build`.
  - Esses serviços irão inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`;
  - A partir daqui você pode rodar o container `blogs_api` via CLI ou abri-lo no VS Code;
  > :information_source: Use o comando `docker exec -it blogs_api bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.
  > :information_source: Instale as dependências com `npm install`. (Instale dentro do container)

  - **:warning: Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 
  - **:warning: Atenção:** O **git** dentro do container não vem configurado com suas credenciais. Ou faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

## Creditos
- Eu (@datavinny) 
