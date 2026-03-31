---
task: "Extract Project Data"
order: 1
input:
  - generation_focus: "Arquivo generation-focus.md com tipo de conteúdo a gerar e projeto alvo"
  - repository_src: "Arquivos em src/ do portifólio do Diego"
  - locales: "src/locales/*.json — strings atuais do site em PT-BR e EN"
  - package_json: "package.json — dependências reais instaladas"
output:
  - project_brief: "Brief estruturado em YAML com dados extraídos dos projetos"
---

# Extract Project Data

Lê os arquivos do repositório do portifólio do Diego e extrai dados estruturados sobre projetos, stack técnica, funcionalidades implementadas e diferenciais técnicos. Produz um brief que a Carla Copy usará para escrever o texto do portifólio.

## Process

1. **Ler o foco**: carregar `squads/portfolio-content-generator/output/generation-focus.md` para entender o tipo de conteúdo solicitado (bio / descrição de projeto / seção do site) e se um projeto específico foi selecionado ou se deve extrair tudo.

2. **Mapear a estrutura atual**: ler `src/locales/pt-BR.json` (ou equivalente) e `src/locales/en.json` para entender as seções existentes, os textos atuais e o tom praticado. Ler `src/App.tsx` e `src/components/Home.tsx` para entender o layout e os componentes.

3. **Extrair dados dos componentes**: para cada componente relevante em `src/components/`, ler o arquivo e extrair: funcionalidades implementadas, lógica de negócio ou game logic, props e interfaces TypeScript (revelam a estrutura de dados). Para `GameCard.tsx`, extrair a lógica de jogo implementada com detalhe.

4. **Confirmar a stack**: ler `package.json` para obter a lista de dependências reais instaladas. Cruzar com os imports encontrados nos componentes para confirmar o que está realmente em uso.

5. **Identificar decisões técnicas**: para cada projeto ou funcionalidade significativa, identificar pelo menos 1 decisão arquitetural — o que foi escolhido e por que (quando visível no código). Se não for óbvio, sinalizar como decisão implícita.

6. **Produzir o brief**: compilar todos os dados no formato YAML definido abaixo e salvar em `squads/portfolio-content-generator/output/project-brief.md`.

## Output Format

```yaml
focus:
  content_type: "bio | project_description | section_copy | all"
  target_project: "nome do projeto ou 'all' ou 'bio'"
  language: "Português (BR)"

portfolio_structure:
  sections:
    - name: "nome da seção em PT-BR"
      current_text: "texto atual em PT-BR conforme locales"
      component: "componente React responsável"

projects:
  - name: "nome do projeto"
    type: "fullstack | game | frontend | backend | library"
    description_raw: "descrição técnica neutra e concreta"
    stack:
      - tech: "tecnologia"
        role: "o que essa tecnologia faz neste projeto especificamente"
    features_implemented:
      - "funcionalidade 1 descrita concretamente"
      - "funcionalidade 2"
    technical_decisions:
      - decision: "o que foi escolhido"
        rationale: "por que (quando visível no código)"
    highlight: "DESTAQUE: algo impressionante ou não óbvio, ou 'sem diferencial técnico claro'"
    completeness: "completo | em desenvolvimento | INCOMPLETO: [motivo]"

creator:
  name: "Diego"
  role: "Fullstack Software Engineer & Game Developer"
  tone_detected: "tom identificado nos locales e componentes"
  current_bio_pt: "bio atual em PT-BR se existir"
  current_bio_en: "bio atual em EN se existir"
```

## Output Example

```yaml
focus:
  content_type: "project_description"
  target_project: "all"
  language: "Português (BR)"

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
    description_raw: "Site de portifólio construído com React 18 e TypeScript, com suporte a múltiplos idiomas via sistema de localização customizado baseado em arquivos JSON"
    stack:
      - tech: "React 18"
        role: "framework UI principal, gerenciamento de estado via hooks e Context API"
      - tech: "TypeScript"
        role: "type safety em todos os componentes e interfaces de dados"
      - tech: "Vite"
        role: "build tool para desenvolvimento com HMR e produção otimizada"
      - tech: "Tailwind CSS"
        role: "estilização utility-first, dark mode via classe bg-gray-950"
    features_implemented:
      - "Internacionalização PT-BR/EN com troca dinâmica de idioma via Context"
      - "Seção de tecnologias categorizada: Mais Utilizados / Familiarizado / Aprendendo"
      - "GameCard: componente dedicado para apresentar lógica e arquitetura de jogos"
      - "Header com navegação: Home, Sobre Mim, Jogos, Currículo"
    technical_decisions:
      - decision: "i18n implementado com arquivos JSON locais em vez de biblioteca como i18next"
        rationale: "reduz bundle size e elimina dependência externa para um caso de uso simples"
      - decision: "Tailwind CSS para estilização"
        rationale: "utility-first reduz CSS customizado e acelera iteração visual"
    highlight: "DESTAQUE: sistema de i18n customizado sem dependência externa — mostra capacidade de avaliar quando não precisar de uma biblioteca"
    completeness: "em desenvolvimento"

creator:
  name: "Diego"
  role: "Fullstack Software Engineer & Game Developer"
  tone_detected: "descontraído e técnico — PT-BR usa 'Opa, eu sou o Diego'; EN usa 'Hi, I'm Diego'"
  current_bio_pt: "Opa, eu sou o Diego — Engenheiro de Software Fullstack & Game Dev"
  current_bio_en: "Hi, I'm Diego — Fullstack Software Engineer & Game Developer"
```

## Quality Criteria

- [ ] Todos os arquivos do foco foram lidos antes de produzir o brief
- [ ] Cada projeto tem pelo menos 1 decisão técnica documentada (ou flag "sem diferencial técnico claro")
- [ ] Stack lista o papel de cada tecnologia, não apenas o nome
- [ ] Seções atuais do portifólio estão mapeadas com texto atual dos arquivos locales
- [ ] A bio atual em PT-BR e EN está capturada no campo creator

## Veto Conditions

Reject and redo if ANY are true:
1. Brief contém projetos ou funcionalidades não encontradas no código (invenção de dados)
2. Stack de algum projeto lista apenas nomes de tecnologia sem papel ou contexto de uso
