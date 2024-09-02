# Inferred Tasks (Project Crystal)

* requirements
  * Nx v18+
* 👁 == Nx plugins -- based on configuration of different tools, can automatically  infer  -- tasks / projects 👁️
  * * _Example:_ `@nx/webpack` plugin, to infer tasks / run webpack -- searches for -- "webpack.config.js" files
* allows
  * inferring properties
    * command
      * == way to invoke the tool
    * cache
      * == if the task is cached & inputs NOT changed -> outputs -- restored from -- cache
      * [fine-tuned cache settings](/features/cache-task-results)
      * [Cacheability](/concepts/how-caching-works)
    * [Inputs](/recipes/running-tasks/configure-inputs)
      * == inputs of the task
      * uses
        * produce outputs
        * determine if the outputs -- can be restored from the -- cache
    * [Outputs](/recipes/running-tasks/configure-outputs)
      * == results of a task
      * if previous run's Inputs == current run's Inputs -> Output -- is restored from the -- cache
    * [task dependencies](/concepts/task-pipeline-configuration)
      * == list of other tasks / -- must be completed before -- running this task
  * making easier for migration

{% youtube
src="https://youtu.be/wADNsVItnsM"
title="Project Crystal"
/%}

* TODO:

## Steps followed by ALL plugins -- to infer -- Tasks

### 1. Detect Tooling Configuration in Workspace

* plugin search the workspace -- for -- configuration files of the tool
* plugin will infer tasks / configuration file found
  * _Example:_ `@nx/webpack` plugin -- searches for -- `webpack.config.js` files

### 2. Create an Inferred Task

* plugin configures tasks / name was specified | `nx.json` plugin's configuration
* task settings -- are determined by the -- tool configuration
* _Example:_ `@nx/webpack` plugin
  * by default, creates tasks `build`, `serve` and `preview`
  * automatically sets the task caching settings -- based on the -- values | webpack configuration files

## Nx Uses Plugins to Build the Graph

* typical workspace -- will have -- many plugins / infer tasks
* plugins | `nx.json` -- are used to create --
  * project configuration / individual projects
  * project + task graph / -- shows the connections between -- them

### Plugin Order Matters

* plugins | 'nx.json'
  * -- are processed in -- the order / they are declared
  * if multiple plugins create a task / SAME name -> plugin listed last override rest
* _Example:_ if you have a project with both a `vite.config.js` & `webpack.config.js`, both the `@nx/vite` plugin and the `@nx/webpack` plugin tries to create a `build` task
  * -> `build` task / listed lower | `plugins` array -- is the one -- executed 

## View Inferred Tasks

* [show the project details](/features/explore-graph)
  * `nx show project projectName`
  * _Example:_ `nx show project my-project --web`

{% project-details  jsonFile="shared/concepts/myreactapp.json"%}
{% /project-details %}

## Overriding Inferred Task Configuration

* inferred task configuration
  * == task configuration / -- inferred by -- plugins
* ways to override inferred task configuration
  * / multiple projects
    * [`nx.json` `targetDefaults` object](/reference/nx-json#target-defaults)
  * / specific project
    * [update project's configuration](/reference/project-configuration) | `package.json` or | `project.json`
  * links related
    * [Configure Inputs for Task Caching](/recipes/running-tasks/configure-inputs)
    * [Configure Outputs for Task Caching](/recipes/running-tasks/configure-outputs)
    * [Defining a Task Pipeline](/recipes/running-tasks/defining-task-pipeline)
    * [Pass Arguments to Commands](/recipes/running-tasks/pass-args-to-commands)
* order of precedence (lower->higher) for task configuration 
  1. Inferred Task Configurations |`nx.json`' plugins
  2. `targetDefaults` | `nx.json`
  3. Project Configuration | `package.json` or `project.json`

## Existing Nx Workspaces

* if you have a Nx Workspace & upgrade to Nx 18 -> migration generator -- will automatically add -- `NX_ADD_PLUGINS=false` | your `.env`
  * take in account if your `.env` -- is ignored by -- git
* ways to disable inferring tasks
  * `NX_ADD_PLUGINS=false`
  * `useInferencePlugins=false` | `nx.json` 
    * == environment variable / NOT allowed inferring tasks
* consequences of disable inferring tasks
  * newly generated project -- will have -- ALL targets defined with executors
  * if you run `nx add @nx/some-plugin` -> NOT plugin entry created for `@nx/some-plugin` | `nx.json`
* although you fully embrace inferred tasks, `project.json` & executors are STILL be USEFUL
  * `project.json` -- is needed to --
    * modify inferred task options
    * define tasks / can NOT be inferred 
  * SOME executors -- perform -- tasks / can NOT be accomplished -- by running a -- tool directly from the CL
    * _Example:_ [TypeScript batch mode](/recipes/tips-n-tricks/enable-tsc-batch-mode)

## Examples
* Check '../tutorials/projectcrystalorinferred'
