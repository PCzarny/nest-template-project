# ADR-0001: Monorepo Architecture Decision for HTTP Service and RabbitMQ Worker

## Status History

- `Proposed` (2025-12-30)
- `Accepted` (2025-12-30)

## Context

The project needs to be extended with an additional service that processes messages from RabbitMQ. This service should:

- Be independently scalable from the HTTP service
- Share business logic with the HTTP service (auth, users, reports, prisma)
- Be deployed through a shared CI/CD pipeline
- Enable independent versioning and deployment of both services

The current project structure is a single NestJS HTTP service with modules in the `src/` directory.

## Decision Drivers

- **Shared code**: Both services need access to the same business logic
- **Independent scaling**: API and Worker must be scaled separately
- **Shared CI/CD**: One pipeline for both services
- **Type safety**: Maintain type safety between services
- **Maintainability**: Ease of refactoring and synchronizing changes
- **Independent deployments**: Ability to deploy one service without the other

## Considered Options

### Option 1: NestJS Monorepo

Structure based on NestJS built-in monorepo support with `nest-cli.json` configuration.

**Structure:**

```
nest-template-project/
├── apps/
│   ├── api/                    # HTTP Service
│   └── worker/                 # RabbitMQ Service
├── libs/                       # Shared libraries
│   ├── common/
│   ├── prisma/
│   ├── auth/
│   ├── users/
│   └── reports/
└── nest-cli.json               # Monorepo configuration
```

**Advantages:**

- ✅ Native NestJS CLI support for monorepo
- ✅ Automatic dependency management between projects
- ✅ TypeScript path mapping support
- ✅ Integrated build/test tools
- ✅ Easy refactoring between projects
- ✅ Type safety out-of-the-box
- ✅ No need to build shared libraries before applications
- ✅ Clear separation between applications and libraries

**Disadvantages:**

- ⚠️ Requires knowledge of NestJS monorepo configuration
- ⚠️ Less flexible than standard workspaces
- ⚠️ Dependency on NestJS CLI

**Configuration example:**

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "monorepo": true,
  "root": "apps/api",
  "projects": {
    "api": {
      "type": "application",
      "root": "apps/api"
    },
    "worker": {
      "type": "application",
      "root": "apps/worker"
    },
    "common": {
      "type": "library",
      "root": "libs/common"
    }
  }
}
```

**CI/CD:**

- Single workflow building both services
- Separate jobs for build/deploy of each service
- Shared cache for node_modules

---

### Option 2: Yarn/NPM Workspaces (without NestJS monorepo)

Standard workspaces with separate NestJS projects, each with its own configuration.

**Structure:**

```
nest-template-project/
├── packages/
│   ├── shared/                 # Shared code as npm package
│   ├── api/                    # HTTP Service (separate nest-cli.json)
│   └── worker/                 # RabbitMQ Service (separate nest-cli.json)
├── package.json                # Root workspace config
└── yarn.lock                   # Single lockfile
```

**Advantages:**

- ✅ Simpler than NestJS monorepo - standard workspaces
- ✅ Each service has its own NestJS configuration
- ✅ Greater flexibility in configuration
- ✅ Independent build processes
- ✅ Single lockfile for all dependencies
- ✅ Easier to understand for developers

**Disadvantages:**

- ⚠️ Requires manual dependency management between packages
- ⚠️ Need to build shared package before others
- ⚠️ Requires TypeScript paths configuration in each project

**Configuration example:**

```json
// Root package.json
{
  "workspaces": ["packages/*"],
  "scripts": {
    "build:shared": "yarn workspace @project/shared build",
    "build:api": "yarn workspace @project/api build",
    "build:worker": "yarn workspace @project/worker build"
  }
}

// packages/shared/package.json
{
  "name": "@project/shared",
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
}

