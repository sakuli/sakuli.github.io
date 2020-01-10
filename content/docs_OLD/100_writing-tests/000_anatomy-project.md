---
title: Anatomy of a Project
---

This guide assumes that you have finished the "Getting started" tutorial or that you are experienced with Sakuli v1. 

> Most of the complexity and conventions are due to the backwards compatibility to v1, which requires a specific folder and file structure for various reasons (the biggest is Sahi). Sakuli offers now various ways to reduce this complexity dramatically. These features will eventually become part of upcoming releases.

## Setup and configuration

The minimum setup for a Sakuli project looks like this:

{{% unstyled-list %}}
- <i class="fas fa-folder"></i> **your-sakuli-project** *Home folder of the project*
  - <i class="far fa-file"></i> **package.json** *All dependencies and setups for Node.js*
  - <i class="far fa-file"></i> **sakuli.properties** *(optional: Configuration for all testsuites)*
  - <i class="fas fa-folder"></i> **testsuite-a** *Home folder of a testsuite*
     - <i class="far fa-file"></i> **testsuite.suite** *Defines which testcases belong to the testsuite*
     - <i class="far fa-file"></i> **testsuite.properties** *Configuration for the testsuite (overrides configuration from '../sakuli.properties')*
     - <i class="fas fa-folder"></i> **testcase** *Home of the testcase*
         - <i class="far fa-file"></i> **testcase.js** *The actual testcase*

{{% /unstyled-list %}}

This file layout also represents the logical structure of Sakuli, which consists of a *testsuite* with one or more *testcase(s)*. Sakuli's `run` command takes the path to a testsuite folder and runs all testcases defined in `testsuite.suite` of the given folder. 

### testsuite.suite

This file is a relic from Sahi where you define testcases and their respective start-urls. It has a simple format:

```
<CASE-PATH>/<CASE-FILE> <START-URL>
```

`<CASE-PATH>` is a path within the testsuite file, which has to contain the file `<CASE_FILE>`. The `<START-URL>` is no longer used by Sakuli (but required to fulfil the file format). The format also supports comments (`//` at the beginning of a line). Testcases can be activated or deactivated by using comments.

> The configured start-url is omitted to force test authors to write explicit navigation to the url for testcases using `_navigateTo`.

### Properties Files

Each testsuite requires a `testsuite.properties` file with at least one entry:

```
testsuite.id=SomeName
```

It "inherits" its values from `../sakuli.properties` (which also means that the same property from `sakuli.properties` becomes overridden). 

> Property files are a common way to store configuration in Java, the former runtime for Sakuli. It is a simple key-value format (`<KEY>=<VALUE>`) where every line defines a key-value pair. To organize the keys, it is a common - but not required - practice to separate names by dots (similar to Java namespaces).

There are several predefined properties that can be configured to influence the behavior of Sakuli (* indicates a required property):

| Property            | Type: Default     | Comment / Example                                            |
| ------------------- | ----------------- | ------------------------------------------------------------ |
| `testsuite.id`      | String*: /        | Name of the suite shown in the output and used by the forwarder |
| `testsuite.browser` | String: 'firefox' | Browser which is started by the WebDriver (it can be overridden by the `--browser` command line argument) |

You can also define own properties and use them in your testcases. Just put your custom property key with the corresponding value in one of the `.property` files and into your testcase. You can retrieve the values with help of the [**Environment Class**](/apidoc/sakuli-legacy/interfaces/thenableenvironment.html#getproperty):

{{< highlight javascript "linenos=table,linenostart=1" >}}
// omitting boilerplate 
// assuming you have added 
// user.name=Tester 
// in one of the property files
const env = new Environment();
await _setValue(_textbox('username'), env.getProperty('user.name')); 

{{</highlight>}}