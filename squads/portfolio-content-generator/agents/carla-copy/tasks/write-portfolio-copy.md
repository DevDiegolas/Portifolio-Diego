---
task: "Write Portfolio Copy"
order: 1
input:
  - project_brief: "project-brief.md — dados estruturados extraídos pelo Pedro Projeto"
  - tone_of_voice: "pipeline/data/tone-of-voice.md — 6 tons disponíveis"
  - output_examples: "pipeline/data/output-examples.md — exemplos de referência"
output:
  - portfolio_copy_draft: "portfolio-copy-draft.md — textos do portifólio prontos para revisão"
---

# Write Portfolio Copy

Transforma o brief técnico do Pedro Projeto em textos de portifólio que convencem recrutadores. Escreve bio, descrições de projetos e seções do site com o tom adequado ao objetivo do Diego.

## Process

1. **Confirmar o tom**: ler `pipeline/data/tone-of-voice.md` e o tipo de conteúdo solicitado no brief. Recomendar o tom mais adequado ao usuário com uma justificativa rápida e apresentar alternativa. Aguardar confirmação antes de escrever. Para portifólio de Diego: Tom 1 (Descontraído e Técnico) é o padrão — mas validar com o usuário.

2. **Ler o brief completo**: carregar `squads/portfolio-content-generator/output/project-brief.md` e identificar: projetos listados, suas decisões técnicas, destaques sinalizados pelo Pedro, e o tom atual detectado no portifólio.

3. **Selecionar o framework por tipo de conteúdo**:
   - **Bio**: Elevator Pitch Formula (`[Nome] + [Especialidade] + [O que resolve/entrega] + [Diferencial]`) ou PAS (Problem-Agitate-Solution) — escolher baseado no tom confirmado
   - **Descrição de projeto**: Framework STAR (Situation → Task → Action → Result) — adaptar para PT-BR natural
   - **Seção do site**: Foco no objetivo da seção para o leitor, não no que Diego quer dizer

4. **Escrever o copy**: para cada item do conteúdo solicitado:
   - Bio: máximo 3-4 frases, aplicar o framework selecionado
   - Projeto: máximo 4-6 frases por projeto, começar pelo problema/contexto, incluir pelo menos 1 decisão técnica, fechar com resultado
   - Seção: 1-3 frases de apresentação da seção, foco no que o recrutador precisa entender

5. **Aplicar o 30-second scan test**: após escrever, reler como se fosse um recrutador com 30 segundos. O ponto principal ficou claro? Se não, reescrever.

6. **Salvar o draft**: compilar todo o copy em `squads/portfolio-content-generator/output/portfolio-copy-draft.md` no formato definido abaixo.

## Output Format

```markdown
# Portfolio Copy Draft

**Tom selecionado:** [nome do tom]
**Conteúdo gerado:** [bio / descrições de projetos / seções / todos]
**Data:** [data]

---

## Bio

### PT-BR
[texto da bio em português]

### EN
[texto da bio em inglês — somente se solicitado]

---

## Projetos

### [Nome do Projeto]

**PT-BR:**
[descrição em português]

**Stack mencionada:** [tecnologias citadas no copy]

---

## Seções do Site

### [Nome da Seção]

[texto proposto para a seção]

---

## Notas para Revisão

- [observação sobre dados fracos, se houver]
- [sugestão de melhoria para próxima iteração]
```

## Output Example

```markdown
# Portfolio Copy Draft

**Tom selecionado:** Descontraído e Técnico (Tom 1)
**Conteúdo gerado:** bio + descrição do portifólio
**Data:** 2026-03-31

---

## Bio

### PT-BR

Opa, eu sou o Diego — engenheiro fullstack com queda por Game Dev.

Construo do backend ao jogo: APIs, bancos de dados, e quando o projeto pede, pathfinding e state machines. TypeScript é minha linguagem principal, mas o que realmente me move é entender o sistema inteiro e entregar algo que funcione de ponta a ponta.

Se você precisa de alguém que cuida tanto da arquitetura quanto da experiência de quem usa, é por aqui.

### EN

Hey, I'm Diego — a fullstack engineer with a thing for game dev.

I build across the stack: APIs, databases, and when the project calls for it, pathfinding and state machines. TypeScript is my main language, but what drives me is understanding the full system and shipping something that works end-to-end.

If you need someone who thinks about both architecture and user experience, let's talk.

---

## Projetos

### Portifólio Pessoal

**PT-BR:**

Precisava de um portifólio bilíngue (PT-BR/EN) mas não queria inflar o bundle com i18next para um caso de uso simples. Implementei um sistema de i18n leve usando arquivos JSON e Context API do React. Troca dinâmica de idioma, zero dependência de terceiros.

Stack: React 18 + TypeScript + Vite + Tailwind CSS

**Stack mencionada:** React 18, TypeScript, Context API, Vite, Tailwind CSS

---

## Notas para Revisão

- Portifólio está em desenvolvimento — projetos de jogo não apareceram no código ainda. Quando GameCard tiver conteúdo real, vale adicionar 1-2 descrições de jogos.
- Bio pode ser adaptada para Tom 2 (Profissional) para uma versão LinkedIn sem alterar o portifólio principal.
```

## Quality Criteria

- [ ] Tom foi confirmado antes de qualquer escrita
- [ ] Bio não começa com "passionate", "hardworking" ou adjetivo genérico
- [ ] Cada projeto começa pelo problema/contexto, não pela tecnologia
- [ ] Nenhum adjetivo sem evidência está presente (robust, scalable, user-friendly)
- [ ] 30-second scan test foi aplicado e o ponto principal ficou claro
- [ ] Draft está no formato correto com todas as seções preenchidas

## Veto Conditions

Reject and redo if ANY are true:
1. Bio usa "passionate developer" ou equivalente sem evidência concreta
2. Alguma descrição de projeto começa com a tecnologia em vez do problema ou contexto
