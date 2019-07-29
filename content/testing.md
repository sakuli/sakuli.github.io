---
title: Testing
slug: testing
---

Sakuli makes it easy to write tests that act like real-world users. It automatically sets up and starts a webdriver instance and also lets you take control over the systems’s mouse and keyboard. The example below shows a basic login to an imaginary webbased service with login form:
{{< highlight typescript >}}

(async () => {

    const testCase = new TestCase();
    try {

        await _navigateTo("example.com");
        await _setValue(_input('user'), 'me');
        await _setValue(_password_('password'), 'top-$ecret');
        await _click(_button('Login'));

        testCase.endOfStep('Login');
    } catch (e) {
        await testCase.handleException(e);
    } finally {
        await testCase.saveResult();
    }

}).then(done);

{{< /highlight >}}

## Testing Features

Sakuli is built to create real end-to-end testing experiences for testers, developers and companies. It enables you to fully automate every user interaction with your system. No system boundaries, no technology boundaries!

## Webbased Testing build on Selenium

Sakuli implements an easy to use functional syntax for executing real browser automation based on [selenium-webdriver](https://github.com/SeleniumHQ/selenium). This layer hides the complexity of Selenium in a more high-level API, allowing you to focus on what you want to test rather than dealing with timeouts and `StaleElementReferenceError`.

Key features are

- Less fragile element fetching
- Easy to use but still expressive syntax
- Testing every browser with a webdriver implementation

The following comparison between Selenium and Sakuli scripts shows the difference in lines of code and complexity.
This small test basically only opens-up 'Google', tries to find the 'About' link and highlights the result:

### Selenium Test
{{< highlight typescript "linenos=table" >}}
"use strict"

const {Builder, By} = require('selenium-webdriver');

let driver = null;

const highlight = async (driver, element, duration) => {
    const oldBorder = await driver.executeScript(`const oldBorder = arguments[0].style.border; arguments[0].style.border = '2px solid red'; return oldBorder;`, element);
    await driver.sleep(duration);
    await driver.executeScript(`const oldBorder = arguments[1]; arguments[0].style.border = oldBorder`, element, oldBorder);
}

(async () => {
    try {
        driver = await new Builder()
            .forBrowser("chrome")
            .build();

        await driver.manage().window().maximize();
        await driver.get("https://www.google.de");

        const link = await driver.findElement(By.xpath("//*/a[contains(text(), 'About')]"));
        await highlight(driver, link, 200);
    } catch (e) {
        console.log(e);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
})();
{{< /highlight >}}

### Sakuli Test
{{< highlight typescript "linenos=table" >}}
(async () => {
    const testCase = new TestCase("demo_testcase");

    try {
        await _navigateTo("https://google.de");
        await _highlight(_link("About"), 200);
    } catch (e) {
        await testCase.handleException(e);
    } finally {
        await testCase.saveResult();
    }
})().then(done);
{{< /highlight >}}

## Screenshot based Testing

A lot of end-to-end scenarios exceed the borders of your browser and the capabilities of webdriver. This might include common use cases like a drag and drop from the host system to a webpage or exporting a report into a spreadsheet or pdf-format. In these cases, your webbased tests can be extended to also validate behavior and invoke interactions outside the browser, all within a single test.

Of course, you can also use Sakuli’s native testing power on its own, e.g. rich-client testing of SAP, Office or proprietary software systems. Sakuli accomplishes its native capabilities by scanning the whole screen (or a dedicated region) on a stand-alone computer or in headless container screens, searching for provided image patterns.

Screenshot based actions are relying on an abstract `Region` class, which represents an abstract region on the desktop.
When creating a new instance without parameters, a `Region` spans the whole desktop.
But it is also possible to create new regions by specifying `left`, `top`, `width` and `height` parameters.

The following example showcases a test which drags a source element to a target region.
In this demo scenario, both source and target are located on screen via template image.

{{< highlight typescript "linenos=table" >}}
(async () => {
    const testCase = new TestCase("native_keyboard_demo");
    const url = "https://codepen.io/akifo/pen/LGraWZ";
    const screen = new Region();
    try {
        await _navigateTo(url);
        await screen.find("drag.png").mouseMove().dragAndDropTo(await screen.find("target.png"));
    } catch (e) {
        await testCase.handleException(e);
    } finally {
        await testCase.saveResult();
    }
})().then(done);
{{< /highlight >}}

The `dragAndDropTo(...)` methods always moves straight to the target region.
In order to follow a more complex path, it is also possible to perform the drag gesture manually.
Once the source image has been located on screen, Sakuli moves the mouse to its location and presses and holds the left mouse button.
Afterwards, it locates the target image, moves the mouse there while still holding the mouse button and releases it, once it reaches the target location.

{{< highlight typescript "linenos=table" >}}
(async () => {
    const testCase = new TestCase("native_demo");
    const url = "https://codepen.io/akifo/pen/LGraWZ";
    const screen = new Region();
    try {
        await _navigateTo(url);
        await screen.find("source.png").mouseMove().mouseDown(MouseButton.LEFT);
        await new Region(0, 0, 10, 10).mouseMove();
        await new Region(500, 300, 50, 100).mouseMove();
        await screen.find("target.png").mouseMove().mouseUp(MouseButton.LEFT);
    } catch (e) {
        await testCase.handleException(e);
    } finally {
        await testCase.saveResult();
    }
})().then(done);
{{< /highlight >}}

## Interacting with the environment

In addition to screenshot based testactions, Sakuli is able to utilize your keyboard, clipboard and environment variables.
All these features are incorporated in the `Environment` class.

### Keyboard actions

The following snippet shows a possible use-case for native keyboard actions.
When initiating the download in FireFox, a native file download dialog opens.
To start the download, we need to accept the file dialog, which is not possible with the capabilities of Selenium.
With Sakuli it's possible to work around this problem just like a real user would do.
We can accept the file dialog by simply pressing the `Enter` key.

{{< highlight typescript "linenos=table" >}}
(async () => {
    const testCase = new TestCase("test");
    const url = "https://nodejs.org/en/";
    const env = new Environment();
    try {
        await _navigateTo(url);
        await _click(_link("ABOUT"));
        await _click(_link("Releases"));
        await _click(_link("Dubnium"));
        await _click(_link("node-v10.16.0.tar.gz"));
        await env.keyDown(Key.ENTER);
        await env.keyUp(Key.ENTER);
    } catch (e) {
        await testCase.handleException(e);
    } finally {
        await testCase.saveResult();
    }
})().then(done);
{{< /highlight >}}

It's even possible to change the download location dynamically by entering a new save path via

{{< highlight typescript "linenos=table" >}}
await env.type("/new/path/to/file");
{{< /highlight >}}

### Secrets

Many E2E tests require some kind of login.
While is no problem in general, it still requires some mechanism to handle credentials.
Providing credentials via environment variable is a common practice, but it still is cumbersome when deploying the testcase to another system, since every single environment variable has to be migratet, too.

Sakuli comes with a built-in mechanism to deal with sensitive data in testcases.
It uses a single masterkey, generated by Sakuli, and uses this key to de- / encrypt secrets to be used in testcases.

Running

{{< highlight typescript "linenos=table" >}}
npx sakuli create masterkey
{{< /highlight >}}

will generate a new masterkey, which should be exported as environment variable `SAKULI_ENCRYPTION_KEY`.

Once the masterkey has been exported, secrets can be encrypted by running

{{< highlight typescript "linenos=table" >}}
npx sakuli encrypt "super secret string"
{{< /highlight >}}

These encrypted secrets can now safely be stored inside your testfile, because the `Environment` class provides methods to decrypt these secrets during test execution.

{{< highlight typescript "linenos=table" >}}
await env.typeAndDecrypt("$ENCRYPTED_SECRET");
// alternatively, via clipboard
await env.pasteAndDecrypt("$ENCRYPTED_SECRET");
{{< /highlight >}}

## Learn more
[Learn more](https://sakuli.io/docs/writing-tests) about writing Sakuli tests within our documentation