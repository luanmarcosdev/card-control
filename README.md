# Expenses Control

## Descrição

O **Expenses Control** é uma API RESTful desenvolvida em Node.js com Express, destinada ao controle de despesas, permitindo que usuários gerenciem categorias e despesas atribuindo elas a uma entidade, com autenticação via JWT e persistência em banco MySQL. O objetivo é disponibilizar uma API backend robusta e escalável, pronta para produção e projetada para integração eficiente com aplicações web ou mobile.

## Tecnologias Utilizadas

* Node.js
* Express
* MySQL
* JWT
* Sequelize
* Docker + Docker Compose
* Jest + Supertest
* Swagger

## Arquitetura

A aplicação segue uma arquitetura em camadas, promovendo separação de responsabilidades e facilitando testes:

* **database** → Configurações do Sequelize ORM (models, migrations, seeders e config)
* **routes** → Recebem as requisições HTTP
* **controllers** → Validam entrada e direcionam para o service
* **services** → Contêm regras de negócio
* **repositories** → Comunicação com o banco via ORM
* **middlewares** → Autenticação, validação e error handling
* **errors** → Erros personalizado com padronização de respostas
* **test** → Testes unitários e de integração

## Requisitos

* Node.js versão 18+ ou superior
* Docker/Docker Compose
* NPM ou Yarn

## Instalação

```bash
git clone https://github.com/luanmarcosdev/expenses-control.git
cd expenses-control
npm install
```

## Configuração e criação de ambiente

Suba o container Docker

```bash
docker-compose up --build
```

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
PORT=3000
DB_HOST=localhost
DB_PORT=3307
DB_USER=root
DB_DATABASE=expenses
DB_PASSWORD=password
JWT_SECRET=secret_jwt_secret
```

Ajuste as portas ou credenciais do container e env conforme necessário

## Rode as Migrations e Seeds

```bash
npx sequelize db:migrate
npx sequelize db:seed:all
```

## Rodando o projeto

### Iniciando servidor local

```bash
npm run dev
```

## Testes

```bash
npm run test
```

Contém testes **unitários** e **de integração** utilizando Jest + Supertest.

## Autenticação

A API utiliza JWT no padrão Bearer Token.
Após login, envie o token no header:

```
Authorization: Bearer <seu_token>
```

## Documentação dos Endpoints

A documentação completa está disponível via Swagger:

```
http://localhost:3000/api-docs/
```
