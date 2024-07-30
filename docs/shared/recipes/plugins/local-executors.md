# Local Executors

* == create Executors | your workspace
* allows
  * 👁️standardizing scripts / run -- during your -- development/building/deploying tasks 👁️
    * -> provide guidance |
      * terminal -- via  `--help` -- &
      * invoking with [Nx Console](/getting-started/editor-setup)

* Goal here
  * | your Nx workspace
    * create,
    * run,
    * customize 

## Creating an executor

* create a local plugin

    ```shell {% skipRescope=true %}
    nx add @nx/plugin
    nx g @nx/plugin:plugin libs/my-plugin
    ```

* generate the initial files / needed for your executor -- via -- Nx CLI 

    ```shell
    nx generate @nx/plugin:executor echo --directory=libs/my-plugin/src/executors/echo
    ```

    * once the command is finished -> executor is created | plugin `executors` folder.

    ```text
    happynrwl/
    ├── apps/
    ├── libs/
    │   ├── my-plugin
    │   │   ├── src
    │   │   │   ├── executors
    │   │   │   |   └── echo/
    │   │   │   |   |    ├── executor.spec.ts
    │   │   │   |   |    ├── executor.ts
    │   │   │   |   |    ├── schema.d.ts
    │   │   │   |   |    └── schema.json
    ├── nx.json
    ├── package.json
    └── tsconfig.base.json
    ```

### schema.json

* == options / being sent to the executor 
  * == `schema.json` of generators
* if you set `cli` property | "nx.json" == Nx Devkit -- is used to make -- this executor

### executor.ts

* Your executor's implementation must
  * export a function / takes an options object and
  * returns a `Promise<{ success: boolean }>`

```typescript
import type { ExecutorContext } from '@nx/devkit';
import { exec } from 'child_process';
import { promisify } from 'util';

export interface EchoExecutorOptions {
  textToEcho: string;
}

export default async function echoExecutor(
  options: EchoExecutorOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  console.info(`Executing "echo"...`);
  console.info(`Options: ${JSON.stringify(options, null, 2)}`);

  const { stdout, stderr } = await promisify(exec)(
    `echo ${options.textToEcho}`
  );
  console.log(stdout);
  console.error(stderr);

  const success = !stderr;
  return { success };
}
```

## Running your Executor

* add this executor | given project’s `targets` object in your project's `project.json` file:

```jsonc {% fileName="project.json" highlightLines=["5-10"] %}
{
  //...
  "targets": {
    // ...
    "echo": {
      "executor": "@my-org/my-plugin:echo",
      "options": {
        "textToEcho": "Hello World"
      }
    }
  }
}
```

* run it -- via the -- CLI

    ```shell
    nx run my-project:echo
    ```

    * the console output:

    ```{% command="nx run my-project:echo" %}
    Executing "echo"...
    Options: {
      "textToEcho": "Hello World"
    }
    Hello World
    ```

* TODO: From here

Nx uses the paths from `tsconfig.base.json` when running plugins locally, but uses the recommended tsconfig for node 16 for other compiler options. See https://github.com/tsconfig/bases/blob/main/bases/node16.json

{% /callout %}

## Using Node Child Process

[Node’s `childProcess`](https://nodejs.org/api/child_process.html) is often useful in executors.

Part of the power of the executor API is the ability to compose executors via existing targets. This way you can combine other executors from your workspace into one which could be helpful when the process you’re scripting is a combination of other existing executors provided by the CLI or other custom executors in your workspace.

Here's an example of this (from a hypothetical project), that serves an api (project name: "api") in watch mode, then serves a frontend app (project name: "web-client") in watch mode:

```typescript
import { ExecutorContext, runExecutor } from '@nx/devkit';

export interface MultipleExecutorOptions {}

export default async function multipleExecutor(
  options: MultipleExecutorOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const result = await Promise.race([
    await runExecutor(
      { project: 'api', target: 'serve' },
      { watch: true },
      context
    ),
    await runExecutor(
      { project: 'web-client', target: 'serve' },
      { watch: true },
      context
    ),
  ]);
  for await (const res of result) {
    if (!res.success) return res;
  }

  return { success: true };
}
```

For other ideas on how to create your own executors, you can always check out Nx's own open-source executors as well!

{% github-repository url="https://github.com/nrwl/nx/blob/master/packages/cypress/src/executors/cypress/cypress.impl.ts" %}

## Using Custom Hashers

For most executors, the default hashing in Nx makes sense. The output of the executor is dependent on the files in the project that it is being run for, or that project's dependencies, and nothing else. Changing a miscellaneous file at the workspace root will not affect that executor, and changing _*any*_ file inside of the project may affect the executor. When dealing with targets which only depend on a small subset of the files in a project, or may depend on arbitrary data that is not stored within the project, the default hasher may not make sense anymore. In these cases, the target will either experience more frequent cache misses than necessary or not be able to be cached.

Executors can provide a custom hasher that Nx uses when determining if a target run should be a cache hit, or if it must be run. When generating an executor for a plugin, you can use `nx g @nx/plugin:executor my-executor --project my-plugin --includeHasher` to automatically add a custom hasher.

If you want to add a custom hasher manually, create a new file beside your executor's implementation. We will use `hasher.ts` as an example here. You'll also need to update `executors.json`, so that it resembles something like this:

```json {% fileName="executors.json" %}
{
  "executors": {
    "echo": {
      "implementation": "./src/executors/my-executor/executor",
      "hasher": "./src/executors/my-executor/hasher",
      "schema": "./src/executors/my-executor/schema.json"
    }
  }
}
```

This would allow you to write a custom function in `hasher.ts`, which Nx would use to calculate the target's hash. As an example, consider the below hasher which mimics the behavior of Nx's default hashing algorithm.

```typescript
import { CustomHasher, Task, HasherContext } from '@nx/devkit';

export const mimicNxHasher: CustomHasher = async (
  task: Task,
  context: HasherContext
) => {
  return context.hasher.hashTask(task);
};

export default mimicNxHasher;
```

The hash function can do anything it wants, but it is important to remember that the hasher replaces the hashing done normally by Nx. If you change the hasher, Nx may return cache hits when you do not anticipate it. Imagine the below custom hasher:

```typescript
import { CustomHasher, Task, HasherContext } from '@nx/devkit';

export const badHasher: CustomHasher = async (
  task: Task,
  context: HasherContext
) => {
  return {
    value: 'my-static-hash',
  };
};

export default badHasher;
```

This hasher would never return a different hash, so every run of a task that consumes the executor would be a cache hit. It is important that anything that would change the result of your executor's implementation is accounted for in the hasher.
