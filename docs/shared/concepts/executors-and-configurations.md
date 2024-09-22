# Executors and Configurations

* Executors
  * := pre-packaged node scripts
  * uses
    * run tasks consistently
  * steps to configure it
    * install the plugin / contains the executor
    * configure the executor | project's `project.json`
  * properties
    * `executor`
      * string
      * `[packageName]:[executorName]`
        * syntax
    * `options`
      * := object / contains default configurations for the executor
      * --depend on the -- executor
    * `configurations`
      * allows
        * creating presets of options / different scenarios
        * 👁️overwrite `options` values 👁️
  * available | the [plugin registry](/plugin-registry) 

* `project.json` 's targets can be configured / run an executor -- with a -- specific set of options
  * _Example:_  

    ```jsonc {% fileName="apps/cart/project.json" %}
    {
      "root": "apps/cart",
      "sourceRoot": "apps/cart/src",
      "projectType": "application",
      "generators": {},
      "targets": {
        "build": {
          "executor": "@nx/webpack:webpack",  // `@nx/webpack` is packageName, and `webpack` is the executorName 
          "options": {
            "outputPath": "dist/apps/cart",
            ...
          }
        },
        "test": {
          "executor": "@nx/jest:jest",      // `@nx/jest` is packageName, and `jest` is the executorName
          "options": {
            ...
          }
        }
      }
    }
    ```

* `nx [command] [project]`
  * run an executor == [run any target](/features/run-tasks)
  * _Example:_ `nx build cart`

## Run a Terminal Command from an Executor

* `nx:run-commands`
  * uses
    * new target / needs to run 1! shell command
      * _Example:_

        ```jsonc {% fileName="project.json" %}
        {
          "root": "apps/cart",
          "sourceRoot": "apps/cart/src",
          "projectType": "application",
          "generators": {},
          "targets": {
            "echo": {
              "command": "echo 'hello world'"
            }
          }
        }
        ```

  * [run-commands documentation](/nx-api/nx/executors/run-commands)

## Build your own Executor

* TODO:
Nx comes with a Devkit that allows you to build your own executor to automate your Nx workspace. Learn more about it in the [docs page about creating a local executor](/extending-nx/recipes/local-executors).

## Running executors with a configuration

You can use a specific configuration preset like this:

```shell
nx [command] [project] --configuration=[configuration]
nx build cart --configuration=production
```

## Use Task Configurations

The `configurations` property provides extra sets of values that will be merged into the options map.

```json {% fileName="project.json" %}
{
  "build": {
    "executor": "@nx/js:tsc",
    "outputs": ["{workspaceRoot}/dist/libs/mylib"],
    "dependsOn": ["^build"],
    "options": {
      "tsConfig": "libs/mylib/tsconfig.lib.json",
      "main": "libs/mylib/src/main.ts"
    },
    "configurations": {
      "production": {
        "tsConfig": "libs/mylib/tsconfig-prod.lib.json"
      }
    }
  }
}
```

You can select a configuration like this: `nx build mylib --configuration=production`
or `nx run mylib:build:production`.

The following code snippet shows how the executor options get constructed:

```javascript
require(`@nx/jest`).executors['jest']({
  ...options,
  ...selectedConfiguration,
  ...commandLineArgs,
}); // Pseudocode
```

The selected configuration adds/overrides the default options, and the provided command line args add/override the
configuration options.

### Default Configuration

When using multiple configurations for a given target, it's helpful to provide a default configuration.
For example, running e2e tests for multiple environments. By default it would make sense to use a `dev` configuration for day to day work, but having the ability to run against an internal staging environment for the QA team.

```json {% fileName="project.json" %}
{
  "e2e": {
    "executor": "@nx/cypress:cypress",
    "options": {
      "cypressConfig": "apps/my-app-e2e/cypress.config.ts"
    },
    "configurations": {
      "dev": {
        "devServerTarget": "my-app:serve"
      },
      "qa": {
        "baseUrl": "https://some-internal-url.example.com"
      }
    },
    "defaultConfiguration": "dev"
  }
}
```

When running `nx e2e my-app-e2e`, the _dev_ configuration will be used. In this case using the local dev server for `my-app`.
You can always run the other configurations by explicitly providing the configuration i.e. `nx e2e my-app-e2e --configuration=qa` or `nx run my-app-e2e:e2e:qa`
