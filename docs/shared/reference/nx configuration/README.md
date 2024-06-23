* allows
  * configuring
    * Nx CLI
    * project defaults
* [`nx.json` schema](https://github.com/nrwl/nx/blob/master/packages/nx/schemas/nx-schema.json)
  * TODO: Where it's specified `extends` property?
  * `"plugins"`
    * it's configuration -- depends specifically on -- each plugin
    * `.include` OR `.exclude` specify config files / -- used to infer -- task / project 
      * **Note:** Check '../concepts/inferTasksOrProjectCrystal'
  * task options 
    * ⚠️ at the root of 'nx.json' == `default` taskRun ⚠️ 
      * official supported one
        * `nx/tasks-runners/default`
        * `nx-cloud`
    * `parallel`
      * alternative to command's argument `--parallel`
    * `captureStderr`
    * `skipNxCache`
      * `false` -- by default --
    * `cacheDirectory`
      * 'nx.cache'  -- by default --
    * TODO:
    * uses
      * when you run `nx targetName projectName ...`
        * _Example:_ `nx build`, `nx test`, ...
    * `"tasksRunnerOptions"`
      * allows
        * ⚠️registering other task runners ⚠️
      * `nx targetName projectName --runner=taskRunnerDefined`
        * way to invoke it
  * `defaultBase`
    * := base branch 
      * "main" branch  -- by default --
      * uses
        * 👁️ calculate affected projects 👁️
  * `namedInputs`
    * TODO:
  * `targetDefaults`
    * allows
      * setting common options / particular target in your workspace
    * ways to match targetDefault -- against -- configuration 
      * `${executor}`
        * precedence to look for
      * `${targetName}`
    * `.inputs`
      * inpu
  * TODO:
