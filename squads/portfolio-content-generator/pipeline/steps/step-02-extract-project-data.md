---
execution: subagent
agent: pedro-projeto
inputFile: squads/portfolio-content-generator/output/generation-focus.md
outputFile: squads/portfolio-content-generator/output/project-brief.md
model_tier: fast
---

# Step 02: Extract Project Data

## Context Loading

Load these files before executing:

- `squads/portfolio-content-generator/output/generation-focus.md` — foco definido no checkpoint: tipo de conteúdo e projeto alvo
- `src/locales/pt-BR.json` (ou equivalente) — strings atuais do portifólio em PT-BR
- `src/locales/en.json` (ou equivalente) — strings atuais em EN
- `src/App.tsx` — estrutura raiz do app
- `src/components/Home.tsx` — componente principal com todas as seções
- `src/components/GameCard.tsx` — componente de jogo (se existir)
- `src/components/Header.tsx` — navegação e seções disponíveis
- `package.json` — stack real instalada

## Instructions

### Process

1. **Ler o foco**: carregar `generation-focus.md` e identificar: tipo de conteúdo (bio/projeto/seção/todos), projeto alvo (específico ou todos), idioma de saída.

2. **Mapear o portifólio**: ler os arquivos `src/locales/*.json` para extrair todas as strings atuais — estas revelam as seções existentes, o tom atual, e a estrutura do site. Ler `App.tsx` e `Home.tsx` para entender o layout e a hierarquia de componentes.

3. **Extrair dados dos projetos**: para cada componente relevante encontrado em `src/components/`, extrair: funcionalidades implementadas, tecnologias usadas (via imports), lógica de negócio visível, interfaces TypeScript que revelam estrutura de dados.

4. **Confirmar stack via package.json**: ler `package.json` e cruzar com imports encontrados. Listar apenas o que está realmente instalado E em uso.

5. **Produzir o brief**: compilar dados no formato YAML e salvar em `squads/portfolio-content-generator/output/project-brief.md`.

## Output Format

```yaml
focus:
  content_type: "bio | project_description | section_copy | all"
  target_project: "nome ou 'all' ou 'bio'"
  language: "Português (BR) | English | Both"

portfolio_structure:
  sections:
    - name: "nome da seção"
      current_text: "texto atual nos locales"
      component: "componente responsável"

projects:
  - name: "nome"
    type: "fullstack | game | frontend | backend"
    description_raw: "descrição técnica neutra"
    stack:
      - tech: "tecnologia"
        role: "papel no projeto"
    features_implemented:
      - "funcionalidade concreta"
    technical_decisions:
      - decision: "o que foi escolhido"
        rationale: "por que (quando visível)"
    highlight: "DESTAQUE: ... ou 'sem diferencial técnico claro'"
    completeness: "completo | em desenvolvimento | INCOMPLETO: motivo"

creator:
  name: "Diego"
  role: "Fullstack Software Engineer & Game Developer"
  tone_detected: "tom identificado"
  current_bio_pt: "bio atual PT-BR"
  current_bio_en: "bio atual EN"
```

## Output Example

```yaml
focus:
  content_type: "all"
  target_project: "all"
  language: "Both"

portfolio_structure:
  sections:
    - name: "Saudação"
      current_text: "Opa, eu sou o Diego"
      component: "Home.tsx"
    - name: "Cargo"
      current_text: "Engenheiro de Software Fullstack & Game Dev"
      component: "Home.tsx"
    - name: "Meu Arsenal Técnico"
      current_text: "Meu Arsenal Técnico"
      component: "Home.tsx"
    - name: "Arquitetura e Lógica de Jogos"
      current_text: "Arquitetura e Lógica de Jogos"
      component: "Home.tsx"

projects:
  - name: "Portifólio Pessoal"
    type: "frontend"
    description_raw: "Site de portifólio React 18 + TypeScript com i18n customizado PT-BR/EN"
    stack:
      - tech: "React 18"
        role: "framework UI principal com hooks para estado"
      - tech: "TypeScript"
        role: "type safety em componentes e interfaces"
      - tech: "Vite"
        role: "build tool — dev server com HMR"
      - tech: "Tailwind CSS"
        role: "estilização utility-first, dark mode"
    features_implemented:
      - "Internacionalização PT-BR/EN com troca dinâmica via Context API"
      - "Seção de tecnologias categorizada (Mais Usados / Familiarizado / Aprendendo)"
      - "GameCard: componente para apresentar lógica de jogos"
      - "Header com navegação: Home, Sobre Mim, Jogos, Currículo"
    technical_decisions:
      - decision: "i18n via arquivos JSON locais sem biblioteca de terceiros"
        rationale: "elimina dependência externa para caso de uso simples"
    highlight: "DESTAQUE: i18n customizado sem i18next — demonstra capacidade de avaliar quando não precisar de uma biblioteca"
    completeness: "em desenvolvimento"

creator:
  name: "Diego"
  role: "Fullstack Software Engineer & Game Developer"
  tone_detected: "descontraído e técnico"
  current_bio_pt: "Opa, eu sou o Diego — Engenheiro de Software Fullstack & Game Dev"
  current_bio_en: "Hi, I'm Diego — Fullstack Software Engineer & Game Developer"
```

## Veto Conditions

Reject and redo if ANY of these are true:
1. Brief contém projetos ou funcionalidades não encontradas no código-fonte
2. Stack lista tecnologias sem descrever o papel de cada uma no projeto

## Quality Criteria

- [ ] Todos os arquivos listados em Context Loading foram lidos
- [ ] Cada projeto tem pelo menos 1 decisão técnica documentada (ou flag sem diferencial)
- [ ] Stack lista o papel de cada tecnologia, não apenas o nome
- [ ] Bio atual em PT-BR e EN está capturada em creator.current_bio_pt e current_bio_en
