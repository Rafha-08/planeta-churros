# Planeta Churros — Arquitetura do Sistema de Automação Meta Ads

**Versão:** 1.0.0
**Data:** 2026-03-22
**Arquiteta:** Aria (@architect) via Synkra AIOX

---

## Visão Geral

Sistema de automação de tráfego pago no Meta Ads, construído sobre ferramentas **low-code/no-code**, operável pela equipe interna sem conhecimento técnico avançado.

---

## Princípios de Design

- **Simplicidade acima de tudo** — a equipe opera sem desenvolvedor
- **Custo controlado** — orçamento de até R$1.000/mês em anúncios
- **Automação visual** — fluxos criados em interfaces visuais (drag & drop)
- **Zero código** — nenhuma linha de código para operar o dia a dia

---

## Stack Tecnológica

### Camada de Automação (Cérebro do Sistema)
| Ferramenta | Função | Custo |
|------------|--------|-------|
| **n8n Cloud** | Orquestração de automações (workflows visuais) | ~R$100/mês |

### Camada de Anúncios
| Ferramenta | Função | Custo |
|------------|--------|-------|
| **Meta Marketing API** | Criar/pausar/escalar campanhas automaticamente | Grátis (via n8n) |
| **Gerenciador de Anúncios** | Visualização e controle manual quando necessário | Grátis |

### Camada de Criativos com IA
| Ferramenta | Função | Custo |
|------------|--------|-------|
| **Canva** | Criação de artes com templates da marca | Grátis/Pro |
| **ChatGPT (OpenAI)** | Geração automática de legendas e textos dos anúncios | ~R$50/mês |

### Camada de Relatórios
| Ferramenta | Função | Custo |
|------------|--------|-------|
| **Google Sheets** | Dashboard de métricas e relatórios automáticos | Grátis |
| **Google Looker Studio** | Gráficos e visualizações de performance | Grátis |

### Camada de Alertas
| Ferramenta | Função | Custo |
|------------|--------|-------|
| **WhatsApp (via n8n)** | Notificações automáticas para a equipe | Grátis |

---

## Arquitetura dos Fluxos (Workflows)

### Fluxo 1 — Geração de Criativos com IA
```
ChatGPT (gera texto do anúncio)
        ↓
Canva API (aplica texto no template da marca)
        ↓
Meta Ads (sobe o criativo automaticamente)
        ↓
WhatsApp (notifica equipe: "Novo anúncio criado!")
```

### Fluxo 2 — Monitoramento e Otimização (a cada 6h)
```
Meta Marketing API (coleta métricas de todas campanhas)
        ↓
n8n (verifica: CTR < 1%? CPC > R$2? ROAS < 2?)
        ↓
[SE RUIM] → Pausa o anúncio + Notifica equipe no WhatsApp
[SE BOM]  → Aumenta orçamento em 20% + Notifica equipe
        ↓
Google Sheets (registra todas as ações)
```

### Fluxo 3 — Relatório Semanal (toda segunda-feira, 9h)
```
Meta Marketing API (coleta dados da semana)
        ↓
Google Sheets (atualiza planilha de relatório)
        ↓
Looker Studio (atualiza dashboard)
        ↓
WhatsApp (envia resumo semanal para Rafha)
```

### Fluxo 4 — Controle de Orçamento (diário)
```
Meta Marketing API (verifica gasto total do mês)
        ↓
n8n (verifica: gasto > 90% do limite R$1.000?)
        ↓
[SIM] → Pausa todas campanhas + Alerta urgente no WhatsApp
[NÃO] → Registra no Sheets + Continua
```

---

## Diagrama de Componentes

```
┌─────────────────────────────────────────────────────┐
│                    n8n Cloud                         │
│              (Orquestrador Central)                  │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │ Fluxo 1  │  │ Fluxo 2  │  │    Fluxo 3 & 4   │  │
│  │Criativos │  │Otimização│  │Relatórios/Orçam. │  │
│  └────┬─────┘  └────┬─────┘  └────────┬─────────┘  │
└───────┼─────────────┼─────────────────┼─────────────┘
        │             │                 │
   ┌────▼─────┐  ┌────▼──────┐   ┌─────▼──────┐
   │  ChatGPT │  │Meta Ads   │   │Google      │
   │  + Canva │  │Marketing  │   │Sheets +    │
   │          │  │API        │   │Looker      │
   └────┬─────┘  └────┬──────┘   └─────┬──────┘
        │             │                │
        └─────────────▼────────────────┘
                       │
                ┌──────▼──────┐
                │  WhatsApp   │
                │  (Alertas)  │
                └─────────────┘
```

---

## Custo Total Estimado

| Item | Custo Mensal |
|------|-------------|
| n8n Cloud (Starter) | ~R$100 |
| ChatGPT API | ~R$50 |
| Canva Pro (opcional) | ~R$55 |
| Google Sheets/Looker | Grátis |
| **Total Infraestrutura** | **~R$150-205/mês** |
| **Orçamento Meta Ads** | **até R$1.000/mês** |
| **Total Geral** | **~R$1.150-1.205/mês** |

---

## Roadmap de Implementação

### Fase 1 — Fundação (Semana 1-2)
- [ ] Criar conta no n8n Cloud
- [ ] Conectar Meta Marketing API ao n8n
- [ ] Configurar Google Sheets como base de dados
- [ ] Criar Fluxo 4 (controle de orçamento) — PRIORITÁRIO

### Fase 2 — Otimização (Semana 3)
- [ ] Criar Fluxo 2 (monitoramento e otimização automática)
- [ ] Configurar alertas no WhatsApp
- [ ] Testar com campanha piloto

### Fase 3 — Criativos com IA (Semana 4)
- [ ] Conectar ChatGPT ao n8n
- [ ] Criar templates no Canva
- [ ] Criar Fluxo 1 (geração automática de criativos)

### Fase 4 — Relatórios (Semana 5)
- [ ] Criar dashboard no Looker Studio
- [ ] Criar Fluxo 3 (relatório semanal automático)
- [ ] Treinar equipe para usar o sistema

---

## Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|-------|--------------|-----------|
| API do Meta mudar sem aviso | Média | Monitorar changelog do Meta Developers |
| Orçamento estourar | Baixa | Fluxo 4 protege com pausa automática |
| Criativo inadequado gerado por IA | Média | Aprovação manual antes de publicar (modo seguro) |

---

*Planeta Churros Architecture v1.0.0 — Gerado por Aria (@architect) via Synkra AIOX*
