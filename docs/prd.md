# Planeta Churros — Product Requirements Document (PRD)

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-03-22 | 1.0.0 | Versão inicial | Morgan (@pm) |

---

## 1. Goals and Background Context

### Goals

- Automatizar a criação de criativos (imagens e vídeos) para anúncios no Meta Ads usando IA
- Automatizar a configuração e publicação de campanhas no Gerenciador de Anúncios do Meta
- Implementar otimização automática de anúncios (pausar anúncios com baixa performance, escalar os rentáveis)
- Gerar relatórios automáticos de performance das campanhas
- Reduzir o tempo da equipe interna dedicado à gestão de tráfego pago
- Maximizar o retorno sobre investimento (ROI) com orçamento de até R$1.000/mês

### Background Context

O Planeta Churros é a 1ª loja especializada em churros artesanais do Brasil, localizada em Candeias, Jaboatão dos Guararapes - PE, fundada por Rafha Chicout. Com 51 mil seguidores no Instagram (@planetachurros) e presença no iFood, a marca já possui forte identidade digital mas busca escalar sua captação de clientes através de tráfego pago automatizado no Meta Ads.

Atualmente a equipe interna gerencia os anúncios manualmente, o que consome tempo e limita a capacidade de otimização em tempo real. O objetivo é criar um sistema de automação que opere com orçamento enxuto (até R$1.000/mês) e entregue máxima eficiência através de IA, liberando a equipe para focar em outras áreas do negócio.

---

## 2. Requirements

### Functional Requirements

- **FR1:** O sistema deve se integrar à API do Meta (Facebook Marketing API) para criar e gerenciar campanhas automaticamente
- **FR2:** O sistema deve gerar criativos (imagens e textos de anúncio) automaticamente usando IA, baseados no cardápio e identidade visual do Planeta Churros
- **FR3:** O sistema deve configurar campanhas com público-alvo automaticamente (raio geográfico de Candeias/Jaboatão dos Guararapes - PE, interesses em alimentação/churros)
- **FR4:** O sistema deve monitorar métricas de performance (CTR, CPC, ROAS, conversões) em tempo real
- **FR5:** O sistema deve pausar automaticamente anúncios com performance abaixo de thresholds configuráveis
- **FR6:** O sistema deve escalar automaticamente o orçamento de anúncios com alta performance dentro do limite definido
- **FR7:** O sistema deve gerar relatórios automáticos semanais e mensais de performance
- **FR8:** O sistema deve enviar alertas (WhatsApp ou e-mail) para a equipe quando ações importantes ocorrerem (campanha pausada, orçamento esgotado, anúncio escalado)
- **FR9:** O sistema deve ter um dashboard para visualização de métricas e controle das automações
- **FR10:** O sistema deve respeitar o limite de orçamento máximo de R$1.000/mês, nunca ultrapassando sem aprovação manual

### Non-Functional Requirements

- **NFR1:** O sistema deve utilizar a API oficial do Meta (Marketing API v21+) para garantir conformidade com os termos de serviço
- **NFR2:** O tempo de resposta do dashboard deve ser inferior a 3 segundos
- **NFR3:** As automações de otimização devem executar a cada 6 horas no mínimo
- **NFR4:** O sistema deve ser acessível via web responsivo (mobile e desktop)
- **NFR5:** Todas as credenciais da API do Meta devem ser armazenadas de forma segura (variáveis de ambiente, nunca em código)
- **NFR6:** O sistema deve manter logs de todas as ações automatizadas por no mínimo 90 dias

---

## 3. User Interface Design Goals

### Overall UX Vision

Interface simples e objetiva, focada na equipe interna do Planeta Churros. Painel de controle claro com métricas principais em destaque, ações rápidas e alertas visíveis. Visual alinhado à identidade da marca (cores quentes, remetendo ao universo dos churros).

### Key Interaction Paradigms

- Dashboard com cards de métricas (impressões, cliques, gasto, ROAS)
- Toggles simples para ativar/pausar automações
- Histórico de ações automatizadas com logs legíveis
- Relatórios exportáveis em PDF

### Core Screens and Views

1. **Dashboard Principal** — métricas do dia, semana e mês
2. **Campanhas Ativas** — status, performance e controles
3. **Criativos** — biblioteca de anúncios gerados por IA
4. **Relatórios** — performance histórica e exportação
5. **Configurações** — limites de orçamento, thresholds, alertas

### Accessibility

WCAG AA

### Branding

- Cores: tons quentes (marrom, dourado, laranja) alinhados à identidade visual do Planeta Churros
- Logo e elementos da marca presentes no sistema
- Tipografia clara e legível

### Target Device and Platforms

Web Responsivo (desktop e mobile)

---

## 4. Technical Assumptions

- **Stack:** Next.js (frontend) + Node.js/TypeScript (backend)
- **API:** Meta Marketing API v21+
- **IA para criativos:** OpenAI GPT-4 (textos) + DALL-E ou Canva API (imagens)
- **Banco de dados:** Supabase (PostgreSQL)
- **Hospedagem:** Vercel (frontend) + Railway (backend/workers)
- **Agendamento:** Cron jobs para otimização automática
- **Notificações:** WhatsApp via Evolution API ou Twilio

---

## 5. Epic Overview (MVP)

| Epic | Descrição | Prioridade |
|------|-----------|------------|
| Epic 1 | Integração com Meta Marketing API | ALTA |
| Epic 2 | Geração automática de criativos com IA | ALTA |
| Epic 3 | Automação de campanhas (criar, pausar, escalar) | ALTA |
| Epic 4 | Dashboard de métricas e controle | MÉDIA |
| Epic 5 | Relatórios automáticos e alertas | MÉDIA |

---

*Planeta Churros PRD v1.0.0 — Gerado por Morgan (@pm) via Synkra AIOX*
