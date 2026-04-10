# 0003-frontend-angular21-primeng

- Date: 2026-04-10
- Status: Accepted
- Deciders: project owner, AI coding agent
- Related: AGENTS.md, ADR-0001, ADR-0002

## Context
The project needs a frontend foundation that can ship fast and support a dashboard-heavy UI:
- filters
- tables
- charts
- forms and dialogs

The owner already uses Angular and wants a pragmatic component library.

## Decision
Use:
- Angular 21 as frontend framework
- PrimeNG as default UI component library

Initialize PrimeNG at app bootstrap level and keep the app in standalone Angular style.

## Consequences
- Faster UI delivery via ready-made components
- Consistent visual language across dashboard screens
- Lower custom CSS/UI maintenance in MVP stage
- Dependency on PrimeNG APIs and theme system

## Alternatives Considered
- Angular Material: strong baseline but less aligned with requested component style
- Custom component system: too expensive for MVP timeline
