* Jest
  * EXIST MANY ways -- to be -- configured
    * ⚠️requirements⚠️

        ```json, title=jest.config.json
        "test": {
          "executor": "@nx/jest:jest",
          "options": {
            "jestConfig": "libs/my-lib/jest.config.ts"
          }
        }
        ```
    * recommendations
      * 👀`test.options.passWithNoTests: true`👀
        * | add tests, project's tests do NOT fail

# Snapshots

## update snapshots
* `--update-snapshot` OR `-u`
  * _Example:_ `nx test my-project -u`

* if you do NOT want to allow updating snapshots -> configure it
  * use cases
    * | CI
  * _Example:_ | CI

    ```json
    "test": {
      "executor": "@nx/jest:jest",
      "options": {
        "jestConfig": "libs/my-lib/jest.config.ts",
        "passWithNoTests": true
      },
      "configurations": {
        "ci": {
          "ci": true
        }
      }
    }
    ```

    ```bash
    nx affected --target=test
    ```
