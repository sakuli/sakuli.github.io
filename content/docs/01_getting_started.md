---
title: Getting started
slug: getting-started
---

## Prerequisites

Sakuli is built and tested against the current LTS version of Node.js.
So in order to run Sakuli on your system, we will assume that you have a node v10.15.3 (lts/dubnium) installed on your system.

To install Node.js on your system, you can either go to the [node website](https://nodejs.org/en/), or you could use tools like [node version manager](https://github.com/nvm-sh/nvm), a utility to manage various node versions on a per-user basis. In general, a per-user installation is the prefered way since it runs in unpriviledged mode.

## Initialisation

This guide will get you started with writing Sakuli tests from scratch.
To follow the tutorial, you should create a new npm project in an empty folder.

For this guide, we will assume that our working directory is `/tmp/sakuli_starter` on a *nix system, or `%Temp%\sakuli_starter` on a Windows machine, respectively.

To create a new, empty project, first run:

{{< highlight bash >}}
npm init
{{< /highlight >}}

This interactive prompt will ask you for some metadata regarding your project.
You can either modify these fields to your needs, or just accept the defaults.

Once completed you should see a short summary similar to the following snippet:

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

After confirming the prompt, an empty project has been initialized.

## Installation

The following steps are required to set up Sakuli to work with a multitude of browsers.
Once the initial setup is done, we will dive right into our first test.

### WebDriver Installation

Sakuli utilizes the [WebDriver protocol](https://www.w3.org/TR/webdriver1/) to remote control browsers during test execution.
In addition to the browser itself, you need to install the corresponding WebDriver as well.
Several wrapper packages can be found on [npmjs.com](https://npmjs.com), which allow to install the required binaries via `npm`.

To run tests on Chrome, a suitable WebDriver can be installed via

{{< highlight bash >}}
npm i chromedriver
{{< /highlight >}}

or

{{< highlight bash >}}
yarn add chromedriver
{{< /highlight >}}

Alternatively, to run tests on FireFox:

{{< highlight bash >}}
npm i geckodriver
{{< /highlight >}}

or

{{< highlight bash >}}
yarn add geckodriver
{{< /highlight >}}

There are also WebDriver packages for [IE](https://www.npmjs.com/package/iedriver) and [Edge](https://www.npmjs.com/package/edgedriver).
macOS already ships a WebDriver for Safari, so there's no need to install an additional package.

**Attention:** Be careful to install the correct version of a WebDriver package for your installed browser version. To install e.g. ChromeDriver for Chrome 73 you have to install

{{< highlight bash >}}
npm i chromedriver@73.0.0
{{< /highlight >}}

Sakuli is not limited to work with only a single browser.
When installing multiple WebDriver packages, you can easily switch between multiple browsers.

**Regarding Windows Users:** On Windows machines, you will have to manually add the respective WebDriver location to your path, otherwise Sakuli will not be able to find it. Once you installed a WebDriver package via npm, you'll be prompted with its installation path, so you can easily add it to your `%PATH%` variable.

Sample path:
{{< highlight bash >}}
%USERPROFILE%\\AppData\\Roaming\\npm\\node_modules\\chromedriver\\lib\\chromedriver\\
{{< /highlight >}}

#### 3rd-party dependencies

One of Sakulis core components, [nut.js](https://github.com/nut-tree/nut-js), requires OpenCV.
Sakuli ships a pre-built version of OpenCV, nonetheless, the installation still requires some 3rd-party dependencies.

#### Windows

In order to install Sakuli on Windows, [Windows Build Tools](https://www.microsoft.com/en-us/download/details.aspx?id=48159) and [Python 2](https://www.python.org/downloads/windows/) are required.
You can either set them up manually, or install them via npm:

{{< highlight bash >}}
npm install --global windows-build-tools
{{< /highlight >}}

or

{{< highlight bash >}}
yarn global add windows-build-tools
{{< /highlight >}}

#### macOS

On macOS, Xcode command line tools are required.
You can install them by running
{{< highlight bash >}}
xcode-select --install
{{< /highlight >}}

#### Linux

Depending on your distribution, Linux setups may differ.

In general, Sakuli requires

- Python 2
- g++
- make
- libXtst
- libPng

Installation on *buntu:
{{< highlight bash >}}
sudo apt-get install build-essential python libxtst-dev libpng++-dev
{{< /highlight >}}

Setups on other distributions might differ.

The installation process is an open issue and will be enhanced in the near future, so using Sakuli becomes even more enjoyable!

#### Sakuli Installation

Still in our newly created project, we will install Sakuli by running

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

## Setup your first test

Since we wanted to keep Sakuli mostly compatible to V1 the file layout looks basically the same for test suites.

Each Testsuite is located in a dedicated folder. A common practice is that a testsuite represents the system you want to test, so you need to create that folder in your project root (where the package.json file is located):

{{< highlight bash >}}
mkdir my-sut
{{< /highlight >}}

To describe the testsuite with its testcases two additional files are required: `testsuite.properties` and `testsuite.suite`. This files are required for backwards compatibility (they might not be necessary in the future but will at least be supported). This files should be added to the `my-sut` folder.

{{< highlight bash >}}
cd my-sut
touch testsuite.suite
touch testsuite.properties
{{< /highlight >}}

we can add the following contents to `testsuite.properties`:

{{< highlight bash >}}
echo "testsuite.id=my-sut" >> testsuite.properties
{{< /highlight >}}

This is the minimum configuration for Sakuli. The .properties files adds some metainformation for the Sakuli-Runtime and can further be used to configure other things like forwarder or the default browser of the execution.

The `testsuite.suite` file tells Sakuli which testcases take place in this testsuite. The format is:

{{< highlight bash >}}
<FOLDER-NAME>/<FILE-NAME>.js <START_URL>
{{< /highlight >}}

The actual testcase file must be placed inside a folder (this is due to the format which was forced by Sahi in Sakuli V1). The starturl also needs to be added but has no effect in V2+.

With this in mind we can add a testcase file:

{{< highlight bash >}}
mkdir my-testcase
touch my-testcase/testcase.js
{{< /highlight >}}

and add this information to the `testsuite.suite` file:

{{< highlight bash >}}
echo "my-testcase/testcase.js https://sakuli.io" >> testsuite.suite
{{< /highlight >}}

after this setup you can add the actual testcode to `my-testcase/testcase.js`:

{{< highlight typescript "linenos=table,hl_lines=1 2 6 8 11" >}}

(async () => {  // 1
    const testCase = new TestCase(); // 2
    try {
        // actual test code goes here
    } catch (e) {
        testCase.handleException(e); // 3
    } finally {
        testCase.saveResult(); // 4
    }

})().then(done); // 5

{{< /highlight >}}

Let´s examine this piece of code:

1. The whole test is wrapped in a async immediate invoked function, it allows us to use async / await syntax of ES6. Since Sakuli makes heavy use of async operations it makes your code more readable.
2. To provide Sakuli information about our actual testcase we create a TestCase object, which handles the execution of a testcase.
3. If any error occured during your testcode this error is redireced to the Testcase object. It triggers Sakulis internal error handling e.g. taking a screenshot in the actual errored situation
4. Regardless of a failed or passed test execution Sakuli saves its results. This is more like legacy artifact and will be removed in the future.
5. When the async code whitin the main function (see 1.) is completed, a callback passed to the `then` function is invoked. `done` is a global funtion which is injected by Sakuli and tells the engine that the testexecution is over (in theory you could call this function `done()` but this syntax above is recommended).

## Write your first Test

Let´s write a simple test using the Sakuli.io homepage. This test will verify that our "Getting Started" guide you are reading at the very moment is still accessible.

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
        testCase.handleException(e);
    } finally {
        testCase.saveResult();
    }

})().then(done);

{{< /highlight >}}

1. Since we're dealing with a web test, the first thing we want to do is to `_navigateTo` our target page. Instead of manually setting up the correct WebDriver instance, we just have to provide a target URL, Sakuli will take care of the rest for us. `await` indicates that we are patiently waiting for our page to load, before we continue with our next teststep.
2. Once our initial page load has completed, it's of great interest for us how long it took to render. When it comes to runtime, Sakuli not only measures execution time of testcases, but also allows to split a single testcase into several logical steps. This way its possible to accurately measure the runtime of certain processes like e.g. *login*, *shopping cart*, *checkout* and so on. By calling `testCase.endOfStep("Open Landing Page", 5, 10);`, we're ending our first step, the initial page load. In addition it's also possible to specify `warning` and `critical` thresholds for each step. Whenever a steps exceeds on of these values, its result will change from `OK` to `WARNING` or `CRITICAL`.
3. With Sakuli it's really easy to interact with web elements. In our current example we want to `_click` a `_link` which is identified by some given text. Once again, we do not have to take care of many details, Sakuli will do most of the heavy lifting for us. We're just passing the link text to Sakuli, which will search for our desired element using multiple identifiers. This way we do not have to worry about whether to use an id, a CSS selector or something else to identify our element. As we have already seen in our first test action, `await` will wait until our testaction has completed.
4. In some cases it is really helpful to visually verify testexecution. Sakuli comes with a buil-in `_highlight` function, which will highlight an element with a bright red border. Altough being useful, `_highlight` should be used carefully since it will increase the overall test runtime.

## Execute your first test

Since Sakuli 2 is built with node, there are at least two different ways to execute a Sakuli test. We will take a look at each on of them.
Organizing tests as npm projects makes it easier for you to distribute test code.
Everything required to execute the test is described in a project config, so tests should be ready to use after running `npm install` inside a project. 👍

### [npx](https://www.npmjs.com/package/npx)

The way we set up and configured our project in this guide, Sakuli is only available to this particular project. `npx` is a really handy tool which allows us to execute our Sakuli CLI directly from the command line, even though it is not in our PATH.

In order to run our first test, we just have to execute `npx sakuli run my-sut` inside our project folder (e.g. `/tmp/sakuli_starter` on *nix).
By default, Sakuli will pick up the browser configured in the `testsuite.properties` file, but with npx its possible to change the browser on the fly:
<img src="/images/gettingstarted/simple_sakuli_test.png" alt="Successfull Sakuli test execution" style="max-width: 400px; float:right" />

{{< highlight bash >}}`npx sakuli run my-sut --browser=chrome`{{< /highlight >}}
will execute our test in Chrome, while
{{< highlight bash >}}`npx sakuli run my-sut --browser=firefox`{{< /highlight >}}
will run the test in FireFox.

Regardless of browser choice, as long as our site didn't slow down, you should see a successfull test result, similar to the image on the right.
The nice thing about running your tests with `npx` is the flexibility to easily customize your test runs without having to edit files.

### npm test

As mentioned earlier, we installed Sakuli local to our test project.
An alternative way to execute a Sakuli test are [npm scripts](https://docs.npmjs.com/misc/scripts).

In our project folder we can find a file named [package.json](https://docs.npmjs.com/files/package.json), the central configuration file for npm projects.
This file contains a section called `scripts`, a collection of package local scripts which can be executed via npm.

A default project contains a dummy script to execute tests, similar to the following snippet:
{{< highlight bash >}}
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
},
{{< /highlight >}}

The `test` script is the perfect place for us to execute our Sakuli test:
{{< highlight bash >}}
"scripts": {
  "test": "sakuli run my-sut --browser=chrome"
},
{{< /highlight >}}

To run the test, just execute
{{< highlight bash >}}
npm test
{{< /highlight >}}
inside your project folder.

Many modern IDEs support npm scripts, so its possible to trigger testexecution directly from within your IDE!

### Global installation

If you do not want to create separate npm projects for your test suites, it is also possible to install Sakuli `global`.
When installed with the additional flag `-g`, Sakuli will be installed and added to your PATH.

{{< highlight bash >}}
npm i -g @sakuli/cli
{{< /highlight >}}

Once the installtion has completed, you can run your Sakuli tests from your command line by simply executing
{{< highlight bash >}}
sakuli run $PATH_TO_TESTSUITE
{{< /highlight >}}

**Attention:** Installing packages globally on a system wide installation of node via `sudo` is considered bad practice and might run into permission problems. Working with per-user installations is recommended!

### Congratulations!
You wrote and executed your first Sakuli test! May there be many more to come!
