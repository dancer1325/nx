# Nx and the Angular CLI

* goal
  * Nx vs Angular CLI

* [youtube](https://www.youtube.com/embed/bwPkz4MrPDI?si=OLPUENWXLkQ9GRtR)

* Nx history
  * | originally
    * 👀== extension of the Angular CLI 👀
  * | nowadays
    * == [fully standalone CLI / AVAILABLE | MULTIPLE frameworks](/getting-started/why-nx#how-does-nx-work)

## TL;DR: Why should I use Nx for my Angular project?

* define clear architectural guidelines
* best practices to organize & scale your codebase
* integrate modern tooling -- by actively working with -- devtool authors
* is adaptable
  * == you can start with 1!-project setup -- and grow it to a -- monorepo
* active community of
  * contributors
  * plugin authors
* proven | large enterprise-level projects

### Overview Comparison Angular CLI vs  Nx

| Feature/Tool                                                                                          | Angular CLI     | Nx            |
| ----------------------------------------------------------------------------------------------------- | --------------- | ------------- |
| Create Angular Apps                                                                                   | ✅              | ✅            |
| Generate Angular Components, Services, etc.                                                           | ✅              | ✅            |
| Building & Bundling                                                                                   | ✅              | ✅            |
| Local Development Server                                                                              | ✅              | ✅            |
| Code Schematics                                                                                       | ✅              | ✅            |
| Automated Update with Migrations                                                                      | ✅              | ✅ (Enhanced) |
| Generators                                                                                            | ✅ (Schematics) | ✅            |
| Executors                                                                                             | ✅ (Builders)   | ✅            |
| Advanced Generators (e.g. Module Federation, Tailwind,...)                                            | ❌              | ✅            |
| Integrated Tooling (Jest, Cypress, Playwright etc.)                                                   | ❌              | ✅            |
| Support for [single-project Workspaces](/getting-started/tutorials/angular-standalone-tutorial)       | ✅              | ✅            |
| First-Class [Monorepo Support](/getting-started/tutorials/angular-monorepo-tutorial)                  | ❌\*            | ✅            |
| [Enforced Module Boundaries](/features/enforce-module-boundaries)                                     | ❌              | ✅            |
| Interactive [Project Graph](/features/explore-graph)                                                  | ❌              | ✅            |
| Task Graph                                                                                            | ❌              | ✅            |
| [Running Tasks in Parallel](/recipes/running-tasks/run-tasks-in-parallel)                             | ❌              | ✅            |
| Building, Testing [Only What is Affected](/features/run-tasks#run-tasks-on-projects-affected-by-a-pr) | ❌              | ✅            |
| [Local Caching](/features/cache-task-results)                                                         | ❌\*\*          | ✅            |
| [Remote Caching](/ci/features/remote-cache)                                                           | ❌              | ✅            |
| [Distributed Task Execution on CI](/ci/features/distribute-task-execution)                            | ❌              | ✅            |
| Custom Hashers                                                                                        | ❌              | ✅            |
| [Extensible Plugin System](/extending-nx/intro/getting-started)                                       | ❌              | ✅            |

* monorepo
  * created with NX -- more optimized than -- created with Angular CLI
  * if you want to create -- via Angular CLI, create -- Angular ng-packagr projects

* caching
  * | Angular CLI,
    * persists the Webpack/ESBuild/"TS incremental build info" cache | disk
      * see [caching mechanism](https://angular.dev/cli/cache)  
  * | Nx
    * MORE powerful process-level caching / framework agnostic

## Similarities and Differences

### ⚠️NOT JUST for Monorepos ⚠️

* Nx
  * ⚠️NOT just exclusively for monorepos ⚠️
  * allows
    * creating
      * single-project workspace ( == Angular CLI )
        * see [Angular single-project workspace tutorial](../tutorials/Angular%20Standalone) 
      * monorepo workspace (== MULTIPLE projects | 1! repo)

### Generate a new project

* `npx create-nx-workspace myngapp --preset=angular-standalone`
  * create a standalone Angular application

```plaintext
└─ myngapp
   ├─ ...
   ├─ src
   │  ├─ app
   │  │  ├─ app.component.css
   │  │  ├─ app.component.html
   │  │  ├─ app.component.spec.ts
   │  │  ├─ app.component.ts
   │  │  └─ app.module.ts
   │  ├─ assets
   │  ├─ favicon.ico
   │  ├─ index.html
   │  ├─ main.ts
   │  └─ styles.css
   ├─ nx.json
   ├─ package.json
   ├─ project.json
   ├─ ...
```

* `npx create-nx-workspace myngapp --preset=angular-monorepo`
  * create an Angular monorepo, from scratch

### project.json vs angular.json

* Nx's projects & targets format == `angular.json`
* 👁️number of configuration files 👁️
  * `angular.json`
    * 1! file | root / EVERY project
  * Nx
    * multiple `project.json`
    * 1 `project.json` / each project
* Migrations and schematics / -- done by the -- Angular devkit 
  * -- expect a -- `angular.json`
  * ALSO work | Nx
    * Reason: 🧠Nx handles it by you automatically 🧠
* check [Nx project configuration](/reference/project-configuration)

### Executors vs. Builders, Generators vs. Schematics

* **Angular Builders** == Nx [Executors](/concepts/executors-and-configurations)
  * allows defining, how to
    * build,
    * test,
    * lint,
    * serve your project
  * -> accepts
    * [Nx Plugins' Nx executors](https://nx.dev/plugin-registry) or
    * Angular Devkit's Angular Builders 

    ```json
    {
      "name": "myngapp",
      ...
      "targets": {
        "build": {
          "executor": "@angular-devkit/build-angular:browser",
          ...
        },
        ...
      }
    }
    ```

* **Angular Schematics** == Nx [Generators](/features/generate-code)
  * _Example:_

    ```shell
    npx nx g @schematics/angular:component my-component
    ```  

  * if you want to invoke -> `ng` -- is replaced by -- `nx`
    * _Example:_ 

        ```shell
        npx nx g @nx/angular:component my-component
        ```

* if you want to get support to run Angular Devkit builders & schematics -> install the [`@nx/angular` plugin](/docs/generated/packages/angular/documents/overview.md)
  * 👀if you create a NEW Angular workspace with Nx or [migrate an existing Angular CLI workspace to Nx](#migrate-from-the-angular-cli) -> installed by default 👀

### Running Commands

* switch `ng` -- with -- `nx`
  * _Example:_

    ```shell
    npx nx serve
    ```

* Nx has more abilities
  * run commands in parallel,
  * run | specific projects
  * ...
  * see [here](../features/run-tasks.md)

### Integrating with Modern Tools

* TODO:
An Angular-based Nx Workspace already comes with a lot of batteries included:

- Prettier preconfigured
- ESLint
- e2e testing with [Cypress](https://www.cypress.io/) or [Playwright](https://playwright.dev/)
- unit testing with [Jest](https://jestjs.io/)

But Nx expands beyond just that, offering automated integration with a lot of modern tools such as [Storybook](https://storybook.js.org/) or [Tailwind](https://tailwindcss.com/) just to mention a few.

### 'ng update' vs. 'nx migrate'

Like the Angular CLI, Nx has a command that allows you to upgrade your existing workspace tools, packages, and source code to the next version.
Instead of `ng update`, you run `nx migrate`:

```shell
npx nx migrate latest
```

What's the difference?

`nx migrate` is a much-improved version of `ng update`. It runs the same migrations but allows you to:

- Rerun the same migration multiple times.
- Reorder migrations.
- Skip migrations.
- Fix migrations that "almost work".
- Commit a partially migrated state.
- Change versions of packages to match org requirements.
- [Opt out of Angular updates when updating Nx versions](/recipes/tips-n-tricks/advanced-update#choosing-optional-package-updates-to-apply) as long as [the Angular version is still supported](/nx-api/angular/documents/angular-nx-version-matrix)

`nx migrate` does this by splitting the process into two steps. `nx migrate latest` creates a `migrations.json` file with a list of all the migrations needed by Nx, Angular, and other packages. You can then modify that file before running `nx migrate --run-migrations` to execute those migrations.

To reiterate: `nx migrate` runs the migrations written by the Angular team the same way `ng update` runs them. So everything should still work. You just get more control over how it works. You can learn more in our docs about [Automate Updating Dependencies](/features/automate-updating-dependencies).

### 'nx add'

The [`nx add` command](/nx-api/nx/documents/add) is similar to the `ng add` command. It installs a given package specifier (e.g. `@nx/react`, `@nx/react@18.1.0`, `@nx/react@latest`) and it runs an `init` or `ng-add` generator if the installed package contains it.

```shell
nx add [package]
```

The command was introduced in **Nx 17.3.0**. If you're using an older version, you can instead run:

{% tabs %}
{% tab label="npm" %}

```shell
npm add [package]
nx g [package]:ng-add
```

{% /tab %}

{% tab label="yarn" %}

```shell
yarn add [package]
nx g [package]:ng-add
```

{% /tab %}

{% tab label="pnpm" %}

```shell
pnpm add [package]
nx g [package]:ng-add
```

{% /tab %}
{% /tabs %}

Replace `[package]` with the package name you're trying to add.

### Speed

Nx is designed to be fast. The Angular CLI leverages Webpack's caching, which Nx also does since it relies on the Angular Devkit when it comes to compiling or running apps. But Nx goes way beyond that, introducing features vital for a fast CI experience, mainly when you have a monorepo.

Features like

- only running tasks on [affected projects](/ci/features/affected)
- running [tasks in parallel](/features/run-tasks#run-tasks-for-multiple-projects)
- applying [computation caching](/features/cache-task-results)
- offering [remote caching abilities](/ci/features/remote-cache) on CI
- offering [task distribution across machines (Nx Agents)](/ci/features/distribute-task-execution)

And, Nx already uses fast, modern tooling like [ESBuild](/nx-api/esbuild), [Vite](/nx-api/vite), Vitest and [Rspack](/nx-api/rspack) for non-Angular stacks. So once Angular is ready to use these tools, Nx will also be ready.

### Editor Integration

Nx goes beyond being just a CLI and comes with [Nx Console](/getting-started/editor-setup), a VSCode and WebStorm extension allowing you to run commands, generate code and visualize your workspace.

![Nx Console screenshot](/shared/images/nx-console/nx-console-screenshot.webp)

### Scaling: Start Simple, Grow to a Monorepo

Nx is really made to scale with you. You can

- start small with a single-project workspace
- modularize your application into more fine-grained libraries for better maintainability as your application (and team) grows ([more about that here](/getting-started/tutorials/angular-standalone-tutorial#modularizing-your-angular-app-with-local-libraries)), including mechanisms to make sure [things stay within their boundaries](/features/enforce-module-boundaries)
- you can then migrate to a monorepo when you are ready and need one ([more here](/recipes/tips-n-tricks/standalone-to-integrated))
- or even [add Webpack Module Federation support](/recipes/angular/module-federation-with-ssr)

### Visualize your Workspace

As you start modularizing your Angular workspace, Nx can visualize it using the `nx graph` command or via [Nx Console](/getting-started/editor-setup) directly in your editor.

{% graph height="450px" %}

```json
{
  "hash": "58420bb4002bb9b6914bdeb7808c77a591a089fc82aaee11e656d73b2735e3fa",
  "projects": [
    {
      "name": "shared-product-state",
      "type": "lib",
      "data": {
        "tags": ["scope:shared", "type:state"]
      }
    },
    {
      "name": "shared-product-types",
      "type": "lib",
      "data": {
        "tags": ["type:types", "scope:shared"]
      }
    },
    {
      "name": "shared-product-data",
      "type": "lib",
      "data": {
        "tags": ["type:data", "scope:shared"]
      }
    },
    {
      "name": "cart-cart-page",
      "type": "lib",
      "data": {
        "tags": ["scope:cart", "type:feature"]
      }
    },
    {
      "name": "shared-styles",
      "type": "lib",
      "data": {
        "tags": ["scope:shared", "type:styles"]
      }
    },
    {
      "name": "cart-e2e",
      "type": "e2e",
      "data": {
        "tags": ["scope:cart", "type:e2e"]
      }
    },
    {
      "name": "cart",
      "type": "app",
      "data": {
        "tags": ["type:app", "scope:cart"]
      }
    }
  ],
  "dependencies": {
    "shared-product-state": [
      {
        "source": "shared-product-state",
        "target": "shared-product-data",
        "type": "static"
      },
      {
        "source": "shared-product-state",
        "target": "shared-product-types",
        "type": "static"
      }
    ],
    "shared-product-types": [],
    "shared-product-data": [
      {
        "source": "shared-product-data",
        "target": "shared-product-types",
        "type": "static"
      }
    ],
    "shared-e2e-utils": [],
    "cart-cart-page": [
      {
        "source": "cart-cart-page",
        "target": "shared-product-state",
        "type": "static"
      }
    ],
    "shared-styles": [],
    "cart-e2e": [
      { "source": "cart-e2e", "target": "cart", "type": "implicit" }
    ],
    "cart": [
      { "source": "cart", "target": "shared-styles", "type": "implicit" },
      { "source": "cart", "target": "cart-cart-page", "type": "static" }
    ]
  },
  "workspaceLayout": {
    "appsDir": "apps",
    "libsDir": "libs"
  },
  "affectedProjectIds": [],
  "focus": null,
  "groupByFolder": false,
  "exclude": [],
  "enableTooltips": true
}
```

{% /graph %}

Learn more about the [graph features here](/features/explore-graph).

### Extensible and Customizable: Make it fit your own needs

Nx is [built to be extensible](/getting-started/why-nx#how-does-nx-work). Just like the [packages published by the Nx core team](/nx-api) you can create your own Nx plugins by [extending Nx](/extending-nx/intro/getting-started). This can be as simple as using [run-commands](/nx-api/nx/executors/run-commands) to integrate custom commands into the project configuration or as complex as [creating your own local executor](/extending-nx/recipes/local-executors).

And if you ever need to expand beyond Angular or diversify your stack, you can still keep using Nx, which is [battle-tested with many different technologies](/getting-started/intro#pick-your-stack).

## Migrate from the Angular CLI?

Migrating an Angular CLI project to Nx can be done by running

```shell
npx nx@latest init
```

or alternatively using the `--integrated` flag if you want to create an Nx monorepo right away. Learn more about all the details on the [dedicated docs page](/recipes/angular/migration/angular).

There is also a guide describing how to [consolidate multiple Angular CLI projects into a single Nx monorepo](/recipes/angular/migration/angular-multiple).

You can learn more about Angular & Nx by following our dedicated tutorials:

- [Tutorial: Building Angular Apps with the Nx Standalone Projects Setup](/getting-started/tutorials/angular-standalone-tutorial)
- [Tutorial: Building Angular Apps in an Nx Monorepo](/getting-started/tutorials/angular-monorepo-tutorial)
