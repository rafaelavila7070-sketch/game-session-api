# Game Session API

API REST para gerenciamento de jogadores e sessões de jogo, desenvolvida com NestJS, TypeScript e PostgreSQL.

O projeto foi desenvolvido para praticar conceitos de desenvolvimento backend, organização em módulos, persistência de dados, validação de entradas e testes automatizados.

## Tecnologias utilizadas

- **Node.js** — ambiente de execução.
- **NestJS** — framework para desenvolvimento da API.
- **TypeScript** — linguagem de programação.
- **PostgreSQL** — banco de dados relacional.
- **TypeORM** — mapeamento objeto-relacional (ORM).
- **Jest** — testes automatizados.
- **class-validator** — validação dos dados recebidos pela API.

## Funcionalidades

- Cadastro e listagem de jogadores.
- Criação e listagem de sessões de jogo.
- Consulta de uma sessão pelo ID.
- Atualização da pontuação de uma sessão.
- Validação dos dados de entrada.
- Verificação da existência do jogador antes de criar uma sessão.
- Tratamento de erros para registros não encontrados.
- Testes unitários e de integração.

## Endpoints

Base URL local: `http://localhost:3000`

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

Exemplo de criação de sessão:

```json
{
  "playerId": 1,
  "score": 100
}
```

A pontuação deve ser um número inteiro maior ou igual a zero, e o jogador informado deve existir.

## Pré-requisitos

Antes de executar o projeto, instale:

- Node.js e npm.
- PostgreSQL.
- Git.

## Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/rafaelavila7070-sketch/game-session-api.git
cd game-session-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

Crie um banco de dados PostgreSQL chamado `game_session`.

Na raiz do projeto, crie um arquivo `.env` com a senha do usuário PostgreSQL:

```dotenv
DB_PASSWORD=sua_senha_do_postgresql
```

Substitua o valor de exemplo pela senha configurada no seu ambiente local. O arquivo `.env` não deve ser enviado ao GitHub.

### 4. Inicie a aplicação

Modo de desenvolvimento:

```bash
npm run start:dev
```

Modo de produção local:

```bash
npm run build
npm run start:prod
```

Por padrão, a API utiliza a porta `3000`.

## Testes automatizados

Execute os testes unitários:

```bash
npm test -- --runInBand
```

Para executar os testes end-to-end:

```bash
npm run test:e2e
```

O projeto teve uma execução de testes unitários concluída com sucesso, totalizando 14 testes aprovados em 5 suítes.

## Aprendizados

Durante o desenvolvimento, foram praticados conceitos importantes de backend:

- Arquitetura modular com NestJS.
- Separação de responsabilidades entre controllers e services.
- Criação de entidades e relacionamentos com TypeORM.
- Integração com PostgreSQL.
- Validação de dados por DTOs.
- Tratamento de exceções.
- Testes automatizados com Jest.
- Configuração de variáveis de ambiente.
- Compilação e execução local em modo de produção.
- Versionamento de código com Git e GitHub.

## Autor

**Rafael Ávila**

[GitHub — game-session-api](https://github.com/rafaelavila7070-sketch/game-session-api)
