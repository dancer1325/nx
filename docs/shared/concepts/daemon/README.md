* := process /
  * runs in the background on your local machine
  * 1! Nx Daemon / NX workspace
    * -> if you have >1 Nx workspace active at the same time -> you will have 👁️independent 👁️ Nx daemons
  * depending on the OS
    * MacOs & Linux -> process == unix socket
    * Windows -> process = named pipe
  * depending on the environment
    * local machine
      * enabled -- by default --
      * disable via
        * "nx.json" runners option ❓(TODO:) `useDaemonProcess: false`
        * `export NX_DAEMON=false`  -- environment variables --
    * CI
      * disabled -- by default --
      * enabled -- based on -- [thisFunction](https://github.com/nrwl/nx/blob/master/packages/nx/src/utils/is-ci.ts)
  * -- can communicate via unix socket with -- Nx processes
    * temp directory -- by default --
    * if you use Nx via docker & you want to run Nx Daemon out of docker -> `export NX_DAEMON_SOCKET_DIR=SharedDirectory` as environment variable
* requirements
  * nx v13+
* allows
  * speeding up project graph computation
    * how does it work?
      * watching files in your Nx workspace / 👁till👁 
        * Nx Daemon did NOT receive any requests OR detect any file changed
        * Nx installation changes
* main benefits in
  * large workspaces
* `nx reset` | your Nx workspace
  * shut down the Nx Daemon
* `nx daemon`
  * returns 
    * processId
    * pathFile to logs
      * `tail -f PathToLogs`

## Notes
* When is project graph executed?
  * invoking a target directly
    * _Example:_ `nx test myapp`
  * running affected commands
    * _Example:_ `nx affected:test`
    * -> project graph 👁️RE👁️computation
* How do last changes estimate?
  * 👁️ Nx stores its metadata on disk 👁️ 

## Examples
* TODO:
