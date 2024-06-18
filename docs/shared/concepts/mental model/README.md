* TODO:

# Affected commands
* if you run `nx test app1` -> nx runs `app1:test` task + 👁️ALL dependant tasks 👁️ 
* if you run `nx run-many -t test -p app1 lib` -> nx runs `app1:test` task + 👁️ALL dependant tasks 👁️+ `lib:test` task + 👁️ALL dependant tasks 👁️
* if you run `nx run-many -t test` -> nx runs ALL project task + 👁️ALL dependant tasks 👁️
* if you run `nx affected -t test` -> Nx
  * looks at the files changed in your PR == git history
  * figures out the list of projects in the workspace / affected by this change
    * -- based on -- project graph
  * runs 👁 `nx run-many` 👁 for that list of projects

TODO:
