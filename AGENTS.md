# AGENTS.md

This file is the persistent project context for AI coding agents.
Read it before making technical decisions.

## Product Goal
Build a personal finance assistant with:
- Telegram bot input
- AI-assisted receipt parsing
- Expense reports
- Angular web dashboard

## MVP v1 Scope
- User sends text expense (example: "АТБ 540 грн продукти")
- User sends receipt photo
- System extracts: date, total, merchant, category
- User confirms or corrects parsed result
- System stores expense
- Reports:
  - expenses today/week/month
  - totals by category
  - largest expenses

## Recommended Stack (Current Decision)
- Backend: Node.js + TypeScript + NestJS (modular monolith)
- Database: PostgreSQL
- ORM: Prisma
- Frontend: Angular 21 + PrimeNG
- Storage: AWS S3
- CDN/Web: CloudFront (for dashboard/static hosting)
- Bot transport: Telegram webhook
- AI: one provider for extraction/classification only
- Queue/async processing: required for photo/OCR/AI pipeline

## Explicitly Out of Scope for Initial Stage
- MongoDB (until there is a concrete need)
- Microservices architecture
- Multi-messenger support in v1

## Architecture Principles
- Start simple, ship small vertical slices
- Use modular monolith with clear modules:
  - auth
  - telegram
  - expenses
  - receipts
  - reports
  - ai
  - storage
- Keep business logic independent from Telegram-specific implementation

## Required Non-Functional Rules
- Webhook idempotency (avoid duplicate expense creation)
- Async processing for heavy tasks (OCR/AI must not block webhook)
- Human confirmation step for AI results
- Audit trail:
  - original message/event
  - extracted AI/OCR payload
  - final confirmed expense
- Privacy by default:
  - avoid logging sensitive receipt data in plaintext

## AI Usage Boundaries
Use AI for:
- OCR cleanup and structuring
- Merchant normalization
- Category classification

Do not use AI for:
- Monthly/weekly totals
- Aggregations
- SQL reports

## Core Domain Entities
- User
- ChatAccount
- Message
- Attachment
- Receipt
- Expense
- ExpenseItem
- Category
- Merchant

## Delivery Roadmap
Sprint 1:
- Telegram bot
- webhook endpoint
- `/start`
- create expense from text
- monthly report command

Sprint 2:
- PostgreSQL schema
- categories
- merchant normalization
- basic Angular dashboard

Sprint 3:
- receipt image upload
- S3 integration
- OCR/AI parsing
- confirmation flow

## Repository Layout (Current)
- `backend/` - NestJS backend application
- `frontend/` - Angular dashboard application
- `infra/` - AWS CDK infrastructure
- `docs/` - architecture and collaboration docs

## Deployment Baseline (Current)
- Frontend deploy is managed by CDK in `infra/`.
- Stack naming convention: `AiAssistant-<stage>-FrontendHosting` (default stage: `dev`).
- Frontend asset source for deployment: `frontend/dist/frontend-app/browser`.

## Agent Working Agreement
- If new decisions are made, update this file in the same PR.
- If user instructions conflict with this file, follow the latest user instruction.
- Prefer pragmatic incremental delivery over broad redesign.

## Decision Records
- Architecture decisions must be documented in `docs/adr`.
- Use ADR status lifecycle: `Proposed` -> `Accepted` -> `Superseded`.
- If an accepted ADR changes the baseline, update this file in the same PR.
