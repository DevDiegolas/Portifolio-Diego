---
execution: inline
agent: carla-copy
inputFile: squads/portfolio-content-generator/output/project-brief.md
outputFile: squads/portfolio-content-generator/output/portfolio-copy-draft.md
---

# Step 03: Write Portfolio Copy

## Context Loading

Load these files before executing:

- `squads/portfolio-content-generator/output/project-brief.md` — brief estruturado do Pedro Projeto com dados dos projetos
- `squads/portfolio-content-generator/pipeline/data/tone-of-voice.md` — 6 tons disponíveis para escolha
- `squads/portfolio-content-generator/pipeline/data/output-examples.md` — exemplos de copy forte para referência
- `squads/portfolio-content-generator/pipeline/data/anti-patterns.md` — erros a evitar
- `_opensquad/_memory/company.md` — contexto do Diego (nome, especialidade, tom)

## Instructions

### Process

1. **Selecionar e confirmar tom**: ler `tone-of-voice.md`, identificar qual tom é mais adequado para o conteúdo solicitado. Recomendar Tom 1 (Descontraído e Técnico) como padrão para o portifólio do Diego. Apresentar a recomendação e aguardar confirmação do usuário antes de prosseguir.

2. **Analisar o brief**: ler `project-brief.md` completo. Identificar destaques sinalizados pelo Pedro (tag DESTAQUE), flags de dados fracos (tag INCOMPLETO), e o tipo de conteúdo solicitado.

3. **Aplicar o framework correto**:
   - **Bio**: Elevator Pitch (`[Nome] + [Especialidade] + [O que entrega] + [Diferencial]`) ou PAS conforme tom
   - **Projeto**: STAR (Situation → Task → Action → Result) adaptado para PT-BR natural
   - **Seção**: foco no que o recrutador precisa entender ao ler aquela seção

4. **Escrever o copy**: para cada item solicitado, aplicar o framework, usar vocabulário profissional, evitar todos os anti-patterns listados. Frases curtas, máximo 3-4 por parágrafo.

5. **Aplicar 30-second scan test**: reler o copy completo como recrutador com 30 segundos. O ponto principal está claro? Se não, reescrever a abertura.

6. **Salvar o draft**: compilar em `portfolio-copy-draft.md` no formato definido abaixo.

## Output Format

```markdown
# Portfolio Copy Draft

**Tom selecionado:** [nome e número do tom]
**Conteúdo gerado:** [tipos gerados]
**Data:** [data]

---

## Bio

### PT-BR
[bio em português — máximo 4 frases]

### EN
[bio em inglês — somente se solicitado]

---

## Projetos

### [Nome do Projeto]

**PT-BR:**
[descrição — máximo 5 frases, começa pelo problema]

**Stack mencionada:** [tecnologias citadas]

---

## Seções do Site

### [Nome da Seção]
[copy proposto — 1-3 frases]

---

## Notas para o Diego

- [observação sobre dados incompletos se houver]
- [sugestão de melhoria futura]
```

## Output Example

```markdown
# Portfolio Copy Draft

**Tom selecionado:** Tom 1 — Descontraído e Técnico
**Conteúdo gerado:** bio + descrição do portifólio
**Data:** 2026-03-31

---

## Bio

### PT-BR

Opa, eu sou o Diego — engenheiro fullstack com queda por Game Dev.

Construo do backend ao jogo: APIs, bancos de dados, e quando o projeto pede, pathfinding e state machines. TypeScript é minha linguagem principal, mas o que me move é entender o sistema inteiro e entregar algo que funcione de ponta a ponta.

Se você precisa de alguém que cuida tanto da arquitetura quanto da experiência de quem usa, é por aqui.

### EN

Hey, I'm Diego — a fullstack engineer with a background in game dev.

I build across the stack: APIs, databases, and when the project calls for it, game logic. TypeScript is my main language, but what drives me is understanding the full system and shipping something that works end-to-end.

If you need someone who thinks about both architecture and the people using the software, let's talk.

---

## Projetos

### Portifólio Pessoal

**PT-BR:**
Precisava de um portifólio bilíngue sem inflar o bundle com biblioteca de i18n. Criei um sistema leve usando arquivos JSON e Context API do React — troca dinâmica de idioma, zero dependência de terceiros.

Stack: React 18, TypeScript, Vite, Tailwind CSS

**Stack mencionada:** React 18, TypeScript, Context API, Vite, Tailwind CSS

---

## Notas para o Diego

- GameCard está no código mas sem conteúdo de jogo ainda. Quando tiver, vale uma descrição específica de game dev — é o diferencial mais forte do perfil.
- Versão EN da bio está como tradução direta — pode ser refinada para mercado internacional se necessário.
```

## Veto Conditions

Reject and redo if ANY of these are true:
1. Bio usa "passionate developer" ou equivalente genérico como abertura
2. Alguma descrição de projeto começa com a tecnologia em vez do problema ou contexto

## Quality Criteria

- [ ] Tom foi confirmado com o Diego antes da escrita
- [ ] Bio não usa clichês de portifólio (passionate, hardworking, user-friendly)
- [ ] Pelo menos 1 projeto começa pelo problema, não pela tecnologia
- [ ] Draft está no formato correto com todas as seções
