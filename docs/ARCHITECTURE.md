# Arquitetura — O Mundo de Zephyria (v2.0 Consultiva)

> Avaliação crítica + plano de arquitetura saudável e escalável.
> Decisões: monorepo por packages, GLTF/GLB, Blender, estado custom leve, abstração WebGL/WebGPU.

## 1. Avaliação Crítica do Estado Atual

### 1.1 Pontos Fortes
- Separação básica por domínio (`core`, `entities`, `levels`, `ui`, `net`, `shared`).
- Tipagem TypeScript strict.
- Build funcional (Webpack + ts-loader).
- Física Rapier integrada.
- AssetLoader com cache e suporte DRACO/KTX2.
- Documentação GDD + Story.

### 1.2 Lacunas Tecnológicas (Carente)
| Área | Situação Atual | Risco | Proposta |
|------|----------------|-------|----------|
| Testes | Nenhum | Regressões silenciosas | Vitest (unit) + Playwright (E2E) |
| Lint/Format | Nenhum | Inconsistência | ESLint + Prettier + Husky |
| CI/CD | Nenhum | Builds manuais | GitHub Actions (lint/typecheck/test/build) |
| Estado | Sem store | Acoplamento | Store leve (pub/sub) em `shared/state` |
| Animação | Não usado | Modelos estáticos | AnimationMixer + state machine |
| Áudio | Nenhum | Sem feedback | Sistema de áudio (Howler ou Web Audio) |
| Input | Só teclado | Sem gamepad/touch | Abstração de input (actions + devices) |
| Save | Nenhum | Perda de progresso | SaveManager (local + cloud) |
| Rede | Mock | Sem multiplayer real | Servidor Node + Geckos.io (futuro) |
| Localização | Hardcoded PT-BR | Sem i18n | Sistema de i18n (JSON) |
| Acessibilidade | Docs apenas | Sem implementação | Componentes acessíveis, ARIA |
| Assets | Sem compressão/LOD | Bundle grande | Draco/KTX2/Meshopt + LOD |
| Mobile | Não considerado | Sem touch | Touch controls + responsive |
| Observabilidade | console.log | Sem métricas | Telemetria opt-in |
| Env config | Nenhum | Hardcoded URLs | `.env` + config por ambiente |
| Docs técnicos | Básicos | Onboarding lento | TypeDoc + ADRs |

### 1.3 Acoplamentos a Reduzir
- `Player` instancia física diretamente; melhor via `PhysicsService`.
- `Engine` cria renderer/scene; melhor via `RenderService`.
- `main.ts` monta tudo manualmente; melhor via `GameFactory`/DI leve.
- Sem event bus; sistemas se chamam diretamente.

## 2. Arquitetura Alvo (Monorepo)

```
packages/
  core/                # engine, physics, input, camera, scene, assets, time, events, di
  game/                # entities, levels, gameplay, progression
  shared/              # types, constants, utils, state store, i18n
  ui/                  # hud, menus, components (DOM/WebGL overlay)
  audio/               # audio system
  net/                 # networking client/server abstractions
apps/
  client/              # entry point web (main.ts)
  server/              # (futuro) node authoritative server
tools/
  blender/             # export scripts, pipeline (python)
  build/               # webpack/vite configs
assets/                # fonte de verdade dos assets (Blender, texturas, áudio)
docs/                  # documentação
```

### 2.1 Responsabilidades por Pacote
- **core**: infraestrutura técnica (render, física, input, assets, eventos, DI). Não conhece regras de jogo.
- **game**: regras de jogo (entidades, níveis, progressão, combate). Usa core via interfaces.
- **shared**: tipos, constantes, utils, estado, i18n. Sem dependências de runtime.
- **ui**: apresentação (HUD, menus). Consome estado.
- **audio**: reprodução e mixagem.
- **net**: comunicação (cliente/servidor).
- **apps/client**: composição (GameFactory) + bootstrap.

## 3. Serviços e Injeção (Core Assembly)

### 3.1 Interfaces de Serviço
```ts
interface IRenderService { scene; camera; renderer; onFrame(cb); }
interface IPhysicsService { world; step(dt); createBody(desc); }
interface IInputService { actions; onAction(cb); }
interface IAssetService { loadGLTF(url); loadTexture(url); }
interface IAudioService { play(id); setVolume(); }
interface IStateService { get; set; subscribe; }
interface IEventBus { emit(event); on(event, cb); }
```

### 3.2 GameFactory (composição)
- Cria serviços.
- Injeta em sistemas de jogo.
- Monta cena inicial.
- Gerencia ciclo de vida (start/stop/dispose).

### 3.3 Event Bus
- Eventos: `player:damaged`, `enemy:defeated`, `level:loaded`, `item:collected`.
- Desacopla UI, áudio, telemetria.

## 4. Pipeline de Assets (Blender → Runtime)

### 4.1 Estrutura de Assets
```
assets/
  characters/
    player/
      source/          # player.blend
      exports/         # player.glb (Draco+KTX2)
      textures/        # png/ktx2
    dinosaurs/
      rex/ ...
    enemies/
    npcs/
  environments/
    costa-coral/
  props/
  ui/
  audio/
    music/
    sfx/
    voice/
```

### 4.2 Pipeline Blender
1. Modelar/rigar/animar no Blender.
2. Exportar GLB com Draco (mesh compression) e KTX2 (texturas) via add-on ou script.
3. Colocar em `assets/.../exports/`.
4. Build copia para `dist/assets/`.
5. AssetLoader carrega com DRACO/KTX2 (já suportado).

