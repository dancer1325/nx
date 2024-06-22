# Glossary
* short list of Nx-specific terms

## Terms

### Application
* := [project](#project) / can run on its own 
  * Generally uses [libraries](#library)

### Atomizer

The Atomizer is an Nx Cloud feature that automatically splits tasks so that they can be executed in parallel.

Atomizer automatically splits tasks on [Nx Agents](#nx-agents), providing you detailed task information in the UI, including interpreted logs and artifacts, automatically grouped by project and workflow.

> See: [Automatically Split E2E Tasks](/ci/features/split-e2e-tasks)

### Buildable Library

A [library](#library) that has a `build` [target](#target). Some libraries can be generated with a `build` target using the `--buildable` flag.

> See: [Publishable and Buildable Nx Libraries](/concepts/buildable-and-publishable-libraries)

### Cache
* := mechanism /
  * allows 
    * saving the output of a calculation
      * -> it can be 👁️replayed later without performing the calculation again 👁️
* Check [Cache Task Results](/features/cache-task-results)

### Cache Hit

When the [cache inputs](#cache-inputs) for a [task](#task) match an existing entry in the [cache](#cache) and the [cache outputs](#cache-outputs) can be replayed without actually running the task.

> See: [Cache Task Results](/features/cache-task-results)

### Cache Inputs

Everything that might change the output of a [task](#task). This may include source code, task options, environment variables and other settings determined at run time. These values are combined as a hash to serve as a key for an entry in the [cache](#cache).

> See: [Customizing Inputs and Named Inputs](/recipes/running-tasks/configure-inputs)

### Cache Miss

When the [cache inputs](#cache-inputs) for a [task](#task) do not match an existing entry in the [cache](#cache) and the task needs to be executed.

> See: [Cache Task Results](/features/cache-task-results)

### Cache Outputs

The terminal output and any file artifacts created by running a [task](#task). These values are stored in the [cache](#cache) to be replayed later.

> See: [Outputs Reference](/reference/project-configuration#outputs)

### CIPE (Continuous Integration Pipeline Execution)

CI Pipeline Executions are a grouping mechanism for all Nx and Nx Cloud actions
that occur within a single continuous integration pipeline. The Nx Cloud task
runner automatically detects when it is running in a CI environment, so this
grouping is done automatically. In almost all cases, this detection will be a
1:1 match with your CI provider's concept of a "pipeline" or "workflow".

### Command
* := Anything / you run in the terminal
  * _Example:_ `nx build my-app` -- command / invokes a [task](#task) -- 
* Check [Run Tasks](/features/run-tasks)

### Configurations
* := set of preconfigured options for a [target](#target) / should be enabled altogether
  * _Example:_ `production` configuration would set all the options / needed for a build to deploy to production
* Check [Use Task Configurations](/concepts/executors-and-configurations#use-task-configurations)

### Distributed Task Execution

A system for running [tasks](#task) in CI across multiple agent processes across many machines. [Nx Agents](#nx-agents) enables distributed task execution on agent machines that are managed by Nx.

> See: [Distribute Task Execution](/ci/features/distribute-task-execution)

### Executor
* := script / 👁️performs some action on your code 👁️
  * *Example:* building, linting, testing, serving, ...
  * belong to each [plugins](#plugin)
* Check [Executors and Configurations](/concepts/executors-and-configurations)

### Flaky Tasks

Tasks that will sometimes succeed and sometimes fail without any change to the inputs. These tasks are often e2e tests and are particularly problematic in CI. Nx Cloud automatically detects flaky tasks and re-runs them.

> See: [Identify and Re-run Flaky Tasks](/ci/features/flaky-tasks)

### Generator
* := script / 👁️creates or modifies your code 👁️
  * belong to each [plugins](#plugin)
* Check [Use Code Generators](/features/generate-code)

### Graph
* := nodes / connected by edges.
* types in Nx
  * [project](#project) graph
    * allows
      * projectX -- check if it depends on -- projectY
  * [task](#task) graph
    * allows
      * taskX -- check if it depends on -- taskY
* Check [Explore the Graph](/features/explore-graph)

### Integrated Repository

A repository using Nx [plugins](#plugin) to boost efficiency and ease of maintenance.

> See: [Integrated Repos vs. Package-Based Repos](/concepts/integrated-vs-package-based)

### Launch Template

Launch Templates are used to set up an agent machine. They specify a resource class, an image and a series of set up steps before tasks are executed on that machine.

> See: [Launch Templates](/ci/reference/launch-templates)

### Library
* [project](#project) / used by 
  * [applications](#application) OR
  * other [libraries](#library)

### Monolith
* := large [application](#application) / is difficult -- to separate into -- smaller pieces

### Monorepo
* := repository / multiple [projects](#project)
* Check [monorepo.tools](https://monorepo.tools)


### Nested Project

A [project](#project) that is located in a sub-folder of another project. This was made possible in Nx 15.3.

### Nx Agents

A paid service that hosts and manages customizable worker machines to run parts of your CI pipeline faster and cheaper than a traditional CI provider. When possible, Nx Agents uses [distributed task execution](#distributed-task-execution) to optimize your pipeline.

> See: [Distribute Task Execution](/ci/features/distribute-task-execution)

### Nx Cloud

The umbrella term for all CI-related products that Nx provides.

> See: [CI with Nx](/ci/intro/ci-with-nx)

### Nx Replay

Nx Replay is the product offered by [Nx Cloud](#nx-cloud) that enables [remote caching](#remote-cache).

> See: [Use Remote Caching](/ci/features/remote-cache)

### Package
* == [project](#project) / sometimes published as an npm package

### Package-based Repository

A repository using Nx without [plugins](#plugin) that prioritizes the independence of the separate [packages](#package). Nx is added to the repo without significantly affecting the file structure or build settings.

> See: [Integrated Repos vs. Package-Based Repos](/concepts/integrated-vs-package-based)

### Plugin
* := set of [executors](#executor) + [generators](#generator) + other code / extends the functionality of Nx
  * how to install it ?
    * from a package manager -- _Example:_ npm --
    * develop directly in the repository
* Check [Create Your Own Plugin](/extending-nx/intro/getting-started)

### Polyrepo

Related [projects](#project) spread across multiple repositories.

### Project
* := unit of code on which a [task](#task) can be run
  * types
    * [application](#application) or
    * [library](#library)

### Publishable Library

A [library](#library) that has a `publish` [target](#target). Some libraries can be generated with a `publish` target using the `--publishable` flag.

> See: [Publishable and Buildable Nx Libraries](/concepts/buildable-and-publishable-libraries)

### Remote Cache

A [cache](#cache) that can be shared between all developers using the repo and the CI system. This product is called [Nx Replay](#nx-replay).

> See: [Share Your Cache](/ci/features/remote-cache)

### Root-Level Project

A [project](#project) that has its own root folder at the root of the repository. Every other project in the repo is a [nested project](#nested-project).

### Run
* == Nx commands / perform some `Task`s
  * _Example:_
    * `nx run my-app:build` == run / performs 1! task
    * `nx run-many -t test,build` == run / performs >1 tasks
    * `nx affected -t test,build` == run / performs >=0 tasks
* In CI environment
  * if you use Nx Cloud
    * automatically associate it with the appropiated
      * `Run Group` &
      * `CI Pipeline Execution`

### Run Group

Run groups are a more specific grouping mechanism for Nx and Nx Cloud actions,
and exist as children within a single CI Pipeline Execution. Typically, run groups
are used when there are different _hardware_ requirements (ex: a Linux run group,
and a MacOS run group) for the different commands.

When using Distributed Task Execution, Nx Agents can only belong to a single
run group. This means each additional run group requires its own pool of agents.

### Standalone Repository

A repository with a single [application](#application) at the [root level](#root-level-project). This set up is made possible in Nx 15.3.

### Target
+ := name of an action | a [project](#project)
  + how to configure it?
    * specify 
      * executor &
      * set of options
+ Check [Run Tasks](/features/run-tasks)

### Task
* := invocation of a [target](#target) | specific Monorepo's [project](#project) (S)
  * **Note:** 👁️>=1 projects could be affected 👁️
* Check [Run Tasks](/features/run-tasks)

### Task Pipeline

The set of dependencies between [tasks](#task) that ensure that tasks are run in the correct order.

> See: [Task Pipeline Configuration](/concepts/task-pipeline-configuration)

### Workspace
* == git repository
* Nx workspace
  * == git repository / using Nx.
