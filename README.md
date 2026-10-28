# Game Session API

API REST para gerenciamento de jogadores e sessões de jogo, desenvolvida com NestJS, TypeScript, TypeORM e PostgreSQL.

O projeto explora conceitos de desenvolvimento backend, arquitetura modular, validação de dados, testes automatizados, persistência relacional e containerização com Docker.

## Tecnologias utilizadas

- **Node.js** — ambiente de execução.
- **NestJS** — framework backend.
- **TypeScript** — linguagem de programação.
- **PostgreSQL** — banco de dados relacional.
- **TypeORM** — mapeamento objeto-relacional (ORM).
- **Docker e Docker Compose** — containerização e gerenciamento dos serviços.
- **Jest** — testes automatizados.
- **class-validator** — validação dos dados recebidos pela API.

## Funcionalidades

- Cadastro e listagem de jogadores.
- Criação e listagem de sessões de jogo.
- Consulta de uma sessão pelo ID.
- Atualização dos dados permitidos de uma sessão.
- Validação dos dados de entrada.
- Verificação da existência do jogador antes de criar uma sessão.
- Tratamento de erros para registros não encontrados.
- Testes unitários e end-to-end.

## Endpoints

Base URL: `http://localhost:3000`

### Jogadores

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/players` | Lista os jogadores cadastrados. |
| POST | `/players` | Cadastra um jogador. |

Exemplo de cadastro:

```json
{
  "name": "Rafael",
  "email": "rafael@example.com"
}
```

### Sessões de jogo

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/game-sessions` | Cria uma sessão de jogo. |
| GET | `/game-sessions` | Lista as sessões cadastradas. |
| GET | `/game-sessions/:id` | Consulta uma sessão pelo ID. |
| PATCH | `/game-sessions/:id` | Atualiza os dados permitidos de uma sessão. |

Exemplo de criação:

```json
{
  "playerId": 1,
  "score": 100
}
```

A pontuação deve ser um número inteiro maior ou igual a zero, e o jogador informado deve existir.

## Pré-requisitos

Para executar o projeto com Docker:

- Git
- Docker Desktop com suporte ao Docker Compose

Para executar localmente sem Docker, também são necessários Node.js, npm e PostgreSQL.

## Como executar com Docker

### 1. Clone o repositório

```bash
git clone https://github.com/rafaelavila7070-sketch/game-session-api.git
cd game-session-api
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto, usando `.env.example` como referência:

```dotenv
DB_PASSWORD=sua_senha_do_postgresql
```

Use uma senha apropriada para o seu ambiente. Não compartilhe o arquivo `.env` nem envie suas credenciais ao GitHub.

### 3. Inicie os serviços

```bash
docker compose up -d --build
```

O Docker Compose inicia a API e o PostgreSQL. O banco utiliza um volume persistente para manter os dados entre reinicializações dos containers.

### 4. Verifique os containers

```bash
docker compose ps
```

Para consultar os logs da API:

```bash
docker compose logs --tail=50 api
```

### 5. Acesse a API

A API ficará disponível em:

`http://localhost:3000`

Exemplo de consulta aos jogadores:

```bash
curl http://localhost:3000/players
```

### 6. Pare os serviços

```bash
docker compose down
```

Esse comando remove os containers e a rede criada pelo Compose, mas mantém o volume persistente do banco de dados.

**Atenção:** não utilize `docker compose down -v` se quiser preservar os dados do volume.

## Como executar localmente

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure o PostgreSQL

Crie um banco de dados chamado `game_session` e configure o arquivo `.env` na raiz:

```dotenv
DB_PASSWORD=sua_senha_do_postgresql
```

Com o PostgreSQL local, a API utiliza `localhost` como host padrão.

### 3. Inicie a aplicação

Modo de desenvolvimento:

```bash
npm run start:dev
```

Modo de produção local:

```bash
npm run build
npm run start:prod
```

## Testes automatizados

Execute os testes unitários:

```bash
npm test -- --runInBand
```

Execute os testes end-to-end:

```bash
npm run test:e2e
```

O projeto teve uma execução de testes unitários concluída com sucesso, totalizando 14 testes aprovados em 5 suítes.

## Aprendizados

- Arquitetura modular com NestJS.
- Separação de responsabilidades entre controllers e services.
- Entidades e relacionamentos com TypeORM.
- Integração com PostgreSQL.
- Validação de dados por DTOs.
- Tratamento de exceções.
- Testes automatizados com Jest.
- Configuração de variáveis de ambiente.
- Containerização da aplicação com Docker.
- Orquestração de serviços com Docker Compose.
- Persistência de dados com volumes.
- Versionamento de código com Git e GitHub.

## Autor

**Rafael Ávila**

[GitHub — game-session-api](https://github.com/rafaelavila7070-sketch/game-session-api)
