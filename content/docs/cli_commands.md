---
title: CLI Commands
slug: cli-commands
weight: 0
---

### sakuli create project
{{<highlight bash>}}
npx sakuli create project [ <path> ] [ <suiteName> ] [ --force | -f ] [ --package ]


Generates a default project structure


Positionals:
  path                  Path to create testsuite                                    [optional][default: $PWD]
  suiteName             Name of testsuite                                           [optional][default: sakuli_test_suite]
  
Options:
  --force (alias -f)    Forces sakuli to create testsuite
  --package             Create additional package.json for testsuite
{{</highlight>}}

This creates a Sakuli testsuite folder with the `testsuite.suite` and `testsuite.properties` files and a `case1` folder
containing an empty `check.js`. With the `--package` option, it is possible to create an additional `package.json`.
Further information on how to set up a Sakuli project and the needed files can be found [here](../docs/100_writing-tests#setup-and-configuration).


### sakuli create masterkey
{{<highlight bash>}}
npx sakuli create masterkey [ --algorithm ]


Generates a new masterkey


Positionals:
  algorithm             The algorithm to create a key for                           [optional][default: "aes-128-cbc"]
{{</highlight>}}

This command outputs a masterkey which can be used to encrypt a secret with the [sakuli encrypt](#sakuli-encrypt)
command or to decrypt a secret in a testcase with a Sakuli function like `Environment.decryptSecret()`.

  
### sakuli enable-enterprise
{{<highlight bash>}}
npx sakuli enable-enterprise


Configures and enables enterprise features
{{</highlight>}}

This command starts an assistant which will guide you through the setup of enterprise features. More information on how
to use the `enable-enterprise` command can be found [here](../enterprise#assisted-setup).

### sakuli encrypt
{{<highlight bash>}}
npx sakuli encrypt <secret> --masterkey


Encrypts a secret via provided masterkey


Positionals:
  secret                The secret to encrypt                                       [required]
  
Options:
  --masterkey           The masterkey used for encryption                           [required]
{{</highlight>}}

To use this command it is necessary to create a masterkey with [`npx create masterkey`](#sakuli-create-masterkey) first.
With `npx sakuli encrypt` you can now encrypt a secret or password which then can be decrypted in the Sakuli testcase
with one of the decryption functions like `Environment.decryptSecret()`. 

### sakuli migrate
{{<highlight bash>}}
npx sakuli migrate <path>


Transforms all legacy testsuites into new syntax


Positional
  path                  path to a legacy suite                                      [required]
{{</highlight>}}

Since Sakuli had some minor changes in the syntax with v2, old Sakuli v1 testcases need to be adapted to the new syntax.
With this command Sakuli takes over this task. 

### sakuli run
{{<highlight bash>}}
npx sakuli run <path>


Runs a Sakuli Suite


Positionals:
  path                  path to Sakuli suite                                        [required]
{{</highlight>}}
