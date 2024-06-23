* Sources to build project's configuration / lower override previous one
  * inferred tasks -- Check 'concepts/inferredTasks' --
  * 'nx.json' `targetDefaults`
  * project level configuration files
    * 'package.json'
    * 'project.json'
* ways to visualize  -- _Example:_ Check [githubRepoExample](https://github.com/nrwl/nx-examples) -- 
  * Nx Console
  * `nx show project projectName --web`

## Project level configuration files
* 'package.json' vs 'project.json'
  * ⚠️tasks / use executors  -- must be defined in -- 'project.json' ⚠️
* Nx merges 'package.json' & 'project.json'
* ['nx.json' schema](https://github.com/nrwl/nx/blob/master/packages/nx/schemas/nx-schema.json)
* ['project.json' schema](https://github.com/nrwl/nx/blob/master/packages/nx/schemas/project-schema.json)
  * _Examples:_
    * _Example1:_ TODO: Where does `"root"` come from in the previous schema?
      ```
      {
        "root": "libs/mylib/",
        "targets": {
          "test": {
            "executor": "@nx/jest:jest",
            "options": {
              /* ... */
            }
          },
          "build": {
            "executor": "@nx/js:tsc",
            "options": {
              /* ... */
            } 
          }
        }
      }
      ```
    * _Example2:_ TODO: Where does `"root", "sourceRoot", "projectType"` come from in the previous schema?
      ```
      {
      "root": "libs/mylib/",
      "sourceRoot": "libs/mylib/src",
      "projectType": "library",
      "tags": ["scope:myteam"],
      "implicitDependencies": ["anotherlib"],
      "namedInputs": {
        "default": ["{projectRoot}/**/*"],
        "production": ["!{projectRoot}/**/*.spec.tsx"]
      },
      "targets": {
        "test": {
          "inputs": ["default", "^production"],
          "outputs": [],
          "dependsOn": ["build"],
          "executor": "@nx/jest:jest",
          "options": {}
        },
        "build": {
          "inputs": ["production", "^production"],
          "outputs": ["{workspaceRoot}/dist/libs/mylib"],
          "dependsOn": ["^build"],
          "executor": "@nx/js:tsc",
          "options": {}
          }
        }
      }
      ```
* 'package.json'
  * TODO: Is there link to the specification to include `nx` ?
  * _Examples:_
    * _Example1:_
     ```
      {
      "name": "mylib",
      "scripts": {
        "test": "jest",
        "build": "tsc -p tsconfig.lib.json", // the actual command here is arbitrary
        "ignored": "exit 1"
      },
      nx": {
        "namedInputs": {
          "default": ["{projectRoot}/**/*"],
          "production": ["!{projectRoot}/**/*.spec.tsx"]
        },
        "targets": {
          "build": {
            "inputs": ["production", "^production"],
            "outputs": ["{workspaceRoot}/dist/libs/mylib"],
            "dependsOn": ["^build"]
          },
          "test": {
            "inputs": ["default", "^production"],
            "outputs": [],
            "dependsOn": ["build"]
          }
        },
        "includedScripts": ["test", "build"] // If you want to limit the scripts Nx sees, you can specify a list here.
       }
     }
    ```
* TODO:
