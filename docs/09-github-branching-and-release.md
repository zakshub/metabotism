# MetaBotism - GitHub Branching and Release

Repository: `https://github.com/zakshub/metabotism`

## Branch model

- `main`: protected, releasable code only.
- `feat/*`: product work, for example `feat/web-ai-dashboard`.
- `fix/*`: defects and regressions.
- `chore/*`: tooling, dependency, and operational changes.

## Change workflow

1. Create a focused branch from `main`.
2. Make the smallest coherent change.
3. Run `npm run build`, `npm run build:api`, and relevant smoke tests.
4. Update docs and `.env.example` when behavior or deployment changes.
5. Push the branch and open a pull request into `main`.
6. Review safety, secrets, privacy, and rollback impact.
7. Merge only after checks pass; tag a release for deployable milestones.

## Commit style

Use imperative conventional prefixes: `feat:`, `fix:`, `docs:`, `chore:`, `test:`, `refactor:`. Never commit `.env`, API keys, Android signing files, `local.properties`, `node_modules`, or build output.

## Release gates

- Frontend and API TypeScript builds pass.
- No secrets in tracked files or history.
- API returns a clear degraded response when no key is configured.
- Core dashboard works without network.
- AI behavior tests cover prohibited medical outputs.
- VPS runbook, backup/restore procedure, and rollback version are documented.
