# nx.json

* allows
  * configuring
    * Nx CLI
    * project defaults
* [`nx.json` schema](https://github.com/nrwl/nx/blob/master/packages/nx/schemas/nx-schema.json)

* _Example:_
    ```json {% fileName="nx.json" %}
    {
      "plugins": [
        {
          "plugin": "@nx/eslint/plugin",
          "options": {
            "targetName": "lint"
          }
        }
      ],
      "parallel": 4,
      "cacheDirectory": "tmp/my-nx-cache",
      "defaultBase": "main",
      "namedInputs": {
        "default": ["{projectRoot}/**/*"],
        "production": ["!{projectRoot}/**/*.spec.tsx"]
      },
      "targetDefaults": {
        "@nx/js:tsc": {
          "inputs": ["production", "^production"],
          "dependsOn": ["^build"],
          "options": {
            "main": "{projectRoot}/src/index.ts"
          },
          "cache": true
        },
        "test": {
          "cache": true,
          "inputs": ["default", "^production", "{workspaceRoot}/jest.preset.js"],
          "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
          "executor": "@nx/jest:jest"
        }
      },
      "release": {
        "version": {
          "generatorOptions": {
            "currentVersionResolver": "git-tag",
            "specifierSource": "conventional-commits"
          }
        },
        "changelog": {
          "git": {
            "commit": true,
            "tag": true
          },
          "workspaceChangelog": {
            "createRelease": "github"
          },
          "projectChangelogs": true
        }
      },
      "generators": {
        "@nx/js:library": {
          "buildable": true
        }
      },
      "extends": "nx/presets/npm.json"
    }
    ```

## Plugins

* -- depends specifically on -- each plugin
* allows
  * using different tools with Nx
* [way Nx runs tasks](/concepts/inferred-tasks) / tool, -- based on -- that tool's configuration
* If a plugin has no options, it can be listed as a string.
* way to specify
  * String
  * Object
    * `.include` OR `.exclude`
      * specify config files / -- used to infer -- task / project
* [available plugins | plugin registry](/plugin-registry)
* [create yout own Nx plugin](/extending-nx/intro/getting-started)
* _Example1:_

    ```json {% fileName="nx.json" %}
    {
      "plugins": [
        "@my-org/graph-plugin",
        {
          "plugin": "@nx/eslint/plugin",
          "options": {
            "targetName": "lint"
          }
        }
      ]
    }
    ```

* _Example2:_ scope Plugins -- to -- specify projects

    ```jsonc {% fileName="nx.json" %}
    {
      "plugins": [
        {
          "plugin": "@nx/jest/plugin",
          "include": ["packages/**/*"], // include any projects in the packages folder
          "exclude": ["**/*-e2e/**/*"] // exclude any projects in a *-e2e folder
        }
      ]
    }
    ```

## Task Options

* -- affect the -- way Nx runs tasks
* official built-in supported one
  * `nx/tasks-runners/default`
  * `nx-cloud`
* can be set | root of `nx.json`

| Property                | Description                                                                                                                                                                                                                                                                                         |
| ----------------------- |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `parallel`                | max # of targets / run in parallel <br/> == CL's argument `--parallel`                                                                                                                                                                                                                              |
| `captureStderr`           | cache captures stderr or just stdout                                                                                                                                                                                                                                                                |
| `skipNxCache`             | Nx Cache -- should be -- skipped <br/> by default, `false`                                                                                                                                                                                                                                          |
| `cacheDirectory`          | directory / local cache is stored <br/> by default, `.nx/cache`                                                                                                                                                                                                                                  |
| `encryptionKey`           | requirements: `"nx-cloud"` <br/> encryption key -- for supporting -- end-to-end encryption of your cloud cache <br/> optional `NX_CLOUD_ENCRYPTION_KEY` / contains  encryption key -- as its -- value <br/> Nx Cloud task runner -- normalizes the -- key length ->  ANY length of key is acceptable |
| `selectivelyHashTsConfig` | ONLY hash the path mapping of the active project in the `tsconfig.base.json` <br/> _Example:_ adding/removing projects does NOT affect the hash of existing projects <br/> defaults to `false`                                                                                                      |

* way to pass
  * | `nx.json`
    * _Example:_ `parallel` in `nx.json`
  * | NX CLI flags
    * _Example:_ `--parallel` -- as -- `nx run-many -t test --parallel=5`

### Multiple Tasks Runners

* `nx taskRunner --runner=taskRunner` 
  * way to invoke a Tasks runner
  * _Example:_ `nx test --runner=taskRunner`, `nx build --runner=taskRunner`, `nx run-many --runner=taskRunner`, `nx affected--runner=taskRunner`
* `default`
  * built-in taskRunnerThere / defined | root of `nx.json` 
* way to register another tasks runner
  * adding it | `nx.json`
    * _Example:_

        ```json {% fileName="nx.json" %}
        {
          "tasksRunnerOptions": {
            "another": {
              "runner": "nx/tasks-runners/default",
              "options": {}
            }
          }
        }
        ```
  * -> you can run the task -- via -- `--runner`
    * _Example:_ `nx run-many -t build --runner=another`

## Default Base -- `defaultBase` -- 

* := base branch
  * `main` as default
* uses
  * 👁️ calculate affected projects 👁️

## Target Defaults

* allows
    * setting COMMON options / particular target | your workspace
* ways to match targetDefault -- against -- configuration / given target
    * `${executor}`
        * ⚠️precedence ⚠️
            * == if you specify `${executor}` & `${targetName}` -> `${executor}` takes priority
    * `${targetName}`

* TODO:
{% callout type="warning" title="Beware" %}
When using a target name as the key of a target default, make sure all the targets with that name use the same executor or that the target defaults you're setting make sense to all targets regardless of the executor they use. 
Anything set in a target default will also override the configuration of [tasks inferred by plugins](/concepts/inferred-tasks).
{% /callout %}

### inputs & namedInputs

Named inputs defined in `nx.json` are merged with the named inputs defined in [project level configuration](/reference/project-configuration). In other words, every project has a set of named inputs, and it's defined as: `{...namedInputsFromNxJson, ...namedInputsFromProjectsProjectJson}`.

Defining `inputs` for a given target would replace the set of inputs for that target name defined in `nx.json`.
Using pseudocode `inputs = projectJson.targets.build.inputs || nxJson.targetDefaults.build.inputs`.

You can also define and redefine named inputs. This enables one key use case, where your `nx.json` can define things like this (which applies to every project):

```json {% fileName="nx.json" %}
{
  "targetDefaults": {
    "test": {
      "inputs": ["default", "^production"]
    }
  }
}
```

And projects can define their `production` inputs, without having to redefine the inputs for the `test` target.

```json {% fileName="project.json" %}
{
  "namedInputs": {
    "production": ["default", "!{projectRoot}/**/*.test.js"]
  }
}
```

In this case Nx will use the right `production` input for each project.

{% cards %}
{% card title="Inputs and Named Inputs Reference" type="documentation" description="Learn about all the possible settings for `inputs` and `namedInputs`" url="/reference/inputs" /%}
{% card title="Configure Inputs for Task Caching" type="documentation" description="This recipes walks you through a few examples of how to configure `inputs` and `namedInputs`" url="/recipes/running-tasks/configure-inputs" /%}
{% /cards %}

### Task Pipelines

Targets can depend on other targets. A common scenario is having to build dependencies of a project first before
building the project. The `dependsOn` property in `project.json` can be used to define the list of dependencies of an
individual target.

Often the same `dependsOn` configuration has to be defined for every project in the repo, and that's when
defining `targetDefaults` in `nx.json` is helpful.

```json {% fileName="nx.json" %}
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"]
    }
  }
}
```

The configuration above is identical to adding `{"dependsOn": ["^build"]}` to every `build` target of every project.

{% cards %}
{% card title="Project Configuration reference" type="documentation" description="For full documentation of the `dependsOn` property, see the project configuration reference" url="/reference/project-configuration#dependson" /%}
{% card title="What is a Task Pipeline" type="documentation" description="This guide describes how to think about task pipelines" url="/concepts/task-pipeline-configuration" /%}
{% /cards %}

### Outputs

Another target default you can configure is `outputs`:

```json {% fileName="nx.json" %}
{
  "targetDefaults": {
    "build": {
      "outputs": ["{projectRoot}/custom-dist"]
    }
  }
}
```

When defining any options or configurations inside of a target default, you may use the `{workspaceRoot}` and `{projectRoot}` tokens. This is useful for defining options whose values are paths.

```json {% fileName="nx.json" %}
{
  "targetDefaults": {
    "@nx/js:tsc": {
      "options": {
        "main": "{projectRoot}/src/index.ts"
      },
      "configurations": {
        "prod": {
          "tsconfig": "{projectRoot}/tsconfig.prod.json"
        }
      },
      "inputs": ["prod"],
      "outputs": ["{workspaceRoot}/{projectRoot}"]
    },
    "build": {
      "inputs": ["prod"],
      "outputs": ["{workspaceRoot}/{projectRoot}"],
      "cache": true
    }
  }
}
```

{% callout type="note" title="Target Default Priority" %}
Note that the inputs and outputs are specified on both the `@nx/js:tsc` and `build` default configurations. This is **required**, as when reading target defaults Nx will only ever look at one key. If there is a default configuration based on the executor used, it will be read first. If not, Nx will fall back to looking at the configuration based on target name. For instance, running `nx build project` will read the options from `targetDefaults[@nx/js:tsc]` if the target configuration for `build` uses the `@nx/js:tsc executor`. It **would not** read any of the configuration from the `build` target default configuration unless the executor does not match.
{% /callout %}

{% cards %}
{% card title="Configure Outputs for Task Caching" type="documentation" description="This recipe walks you through how to set outputs" url="/recipes/running-tasks/configure-outputs" /%}
{% /cards %}

### Cache

In Nx 17 and higher, caching is configured by specifying `"cache": true` in a target's configuration. This will tell Nx that it's ok to cache the results of a given target. For instance, if you have a target that runs tests, you can specify `"cache": true` in the target default configuration for `test` and Nx will cache the results of running tests.

```json {% fileName="nx.json" %}
{
  "targetDefaults": {
    "test": {
      "cache": true
    }
  }
}
```

{% callout type="warning" title="Per Project Caching + Distribution" %}

If you are using distributed task execution and disable caching for a given target, you will not be able to use distributed task execution for that target. This is because distributed task execution requires caching to be enabled. This means that the target you have disabled caching for, and any targets which depend on that target will fail the pipeline if you try to run them with Nx Agents enabled.

{% /callout %}

### Executor/command options

You can configure options specific to a target's executor. As an example, if your repo has projects using the `@nx/js:tsc` executor, you can provide some default options as follows:

```json {% fileName="nx.json" %}
{
  "targetDefaults": {
    "@nx/js:tsc": {
      "options": {
        "generateExportsField": true
      }
    }
  }
}
```

You can also provide defaults for [inferred targets](/concepts/inferred-tasks) or targets running a command using the `nx:run-commands` executor. As an example, if your repo has projects where **all the `build` targets** run the same `vite build` command, you can provide some default options as follows:

```json {% fileName="nx.json" %}
{
  "targetDefaults": {
    "build": {
      "options": {
        "assetsInlineLimit": 2048,
        "assetsDir": "static/assets"
      }
    }
  }
}
```

{% callout type="caution" title="Be careful" %}
If multiple targets with the same name run different commands (or use different executors), do not set options in `targetDefaults`. Different commands would accept different options, and the target defaults will apply to all targets with the same name regardless of the command they run. If you were to provide options in `targetDefaults` for them, the commands that don't expect those options could throw an error.
{% /callout %}

For more details on how to pass args to the underlying command see the [Pass Args to Commands recipe](/recipes/running-tasks/pass-args-to-commands).

## Release

The `release` property in `nx.json` configures the `nx release` command. It is an optional property, as `nx release` is capable of working with zero config, but when present it is used to configure the versioning, changelog, and publishing phases of the release process.

For more information on how `nx release` works, see [manage releases](/features/manage-releases).

The full list of configuration options available for `"release"` can be found here: [https://github.com/nrwl/nx/blob/master/packages/nx/src/config/nx-json.ts](https://github.com/nrwl/nx/blob/master/packages/nx/src/config/nx-json.ts) under `NxReleaseConfiguration`.

### Projects

If you want to limit the projects that `nx release` targets, you can use the `projects` property in `nx.json` to do so. This property is either a string, or an array of strings. The strings can be project names, glob patterns, directories, tag references or anything else that is supported by the `--projects` filter you may know from other commands such as `nx run`.

```jsonc {% fileName="nx.json" %}
{
  "release": {
    // Here we are configuring nx release to target all projects
    // except the one called "ignore-me"
    "projects": ["*", "!ignore-me"]
  }
}
```

### Projects Relationship

The `projectsRelationship` property tells Nx whether to release projects independently or together. By default Nx will release all your projects together in lock step, which is an equivalent of `"projectRelationships": "fixed"`. If you want to release projects independently, you can set `"projectsRelationship": "independent"`.

```jsonc {% fileName="nx.json" %}
{
  "release": {
    // Here we are configuring nx release to release projects
    // independently, as opposed to the default of "fixed"
    "projectsRelationship": "independent"
  }
}
```

### Release Tag Pattern

Optionally override the git/release tag pattern to use. This field is the source of truth for changelog generation and release tagging, as well as for conventional commits parsing.

It supports interpolating the version as `{version}` and (if releasing independently or forcing project level version control system releases) the project name as `{projectName}` within the string.

The default `"releaseTagPattern"` for fixed/unified releases is: `v{version}`

The default `"releaseTagPattern"` for independent releases at the project level is: `{projectName}@{version}`

```jsonc {% fileName="nx.json" %}
{
  "release": {
    // Here we are configuring nx release to use a custom release
    // tag pattern (we have dropped the v prefix from the default)
    "releaseTagPattern": "{version}"
  }
}
```

### Version

The `version` property configures the versioning phase of the release process. It is used to determine the next version of your projects, and update any projects that depend on them to use the new version.

Behind the scenes, the `version` logic is powered by an Nx generator. Out of the box Nx wires up the most widely applicable generator implementation for you, which is `@nx/js:release-version` provided by the `@nx/js` plugin.

It is therefore a common requirement to be able to tweak the options given to that generator. This can be done by configuring the `release.version.generatorOptions` property in `nx.json`:

```jsonc {% fileName="nx.json" %}
{
  "release": {
    "version": {
      "generatorOptions": {
        // Here we are configuring the generator to use git tags as the
        // source of truth for a project's current version
        "currentVersionResolver": "git-tag",
        // Here we are configuring the generator to use conventional
        // commits as the source of truth for how to determine the
        // relevant version bump for the next version
        "specifierSource": "conventional-commits"
      }
    }
  }
}
```

For a full reference of the available options for the `@nx/js:release-version` generator, see the [release version generator reference](/nx-api/js/generators/release-version).

### Changelog

The `changelog` property configures the changelog phase of the release process. It is used to generate a changelog for your projects, and commit it to your repository.

There are two types of possible changelog that can be generated:

- **Workspace Changelog**: A changelog that contains all changes across all projects in your workspace. This is not applicable when releasing projects independently.

- **Project Changelogs**: A changelog that contains all changes for a given project.

The `changelog` property is used to configure both of these changelogs.

#### Workspace Changelog

The `changelog.workspaceChangelog` property configures the workspace changelog. It is used to determine if and how the workspace changelog is generated.

```jsonc {% fileName="nx.json" %}
{
  "release": {
    "changelog": {
      // This disables the workspace changelog
      "workspaceChangelog": false
    }
  }
}
```

```jsonc {% fileName="nx.json" %}
{
  "release": {
    "changelog": {
      "workspaceChangelog": {
        // This will create a GitHub release containing the workspace
        // changelog contents
        "createRelease": "github",
        // This will disable creating a workspace CHANGELOG.md file
        "file": false
      }
    }
  }
}
```

#### Project Changelogs

The `changelog.projectChangelogs` property configures the project changelogs. It is used to determine if and how the project changelogs are generated.

```jsonc {% fileName="nx.json" %}
{
  "release": {
    "changelog": {
      // This enables project changelogs with the default options
      "projectChangelogs": true
    }
  }
}
```

```jsonc {% fileName="nx.json" %}
{
  "release": {
    "changelog": {
      "projectChangelogs": {
        // This will create one GitHub release per project containing
        // the project changelog contents
        "createRelease": "github",
        // This will disable creating any project level CHANGELOG.md
        // files
        "file": false
      }
    }
  }
}
```

### Git

The `git` property configures the automated git operations that take place as part of the release process.

```jsonc {% fileName="nx.json" %}
{
  "release": {
    "git": {
      // This will enable committing any changes (e.g. package.json
      // updates, CHANGELOG.md files) to git
      "commit": true,
      // This will enable create a git for the overall release, or
      // one tag per project for independent project releases
      "tag": false
    }
  }
}
```

## Generators

Default generator options can be configured in `nx.json`. For instance, the following tells Nx to always
pass `--buildable=true` when creating new libraries with the `@nx/js` plugin.

```json {% fileName="nx.json" %}
{
  "generators": {
    "@nx/js:library": {
      "buildable": true
    }
  }
}
```

## Extends

Some presets use the `extends` property to hide some default options in a separate json file. The json file specified in the `extends` property is located in your `node_modules` folder. The Nx preset files are specified in [the `nx` package](https://github.com/nrwl/nx/tree/master/packages/nx/presets).

## Nx Cloud

There are also options for [Nx Cloud](https://nx.app) that are set in the `nx.json` file. For instance, you authenticate with the Nx Cloud service using an `nxCloudAccessToken` like this:

```json {% fileName="nx.json" %}
{
  "nxCloudAccessToken": "SOMETOKEN"
}
```

For more details on configuring Nx Cloud, see the [Nx Cloud Configuration Options page](/ci/reference/config).
