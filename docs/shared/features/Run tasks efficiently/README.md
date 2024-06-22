* Check '../reference/glossary'
* types
  * -- from -- existing "package.json"'s scripts
  * inferred tasks -- Check '../concepts/inferredTasks' --
  * defined in 'project.json'
* how does it work?
  * 👁️ Nx merge ALL available 3 types -- to determine -- tasks / particular project 👁️
* Check '../reference/projectConfiguration'
* Ways to run tasks
  * 1! task -- `npx nx targetName projectName option` / `nx targetName projectName option` --
    * _Example:_ `npx nx test products --watch` / `nx test products --watch`
  * 1+= task / multiple projects
    * / ALL projects -- `npx nx run-many -t targetName1 targetName2 ..` / `nx run-many -t targetName1 targetName2 ..` --
      * _Example:_ `npx nx run-many -t build`, `npx nx run-many -t build lint`
    * / some projects -- `npx nx run-many -t targetName -p projectName1 projectName2` / `nx run-many -t targetName -p projectName1 projectName2` --
      * _Example:_ `npx nx run-many -t test -p products`, `nx run-many -t test -p products`
    * 👁️Tasks are run in parallel 👁️
      * -- based on -- 
        * hierarchy dependency
        * '../concepts/Task Pipeline configuration'
      * / you can specify the # -- Check '../recipes/Running tasks/Run tasks in parallel' --
    * Check '../nx-api/documents/run-many'
  * / projects adjusted by a PR -- `npx nx affected -t targetName` / `nx affected -t targetName` --
    * Check '../ci/features/affected'
    * _Example:_ `npx nx affected -t test` / `nx affected -t test` 
* TODO:
* 

## Notes
* `npx nx ....` vs `nx ...`
  * installation
    * `nx ...`
      * installation in your computer
    * `npx ...`
      * NOT installation in your computer
      * 👁use the project`s configuration👁
  * version consistency
    * if Nx CLI version != Nx project version -> you could face up consistency issues
  * ⚠️recommendations ⚠️
    * use `npx` 
