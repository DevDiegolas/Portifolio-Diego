---
execution: inline
agent: renata-revisao
inputFile: squads/portfolio-content-generator/output/portfolio-copy-draft.md
outputFile: squads/portfolio-content-generator/output/portfolio-copy-final.md
on_reject: 3
---

# Step 05: Review Portfolio Copy

## Context Loading

Load these files before executing:

- `squads/portfolio-content-generator/output/portfolio-copy-draft.md` — copy gerado pela Carla Copy
- `squads/portfolio-content-generator/pipeline/data/quality-criteria.md` — rubrica de avaliação com pesos e thresholds
- `squads/portfolio-content-generator/pipeline/data/anti-patterns.md` — anti-patterns para verificar

## Instructions

### Process

1. **Carregar e internalizar os critérios**: ler `quality-criteria.md` completamente antes de olhar para o copy. Guardar os 5 critérios, seus pesos e thresholds mínimos.

2. **Primeira leitura completa**: ler `portfolio-copy-draft.md` do início ao fim sem pausar para anotar. Objetivo: impressão geral e identificação de problemas flagrantes.

3. **Pontuar cada critério**: segunda leitura focada, avaliando cada critério individualmente em escala 1-10 com justificativa específica:
   - Critério 1 (25%): a bio comunica quem é e o que entrega em menos de 30 segundos?
   - Critério 2 (25%): pelo menos 1 projeto documenta impacto ou decisão técnica?
   - Critério 3 (20%): o tom é descontraído e técnico (ou o tom confirmado) de forma consistente?
   - Critério 4 (15%): raciocínio técnico é visível? Sem "passionate/user-friendly/robust" sem evidência?
   - Critério 5 (15%): parágrafos curtos, hierarquia clara, legível em 30 segundos?

4. **Calcular média ponderada e aplicar regras**:
   - APPROVE: média >= 7 e nenhum critério < 4
   - CONDITIONAL APPROVE: média >= 7 mas critério não-crítico entre 4-6
   - REJECT: média < 7 OU qualquer critério < 4 (hard trigger)

5. **Escrever o relatório**: no formato definido abaixo, incluir: tabela de scores, strengths (mínimo 1), required changes (se houver), suggestions non-blocking, veredito.

6. **Se APPROVE ou CONDITIONAL APPROVE**: salvar o copy (com ajustes required se necessário) em `portfolio-copy-final.md`.

## Output Format

```
==============================
 REVIEW VERDICT: [VEREDITO]
==============================

Content: [tipo revisado]
Author: Carla Copy
Review Date: [data]
Revision: [N] of 3

------------------------------
 SCORING TABLE
------------------------------
| Critério                      | Peso | Score | Resumo                    |
|-------------------------------|------|-------|---------------------------|
| Clareza da proposta de valor  | 25%  | X/10  | [1 frase]                 |
| Evidência de impacto          | 25%  | X/10  | [1 frase]                 |
| Tom correto                   | 20%  | X/10  | [1 frase]                 |
| Ausência de sinais de júnior  | 15%  | X/10  | [1 frase]                 |
| Estrutura e escaneabilidade   | 15%  | X/10  | [1 frase]                 |
------------------------------
 MÉDIA PONDERADA: X.X/10
------------------------------

DETAILED FEEDBACK:

Strength: [específico, com localização]

[Required change: específico + onde + como corrigir]

[Suggestion (non-blocking): melhoria opcional + exemplo]

VERDICT: [VEREDITO] — [justificativa 1-2 frases]
```

## Output Example

```
==============================
 REVIEW VERDICT: APPROVE
==============================

Content: Bio PT-BR + EN + descrição portifólio
Author: Carla Copy
Review Date: 2026-03-31
Revision: 1 of 3

------------------------------
 SCORING TABLE
------------------------------
| Critério                      | Peso | Score | Resumo                                                           |
|-------------------------------|------|-------|------------------------------------------------------------------|
| Clareza da proposta de valor  | 25%  | 9/10  | Bio entrega especialidade + diferencial em 2 frases no PT-BR    |
| Evidência de impacto          | 25%  | 8/10  | Decisão i18n bem documentada; game dev projetos ainda ausentes  |
| Tom correto                   | 20%  | 9/10  | Tom 1 aplicado consistentemente; voz do Diego preservada        |
| Ausência de sinais de júnior  | 15%  | 8/10  | Raciocínio técnico visível na descrição do portifólio           |
| Estrutura e escaneabilidade   | 15%  | 8/10  | Parágrafos curtos, hierarquia clara, scan-friendly              |
------------------------------
 MÉDIA PONDERADA: 8.5/10
------------------------------

DETAILED FEEDBACK:

Strength: A bio PT-BR abre com a voz real do Diego ("Opa, eu sou o Diego") e entrega especialidade (fullstack + game dev) e diferencial (entende o sistema inteiro de ponta a ponta) nas próximas duas frases. Passa no 30-second scan test com facilidade.

Strength: A descrição do portifólio usa STAR corretamente — começa pelo problema (precisava de bilíngue sem inflar bundle), documenta a decisão técnica (i18n com JSON em vez de i18next), fecha com resultado (zero dependência de terceiros). Exatamente o padrão que diferencia sênior de júnior na escrita.

Suggestion (non-blocking): A bio EN ("a background in game dev") é mais conservadora do que a PT-BR ("queda por Game Dev"). Se o mercado alvo for comunidade dev ou startups internacionais, vale alinhar o tom mais próximo do PT-BR para manter a personalidade.

Suggestion (non-blocking): Quando GameCard tiver conteúdo real de jogo, adicionar uma descrição de projeto de game dev vai elevar significativamente o score de Evidência de Impacto — é o diferencial mais único do perfil do Diego no mercado.

VERDICT: APPROVE — Copy atinge todos os critérios com média 8.5/10. Pronto para publicação. Suggestions opcionais para iteração futura.
```

## Veto Conditions

Reject and redo if ANY of these are true:
1. Algum critério foi pontuado sem justificativa (score sem "porque")
2. Veredito contradiz os scores (APPROVE com média < 7 ou critério < 4)

## Quality Criteria

- [ ] Todos os 5 critérios foram avaliados com score e justificativa
- [ ] Pelo menos 1 Strength explícito e específico está presente
- [ ] Veredito é consistente com scores e regras de decisão
- [ ] Required changes (se houver) incluem localização e sugestão concreta
