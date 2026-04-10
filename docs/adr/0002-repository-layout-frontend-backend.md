# 0002-repository-layout-frontend-backend

- Date: 2026-04-10
- Status: Accepted
- Deciders: project owner, AI coding agent
- Related: AGENTS.md, ADR-0001

## Context
Project starts from empty repository and needs a clear structure for parallel development:
- backend (NestJS API)
- frontend (Angular dashboard)

The team wants fast onboarding and low structural complexity in MVP stage.

## Decision
Use top-level folders:
- `backend/` for NestJS application
- `frontend/` for Angular application

Keep `docs/` and `AGENTS.md` at repository root.

Do not add extra monorepo complexity (`apps/`, `packages/`, build orchestrators) until there is a concrete need.

## Consequences
- Simple and explicit project navigation
- Easy to bootstrap each application independently
- Lower setup overhead in early phase
- If shared code appears later, introduce `shared/` or `packages/` as a deliberate change

## Alternatives Considered
- `apps/backend` + `apps/frontend`: better for larger monorepos, unnecessary nesting now
- split into separate repos: weaker coordination for a tightly coupled MVP
