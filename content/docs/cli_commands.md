---
title: CLI Commands
slug: cli-commands
weight: 0
---

### sakuli create project
{{<highlight bash>}}
npx sakuli create project [ path ] [ suiteName ] [ --force | -f ] [ --package ]


Generates a default project structure


Positionals:
  path                  Path to create testsuite                                    [optional][default: $PWD]
  suiteName             Name of testsuite                                           [optional][default: sakuli_test_suite]
  
Options:
  --force (alias -f)    Forces sakuli to create testsuite
  --package             Create additional package.json for testsuite
{{</highlight>}}

### sakuli create masterkey
{{<highlight bash>}}
npx sakuli create masterkey [ --algorithm ]


Generates a new masterkey


Positionals:
  algorithm             The algorithm to create a key for                           [optional][default: "aes-128-cbc"]
{{</highlight>}}

  
### sakuli enable-enterprise
{{<highlight bash>}}
npx sakuli enable-enterprise


Configures and enables enterprise features
{{</highlight>}}

### sakuli enable-typescript
{{<highlight bash>}}
npx sakuli enable-typescript project


Enables Typescript support for the provided project


Positionals:
  project               Path to the project, can be absolute or relative to $PWD    [required]
{{</highlight>}}

### sakuli encrypt
{{<highlight bash>}}
npx sakuli encrypt secret --masterkey


Encrypts a secret via provided masterkey


Positionals:
  secret                The secret to encrypt                                       [required]
  
Options:
  --masterkey           The masterkey used for encryption                           [required]
{{</highlight>}}

### sakuli migrate
{{<highlight bash>}}
npx sakuli migrate path


Transforms all legacy testsuites into new syntax


Positional
  path                  path to a legacy suite                                      [required]
{{</highlight>}}


### sakuli run
{{<highlight bash>}}
npx sakuli run path


Runs a Sakuli Suite


Positionals:
  path                  path to Sakuli suite                                        [required]
{{</highlight>}}
