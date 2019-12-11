---
title: CLI Commands
slug: cli-commands
weight: 0
---

* [sakuli create project](#sakuli-create-project)
* [sakuli create masterkey](#sakuli-create-masterkey)
* [sakuli enable-enterprise](#sakuli-enable-enterprise)
* [sakuli enable-typescript](#sakuli-enable-typescript)
* [sakuli encrypt](#sakuli-encrypt)
* [sakuli migrate](#sakuli-migrate)
* [sakuli run](#sakuli-run)

### sakuli create project
{{<highlight bash>}}
sakuli create project [path] [suiteName]


Generates a default project structure


Positionals:
  path                  Path to create testsuite                              [optional][default: $PWD]
  suiteName             Name of testsuite                                     [optional][default: sakuli_test_suite]
  
Options:
  --force (alias -f)    Forces sakuli to create testsuite
  --package             Create additional package.json for testsuite
{{</highlight>}}

### sakuli create masterkey
{{<highlight bash>}}
sakuli create masterkey [algorithm]


Generates a new masterkey


Positionals:
  algorithm             The algorithm to create a key for                       [optional][default: Algorithm.AES128CBC]
{{</highlight>}}

  
### sakuli enable-enterprise
{{<highlight bash>}}
sakuli enable-enterprise


Configures and enables enterprise features
{{</highlight>}}

### sakuli enable-typescript
{{<highlight bash>}}
sakuli enable-typescript [project]


Enables Typescript support for the provided project


Positionals:
  project               Path to the project, can be absolute or relative to $PWD    [required]
{{</highlight>}}

### sakuli encrypt
{{<highlight bash>}}
sakuli encrypt [secret]


Encrypts a secret via provided masterkey


Positionals:
  secret                The secret to encrypt                                   [required]
  
Options:
  --masterkey           The masterkey used for encryption
{{</highlight>}}

### sakuli migrate
{{<highlight bash>}}
sakuli migrate [path]


Transforms all legacy testsuites into new syntax


Positional
  path                  path to a legacy suite                                  [required]
{{</highlight>}}


### sakuli run
{{<highlight bash>}}
sakuli run [path]


Runs a Sakuli Suite


Positionals:
  path                  path to Sakuli suite                                    [required]
{{</highlight>}}
