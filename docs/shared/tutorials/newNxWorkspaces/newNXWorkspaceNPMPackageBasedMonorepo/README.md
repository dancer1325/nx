# Goals
* Create nx workspace
  * via npm
  * monorepo-based
* Create executor

## How was created?
* `npx create-nx-workspace` & following the guide / chosen "package-based monorepo"
* Create executor -- Check "local-executors.md" --
  * `nx add @nx/plugin`
  * `nx g @nx/plugin:plugin libs/my-plugin`
  * `nx generate @nx/plugin:executor echo --directory=libs/my-plugin/src/executors/echo`
  * TODO: set `cli` | "nx.json"
  * "schema.json"
    * 1! option for the executor --  `textToEcho` / is a `string`

      ```json
      {
        "$schema": "https://json-schema.org/schema",
        "type": "object",
        "properties": {
          "textToEcho": {
            "type": "string",
            "description": "Text To Echo"
          }
        }
      }
      ```
  * `nx run my-plugin:echo` 
    * Problems:
      * Problem1: "Cannot find module '@my-plugin/package.json'"
        * Solution: 
        * Note: What's the name of the 
