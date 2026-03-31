---
task: "Review Portfolio Copy"
order: 1
input:
  - portfolio_copy_draft: "portfolio-copy-draft.md — copy gerado pela Carla Copy"
  - quality_criteria: "pipeline/data/quality-criteria.md — rubrica de avaliação"
output:
  - review_verdict: "Veredito estruturado com scores, required changes e suggestions"
  - portfolio_copy_final: "portfolio-copy-final.md — copy aprovado (quando APPROVE ou CONDITIONAL APPROVE)"
---

# Review Portfolio Copy

Avalia o copy de portifólio gerado pela Carla Copy contra critérios objetivos de recrutadores. Emite veredito estruturado APPROVE/REJECT/CONDITIONAL APPROVE com feedback específico e acionável.

## Process

1. **Carregar critérios**: ler `squads/portfolio-content-generator/pipeline/data/quality-criteria.md` antes de ler o copy. Entender os 5 critérios, seus pesos e thresholds mínimos.

2. **Ler o draft completo**: ler `squads/portfolio-content-generator/output/portfolio-copy-draft.md` do início ao fim sem interromper para anotar. Primeira leitura é para impressão geral e identificação de problemas flagrantes.

3. **Pontuar cada critério individualmente**:
   - Critério 1: Clareza da Proposta de Valor (25%) — a bio comunica quem é e o que entrega em 1-2 frases?
   - Critério 2: Evidência de Impacto (25%) — pelo menos 1 projeto tem resultado ou decisão técnica documentada?
   - Critério 3: Tom Correto (20%) — o tom reflete a identidade do Diego (descontraído e técnico) ou foi selecionado/confirmado?
   - Critério 4: Ausência de Sinais de Júnior (15%) — há raciocínio técnico visível, sem "passionate/user-friendly/robust" sem evidência?
   - Critério 5: Estrutura e Escaneabilidade (15%) — parágrafos curtos, hierarquia clara, legível em 30 segundos?

4. **Calcular média ponderada e aplicar regras de veredito**:
   - APPROVE: média >= 7/10 E nenhum critério < 4/10
   - CONDITIONAL APPROVE: média >= 7/10 MAS critério não-crítico entre 4-6/10
   - REJECT: média < 7/10 OU qualquer critério < 4/10 (hard trigger)

5. **Escrever o relatório de review** no formato definido abaixo, incluindo: tabela de scores, strengths, required changes (se houver), suggestions non-blocking, e veredito final.

6. **Se APPROVE ou CONDITIONAL APPROVE**: copiar o texto aprovado (com ajustes dos required changes se CONDITIONAL) para `squads/portfolio-content-generator/output/portfolio-copy-final.md`.

## Output Format

```
==============================
 REVIEW VERDICT: [APPROVE | REJECT | CONDITIONAL APPROVE]
==============================

Content: [tipo de conteúdo revisado]
Author: Carla Copy
Review Date: [data]
Revision: [N] of 3

------------------------------
 SCORING TABLE
------------------------------
| Critério                      | Peso | Score | Resumo                         |
|-------------------------------|------|-------|--------------------------------|
| Clareza da proposta de valor  | 25%  | X/10  | [resumo em 1 frase]            |
| Evidência de impacto          | 25%  | X/10  | [resumo em 1 frase]            |
| Tom correto                   | 20%  | X/10  | [resumo em 1 frase]            |
| Ausência de sinais de júnior  | 15%  | X/10  | [resumo em 1 frase]            |
| Estrutura e escaneabilidade   | 15%  | X/10  | [resumo em 1 frase]            |
------------------------------
 MÉDIA PONDERADA: X.X/10
------------------------------

DETAILED FEEDBACK:

Strength: [o que funcionou e por que é bom — específico com localização]

Strength: [segundo ponto forte — específico]

[Required change: (se houver) — o que está errado, onde está, como corrigir]

[Suggestion (non-blocking): (se houver) — melhoria opcional com exemplo]

VERDICT: [APPROVE/REJECT/CONDITIONAL APPROVE] — [justificativa em 1-2 frases]
```

## Output Example

```
==============================
 REVIEW VERDICT: CONDITIONAL APPROVE
==============================

Content: Bio PT-BR + descrição do portifólio pessoal
Author: Carla Copy
Review Date: 2026-03-31
Revision: 1 of 3

------------------------------
 SCORING TABLE
------------------------------
| Critério                      | Peso | Score | Resumo                                                |
|-------------------------------|------|-------|-------------------------------------------------------|
| Clareza da proposta de valor  | 25%  | 9/10  | Bio comunica especialidade e diferencial em 3 frases  |
| Evidência de impacto          | 25%  | 7/10  | Decisão i18n documentada; outros projetos sem impacto |
| Tom correto                   | 20%  | 9/10  | Tom 1 aplicado corretamente, voz do Diego preservada  |
| Ausência de sinais de júnior  | 15%  | 8/10  | Raciocínio técnico presente; sem clichês de júnior    |
| Estrutura e escaneabilidade   | 15%  | 6/10  | Bio ok; seção de notas muito longa para portifólio    |
------------------------------
 MÉDIA PONDERADA: 7.9/10
------------------------------

DETAILED FEEDBACK:

Strength: A bio PT-BR abre com a voz real do Diego ("Opa, eu sou o Diego") e entrega especialidade + diferencial nas próximas duas frases. Isso passa no 30-second scan test com folga — recrutador entende o perfil antes do segundo parágrafo.

Strength: A descrição do portifólio usa o framework STAR corretamente — começa pelo problema (precisava de bilíngue sem inflar o bundle), documenta a decisão técnica (i18n com JSON em vez de i18next), e fecha com resultado concreto (zero dependência de terceiros). Exatamente o que diferencia sênior de júnior na escrita.

Suggestion (non-blocking): A seção "Notas para Revisão" no draft não deve ir para o portifólio final — é para uso interno do squad. Remover antes de publicar. O conteúdo é válido como observação operacional, mas não faz parte do copy do site.

Suggestion (non-blocking): A bio EN é uma tradução direta da PT-BR. Funciona, mas poderia ser levemente adaptada para o contexto de mercado internacional — por exemplo, substituir "queda por Game Dev" (expressão idiomática BR) por "a background in game dev" que ressoa melhor para recrutadores EN.

VERDICT: CONDITIONAL APPROVE — Copy aprovado com ressalva. Remover a seção "Notas para Revisão" antes de publicar. Bio EN pode ser refinada como melhoria opcional.
```

## Quality Criteria

- [ ] Todos os 5 critérios foram pontuados com justificativa
- [ ] Pelo menos 1 Strength explícito e específico está presente
- [ ] Required changes (se houver) incluem localização e sugestão de correção
- [ ] Veredito é consistente com os scores e regras de decisão
- [ ] Non-blocking suggestions estão claramente separadas de Required changes

## Veto Conditions

Reject and redo if ANY are true:
1. Algum critério foi pontuado sem justificativa (score sem "porque")
2. Veredito contradiz os scores (ex: APPROVE com score médio < 7 ou critério < 4)
