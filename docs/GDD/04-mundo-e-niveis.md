# 04 — Mundo, Níveis e Design de Fases

## 4.1 Estrutura do Mundo
Mapa-múndi 3D (Zephyria) com 8 ilhas em anel. Seleção de ilha/fase via mapa; viagem desbloqueada progressivamente.

## 4.2 Especificação por Ilha (Resumo)
| # | Ilha | Tema | Fases | Duração/fase | Chefe | Mecânica Nova |
|---|------|------|-------|--------------|-------|---------------|
| 1 | Costa Coral | Praias, cavernas marinhas | 1-1..1-4 | 25–35 min | Guardião Aqua | Movimento, coleta, wall jump, natação, puzzle de correntes |
| 2 | Forja Vulcânica | Vulcões, lava | 2-1..2-4 | 30–40 min | Ignis | Plataformas móveis, escudo térmico, montaria |
| 3 | Picos Glaciais | Neve, gelo | 3-1..3-4 | 30–45 min | Frostbite | Deslizamento, reflexão, patinação |
| 4 | Penhascos Tempestade | Desfiladeiros, tempestades | 4-1..4-4 | 35–50 min | Voltar | Correntes de ar, planador, para-raios |
| 5 | Deserto Esquecido | Dunas, ruínas | 5-1..5-4 | 35–50 min | Terrax | Areia movediça, puzzles de alavancas, subterrâneo |
| 6 | Abismo Abissal | Fossa oceânica | 6-1..6-4 | 40–55 min | Leviatã Vorax | Pressão/oxigênio, escuridão/bioluminescência |
| 7 | Fortaleza Vorax | Nave biomecânica | 7-1..7-4 | 40–60 min | Comandante Vex | Gravidade alterada, hackear terminais |
| 8 | Núcleo Devorador | Núcleo planetário | 8-1..8-4 | 45–70 min | Devorador Prime | Todas combinadas |

## 4.3 Design de Fase (Padrão)
Cada fase contém:
- **3–7 segredos** (passagens, mapas, frutas douradas).
- **Checkpoints** a cada 5–8 min de gameplay.
- **Mistura de combate/exploração/puzzle** (proporção ~40/35/25).
- **1 mini-boss ou evento** (Should).
- **Saída clara** + indicador de progresso.

## 4.4 Segredos e Colecionáveis
- Passagens secretas (paredes falsas, túneis).
- Mapas do tesouro (revelam localização de frutas douradas).
- Frutas douradas (100% = conquista "Colecionador").

## 4.5 Mapa-múndi
- 3D rotativo; ilhas desbloqueadas brilham; bloqueadas em cinza.
- Ícones: % de conclusão, segredos restantes, desafios diários.

## 4.6 Level Streaming
- Carregamento por zona (chunks) para manter memória baixa (web).
- LOD para terreno e vegetação.
- Streaming de assets via AssetLoader com cache.
