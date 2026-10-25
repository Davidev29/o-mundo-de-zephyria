# 05 — Combate, Inimigos e Chefes

## 5.1 Sistema de Combate
- **Estilo:** ação arcade. Leve, responsivo, foco em diversão.
- **Ataques:** leve (clique), pesado (segurar), combo (3 hits), aéreo.
- **Esquiva (dash):** i-frames 0.2s; cooldown 0.5s.
- **Contra-ataque:** janela de 0.3s após bloquear; desbloqueado Nv.15.
- **Stamina:** ataques consomem stamina; sem stamina, ataques mais lentos.
- **Lock-on:** opcional (segurar botão); câmera foca inimigo.

## 5.2 Classificação de Inimigos
| Tipo | Comportamento | Exemplo |
|------|---------------|---------|
| Passivo | Ignora jogador | Jabuti, Coelho |
| Agressivo | Ataca ao ver | Caranguejo, Lobo |
| Territorial | Defende área | Planta Carnívora |
| Emboscador | Surge do chão/água | Verme da Areia |
| Voador | Patrulha aérea | Harpia, Morcego |
| Blindado | Requer tática | Golem, Tartaruga |
| Elemental | Dano elemental | Elemental de Fogo |
| Vorax | Tecnológico, adaptativo | Drone, Soldado |

## 5.3 Chefes (8 + final)
Cada chefe tem 3–5 fases de vida, padrões de ataque telegrafados, pontos fracos.
- **Guardião Aqua** (Ilha 1): 3 fases; jato d'água, onda de choque, redemoinho, invocação de piranhas.
- **Ignis** (Ilha 2): 3 fases; bola de fogo, erupção, onda de calor, meteoro.
- **Frostbite** (Ilha 3): 3 fases; sopro, avalanche, estalactites, prisão de gelo.
- **Voltar** (Ilha 4): 3 fases; raio, tornado, chuva ácida, garras.
- **Terrax** (Ilha 5): 4 fases; terremoto, pilares, areia movediça, invocação de múmias.
- **Leviatã Vorax** (Ilha 6): 3 fases; plasma, redemoinho, choque, engolir.
- **Comandante Vex** (Ilha 7): 4 fases; laser, teleporte, clones, campo de força.
- **Devorador Prime** (Ilha 8): 5 fases; todos os elementos + novos.

## 5.4 Balanceamento de Dano (Alvos)
- Jogador base: 10 dano/ataque leve, 25 pesado.
- Inimigo comum: 20–40 HP.
- Chefe: 1000–5000 HP (escalável por dificuldade).
- Dificuldade dinâmica (rubber-band): ajusta HP/dano de inimigos em ±20% conforme desempenho.

## 5.5 Feedback de Combate
- Hit-stop 0.05s, screen shake leve, partículas de impacto, som.
- Indicador de dano (números flutuantes opcionais, acessibilidade).
- Barra de vida de chefe na UI.
