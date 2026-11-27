# Meu portfólio

Portfólio de atividades e trabalhos do SESI e do SENAI. O projeto possui frontend e backend separados.

## Requisitos

- Node.js (versão compatível com Vite 8; Node 20.19+ ou 22.12+ recomendado)
- MySQL instalado e iniciado para execução local independente
- Git (opcional, para clonar)

## Clonar o repositório

```bash
git clone https://github.com/thiagohhh/PORTFOLIO-THIAGO_GUILHERME_MONTEIRO_ALVES.git
cd PORTFOLIO-THIAGO_GUILHERME_MONTEIRO_ALVES
```

## Preparar o banco local

1. Instale e inicie o MySQL.
2. Crie o banco de dados `portifolio_senaiEsesi` (ou use outro nome e ajuste o arquivo `BACKEND/.env`).
3. Copie `BACKEND/.env.example` para `BACKEND/.env`.
4. No `.env`, informe a senha do seu MySQL, uma chave `JWT_SECRET` e as credenciais de administrador local (`USER_NAME`, `USER_EMAIL`, `USER_PASSWORD`).
5. **Não configure `DATABASE_URL`** se quiser usar o MySQL local. O backend usa o banco local quando essa variável não existe.
6. O administrador inicial é criado quando o banco está sem registros de alunos. A conta é criada nesse banco local, não no banco online, desde que você não configure uma conexão com o banco online.

## Executar o backend

Em um terminal:

```bash
cd BACKEND
npm install
npm run dev
```

O backend inicia em http://localhost:3333.

## Executar o frontend

Em outro terminal, na raiz do repositório:

```bash
cd FRONTEND
npm install
```

Copie `FRONTEND/.env.example` para `FRONTEND/.env` e mantenha a URL da API local:

```env
VITE_API_URL=http://localhost:3333
```

Depois:

```bash
npm run dev
```

Abra o endereço que o Vite mostrar (normalmente http://localhost:5173).

## Observações

- O banco local do avaliador é separado do banco online se ele configurar o MySQL local e não usar `DATABASE_URL` apontando para o banco remoto.
- Os dados cadastrados localmente não alteram automaticamente os dados do banco online.
- O recurso de upload de arquivos que depende do Supabase Storage pode exigir credenciais próprias do Storage; sem elas, algumas funcionalidades de mídia podem não funcionar.
- Não compartilhe nem envie o arquivo `.env`. Ele contém credenciais privadas.
