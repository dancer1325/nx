* [`nx.json` schema](https://github.com/nrwl/nx/blob/master/packages/nx/schemas/nx-schema.json)
  * TODO: Where it's specified `extends` property?
  * task options
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
