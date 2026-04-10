# AI Assistant

A personal finance assistant for expense tracking via Telegram and a web dashboard.

## What This Project Is
Users send expenses as text or receipt photos, the system stores them, and builds reports by period and category.
This project is built as a pet project focused on practicing `Node.js`, `Angular`, `AWS`, `SQL`, and AI integrations.

## MVP (Current Goal)
- Add expenses from text (example: `ATB 540 UAH groceries`)
- Add expenses from receipt photos
- Extract key fields: date, total, merchant, category
- Let users confirm or correct AI output
- Reports: daily/weekly/monthly, by category, largest expenses

## Architecture (Short)
- `backend/` — NestJS API (modular monolith)
- `frontend/` — Angular 21 + PrimeNG dashboard
- `PostgreSQL` + `Prisma` for transactional data and reporting
- `S3` for receipt image storage
- `Telegram webhook` for incoming messages
- AI is used for extraction/classification, not for SQL aggregations

## Documentation
- AI agent context: `AGENTS.md`
- Architecture Decision Records (ADR): `docs/adr`
- Agent collaboration playbook: `docs/agent-playbook.md`

## Frontend Deployment (AWS)
- Infra project location: `infra/`
- Command:
  - `npm --prefix infra run deploy:frontend -- --profile <aws-profile>`
