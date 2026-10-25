# 02 — Core Loop e Mecânicas Fundamentais

## 2.1 Core Loop (Macro)
```
Explorar ilha → Coletar recursos/frutas → Combater inimigos → Resolver puzzles →
Derrotar chefe → Libertar Guardião → Obter cristal/montaria → Desbloquear próxima ilha
```
Loop de sessão: 25–70 min por fase (varia por ilha).

## 2.2 Core Loop (Micro)
```
Mover → Pular/Escalar → Coletar → Combater → Interagir → Checkpoint → Repetir
```

## 2.3 Mecânicas de Movimento
| Mecânica | Input | Descrição | Desbloqueio |
|----------|-------|-----------|-------------|
| Caminhar/Correr | WASD / Stick | Movimento 3D relativo à câmera | Inicial |
| Pular | Espaço / A | Salto com física | Inicial |
| Salto Duplo | Espaço no ar | Segundo salto | Nv. 5 |
| Dash (Investida) | Shift / RB | Deslocamento rápido, i-frames curtos | Nv. 10 |
| Wall Jump | Pular na parede | Salto reativo em paredes | Ilha 1-2 |
| Escalada em vinhas | Segurar | Subir superfícies verticais | Ilha 1-2 |
| Natação | Automático | Movimento em água; respiração limitada (barra de oxigênio) | Ilha 1-3 |
| Planador (asa-delta) | Segurar no ar | Planar longas distâncias | Ilha 4-1 |
| Montaria | E perto do dino | Cavalgar dinossauro com habilidades | Após libertar |

## 2.4 Sistema de Vida, Fome e Stamina
- **Vida:** drena passivamente 1 HP/5s fora de combate? Não — vida drena por dano; "fome" drena stamina e reduz regen.
- **Fome:** barra que decai a 1%/min. Abaixo de 30%, stamina regen -50% e velocidade -10%.
- **Stamina:** usada por dash, escalada, ataques pesados. Regen quando parado/andando.
- **Frutas:** restauram vida/fome; coletáveis no cenário e dropadas por inimigos.

## 2.5 Checkpoints e Morte
- **Checkpoints:** totem de pedra brilhante; ativação automática ao passar.
- **Morte:** reaparece no último checkpoint; perde 30% da moeda coletada na fase (não do total).
- **Co-op revive:** aliado coleta **Item de Ressurreição** (magia) e usa em jogador caído em até 15s; após 15s, jogador reaparece no checkpoint.

## 2.6 Interação e Itens
- **Interagir (E):** alavancas, terminais, portas, NPCs, montar dino.
- **Coleta automática:** frutas, moedas, essências ao tocar.
- **Baús:** abrem com E; loot por raridade.

## 2.7 Ciclo Dia/Noite e Clima
- **Ciclo:** 10 min dia / 5 min noite (configurável).
- **Noite:** inimigos +20% dano e spawn aumentado; visibilidade reduzida; frutas bioluminescentes aparecem.
- **Clima:** chuva (visão -30%, som de passos), vento (afeta saltos/planador), neve (velocidade -15%), tempestade (raios = perigo).
- Efeitos mecânicos ativos (Must).

## 2.8 Input
- Teclado+mouse, gamepad (Xbox/PS), touch (mobile pós-launch).
- Remapeamento completo de teclas/botões (Must, acessibilidade).
- Vibração (gamepad) para impactos (Should).
