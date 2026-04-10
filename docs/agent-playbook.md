# Agent Collaboration Playbook

This guide is for working with AI coding agents on real projects.

## 1) Keep a Stable Context
- Put durable project decisions in `AGENTS.md`.
- Put architecture decisions in `docs/adr`.
- Keep business context and technical rules in the repo, not only in chat.

## 2) Write Tasks as Vertical Slices
- Ask for end-to-end increments, not abstract refactors.
- Example: "Implement text expense flow with validation, persistence, tests, and `/month` command."

## 3) Define Done Explicitly
Include acceptance criteria in every task:
- behavior
- edge cases
- tests
- observability/logging limits
- security/privacy constraints

## 4) Require Decision Rationale
When an agent proposes a change, ask:
- why this option
- what tradeoff it introduces
- what was rejected

This creates production-grade decision quality.

## 5) Enforce Safe Delivery
- Small PRs
- One concern per PR when possible
- Migrations reviewed separately
- No secret keys in repo
- Rollback note for risky changes

## 6) Standard Prompt Pattern
Use this structure for implementation requests:
- Goal
- Scope (in/out)
- Constraints (stack, style, policy)
- Deliverables (code/tests/docs)
- Acceptance criteria

## 7) Cadence for Team + Agent
- Before coding: confirm scope and assumptions
- During coding: short progress updates
- After coding: summary + verification results + known risks

## 8) Production Readiness Checks
Before release, ensure:
- idempotency for webhook/event-driven paths
- retries and dead-letter strategy for async workers
- audit trail for AI-assisted decisions
- privacy-safe logs and data retention policy
