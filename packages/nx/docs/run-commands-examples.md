* `command`
  * option / 1! command

```json title="project.json"
{
  // ...
  "targets": {
    //...
    "ls-project-root": {
      "executor": "nx:run-commands",
      "options": {
        "command": "ls apps/frontend/src"
      }
    }
  }
}
```

```bash
nx run frontend:ls-project-root
```

## Examples

{% tabs %}
{% tab label="Chaining commands" %}

* `commands`
  * option / accepts ANY number of commands
* `parallel`
  * concurrency to run the commands
  * by default, `true`
  * if you want to run commands sequentially -> set `parallel: false`

```json
"create-script": {
    "executor": "nx:run-commands",
    "options": {
        "commands": [
          "mkdir -p apps/frontend/scripts",
          "touch apps/frontend/scripts/my-script.sh",
          "chmod +x apps/frontend/scripts/my-script.sh"
        ],
        "parallel": false
    }
}
```

{% /tab %}
{% tab label="Setting the cwd" %}

* `cwd`
  * option / indicate the path | ALL commands will run

```json
"create-script": {
    "executor": "nx:run-commands",
    "options": {
        "cwd": "apps/frontend",   // ALL comands will run on this path
        "commands": [
          "mkdir -p scripts",
          "touch scripts/my-script.sh",
          "chmod +x scripts/my-script.sh"
        ],
        "parallel": false
    }
}
```

{% /tab %}
{% tab label="Interpolating Args" %}

* `{args.[someFlag]}`
  * == custom arguments | your scripts

```json
"create-script": {
    "executor": "nx:run-commands",
    "options": {
        "cwd": "apps/frontend",
        "commands": [
          "mkdir -p scripts",
          "touch scripts/{args.name}.sh",
          "chmod +x scripts/{args.name}.sh"
        ],
        "parallel": false
    }
}
```

* ways to run for passing the arguments
  * 
    ```bash
    nx run frontend:create-script --args="--name=example"
    ```

    or

  *  
    ```bash
    nx run frontend:create-script --name=example
    ```

{% /tab %}
{% tab label="Arguments forwarding" %}

* 👁️ if interpolation is NOT | `command` -> ALL arguments are forwarded to the command by default 👁️
  * uses
    * pass raw argument strings | your command

```json
"webpack": {
    "executor": "nx:run-commands",
    "options": {
        "command": "webpack"
    }
}
```

```bash
nx run frontend:webpack --args="--config=example.config.js"

# ==    `webpack --config=example.config.js`  
```

  * if you want to disable it -> use `commands.[*].forwardAllArgs=false` / `command`

    ```json
    "webpack": {
        "executor": "nx:run-commands",
        "options": {
            "commands": [
                {
                    "command": "webpack",
                    "forwardAllArgs": false
                }
            ]
        }
    }
    ```

{% /tab %}
{% tab label="Shorthand" %}

* if you only need to run 1 command -> use a shorthand for `nx:run-commands`

```json
"webpack": {
    "command": "webpack"
}
```

{% /tab %}
{% tab label="Custom done conditions" %}

* ways that `run-commands` considers the commands done
  * ALL commands have finished running
  * if you do NOT need to wait until they're all done -> set `"readyWhen": ["SomeString1", "SomeString2", ...]` / `"SomeString1"` & `"SomeString2"` appears in `stdout` or `stderr`

* _Example1:_ 

```json
"finish-when-ready": {
    "executor": "nx:run-commands",
    "options": {
        "commands": [
            "sleep 5 && echo 'FINISHED'",
            "echo 'READY'"    // stdout the special string
        ],
        "readyWhen": "READY",     // "READY" is here the string, BUT any could be set
        "parallel": true
    }
}
```

```bash
nx run frontend:finish-when-ready

# command finish immediately, WITHOUT waiting for 5"
```

* _Example2:_ >1 commands / running in parallel

```json
"finish-when-multiple-ready": {
    "executor": "nx:run-commands",
    "options": {
        "commands": [
            "sleep $[ ( $RANDOM % 10 ) + 1 ] && echo 'READY1' && sleep 3600",
            "sleep $[ ( $RANDOM % 10 ) + 1 ] && echo 'READY2' && sleep 3600",
        ],
        "readyWhen": ["READY1", "READY2"],
        "parallel": true
    }
}
```

```bash
nx run frontend:finish-when-multiple-ready

# command finish as soon as both the 1st and the 2nd command echoed "READY" (between 1 and 10 seconds), instead of waiting for the extra hour
```


{% /tab %}
{% tab label="Nx Affected" %}

* `run-commands` allows running 👁️**custom commands** only | projects / have been affected by a change 👁️
  * Reason: 🧠`run-commands` runs through `nx` -> knows about your project graph 🧠

* _Example:_ configurations / generate docs | ONLY projects / have been changed

```bash
nx affected --target=generate-docs

# nx affected     ->   | projects / have been changed
```

```json
//...
"frontend": {
    "targets": {
        //...
        "generate-docs": {
            "executor": "nx:run-commands",
            "options": {
                "command": "npx compodoc -p apps/frontend/tsconfig.app.json"
            }
        }
    }
},
"api": {
    "targets": {
        //...
        "generate-docs": {
            "executor": "nx:run-commands",
            "options": {
                "command":  "npx compodoc -p apps/api/tsconfig.app.json"
            }
        }
    }
}
```

{% /tab %}
{% /tabs %}

---
