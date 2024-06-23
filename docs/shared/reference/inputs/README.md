# Inputs
* := list(fileSets, runtimeInputs, environmentVariables) / -- affected the -- target's output
  * if some `input` is changed -> 
    * cache invalidated &
    * target re-run
  * uses
    * Nx -- takes into account them to -- compute the hash / given operation

## types
* ⚠️allowed when you compute the hash ⚠️
* 'project.json'
  * TODO:
* command arguments
* source files
* environment variables
* runtime inputs
* external dependencies
* outputs of dependant tasks
* subset of 'tsconfig.json' OR 'tsconfig.base.json'
  * `.compilerOptions`
  * `.compilerOptions.paths` some parts
    * allows
      * if a path mapping is added OR removed -> NOT invalidated every task

# Named inputs
* TODO:
