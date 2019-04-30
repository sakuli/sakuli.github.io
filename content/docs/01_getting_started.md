---
title: Getting started
---

## Installation

Running

{{< highlight bash >}}
npm i @sakuli/cli
{{< /highlight >}}

or

{{< highlight bash >}}
yarn add @sakuli/cli
{{< /highlight >}}

will install Sakuli and its required dependencies.


One of Sakulis core components, [nut.js](https://github.com/nut-tree/nut-js) requires OpenCV.
As of now the installation process assumes you do not have an existing OpenCV installation and will try to build it from source via [opencv4nodejs](https://github.com/justadudewhohacks/opencv4nodejs).

Building OpenCV from scratch requires a [cmake](https://cmake.org/) installation.

In case you already have an OpenCV installation (version 3.x.x required, e.g. via `brew install opencv@3` or [else](https://docs.opencv.org/3.4/df/d65/tutorial_table_of_content_introduction.html)), you can disable the build process via environment variable:

{{< highlight bash >}}
export OPENCV4NODEJS_DISABLE_AUTOBUILD=1
{{< /highlight >}}

on *nix systems, or 

{{< highlight bash >}}
set OPENCV4NODEJS_DISABLE_AUTOBUILD=1
{{< /highlight >}}

on Windows.

Please make sure to also install all required peer dependencies:

- [opencv4nodejs](https://github.com/justadudewhohacks/opencv4nodejs#how-to-install)
- [robotjs](http://robotjs.io/docs/building)

The installation process is an open issue and will be enhanced in the near future, so using Sakuli becomes even more enjoyable!

## Write your first test

Since we wanted to keep Sakuli compatible to V1 the file layout looks basically the same for test suites.

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

The actual testcase file must be placed inside a folder (this is due to the format which was forced by Sahi in Sakuli V1). The starturl also needs to be added but is obsolete in V2+.

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

{{< highlight typescript >}}

(async () => {
    const testCase = new TestCase();
    try {

    } catch (e) {
        tc.handleException(e);
    } finally {
        tc.saveResult();
    }

}).then(done);

{{< /highlight >}}