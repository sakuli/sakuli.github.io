---
title: Enterprise Features
slug: enterprise
weight: 3000
---

Some features of Sakuli require an enterprise license. Please consult our **[overview](/enterprise)** to see and request packages and prices. After you registered for an enterprise subscription, you will get a license-key and an NPM access token which are required to use enterprise features.

## Using License Information

After you subscribed to a _Sakuli enterprise_ subscription you will receive an email with:

- _Sakuli license-key_ - Contains information about your subscription and is used by Sakuli itself
- and a _NPM-Token_ - Allows access to private enterprise packages on NPM

There are several ways to handle these information. The most simple way for setting up your enterprise features is as follows (_substitute the placeholders between the chevrons with the appropriate values_):

_On Unix_
{{<highlight bash>}}
echo "//registry.npmjs.org/:_authToken=<NPM-TOKEN>" >> ~/.npmrc
echo "export SAKULI_LICENSE_KEY=<SAKULI-LICENSE-KEY>" >> ~/.bashrc
{{</highlight>}}

_On Windows_
{{<highlight bash>}}
echo "//registry.npmjs.org/:_authToken=<NPM-TOKEN>" >> %USERPROFILE%\.npmrc
setx SAKULI_LICENSE_KEY=<SAKULI-LICENSE-KEY>
{{</highlight>}}

_On OSX_
{{<highlight bash>}}
echo "//registry.npmjs.org/:_authToken=<NPM-TOKEN>" >> ~/.npmrc
echo "export SAKULI_LICENSE_KEY=<SAKULI-LICENSE-KEY>" >> ~/.profile
{{</highlight>}}

{{<alert>}}
The environment variables might not take effect on the command-line window where the commands above are entered. You might need to open a new command-line when running the Sakuli command.
{{</alert>}}

These commands will set the license-key and token globally. This is good for a first setup on your device but might provoke some shortcomings in some situations. The following paragraphs describe alternative ways to provide license/token information to your Sakuli installation.

## Alternative using NPM-Token

You can set the NPM-Token for each project by adding a `.npmrc` file to your project's root directory:

{{<highlight bash>}}
# cd path/to/project
echo "//registry.npmjs.org/:_authToken=<NPM-TOKEN>" >> .npmrc
{{</highlight>}}

This command will create a `.npmrc` file with the necessary token information and every upcoming `npm install` will use this configuration. If you do not like to save the token in a file (because this file might be shared) you can configure it to use an [environment variable](environment-variables) instead:

{{<highlight bash>}}
echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" >> .npmrc
{{</highlight>}}

In this case you have to provide the token via an environment variable `NPM_TOKEN` or set it for each installation of an enterprise package:

{{<highlight bash>}}
NPM_TOKEN=<NPM-TOKEN> npm i <ENTERPRISE-PACKAGE>
{{</highlight>}}

This approach is frequently used in automation scenarios such as CI/CD pipelines and projects that are shared (e.g. via version control systems).

It is usually not necessary to persist the token since you will seldomly run `npm install` that often. If it is required to set the token permanently on a system consult the official **[NPM guid for CI/CD integration](https://docs.npmjs.com/using-private-packages-in-a-ci-cd-workflow#set-the-token-as-an-environment-variable-on-the-cicd-server)** (even useful outside CI/CD contexts).

## Using the License-Key

The license-key contains information about your subscription which will be checked by enterprise components before they are executed. In order to provide this information to Sakuli you also have to set the license-key as an environment variable. Because the license-key is read on every single test execution it is useful to store it persistently on your system or set it in a script where the actual test is also called.

The name of the environment variable for the license-key is `SAKULI_LICENSE_KEY`.

## More about Environment Variables

> An environment variable is a dynamic-named value that can affect the way running processes will behave on a computer.
> They are part of the environment in which a process runs. For example, a running process can query the value of the TEMP environment variable to discover a suitable location to store temporary files, or the HOME or USERPROFILE variable to find the directory structure owned by the user running the process.

\- [Wikipedia, 08/2019](https://en.wikipedia.org/wiki/Environment_variable)

So basically an environment variable is just a simple key-value pair provided to a certain process e.g. `VAR_NAME=VALUE`. They can be set for each process or system-wide - so that they become accessible for each upcoming action.

The approach for integrating an environment variable depends on the respective operating system.

### On Windows 

To set up an environment variable on Windows you have to:

- Open _Start-Menu_ and type <kbd>env</kbd> into the search mask
  - An entry **'Edit the system environment variables'** should appear (click on it)
- After the _System Properties_ dialog showed up
  - Go to the _Advanced_ tab
  - Click on the button _Environment Variables_ (at the bottom of the dialog)
- You should see two tables including _Variable_ and _Value_ columns for _User Variables_ and _System variables_

There you can set, edit or delete environment variables permanently on your system (it is recommended to edit the system variables table if possible). A more detailed guide can be found [**here**](https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/).

Alternatively you can use **[Rapid Environment Editor](https://www.rapidee.com/en/about)** which is a nice tool for editing environment variables on Windows.

In case of a more restrictive environment - where it is not possible to edit environment variables that easily - you can set them in a batch script:

`run-sakuli.bat`
{{<highlight batch>}}
SET SAKULI_LICENSE_KEY=<PERSONAL_LICENSE>
sakuli run .
{{</highlight>}}

### On Linux or OSX

On Linux or OSX it is usually a file which sets up the environment for certain processes:

- `~/.bashrc` on Linux
- `~/.profile` on OSX

These files can be changed with every text editor to add, edit or remove environment variables. An environment variable is defined by:

{{<highlight bash>}}
export VARIABLE_NAME=VALUE
{{</highlight>}}

A new variable can be added with the command:

{{<highlight bash>}}
echo "export VARIABLE_NAME=VALUE" >> ~/.bashrc  # Linux
echo "export VARIABLE_NAME=VALUE" >> ~/.profile # OSX
{{</highlight>}}

