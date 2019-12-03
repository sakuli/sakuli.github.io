---
title: Getting started
slug: getting-started
description: "Learn how to install Sakuli on your system and write your first test."
weight: 1000
---

## Prerequisites

Sakuli is built and tested against the current LTS version of Node.js.
In order to be able to run Sakuli on your system, we will assume that you have a Node v10.15.3 (lts/dubnium) installed on it.

To install Node on your system, you can either go to the [**Node website**](https://nodejs.org/en/) or you can use tools like [**Node Version Manager**](https://github.com/nvm-sh/nvm), a utility to manage various Node versions on a per-user basis. In general, a per-user installation is the preferred way since it runs in an unprivileged mode.

## Initialization

This guide will get you started with writing Sakuli tests from scratch.
To follow this tutorial, you should create a new NPM project in an empty folder.

For this guide, we will assume that our working directory is `/tmp/sakuli_starter` on a *nix system, or `%Temp%\sakuli_starter` on a Windows machine.

To create a new, empty project, first run:

{{< highlight bash >}}
npm init
{{< /highlight >}}

This interactive prompt will ask you for some metadata regarding your project.
You can either modify these fields to your needs or just accept the defaults.

Once completed, you should see a short summary similar to the following snippet:

{{< highlight bash >}}
About to write to /tmp/sakuli_starter/package.json:

{
  "name": "sakuli_starter",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

Is this OK? (yes)
{{< /highlight >}}

The empty project has been initialized after confirming the prompt.

## Installation

The following steps are required to set up Sakuli to work with multiple browsers.
Once the initial setup is done, we will dive right into our first test.

### WebDriver Installation

Sakuli utilizes the [**WebDriver protocol**](https://www.w3.org/TR/webdriver1/) to remote control browsers during test execution.
In addition to the browser itself, you need to install the corresponding WebDriver as well.
Several wrapper packages can be found on [**npmjs.com**](https://npmjs.com), which allow the installation of the required binaries via `npm`.

Since some users encountered issues with geckodriver on Firefox, we recommend using chromedriver for now. We are working on fixes and workarounds for geckodriver.

Therefore, Chrome is the preferred browser for running Sakuli tests at the moment. A suitable WebDriver can be installed via:

{{< highlight bash >}}
npm i chromedriver
{{< /highlight >}}

or

{{< highlight bash >}}
yarn add chromedriver
{{< /highlight >}}

There are also WebDriver packages for [**IE**](https://www.npmjs.com/package/iedriver) and [**Edge**](https://www.npmjs.com/package/edgedriver).
macOS already ships a WebDriver for Safari, so there is no need to install an additional package.

**Attention:** Be careful to install the correct version of a WebDriver package according to the installed browser version. To install e.g. ChromeDriver for Chrome 73 you have to install:

{{< highlight bash >}}
npm i chromedriver@73.0.0
{{< /highlight >}}

Sakuli is not limited to work with only a single browser.
When installing multiple WebDriver packages, you can easily switch between different browsers.

**Regarding Windows Users:** You will have to manually add the respective WebDriver location to your system `PATH`, otherwise Sakuli will not be able to find and use it. Once you installed a WebDriver package via NPM, you will be prompted with its installation path, so you can easily add it to your `%PATH%` variable.

Sample path:
{{< highlight bash >}}
%USERPROFILE%\\AppData\\Roaming\\npm\\node_modules\\chromedriver\\lib\\chromedriver\\
{{< /highlight >}}

#### 3rd-party dependencies

One of Sakuli's core components, [**nut.js**](https://github.com/nut-tree/nut-js), requires OpenCV.
Sakuli ships a pre-built version of OpenCV. Nonetheless, the installation still requires some 3rd-party dependencies.

#### Windows

In order to install and run Sakuli on Windows you need two additional tools: [**Python 2**](https://www.python.org/downloads/windows/) and the [**Windows Build Tools**](https://www.microsoft.com/en-us/download/details.aspx?id=48159).

To avoid eventual installation problems for Windows users we recommend to first install Python 2 on your system separately by downloading the required version from the official web page. Afterwards you can install the Windows Build Tools manually or via NPM using:

{{< highlight bash >}}
npm install --global windows-build-tools
{{< /highlight >}}

or

{{< highlight bash >}}
yarn global add windows-build-tools
{{< /highlight >}}

In case of errors while installing the Windows Build Tools package via `npm`, please make sure that the PowerShell is available on your system `PATH`. Additionally, you should install the Windows Build Tools by using the PowerShell in administrative mode.
See [**this issue**](https://github.com/felixrieseberg/windows-build-tools/issues/20#issuecomment-373885943) for further reference.

#### macOS

On macOS, Xcode command line tools are required.
You can install them by running:
{{< highlight bash >}}
xcode-select --install
{{< /highlight >}}

#### Linux

Depending on your distribution, Linux setups may differ.

In general, Sakuli requires:

- Python 2
- g++
- make
- libXtst
- libPng

Installation on *buntu:
{{< highlight bash >}}
sudo apt-get install build-essential python libxtst-dev libpng++-dev
{{< /highlight >}}

The installation process is an open issue and will be improved in the near future, so using Sakuli will become even more enjoyable!

#### Sakuli Installation

We will now install Sakuli in our newly created project by running:

{{< highlight bash >}}
npm i @sakuli/cli
{{< /highlight >}}

or

{{< highlight bash >}}
yarn add @sakuli/cli
{{< /highlight >}}

This will install Sakuli and its required dependencies.

#### Reference

- [opencv4nodejs](https://github.com/justadudewhohacks/opencv4nodejs#how-to-install)
- [robotjs](http://robotjs.io/docs/building)

## Setup Your First Test

Since v2.2.0 Sakuli provides an easy to use mechanism to initialize testcases and testsuites.

{{< highlight bash >}}
npx sakuli create project . my-sut
{{< /highlight >}}

This will create all necessary files and folders to start writing your first Sakuli test right away. With this, you can skip the next section and directly start to [write your first test](#write-your-first-test)

### Setup the Project manually

Since we wanted to keep Sakuli mostly compatible to v1, the file layout looks basically the same for testsuites.

Each testsuite is located in its own particular folder. Generally, a testsuite represents the system you want to test. Therefore, you need to create that folder in your project root (where the package.json file is located):

{{< highlight bash >}}
mkdir my-sut
{{< /highlight >}}

To describe the testsuite and its testcases, two additional files are needed: `testsuite.properties` and `testsuite.suite`. These files are required for backwards compatibility (they might not be necessary in the future but will at least be supported). These files should be added to the `my-sut` folder:

{{< highlight bash >}}
cd my-sut
echo > testsuite.suite
echo > testsuite.properties
{{< /highlight >}}

We can add the following contents to `testsuite.properties`:

{{< highlight bash >}}
echo testsuite.id=my-sut > testsuite.properties
{{< /highlight >}}

This is the minimum configuration for using Sakuli. The `.properties` file adds some metadata needed by the Sakuli-Runtime and can be changed to configure other things like forwarders or the default browser for the execution.

The `testsuite.suite` file tells Sakuli which testcases are running. The format is:

{{< highlight bash >}}
<FOLDER-NAME>/<FILE-NAME>.js <START_URL>
{{< /highlight >}}

The actual testcase file must be placed inside a folder (this is due to the format forced by Sahi in Sakuli v1). The start-url also needs to be added but has no effect in v2+.

With this in mind, we can add a testcase file:

{{< highlight bash >}}
mkdir case1
echo > case1/check.js
{{< /highlight >}}

And add the following information to the `testsuite.suite` file:

{{< highlight bash >}}
echo case1/check.js https://sakuli.io > testsuite.suite
{{< /highlight >}}

## Write Your First Test

After the setup you can add the actual testcode to `case1/check.js`:

{{< highlight typescript "linenos=table,hl_lines=1 2 6 8 11" >}}

(async () => {  // 1
    const testCase = new TestCase(); // 2
    try {
        // actual testcode goes here
    } catch (e) {
        await testCase.handleException(e); // 3
    } finally {
        await testCase.saveResult(); // 4
    }
})() // 5

{{< /highlight >}}

Let us examine this piece of code:

1. The whole test is wrapped in an async immediate invoked function. It allows us to use the async/await syntax of ES6. Since Sakuli makes heavy use of async operations, it makes your code more readable.
2. To provide Sakuli information about our actual testcase, we create a TestCase object, which handles the execution of a testcase.
3. If any error occurs during testing, it will be redirected to the TestCase object. It triggers Sakuli's internal error handling e.g. taking a screenshot of the actual failed test execution.
4. Regardless of a failed or passed test execution, Sakuli saves all results. This is more like a legacy artifact and will be removed in the future.
5. The `()` at the end of this line will invoke the defined function. Since v2.2.0 Sakuli is able to detect this invocation without explicitly chaining the call of `done` function like in previous versions (it's still possible to add `.then(done)`);

Let us write a simple test using the Sakuli.io homepage as test subject. This test will verify if our "Getting Started" guide that you are reading at this very moment is still accessible.

{{< highlight typescript "linenos=table,hl_lines=1 2 6 8 11" >}}

(async () => {
    const testCase = new TestCase();
    try {
        await _navigateTo("https://sakuli.io");                  // 1
        testCase.endOfStep("Open Landing Page", 5, 10);          // 2
        await _click(_link("Getting started"));                  // 3
        testCase.endOfStep("Navigate to Getting Started", 3, 5);
        await _highlight(_code("npm init"));                     // 4
        testCase.endOfStep("Find npm init code sample");
    } catch (e) {
        await testCase.handleException(e);
    } finally {
        await testCase.saveResult();
    }
})();

{{< /highlight >}}

1. Since we are dealing with a web test, the first thing we want to do is to `_navigateTo` our target page. Instead of manually setting up the correct WebDriver instance, we just have to provide a target URL. Sakuli will take care of the rest for us. `await` indicates that we are patiently waiting for our page to load before we continue with our next testing step.
2. Once our initial page load has been completed, it is of our great interest to know how long it took to render. When it comes to runtime, Sakuli does not only measure the execution time of testcases, but also allows to split a single testcase into several logical steps. This way it becomes possible to accurately measure the runtime of certain processes like e.g. *login*, *shopping cart*, *checkout* and so on. By calling `testCase.endOfStep("Open Landing Page", 5, 10);`, we are ending our first step, the initial page load. Additionally, it is also possible to specify `warning` and `critical` thresholds for each step. Whenever a step exceeds one of these values, the result will change from `OK` to `WARNING` or `CRITICAL`.
3. With Sakuli it becomes very easy to interact with web elements. In our current example, we want to `_click` a `_link` which is identified by some given text. Once again, we do not have to take care of many details, as Sakuli will do most of the heavy lifting for us. We are just passing the link text to Sakuli, which will search for our desired element using multiple identifiers. This way we do not have to worry about using an ID, a CSS selector or something else to identify our element. As we have already seen in our first test action, `await` will wait until the test action has been completed.
4. In some cases, it is really helpful to visually verify test execution. Sakuli comes with a built-in `_highlight` function, which will highlight an element with a bright red border. Although being useful, `_highlight` should be used carefully since it will increase the overall testing runtime.

## Execute your first test

Since Sakuli 2 is built with Node, there are at least two different ways to execute a Sakuli test. We will take a look at each one of them.
Organizing tests as NPM projects makes it easier for you to distribute testcode.
Everything required to execute the test is described in a project config, so tests should be ready to use after running `npm install` inside a project. 👍

### [npx](https://www.npmjs.com/package/npx)

Because of the way we have set up and configured our project in this guide, Sakuli is only available to this particular project. `npx` is a really handy tool, which allows us to execute our Sakuli CLI directly from the command line, even though we did not add it to the system `PATH`.

In order to run our first test, we just have to execute `npx sakuli run my-sut` inside our project folder (e.g. `/tmp/sakuli_starter` on *nix).
By default, Sakuli will pick up the browser configured in the `testsuite.properties` file, but with npx it is possible to change the browser on the fly:
<img src="/images/gettingstarted/simple_sakuli_test.png" alt="Successful Sakuli test execution" style="max-width: 400px; float:right" />

{{< highlight bash >}}npx sakuli run my-sut --browser chrome{{< /highlight >}}
This command will execute our test in Chrome.

Regardless of the browser choice, as long as our site did not slow down, you should see a successful test result, similar to the image on the right.
The advantage of running your tests with `npx` is the flexibility to easily customize your test runs without having to edit files.

### npm test

As mentioned earlier, we installed Sakuli locally into our test project.
An alternative way to execute Sakuli tests are [**npm scripts**](https://docs.npmjs.com/misc/scripts).

In our project folder we can find a file named [**package.json**](https://docs.npmjs.com/files/package.json), the central configuration file for NPM projects.
This file contains a section called `scripts`, including a collection of scripts that belong to this package and that can be executed via NPM.

A default project contains a dummy script to execute tests, similar to the following snippet:
{{< highlight bash >}}
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
},
{{< /highlight >}}

The `test` script is the perfect place for us to execute our Sakuli test:
{{< highlight bash >}}
"scripts": {
  "test": "sakuli run my-sut --browser chrome"
},
{{< /highlight >}}

To run the test, just execute
{{< highlight bash >}}
npm test
{{< /highlight >}}
inside your project folder.

Many modern IDEs support npm scripts, so it is possible to trigger test execution directly from within your IDE!

### Congratulations!
You wrote and executed your first Sakuli test! May there be many more to come!

If you want to learn more about native test actions, head over to the [**testing**](https://sakuli.io/testing/) section!
