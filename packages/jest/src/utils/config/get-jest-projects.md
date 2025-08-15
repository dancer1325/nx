* `export function getJestProjects() {`
  * 's return
    * pathS -- to -- ALL jest config files
  * uses
    * configure Jest multi-project support
      * if you want to add a project / NOT use the Nx Jest executor -> specify it manually
        ```
        export default {
          projects: [...getJestProjects(), '<rootDir>/path/to/jest.config.ts'];
        }
        ```
  * if projects need inferred targets -> see `getJestProjectsAsync()`


* `export function getNestedJestProjects() {`
  * 's return
    * nested projectS / have jest configured -- to be -- used | jest config's [`testPathIgnorePatterns` property](https://jestjs.io/docs/configuration#testpathignorepatterns-arraystring)


* `export async function getJestProjectsAsync() {`
  * 's return
    * pathS -- to -- ALL jest config files
  * uses
    * configure Jest multi-project support
      * if you want to add a project / NOT use the Nx Jest executor -> specify it manually
        ```
        export default async () => ({
          projects: [...(await getJestProjectsAsync()), '<rootDir>/path/to/jest.config.ts'];
        });
        ```
  * how does it work?
    * -- via -- Nx Jest executor + `@nx/run:commands` + running `jest`
