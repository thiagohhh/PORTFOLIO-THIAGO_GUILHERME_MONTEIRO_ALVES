# Meu portfólio

Esse é o projeto do meu portfólio, onde reúno minhas atividades e trabalhos do SESI e do SENAI. A ideia é deixar tudo organizado em um só lugar, para conseguir mostrar o que fui fazendo durante o curso.

## Como o projeto está organizado

O projeto tem duas partes:

- **FRONTEND**: parte visual do site, feita com React e Vite.
- **BACKEND**: parte que cuida da API e da comunicação com o banco de dados.

Dentro do frontend, os componentes ficam em `src/components`. Ali estão as partes de administração, layout e as áreas do SESI e do SENAI.

## Tecnologias usadas

- React
- Vite
- Node.js
- Express
- Supabase

## Como executar

É necessário ter o Node.js instalado.

### Frontend

Abra o terminal e rode:

```bash
cd FRONTEND
npm install
npm run dev
```

### Backend

Em outro terminal, rode:

```bash
cd BACKEND
npm install
npm run dev
```

O backend usa variáveis de ambiente. Para configurar, confira o arquivo `.env.example` que fica dentro da pasta `BACKEND` e crie seu próprio arquivo `.env` com os valores necessários.

## Observação

Esse portfólio foi sendo montado e atualizado conforme as atividades e necessidades do projeto.
