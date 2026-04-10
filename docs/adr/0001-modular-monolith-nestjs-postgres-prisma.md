# 0001-modular-monolith-nestjs-postgres-prisma

- Date: 2026-04-10
- Status: Accepted
- Deciders: project owner, AI coding agent
- Related: AGENTS.md baseline context

## Context
The project goal is to deliver a personal finance assistant MVP quickly (2-4 weeks) with:
- Telegram input (text + receipt photo)
- Expense storage and reports
- AI-assisted extraction/classification
- Angular dashboard

The system must remain easy to ship and debug while preserving clean architecture for future growth.

## Decision
Adopt the following baseline:
- Backend: Node.js + TypeScript + NestJS
- Architecture: modular monolith (not microservices)
- Database: PostgreSQL + Prisma
- Bot integration: Telegram webhook
- Object storage: AWS S3
- CDN/static: CloudFront
- AI usage: extraction/classification only
- Async processing: queue-based flow for OCR/AI tasks
- MongoDB: excluded from initial stage

## Consequences
- Faster MVP delivery with one deployable backend unit
- Strong structure for modules, DI, and testing from day one
- SQL-first reporting stays predictable and efficient
- Reduced operational complexity versus microservices + multi-db start
- Future changes (new messenger, Mongo, workers split) remain possible without rewrite

## Alternatives Considered
- Express/Fastify + ad-hoc structure: faster first commit, weaker long-term architecture discipline
- Microservices from start: unnecessary operational complexity for MVP scope
- PostgreSQL + MongoDB from start: extra complexity without immediate business need
