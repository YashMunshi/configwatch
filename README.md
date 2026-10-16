# ConfigWatch

Compare a versioned baseline with actual configuration, then inspect an approval-gated repair plan.

**Field:** Security automation & tooling  
**Relevant roles:** Security Engineer I · Security Automation Engineer  
**Status:** working prototype, published on GitHub and Vercel.

[**Open the live interactive lab**](https://configwatch.vercel.app/)

The hosted lab runs synthetic exercises in your browser. See the scope below for local integration exercises and limitations.

## Run

Requires Node.js 22 or newer. The core prototype has no npm dependencies.

```sh
npm test
npm run build
npm start
```

Open `http://127.0.0.1:8767`. Use `PORT=8770 npm start` for another port.
To run analysis without a browser:

```sh
npm run analyze
node run.mjs input.json
```

## Explore

1. Inspect disabled audit logging, short retention, public storage, and missing MFA in the sample.
2. Approve applying the plan to the isolated copy. Compare before, after, and rollback snapshots.
3. Edit the baseline or import your own sanitized JSON. Unsafe property paths are rejected.

## What is implemented

- A project-specific analysis engine shared by the browser and CLI.
- Guided controls plus editable/importable JSON input (maximum 1 MB).
- Computed decisions, supporting records, explicit empty/error states, and
  downloadable evidence containing the input and limitations.
- Individual visual identity: Blueprint comparison instrument, with self-hosted Source Code Pro and Manrope, a custom masthead, readable type, visible keyboard focus, and responsive data views.
- Independent boundary and regression tests in `tests/`.

## Scope and limitations

The engine reads and modifies JSON copies. It does not connect to a cloud account, enforce organizational policy, or mutate host settings.

All bundled identities, documents, logs, and advisories are fictional. Browser
inputs are visitor-controlled; this public demo is not a trusted security
boundary. Do not use it with private production data. Local enforcement or
provider runners, where provided, have their own documented setup and limits.
Do not report fixture outcomes as production results or live-model findings.

## Publish independently

This directory is a complete, separate GitHub/Vercel project. After creating a
repository, push this directory as its root. Import that repository in Vercel:
framework **Other**, build command **npm run build**, output **public**.
There are no required secrets for the public demo. Do not include `public/`,
`.env`, provider credentials, or actual investigation evidence in Git.

## Structure

- `web/engine.js`: domain-specific analysis and validation
- `web/runtime.js`: input validation, canonicalization, and hashing utilities
- `web/app.js`: accessible controls, result views, imports, and exports
- `tests/`: independently asserted security and behavior tests
- `docs/THREAT-MODEL.md`: trust boundaries and claims
- `scripts/`: optional local integrations, if applicable

## Validation

Run `npm test` for current results. Browser viewport checks and performance
metrics must be measured separately; passing engine tests does not establish
visual accessibility or production readiness.

Font notices are included in `web/fonts/`. Source code is MIT licensed.

## Local file remediation

`node scripts/repair-file.mjs input.json output.json` writes a preview report.
Add `--approve` to include a repaired configuration copy and the original
rollback snapshot. It refuses to overwrite the source or an existing output.
It never invokes a cloud API or changes the host's actual configuration.

## Visual identity

See [DESIGN.md](DESIGN.md) for this project’s typography, palette, header, and composition.
