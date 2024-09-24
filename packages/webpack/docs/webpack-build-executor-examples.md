---
title: Examples for the @nx/webpack:webpack build executor
description: Examples and a short guide on how to use the @nx/webpack:webpack build executor
---

```json5, title=project.json 
//...
"my-app": {
  "targets": {
    "build": {
      "executor": "@nx/webpack:webpack",
      "options": {
        "webpackConfig": "apps/my-app/webpack.config.js"
      }
    },
    //...
  }
}
```

```bash
nx build my-app     # nx targetName projectName
```

## Examples

{% tabs %}

{% tab label="Using `babelUpwardRootMode`" %}

* check [Babel documentation](https://babeljs.io/docs/config-files#root-babelconfigjson-file)
  * if you are running your Babel compilation process | a subpackage -> you need to tell Babel where to look for the config
    * ways to inform it
      * "rootMode" = "upward" | Babel config
        * == Babel search from the working directory upward / looks for your "babel.config.json" file
        * 👁️recommended 👁️
      * `babelUpwardRootMode` = `true` | `project.json`
        * == Babel searches a root `babel.config.json` | root of the workspace
        * -> `rootMode` = `upward` | Babel config

    ```json5, title=project.json
    //...
    "my-app": {
      "targets": {
        "build": {
          "executor": "@nx/webpack:webpack",
          "options": {
            "webpackConfig": "apps/my-app/webpack.config.js",
            "babelUpwardRootMode": true
          }
        },
        //...
      }
    }
    ```

* if you specify 

    ```json
    { "babelrcRoots": ["*"] }
    ```

    -> you must have a `.babelrc` / package -> you must ensure right presets & plugins

    ```json
    {
      "presets": ["@babel/preset-env", "@babel/preset-typescript"]
    }
    ```



    ```treeview
    ├── apps
    │   └── demo
    │       └── .babelrc
    ├── libs
    │   ├── a
    │   │   └── .babelrc
    │   └── b
    │       └── .babelrc
    └── babel.config.json
    ```

* if `demo` imports `a` and `b` ->
  * it will apply the config `libs/a/.babelrc` & `libs/b/.babelrc` | respective packages
  * NOT apply its own `apps/demo/.babelrc` -- to -- `a` and `b`
* ANYTHING | `babel.config.json` -- will apply to -- ALL packages

{% /tab %}

{% tab label="Specify a custom Babel config file" %}

* TODO:
If you have a custom Babel config file (i.e. not `.babelrc`), you can use the `configFile` option as follows:

```json5
//...
"my-app": {
  "targets": {
    "build": {
      "executor": "@nx/webpack:webpack",
      "options": {
        "webpackConfig": "apps/my-app/webpack.config.js",
        "babelConfig": "apps/my-app/.babelrc.custom.json",
      }
    },
    // ...
  }
}
```

If you do not set the path to the `.babelrc` file, Nx will look for a `.babelrc` file in the root of your application.

Note that this option does not work if `babelUpwardRootMode` is set to `true`.

{% /tab %}

{% tab label="Run webpack with `isolatedConfig`" %}

* if you set `isolatedConfig` = `true` | your `project.json` -> Nx -- will NOT apply automatically the -- Nx webpack plugins
  * Nx plugins -- need to be -- applied | project's `webpack.config.js` file ( _Example:_ `withNx`, `withReact`, etc.)
    * -> specify `webpackConfig=pathToWebpackConfigFile`
  * default setup for webpack | latest version of Nx's `build` target

    ```json
    //...
    "my-app": {
      "targets": {
        "build": {
          "executor": "@nx/webpack:webpack",
          "options": {
            "webpackConfig": "apps/my-app/webpack.config.js",
            "isolatedConfig": true
          }
        },
      }
    }
    ```

* check
  * [Nx Webpack config guide](/recipes/webpack/webpack-config-setup)
  * [Webpack Plugins guide](/recipes/webpack/webpack-plugins)


{% /tab %}

{% /tabs %}
