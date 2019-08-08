---
title: Enterprise Features
weight: 3000
---

Some Features of Sakuli requires an enterprice license. Please consult our [overview](/enterprise) to see and request packages and prices. After you registered for an enterprise subscription, you will get a license key and an npm access token which are required to use enterprise features.

## Using NPM-Token

All enterprice plugins are published on NPM. In contrast to the core packages they are not publicly accessible. So you need the provided access token in order to install this packages in your Sakuli projects. The most easiest way is to add it as an environment variable when running the installation command:

{{<highlight bash>}}
NPM_TOKEN=<PERSONAL-TOKEN> npm i @sakuli/<ENTERPRICE-PACKAGE-NAME>
{{</highlight>}}

It is usually not nesseccary to persist the token since you will seldom run `npm install` that often. If it is some how required to set the token permanently on a system consult the official [npm guid for CI/CD integration](https://docs.npmjs.com/using-private-packages-in-a-ci-cd-workflow#set-the-token-as-an-environment-variable-on-the-cicd-server) (even useful outside CI/CD contexts).

## Using the License-Key

The license-key contains information about your subscription which cwill be checked by the enterprise components on before they are executed. In order to provide this information to sakuli you also have to set the license as an environment variable. Because the is read on every single test execution it is useful to store it persitently on your system or set it in a script where the actual test is also called.

The name of the environment variable for the license is `SAKULI_LICENSE_KEY`

## Environment Variables

> An environment variable is a dynamic-named value that can affect the way running processes will behave on a computer.

> They are part of the environment in which a process runs. For example, a running process can query the value of the TEMP environment variable to discover a suitable location to store temporary files, or the HOME or USERPROFILE variable to find the directory structure owned by the user running the process.

\- [Wikipedia, 08/2019](https://en.wikipedia.org/wiki/Environment_variable)

So basically a environment variable is just a simple key-value pair provided to a certain process e.g. `VAR_NAME=VALUE`. They can be set per process or system-wide - so that they are accessible in each upcoming process.

The method to set a environment variable can depends on your system.

### On Windows

To set a environment variable on Windows you have to:

- Open _Start-Menu_ and type <kbd>env</kbd>
  - An entry **Edit the system environment variables** should appear (click it)
- A _System Properties_ dialog should open.
  - Go to tab _Advanced_
  - Click the button _Environment Variables_ (on the bottom of this dialog)
- You should see two tables with _Variable_ and _Value_ columns for _User Variables_ and _System variables_

Thats it there you can set, edit or delete Envrionment variables permanently on your system (it is recommended to edit the system variables table if possible). A more detailed guide can be found [here](https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/)

Alternativly you can use [Rapid Environemnt Editor](https://www.rapidee.com/en/about) which is just a nice tool edit  system configuration on Windows.

In case of a more restritive environemnt - where it is not possible to edit environment variables - you can set them in a batch script:

`run-sakuli.bat`
{{<highlight batch>}}
SET SAKULI_LICENSE_KEY=<PERSONAL_LICENSE>
sakuli run .
{{</highlight>}}

### On Linux or OSX

On Linux or OSX is usually a file wihch sets up the environment for certain processes.

- `~/.bashrc` on Linux
- `~/.profile` on OSX

This files can be edited with every texteditor to add, edit or remove environment variables. An environemnt variable is defined with:

{{<highlight bash>}}
export VARIABLE_NAME=VALUE
{{</highlight>}}

A new variable can be added with a command:

{{<highlight bash>}}
echo "export VARIABLE_NAME=VALUE" >> ~/.bashrc # Linux
echo "export VARIABLE_NAME=VALUE" >> ~/.profile # OSX
{{</highlight>}}
