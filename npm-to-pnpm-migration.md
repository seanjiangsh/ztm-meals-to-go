# npm → pnpm Migration Roadmap

A step-by-step guide for migrating an existing npm project to pnpm v11 with supply-chain security hardening. Based on a real migration of a Vite + React + TypeScript project.

---

## Prerequisites

```bash
# Install or upgrade pnpm globally (use npm to bootstrap the first time)
npm install -g pnpm@latest

pnpm --version   # confirm v11+
```

---

## Step 1 — Import the lockfile

Convert `package-lock.json` (or `yarn.lock`) into `pnpm-lock.yaml` without re-resolving versions. This preserves your existing dependency tree for the first install.

```bash
pnpm import          # reads package-lock.json → writes pnpm-lock.yaml
rm package-lock.json # or yarn.lock
```

> If you don't have a lockfile, skip `pnpm import` and go straight to `pnpm install`.

---

## Step 2 — Declare the package manager

Add `packageManager` to `package.json` so pnpm enforces its own version via corepack and prevents accidental `npm install` runs.

```json
{
  "packageManager": "pnpm@11.2.2"
}
```

Enable corepack if you want the version to be auto-enforced across teammates:

```bash
corepack enable
```

---

## Step 3 — Update scripts

Replace `npm run` with `pnpm run` in any script that calls another script (e.g. `predeploy`):

```json
{
  "scripts": {
    "predeploy": "pnpm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

---

## Step 4 — Fix phantom dependencies

pnpm uses strict symlink isolation — packages can only import what they explicitly declare. npm's flat `node_modules` hides this problem.

**How to find them:** run `pnpm install` then `pnpm run build`. TypeScript will report `Cannot find module 'x'` for any package your code imports that isn't in your own `dependencies`/`devDependencies`.

**Fix:** add the missing package as a direct dependency.

```bash
pnpm add -D three-stdlib   # example: used by CameraRig.tsx but was only a transitive dep
```

---

## Step 5 — Create `.npmrc`

pnpm reads auth, registry, and SSL settings from `.npmrc`. Create it at the project root:

```ini
# ── Registry ──────────────────────────────────────────────────────────────────
registry=https://registry.npmjs.org/
strict-ssl=true

# ── Lockfile ──────────────────────────────────────────────────────────────────
lockfile=true
# Uncomment in CI to abort if lockfile is stale:
# frozen-lockfile=true

# ── Security: vulnerability threshold ─────────────────────────────────────────
audit-level=moderate
```

> **pnpm v11 note:** `.npmrc` is for auth/registry only. Workspace and security policies go in `pnpm-workspace.yaml` (Step 6).

---

## Step 6 — Create `pnpm-workspace.yaml`

In pnpm v11, the `pnpm.*` block in `package.json` is **ignored**. All workspace settings must live in `pnpm-workspace.yaml` at the project root.

```yaml
# ── Dependency overrides ───────────────────────────────────────────────────────
# Use this to force a single version of a package when peer-dep conflicts create
# multiple instances (e.g. dual @types/X versions causing TS errors).
# overrides:
#   "some-package": "1.2.3"

# ── Supply-chain security ──────────────────────────────────────────────────────
# Ref: https://pnpm.io/supply-chain-security

# 1. Build-script allowlist.
#    Only packages listed here may run install/postinstall scripts.
#    Find the packages your project needs by running `pnpm install` and checking
#    which postinstall scripts fire (esbuild, rollup, etc. download native bins).
allowBuilds:
  esbuild: true # downloads native binary in postinstall
  rollup: true # downloads native binary in postinstall

# 2. Block transitive deps from using exotic sources (git URLs, raw tarballs).
blockExoticSubdeps: true

# 3. Delay brand-new package versions by 3 days.
#    Malicious releases are usually yanked within hours; 3 days is a safe buffer.
#    strict: false → fall back to the last passing version instead of failing the build.
#    strict: true  → fail the build (better for CI gates / team environments).
minimumReleaseAge: 4320 # minutes (= 3 days)
minimumReleaseAgeStrict: false

# 4. Reject packages whose trust level decreased vs. prior releases
#    (e.g. previously signed with provenance, now unsigned — possible takeover).
trustPolicy: no-downgrade
# Skip the check for packages older than 1 year (pre-date provenance tooling).
trustPolicyIgnoreAfter: 525600 # minutes (= 1 year)
```

---

## Step 7 — Install and verify

```bash
pnpm install
pnpm run build   # must pass with zero errors
```

If `pnpm install` fails, check the error category:

| Error                                          | Cause                                            | Fix                                                                            |
| ---------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------ |
| `ERR_PNPM_TRUST_DOWNGRADE`                     | A package lost its provenance signature          | Run `pnpm clean --lockfile && pnpm install` to re-resolve to a trusted version |
| `ERR_PNPM_MINIMUM_RELEASE_AGE_VIOLATION`       | Lockfile has packages newer than your age window | Reduce `minimumReleaseAge` or set `strict: false` and rebuild lockfile         |
| `Cannot find module`                           | Phantom dependency                               | Add the missing package as a direct `devDependency`                            |
| Dual TS type errors (`Object3D`, `Euler` etc.) | Two versions of `@types/X` installed             | Add an `overrides` entry in `pnpm-workspace.yaml` to pin a single version      |

---

## Step 8 — CI lockfile guard (optional)

Add `frozen-lockfile=true` to `.npmrc` (or set it as an env var) in CI to abort if the lockfile is out of date:

```ini
# .npmrc (CI only, or controlled by env var)
frozen-lockfile=true
```

Or pass it per-command in your pipeline:

```bash
pnpm install --frozen-lockfile
```

---

## pnpm v11 breaking changes (migration gotchas)

| v9/v10 behaviour                    | v11 behaviour                                                                      |
| ----------------------------------- | ---------------------------------------------------------------------------------- |
| `pnpm.*` in `package.json` was read | `pnpm.*` in `package.json` is **silently ignored** — move to `pnpm-workspace.yaml` |
| `onlyBuiltDependencies` key         | Renamed to `allowBuilds`                                                           |
| `pnpm.overrides` in `package.json`  | Move to `overrides:` in `pnpm-workspace.yaml`                                      |

---

## Checklist

- [ ] `pnpm import` run, `package-lock.json` deleted
- [ ] `"packageManager": "pnpm@X.Y.Z"` added to `package.json`
- [ ] Scripts updated from `npm run` → `pnpm run`
- [ ] Phantom dependencies resolved (direct `devDependencies` added)
- [ ] `.npmrc` created with registry and SSL settings
- [ ] `pnpm-workspace.yaml` created with security policies
- [ ] `pnpm install` passes clean
- [ ] `pnpm run build` passes clean
- [ ] CI pipeline updated to use `pnpm install --frozen-lockfile`
