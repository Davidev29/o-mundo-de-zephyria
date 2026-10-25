# 01 — Visão, Pilares e Escopo

## 1.1 Visão do Produto
Criar um platformer de ação 3D cooperativo onde jogadores exploram ilhas vivas, domesticam dinossauros elementais e enfrentam um exército alienígena em um mundo que reage às suas escolhas. Experiência acessível, performática e distribuída via Steam (web tech), com caminho para consoles e mobile.

## 1.2 Pilares de Design (5)
| Pilar | Descrição | Manifestação |
|-------|-----------|--------------|
| Sobrevivência Ativa | Vida drena; recursos são vitais | Fome + stamina + coleta estratégica |
| Exploração Vertical | Níveis 3D com múltiplos caminhos/segredos | Wall jumps, escaladas, asa-delta, túneis |
| Dinossauros como Ferramentas | Cada dino resolve puzzles | Montaria, combate, travessia, exploração |
| Mundo Vivo | Ilhas reagem a clima, horário, ações | Ciclo dia/noite, clima dinâmico, ecossistema |
| Desafio Constante | Sempre há algo novo | Eventos, chefes semanais, desafios diários |

## 1.3 Público-Alvo
- Primário: jogadores 12–35 anos, fãs de platformers 3D (Crash, Spyro, Mario 3D) e co-op (It Takes Two, Lego).
- Secundário: famílias e jogadores casuais (acessibilidade completa).

## 1.4 Plataformas e Distribuição
- **Lançamento:** Steam (PC) via build web empacotada (Electron/Tauri).
- **Pós-launch:** consoles (Switch/PS/Xbox) e mobile (iOS/Android).
- **Requisito técnico:** stack web robusta, abstração de input (teclado/mouse, gamepad, touch), renderização escalável.

## 1.5 Escopo do Lançamento
- **8 ilhas completas** (32 fases + 4 epílogo).
- **5 dinossauros** jogáveis com 3 estágios evolutivos.
- **Co-op online 1–4** (campanha).
- **Modos adicionais:** Corrida Selvagem, Sobrevivência Vorax, Duelo de Guardiões (Should).
- **Idiomas:** PT-BR + EN.
- **Duração alvo:** até 20h single-player; multiplayer reduz tempo de história mas adiciona desafios cooperativos.

## 1.6 Modelo de Negócio
- Premium (compra única). Cosméticos desbloqueáveis via gameplay. Sem microtransações.

## 1.7 Métricas de Sucesso
- 60 FPS @ 1080p em hardware mínimo.
- Retenção D7 ≥ 40%.
- Co-op: ≥ 60% dos jogadores jogam com amigos.
- Acessibilidade: 100% dos menus navegáveis por teclado.

## 1.8 Fora de Escopo (Lançamento)
- Editor de níveis / modding.
- PvP ranqueado além do Duelo de Guardiões.
- Mais de 2 idiomas.
- Realidade virtual.
