# Architecture Decision Records (ADR)

This folder stores architecture and major technical decisions.

## Why ADR
- Keeps decision history explicit
- Makes tradeoffs visible for new team members and AI agents
- Reduces repeated discussions about already accepted choices

## File Naming
- Use: `NNNN-short-kebab-title.md`
- Example: `0001-modular-monolith-nestjs-postgres-prisma.md`

## Statuses
- `Proposed`: under discussion
- `Accepted`: approved and current
- `Superseded`: replaced by a newer ADR

## Minimum ADR Sections
- Context
- Decision
- Consequences
- Alternatives Considered

## Workflow
1. Create or update ADR in the same PR as code changes.
2. If decision changes the baseline, update `AGENTS.md`.
3. Link related issues/PRs in ADR.

Use `docs/adr/_template.md` for new records.
