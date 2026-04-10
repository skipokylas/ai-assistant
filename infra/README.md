# Infra (AWS CDK)

Infrastructure code for deploying project resources.

Current scope:
- Frontend static hosting (S3 + CloudFront + OAC)

Planned scope:
- Backend deployment stack
- Data stack (RDS, queues, storage integrations)

## Stack Naming

Stack name pattern:
- `AiAssistant-<stage>-FrontendHosting`

`stage` comes from CDK context:
- default: `dev`
- override via `--context stage=<name>`

## Prerequisites

1. Configure AWS credentials/profile (AWS CLI).
2. Bootstrap CDK once per account/region:
   - `npx cdk bootstrap aws://<ACCOUNT_ID>/<REGION> --profile <PROFILE>`

## Commands

- Compile infra TypeScript:
  - `npm run build`
- Build frontend + synth infra:
  - `npm run synth:frontend`
- Build frontend + deploy frontend hosting:
  - `npm run deploy:frontend`

## Deployment Examples

- Deploy with explicit profile:
  - `npm run deploy:frontend -- --profile my-aws-profile`

- Deploy to prod stage:
  - `npm run deploy:frontend -- --context stage=prod --profile my-aws-profile`

## Notes

- Frontend assets are read from:
  - `../frontend/dist/frontend-app/browser`
- This means frontend build must run before synth/deploy (scripts already do this).
