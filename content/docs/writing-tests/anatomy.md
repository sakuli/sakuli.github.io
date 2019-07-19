---
title: Anatomy of a Project
---

This guide assumes that you have finished the getting started guide or experience with Sakuli v1. 

> The most of the complexity and conventions comes due to the backwards compatibility to V1 which requires such a folder and file layout for various reasons (the biggest is Sahi). Sakuli now offers various ways to reduce this complexity dramatically. This features will come eventually in upcomming releases.

## Setup and configuration

The minimum setup of a Sakuli project looks like this:

{{% unstyled-list %}}
- <i class="fas fa-folder"></i> **your-sakuli-project** *Homefolder of the project*
  - <i class="far fa-file"></i> **package.json** *All dependencies and setup for NodeJs*
  - <i class="far fa-file"></i> **sakuli.properties** *(optional: Configuration for all Testsuites)*
  - <i class="fas fa-folder"></i> **testsuite-a** *Homefolder of a testsuite*
     - <i class="far fa-file"></i> **testsuite.suite** *Defines which testcases belongs to the testsuite*
     - <i class="far fa-file"></i> **testsuite.properties** *Configuration for the testsuite (overrides configuration from '../sakuli.properties')*
     - <i class="fas fa-folder"></i> **testcase** *Home of the testcase*
         - <i class="far fa-file"></i> **testcase.js** *The actual testcase*

{{% /unstyled-list %}}

This file layout also represents the logical structure of Sakuli which consists of a *testsuite* with one or more *testcase(s)*. Sakulis `run` command takes a path to a testsuite folder and runs all testcases defined in `testsuite.suite` from the given path. 

### testsuite.suite

This file is a relic from Sahi where you define test cases and there respective start url are defined in this file. It has a simple own format:

```
<CASE-PATH>/<CASE-FILE> <START-URL>
```

`<CASE-PATH>` is a path within the testsuite file which have to contain the file `<CASE_FILE>`. The `<START-URL>` is not longer used by Sakuli (but required to fulfill the file format). The format also supports comments (`//` at the beginn of a line). Comments are the usual way to activate or deactive testcases.

> The configured start-url is omitted to force test authors to write explicit navigation to the url in the testcases using `_navigateTo`.

### Properties Files

Each testsuite requires a `testsuite.properties` file with at least one entry:

```
testsuite.id=SomeName
```

It "inherits" its values from `../sakuli.properties` (which also means, that the same property from sakuli.properties is overriden). 

> Property files are a common way to store configuration in Java the former runtime for Sakuli. It is a simple key value format (`<KEY>=<VALUE>`) where every line defines a key-value pair. To organize the keys it is a common - but not required - pattern to seperate names by dots (similar to Java namespaces)

There are several predefined properties to configure the behavior of Sakuli (* indicates a required property):

| Property            | Type: Default     | Comment / Example                                            |
| ------------------- | ----------------- | ------------------------------------------------------------ |
| `testsuite.id`      | String*: /        | Name of the Suite shown in the output and used by the forwarder |
| `testsuite.browser` | String: 'firefox' | Browser which is started by the webdriver (It can be overridden by `--browser` commandline argument) |

You can also define own properties and use them in your test cases. Just put your custom property key with its value in one of the `.property` files and in your test case you are able to retrieve this value with the [Environment Class](/apidoc/sakuli-legacy/interfaces/thenableenvironment.html#getproperty):

{{< highlight javascript "linenos=table,linenostart=1" >}}
// omitting boilerplate 
// assuming you have added 
// user.name=Tester 
// in one of the property files
const env = new Environment();
await _setValue(_textbox('username'), env.getProperty('user.name')); 

{{</highlight>}}