// packages/api/package.json
{
  "name": "@project/api",
  "dependencies": {
    "@project/shared": "*"
  }
}
```

**CI/CD:**

- Build shared package as first step
- Parallel builds for api and worker (after shared build)
- Separate Dockerfile for each service
- Shared cache for node_modules

---

### Option 3: Separate repositories + shared npm package

Each service in a separate repository, shared code as a published npm package.

**Structure:**

```
github.com/org/
├── nest-api/                   # Separate repo
├── nest-worker/                # Separate repo
└── nest-shared/                # Separate repo (published to npm/GitHub Packages)
```

**Advantages:**

- ✅ Complete repository independence
- ✅ Shared package as versioned artifact
- ✅ Possibility of different teams per repo
- ✅ Independent CI/CD per repo
- ✅ Easier permission management

**Disadvantages:**

- ⚠️ More repositories to manage
- ⚠️ Requires publishing shared package (npm/GitHub Packages)
- ⚠️ More difficult to synchronize changes in shared code
- ⚠️ Greater setup complexity
- ⚠️ Type safety requires publishing types
- ⚠️ More difficult refactoring between repositories

**Configuration example:**

```json
// nest-shared/package.json
{
  "name": "@your-org/nest-shared",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}

// nest-api/package.json
{
  "dependencies": {
    "@your-org/nest-shared": "^1.0.0"
  }
}
```

**CI/CD:**

- Shared package published on each release
- Each repo has its own workflow
- Possibility to use reusable workflows in GitHub Actions
- Requires npm registry authentication configuration

---

## Decision Outcome

**Chosen option: Option 1 - NestJS Monorepo**

### Rationale

Option 1 (NestJS Monorepo) was chosen as the best solution for the following reasons:

1. **Dedicated framework support**: NestJS provides native, first-class support for monorepo structure through its CLI, ensuring seamless integration and optimal tooling
2. **No pre-build requirement**: Unlike workspace-based solutions, there's no need to build shared libraries before building applications. NestJS CLI handles dependencies automatically
3. **Clear separation**: The structure clearly distinguishes between applications (`apps/`) and libraries (`libs/`), making the codebase more maintainable and easier to understand
4. **Type safety**: Full type safety between projects without additional configuration
5. **Integrated tooling**: Built-in support for build, test, and development workflows
6. **Easy refactoring**: Moving code between projects is straightforward with NestJS CLI support

### Implementation

1. **Directory structure:**
   - `apps/api/` - HTTP service (current code from `src/`)
   - `apps/worker/` - New RabbitMQ service
   - `libs/common/` - Shared common code (filters, middleware, guards)
   - `libs/prisma/` - Prisma service
   - `libs/auth/` - Authentication logic
   - `libs/users/` - User logic
   - `libs/reports/` - Reports logic

2. **Configuration:**
   - Root `nest-cli.json` with monorepo configuration
   - Each library has its own `tsconfig.lib.json`
   - Each application has its own `tsconfig.app.json`
   - TypeScript path mapping configured automatically

3. **CI/CD:**
   - Job `install` - installs all dependencies
   - Job `test:api` and `test:worker` - parallel tests
   - Job `build:api` and `build:worker` - parallel builds (no need to build libs separately)
   - Job `deploy:api` and `deploy:worker` - independent deployments

4. **Docker:**
   - Separate Dockerfile for each service
   - Build process uses NestJS CLI which handles library dependencies automatically

### Consequences

**Positive:**

- ✅ Native framework support reduces configuration overhead
- ✅ No manual build order management required
- ✅ Clear separation between applications and libraries
- ✅ Independent scaling and deployments
- ✅ Single lockfile for all dependencies
- ✅ Integrated development experience

**Negative:**

- ⚠️ Requires understanding of NestJS monorepo configuration
- ⚠️ Larger repository size (everything in one place)
- ⚠️ Dependency on NestJS CLI tooling

**Risks:**

- Risk: Learning curve for NestJS monorepo - **Mitigation**: Well-documented approach, standard NestJS pattern
- Risk: Build complexity - **Mitigation**: NestJS CLI handles most complexity automatically

## References

- [NestJS Monorepo Documentation](https://docs.nestjs.com/cli/monorepo)
- [NestJS Microservices - RabbitMQ](https://docs.nestjs.com/microservices/rabbitmq)
- [Yarn Workspaces](https://classic.yarnpkg.com/docs/workspaces/)
- [Architecture Decision Records](https://github.com/joelparkerhenderson/architecture-decision-record)

## Notes

- The decision can be changed in the future if project needs change
- If the project grows to more than 3-4 services, consider transitioning to separate repositories
- If there's a need to share libraries with other projects, they can be easily extracted to a separate repository
