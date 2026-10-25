# 🌋 O Mundo de Zephyria

> Game 3D cooperativo multiplataforma construído com **Three.js**, **TypeScript** e **Webpack**.
> Explore ilhas vivas, domine dinossauros elementais e salve Zephyria dos Vorax.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.186-black?logo=three.js)](https://threejs.org/)
[![Webpack](https://img.shields.io/badge/Webpack-5-8DD6F9?logo=webpack)](https://webpack.js.org/)
[![Vitest](https://img.shields.io/badge/Vitest-5-6E9F18?logo=vitest)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## ✨ Destaques

- 🦖 **5 dinossauros elementais** com 3 estágios evolutivos e vínculo
- 🏝️ **8 ilhas** temáticas, 32 fases + epílogo
- 👥 **Co-op online 1–4** com progressão compartilhada
- 🎮 **Acessibilidade completa** (remapeamento, daltonismo, alto contraste, screen reader)
- 🌍 **Mundo vivo** (ciclo dia/noite, clima dinâmico)
- ⚡ **60 FPS @ 1080p** com LOD, Draco e KTX2

## 🚀 Início Rápido

```bash
# Clone
git clone https://github.com/Davidev29/o-mundo-de-zephyria.git
cd o-mundo-de-zephyria

# Instale
npm install

# Desenvolvimento
npm run dev        # http://localhost:8080

# Qualidade
npm run typecheck  # verificação de tipos
npm run lint       # lint
npm run test       # testes
npm run build      # build de produção
```

## 🗂️ Estrutura

```
packages/   core · game · shared · ui · net · audio
apps/       client (web) · server (Colyseus, futuro)
assets/     fonte de verdade (Blender, texturas, áudio)
tools/      build (Webpack) · blender (pipeline)
docs/       GDD · Story · Architecture · ADRs
```

## 📚 Documentação

- [`docs/GDD/README.md`](docs/GDD/README.md) — Game Design Document completo (v2.0)
- [`docs/STORY.md`](docs/STORY.md) — História detalhada
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — Arquitetura (v2.0 consultiva)
- [`docs/adr/`](docs/adr/) — Architecture Decision Records

## 🎮 Controles

| Ação | Teclado | Gamepad |
|------|---------|---------|
| Mover | WASD / Setas | Stick esquerdo |
| Pular | Espaço | A / × |
| Atacar | F | B / ○ |
| Interagir | E | X / □ |
| Pausar | Esc | Start |

## 🛠️ Stack

| Camada | Tecnologia |
|--------|------------|
| Render | Three.js (WebGL 2.0, abstração WebGPU) |
| Física | Rapier3D (`@dimforge/rapier3d-compat`) |
| Build | Webpack 5 + ts-loader |
| Linguagem | TypeScript (strict) |
| UI | React |
| Testes | Vitest + Playwright |
| Rede (futuro) | Colyseus |
| Persistência | IndexedDB |

## 🤝 Contribuindo

1. Fork o repositório
2. Crie uma branch: `git checkout -b feature/minha-feature`
3. Commit: `git commit -m "feat: descrição"`
4. Push: `git push origin feature/minha-feature`
5. Abra um Pull Request

## 📄 Licença

MIT — veja [LICENSE](LICENSE).

---

<p align="center">
  <em>Feito com 💚 para a comunidade de jogos.</em>
</p>
