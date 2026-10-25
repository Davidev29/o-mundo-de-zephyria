# 07 — Multiplayer e Rede

## 7.1 Escopo no Lançamento
- **Co-op online 1–4** (campanha). Progressão compartilhada.
- **Modos adicionais (Should):** Corrida Selvagem (2–8), Sobrevivência Vorax (1–4), Duelo de Guardiões (2–4).

## 7.2 Arquitetura de Rede
- **Servidor autoritativo** (Node.js) + **Geckos.io (WebRTC)** para transporte.
- **Física (Rapier3D)** no servidor para autoridade; cliente prediz.
- **Estado do mundo** sincronizado (inimigos, puzzles, chefes).

## 7.3 Mecânicas Co-op
- Revive por item de ressurreição (magia).
- Puzzles cooperativos (alavancas 2+ jogadores).
- Chefes com aggro dividido.
- Chat de voz (WebRTC), chat de texto, ping system, emotes.

## 7.4 Tela Dividida
- Não no lançamento (Could para pós-launch).

## 7.5 Matchmaking
- Convite por código/sala; lobby com até 4 jogadores.
- Save compartilhado: progresso da campanha sincronizado para todos os participantes.

## 7.6 Latência
- Alvo: < 100ms. Predição de movimento + reconciliação.
- Fallback: modo offline single-player sempre disponível.
