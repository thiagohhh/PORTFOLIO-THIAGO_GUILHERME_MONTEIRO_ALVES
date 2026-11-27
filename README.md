# Meu portfólio

Portfólio de atividades e trabalhos do SESI e do SENAI.

## Para rodar no computador


### 1. Baixe o projeto

Abra o terminal e rode:

```bash
git clone https://github.com/thiagohhh/PORTFOLIO-THIAGO_GUILHERME_MONTEIRO_ALVES.git
cd PORTFOLIO-THIAGO_GUILHERME_MONTEIRO_ALVES
```

### 2. Prepare o banco

1. Abra o MySQL Workbench.
2. Crie um banco chamado `portifolio_senaiEsesi`.
3. Entre na pasta `BACKEND` e copie o arquivo `.env.example`.
4. Renomeie a cópia para `.env`.
5. Abra o `.env` e coloque a senha do seu MySQL. Escolha também o nome, e-mail e senha que vai usar para entrar no sistema.

Exemplo:

```env
JWT_SECRET=minha_chave_local
DB_NAME=portifolio_senaiEsesi
DB_USER=root
DB_PASSWORD=sua_senha_do_mysql
DB_HOST=localhost
STORAGE_LOCAL=true
USER_NAME=Professor
USER_EMAIL=professor@local.test
USER_PASSWORD=senha123
```

Use seus próprios dados. O usuário é criado automaticamente quando a tabela de usuários está vazia.

**Importante:** não coloque `DATABASE_URL` nem dados de acesso do Supabase no arquivo. Assim o projeto usa o banco e os arquivos do próprio computador.

### 3. Inicie o backend

Abra um terminal na pasta `BACKEND` e rode:

```bash
npm install
npm run dev
```

Deixe esse terminal aberto. O endereço do backend é `http://localhost:3333`.

### 4. Inicie o site

Abra outro terminal na pasta `FRONTEND` e rode:

```bash
npm install
```

Copie `.env.example` para um arquivo chamado `.env`. Confira se ele contém:

```env
VITE_API_URL=http://localhost:3333
```

Depois rode:

```bash
npm run dev
```

Abra no navegador o endereço mostrado no terminal (normalmente `http://localhost:5173`).

### 5. Entre no sistema

Use o e-mail e a senha que você colocou em `USER_EMAIL` e `USER_PASSWORD` no arquivo `BACKEND/.env`.

## Observações

- Os cadastros ficam no MySQL local.
- Com `STORAGE_LOCAL=true`, fotos e arquivos ficam em `BACKEND/public/uploads`.
- Não compartilhe o arquivo `.env`.
- Não use `force: true` no banco: essa opção apaga as tabelas e os dados.
