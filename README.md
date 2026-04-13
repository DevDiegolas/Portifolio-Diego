# Diego Portfolio


Portfolio pessoal interativo com identidade de terminal/game, criado para apresentar quem eu sou, minha jornada e meus projetos de forma visual, dinâmica e memoravel.

## 🎯 Proposito

Este site foi pensado para ser mais do que um curriculo online. A ideia e ser um espaco vivo para:

- mostrar meu perfil como Fullstack Engineer e Game Developer
- contar minha historia de forma mais humana e visual
- destacar projetos com uma navegacao divertida e clara
- transformar visita em experiencia, nao apenas leitura

## 🕹️ Experiencia do site

- navegacao com estilo de terminal e comandos interativos
- tela de loading em estilo game (`Diego.exe`)
- transicoes entre paginas com animacoes de entrada/saida
- temas visuais trocaveis via comando (`theme`/`color`)
- modo especial `underwater`
- paginas principais: Home, About, Games, Game Profile e Resume

## 🧰 Stack principal

- React 19
- TypeScript 5
- Vite 8
- Tailwind CSS 4
- ESLint 9
- PostCSS + Autoprefixer

## 🏗️ Arquitetura tecnica (resumo)

- SPA com roteamento customizado via History API (sem react-router)
- gerenciamento de tema por contexto (`ThemeContext` + CSS variables)
- estado do modo underwater por contexto (`UnderwaterContext`)
- shell global de terminal em volta das paginas (`TerminalShell`)
- persistencia de preferencias no `localStorage`

## 📁 Estrutura do projeto

```text
.
|- src/
|  |- components/        # telas e componentes visuais
|  |- ThemeContext.tsx   # temas e troca dinamica de paleta
|  |- UnderwaterContext.tsx
|  |- App.tsx            # shell + navegacao + transicoes
|  \- index.css          # estilos globais e animacoes
|- public/               # assets estaticos
|- dashboard/            # app auxiliar (Vite + React + Phaser)
\- ...
```

## 🚀 Como rodar localmente

Requisitos:

- Node.js 20+
- npm 10+

Instalacao e execucao:

```bash
npm install
npm run dev
```

Build de producao:

```bash
npm run build
npm run preview
```

Lint:

```bash
npm run lint
```

## 📜 Scripts disponiveis

- `dev`: inicia servidor de desenvolvimento (Vite)
- `build`: compila TypeScript e gera build de producao
- `preview`: sobe preview local do build
- `lint`: executa verificacao de estilo e qualidade com ESLint

## 🔭 Visao

Este portfolio continua em evolucao. A meta e expandir o numero de projetos jogaveis, melhorar a narrativa visual e aprofundar o lado interativo da experiencia.
