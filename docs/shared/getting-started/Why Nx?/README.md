* How to use?
  * add as dependency
    * -> you can use `nx COMMAND` to run your package.json scripts
  * `npx nx@latest init`
    * initialize a project
* Why to use?
  * caching technique used behind
  * tasks run in parallel
    * `npx nx run-many`
  * show workspace representation
    * `npx nx graph`
  * analyze hierarchy dependencies previous to run the tasks, to organize the execution automatically
  * plugins / 
    * extend the functionality
    * easy to upgrade
    * ensure consistency & code quality -- via -- generators & lint rules
* Requirements to use it
  * monorepo OR standalone application
* Reasons to create nx?
  * complexity with >= 1 tool & frameworks to
    * configure
    * maintain
    * integrate
* also provides
  * low-level build tooling
  * configuring fast CI

## NX architecture
* Check 'architecture.png'
* modular
  * Nx Core
    * technology-agnostic capabilities
      * workspace analysis
      * task running
      * caching
      * distribution
      * code generation
      * automated code migrations
  * Plugins
    * == npm packages / on top of Nx Core & vendor-specific
      * code generators
      * executors
        * allows
          * low-level build tooling is abstracted
      * code migrations
  * Nx Console
    * == extension for IDEs
      * VSCode
      * Jetbrains
      * VIM
  * Devkit
    * == set of utilities /
      * allows
        * building Nx plugins
  * Nx Cloud

## Nx Cloud
* TODO:

