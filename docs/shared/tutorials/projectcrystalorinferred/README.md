# Projectcrystalorinferred
* Goal
  * inferred tasks OR project crystal

## How was it created?
* `npx create-nx-workspace projectcrystalorinferred --pm pnpm` & following the guide / chosen "standalone"
* `pnpm dlx nx@latest add @nx/next`
  * Add @nx/next plugin & check tht
    * 'nx.json' / configured with another plugin
* `nx g @nx/next:app my-new-app`
  * crete a next app & 
  * 'nx.json' / configured with another plugin

## Tasks
* can be defined in
    * `package.json` or
    * `projects.json`

# Targets
* 'project.json' `targets` are empty
* `npx nx graph projectcrystalorinferred` 
  * allows
    * checking the targets for the project 
      * -> ⚠️Nx plugins are the 1! source of truth / infers ALL ⚠️

## Start the application
* `npx nx serve projectcrystalorinferred`
  * start the development server

## Build for production
* `npx nx build projectcrystalorinferred`
  * build the application
    * build artifacts are stored in the output directory (e.g. `dist/` or `build/`)

## Explore the project graph
* `npx nx graph`
  * show the graph of the workspace

## Notes
* Follow [this video](https://www.youtube.com/watch?v=wADNsVItnsM)
