# Plano — Vertical Slice (Costa Coral) + Testes

## Objetivo
Entregar uma ilha jogável de ponta a ponta para validar diversão, com movimento refinado, câmera polida, ambiente procedural rico, HUD real, áudio de feedback e testes.

## Decisões
- Ilha: 400x400m (grande)
- Terreno: malha fixa + props procedurais (scatter)
- Prioridade: sensação de movimento

## Etapas (Agentic Flow)

### Etapa 1 — Movement Controller Refinado
- Coyote time (0.1s)
- Jump buffer (0.1s)
- Dash com i-frames (0.2s)
- Aceleração/desaceleração suave
- Testes unitários de movimento

### Etapa 2 — Câmera Polida
- Follow suave com look-ahead
- Colisão com cenário (raycast)
- FOV dinâmico (zoom em sprint)
- Shake em impactos (respeitando reduce-motion)

### Etapa 3 — Animação
- Integrar AnimationController no Player
- Estados: idle, walk, run, jump, fall, attack
- Transições com fade

### Etapa 4 — Ambiente Procedural (Costa Coral)
- Scatter de vegetação (árvores, arbustos, grama) via Poisson disk
- Rochas e props aleatórios
- Variação de escala/rotação
- LOD e culling

### Etapa 5 — HUD Real
- Vida, stamina, fome ligados ao StateStore
- Barra de oxigênio (natação)
- Minimapa básico

### Etapa 6 — Áudio de Feedback
- Passos (superfície-dependente)
- Coleta de fruta
- Impacto/dano
- Música de fundo (camada)

### Etapa 7 — Testes Críticos
- StateStore, SaveManager
- Movement (coyote/buffer)
- Damage/combat

### Etapa 8 — Validação E2E
- Playwright: carregar ilha, mover, pular, coletar, sem erros
- Performance: 60 FPS

## Critérios de Aceite
- [ ] Movimento "game feel" aprovado em playtest
- [ ] 60 FPS em hardware mínimo
- [ ] Sem erros de console
- [ ] Testes passando
- [ ] Ambiente rico e interativo
