* Requirements
  * Nx v18+
* allows
  * Nx plugins -- based on configuration of different tools, can automatically 👁️infer 👁️ -- tasks / projects
    * _Example:_ `@nx/webpack` plugin, to infer tasks / run webpack -- searches for -- "webpack.config.js" files
    * properties inferred
      * command
        * == way to invoke the tool
      * cache
        * == if the task is cached & inputs NOT changed -> outputs -- restored from -- cache
      * inputs
        * == inputs of the task
      * outputs
        * == results of a task
      * task dependencies
  * making easier for migration

## Notes
* Structure
  * project configuration / individual projects + project & task graph / -- shows connections between -- them
* 'nx.json'
  * 's plugins
    * 👁 are processed in the order specified 👁
      * -> last one overrides previous
* task configuration
  * ways to override
    * / multiple projects
      * 'nx.json' `targetDefaults` -- Check '../reference/nxConfiguration' --
    * / specific project  -- Check '../reference/projectConfiguration' --
      * project configuration in
        * 'package.json' OR
        * 'project.json'
  * precedence
    * inferred task from 'nx.json' plugins
    * 'nx.json' `targetDefaults`
    * project configuration in 'package.json' OR 'project.json'
* Migration of Nx workspaces / Nx < v18.0    ->   Nx  v18.0+
  * environment variables / disable inferred tasks
    * `NX_ADD_PLUGINS=false`  -- in '.env' --
    * `"useInferencePlugins":"false"` -- in 'nx.json' --
  * if you disable inferred tasks -> tasks are defined via another way (-- Check '../features/RunningTasks' --)

## Examples
 Check '../tutorials/projectcrystalorinferred'
