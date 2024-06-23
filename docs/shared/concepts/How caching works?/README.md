* computation hash of a cacheable task
  * 👁️computed before running the cacheable task 👁️
  * uses
    * check if previously got the same computation hash
      * locally OR
      * remotely -- if a remote cache is configured --
    * if oldComputationHash = currentComputationHash -> outputs retrieved == oldOutputs
    * else -> Nx runs the task and outputs are displayed and stored
  * can (based on task) depends on
    * project's source files & dependencies
    * global configuration
    * version of external dependencies
    * runtime values / -- provisioned by the -- user
    * CLI command flags

# Optimizations
* TODO:
