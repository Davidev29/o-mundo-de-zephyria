# ADR 0001 — Monorepo e Serviços

## Status
Aceito.

## Contexto
Necessidade de base saudável, escalável, com módulos separados e serviços.

## Decisão
- Adotar monorepo (`packages/*`, `apps/*`).
- Introduzir serviços: EventBus, ServiceContainer, StateStore, GameFactory.
- UI em React.
- Servidor futuro: Colyseus.
- Persistência: IndexedDB.

## Consequências
- Build mais organizado.
- Possibilidade de testes por pacote.
- Maior complexidade inicial, mitigada por documentação.