### 4.3 Convenções de Nomenclatura
- `player_idle.glb`, `rex_stage2.glb`, `costa_coral_props.glb`.
- Animações nomeadas: `idle`, `walk`, `run`, `jump`, `attack`.

### 4.4 LOD e Otimização
- Exportar LODs (LOD0/1/2) no Blender.
- Usar `THREE.LOD` no runtime.
- Texturas: 512px mobile, 1024px desktop.

## 5. Onde Criar Estética dos Personagens
- **Arte/Design:** `assets/characters/<nome>/source/` (Blender).
- **Export runtime:** `assets/characters/<nome>/exports/`.
- **Materiais/Shaders:** `client/src/shaders/` ou `packages/game/materials`.
- **Animações:** dentro do GLB; carregadas via AnimationMixer.
- **Skins/cosméticos:** variantes de material/texture; dados em `shared/constants/cosmetics`.

## 6. Módulos de Jogo (Responsabilidades)

- **PlayerModule:** input → movimento → física → animação.
- **CombatModule:** ataques, dano, i-frames, contra-ataque.
- **ProgressionModule:** XP, níveis, talentos, unlocks.
- **InventoryModule:** slots, itens, crafting.
- **DinoModule:** montaria, vínculo, habilidades, evolução.
- **LevelModule:** carregamento de fase, checkpoints, segredos.
- **EnemyModule:** IA, spawn, aggro.
- **BossModule:** padrões, fases, pontos fracos.
- **WorldModule:** mapa-múndi, dia/noite, clima, eventos.
- **QuestModule:** objetivos, narrativa triggers.

Cada módulo expõe serviços e consome Event Bus.

## 7. Estado e Persistência

- **StateStore:** store leve com slices (player, world, inventory, settings).
- **SaveManager:** serialização + versionamento + migração; local (IndexedDB) + cloud (Steam).
- **Config:** settings persistidas separadamente.

## 8. UI/UX Técnico

- **UI Framework:** DOM overlay (atual) com componentes reutilizáveis; considerar WebGL UI (troika) para 3D.
- **Acessibilidade:** ARIA, foco, remapeamento, escalas.
- **i18n:** JSON por idioma; chaves `ui.menu.start`.

## 9. Audio

- **AudioManager:** pools de áudio, mixagem, música adaptativa (camadas).
- **Formatos:** OGG + fallback MP3.
- **Spatial audio:** PannerNode para 3D.

## 10. Performance e Escalabilidade

- **Code splitting:** rotas/ilhas sob demanda.
- **Asset streaming:** carregar por zona.
- **Workers:** física em worker (opcional).
- **Profiling:** stats.js, performance marks.

## 11. Roadmap de Refatoração (Consultivo)

1. **Sprint 1:** Introduzir interfaces de serviço + GameFactory + Event Bus (sem quebrar build).
2. **Sprint 2:** StateStore + SaveManager + i18n.
3. **Sprint 3:** Input abstraction (gamepad/touch) + AnimationMixer.
4. **Sprint 4:** Audio system + acessibilidade implementada.
5. **Sprint 5:** Testes (Vitest + Playwright) + CI/CD.
6. **Sprint 6:** Pipeline Blender (Draco/KTX2) + LOD + otimização.

## 12. Decisões Pendentes (Perguntar)
- Migrar para monorepo agora ou manter pastas atuais e evoluir incrementalmente?
- Adotar Vite em vez de Webpack para HMR mais rápido?
- Introduzir framework de UI (React/Svelte) ou manter DOM puro?
- Servidor: Node + Geckos.io ou Colyseus?
- Persistência: IndexedDB ou localStorage?

---

## 13. Decisões Adotadas (Consultoria)
- **Migração:** monorepo aplicado (`packages/*`, `apps/client`, `assets`, `tools`).
- **Bundler:** Webpack (mantido).
- **UI:** React (ReactHUD implementado).
- **Servidor futuro:** Colyseus.
- **Persistência local:** IndexedDB.
- **Serviços:** EventBus, ServiceContainer, StateStore, GameFactory implementados.
- **Assets:** GLTF/GLB + DRACO + KTX2.

## 14. Módulos Implementados (Base Saudável)
- **Input:** `packages/core/src/input/InputService.ts` (teclado + gamepad, polling).
- **Save:** `packages/core/src/save/SaveManager.ts` (IndexedDB).
- **Env:** `packages/shared/src/config/env.ts` + webpack EnvironmentPlugin.
- **i18n:** `packages/shared/src/i18n/i18n.ts`.
- **Animação:** `packages/game/src/animation/AnimationController.ts` (AnimationMixer).
- **Áudio:** `packages/audio/src/AudioManager.ts` (Web Audio).
- **Acessibilidade:** `packages/shared/src/accessibility/AccessibilitySettings.ts`.
- **Telemetria:** `packages/core/src/telemetry/Telemetry.ts`.
- **Mobile:** `packages/ui/src/TouchControls.tsx`.
- **Testes:** Vitest (`packages/shared/src/state/StateStore.test.ts`).
- **Lint/Format:** ESLint (flat) + Prettier.
- **CI:** `.github/workflows/ci.yml`.
- **Servidor:** scaffold Colyseus em `apps/server`.

## 15. Comandos Atualizados
- `npm run lint`, `npm run format`, `npm run test`, `npm run test:watch`.

*Documento vivo — atualizar conforme decisões.*
