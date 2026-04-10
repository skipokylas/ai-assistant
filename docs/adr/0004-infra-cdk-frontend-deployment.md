а# 0004-infra-cdk-frontend-deployment

- Date: 2026-04-10
- Status: Accepted
- Deciders: project owner, AI coding agent
- Related: ADR-0002, ADR-0003

## Context
The project needs a reliable command to deploy frontend assets to AWS now, while keeping infrastructure ready for backend deployment later.

There is an existing CDK project in `infra/`, but it previously used:
- hardcoded AWS account/region
- an outdated local asset source path
- a nested `.git` repository that conflicted with root-repo workflow

## Decision
Keep `infra/` as the single AWS CDK app and use it as part of the main repository.

Frontend deployment baseline:
- Stack name pattern: `AiAssistant-<stage>-FrontendHosting`
- Stage comes from CDK context (`stage`, default `dev`)
- Account/region come from standard CDK environment variables (`CDK_DEFAULT_ACCOUNT`, `CDK_DEFAULT_REGION`)
- Static asset source path: `../frontend/dist/frontend-app/browser`
- One-command deploy flow in `infra/package.json`:
  - `deploy:frontend` = build frontend + `cdk deploy`

## Consequences
- Frontend deployment is reproducible and consistent from one command.
- Stack configuration is environment-driven instead of hardcoded.
- Repo ownership is clean (no nested Git history in `infra/`).
- Backend/data stacks can be added in the same CDK app without structural migration.

## Alternatives Considered
- Keep hardcoded env in CDK entrypoint: simpler short-term, unsafe for multi-environment workflows.
- Separate infra repository: more operational overhead for this MVP stage.
