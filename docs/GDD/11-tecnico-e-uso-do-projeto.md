# 11 — Seção Técnica — Como Usar o Projeto

## 11.1 Pré-requisitos
- Node.js ≥ 20, npm ≥ 10.
- Navegador moderno com WebGL 2.0 (Chrome 120+, Firefox 120+, Edge).

## 11.2 Instalação
```bash
git clone <repo>
cd "O MUNDO DE ZEFYA"
npm install
```

## 11.3 Comandos
| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento (porta 8080, HMR). |
| `npm run build` | Build de produção em `dist/`. |
| `npm run typecheck` | Verificação de tipos (tsc --noEmit). |
| `npm run preview` | Servidor de produção local. |

## 11.4 Estrutura e Convenções
- **Aliases:** `@core`, `@game`, `@shared`, `@ui`, `@net`, `@audio`.
- **Estrutura:** monorepo (`packages/*`, `apps/client`, `assets`, `tools`).
- **Path base:** `client/src` e `shared`.
- **Física:** singleton em `core/PhysicsWorld.ts`; sempre chamar `initPhysics()` antes de usar `getWorld()`.
- **Entidades:** estendem `Entity`; implementam `update(dt)`.
- **Níveis:** estendem `Level` (SceneLike); implementam `onEnter/onExit/update`.
- **Compartilhado:** tipos em `shared/types`, constantes em `shared/constants`, utils em `shared/utils`.

## 11.5 Como Adicionar uma Nova Ilha/Nível
1. Criar `client/src/levels/NovaIlha.ts` estendendo `Level`.
2. Em `onEnter`: adicionar luzes, terreno, colisores físicos, inimigos.
3. Registrar no `SceneManager` / mapa-múndi.
4. Adicionar entrada em `docs/GDD/04-mundo-e-niveis.md`.

## 11.6 Como Adicionar um Dinossauro
1. Criar classe em `client/src/entities/dinos/` estendendo `Dinosaur`.
2. Implementar `useAbility()`.
3. Adicionar estágios e vínculo na tabela de progressão.
4. Criar modelo/placeholder e registrar no inventário.

## 11.7 Como Adicionar um Inimigo
1. Instanciar `Enemy` com behavior e cor, ou criar subclasse para IA.
2. Adicionar à cena do nível; registrar no update loop.

## 11.8 Debugging
- DevTools do navegador: console, Performance, Memory.
- `console.log` em `main.ts` bootstrap para erros.
- Rapier: verifique colisores com helpers de debug (opcional).
- Playwright pode ser usado para smoke tests (navegar e checar console).

## 11.9 Testes
- Unitários para lógica compartilhada (`shared/`) — Jest/Vitest (a configurar).
- Smoke E2E via Playwright: carregar página, verificar canvas, sem erros de console.

## 11.10 Empacotamento para Steam
- Build web → empacotar com Electron/Tauri.
- Configurar Steamworks SDK para conquistas/cloud saves.
- Manter bundle < 5MB inicial; assets sob demanda.

## 11.11 Convenções de Código
- TypeScript strict; evitar `any`.
- Usar aliases de path.
- Commits pequenos e descritivos.
- Documentar sistemas novos em `docs/`.

## 11.12 Troubleshooting
- **"Physics not initialized"**: chamar `await engine.init()` antes de criar entidades.
- **Módulo não encontrado**: verificar alias no `webpack.config.cjs` e `tsconfig.json`.
- **Performance baixa**: reduzir sombras, LOD, qualidade automática.
- **Rapier wasm**: usar `@dimforge/rapier3d-compat` (já configurado).
