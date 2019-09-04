---
title: Testing
slug: testing
---

Sakuli makes it easy to write tests that act like real-world users. It automatically sets up and starts a webdriver instance and also lets you take control over the system's mouse and keyboard. The example below shows a basic login to an imaginary web-based service with a login form:
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

Sakuli is built to create real End-2-End testing experiences for testers, developers and companies. It empowers you to fully automate every user interaction with your system. No system boundaries, no technology boundaries!

## Web-based Testing build on Selenium

Sakuli implements an easy to use functional syntax for executing real browser automation based on [Selenium webdriver](https://github.com/SeleniumHQ/selenium). This layer hides the complexity of Selenium in a more high-level API, allowing you to focus on what you want to test rather than dealing with timeouts and `StaleElementReferenceError`.

Key features are:

- Less fragile element fetching
- Easy to use but still expressive syntax
- Testing every browser with a webdriver implementation

The following comparison between Selenium and Sakuli scripts shows the difference in lines of code and complexity.
This small test basically opens up 'Google', tries to find the 'About' link and highlights the result:

{{< card-deck >}}
{{< feature-card title="Selenium Test" image="/images/external_logos/logo_selenium.svg" maxHeight="200px" >}}
{{< highlight typescript "linenos=table" >}}
"use strict"
require('chromedriver');
const {Builder, By} = require('selenium-webdriver');

let driver = null;

const highlight = async (driver, element, duration) => {
    const oldBorder = await driver.executeScript(`
        const oldBorder = arguments[0].style.border; 
        arguments[0].style.border = '2px solid red'; 
        return oldBorder;
    `, element);

    await driver.sleep(duration);
    await driver.executeScript(`
        const oldBorder = arguments[1]; 
        arguments[0].style.border = oldBorder
    `, element, oldBorder);
}

(async () => {
    try {
        driver = await new Builder()
            .forBrowser("chrome")
            .build();

        await driver.manage().window().maximize();
        await driver.get("https://www.google.de/?hl=en");

        const link = await driver.findElement(
            By.xpath("//*/a[contains(text(), 'About')]")
        );
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


{{</feature-card>}}
{{< feature-card title="Sakuli Test" image="/images/sakuli_header_logo.svg" maxHeight="200px" >}}
{{< highlight typescript "linenos=table" >}}
(async () => {
    const testCase = new TestCase("demo_testcase");

    try {
        await _navigateTo("https://www.google.de/?hl=en");
        await _highlight(_link("About"), 200);
    } catch (e) {
        await testCase.handleException(e);
    } finally {
        await testCase.saveResult();
    }
})().then(done);
{{< /highlight >}}

- No manual webdriver setup
- Easy access of elements
- Just cooler :)

{{</feature-card>}}

{{< /card-deck >}}

## Screenshot based Testing

A lot of End-2-End scenarios exceed the borders of your browser and the capabilities of webdrivers. This might include common use cases like a drag and drop from the host system to a webpage or exporting a report into a spreadsheet or PDF-format. For these cases, your web-based tests can be extended to also validate behavior and invoke interactions outside the browser, all within a single test.

The following code shows a drag&drop example in which the source and target areas are identified by screen-matching (of the egg and the pan) and the mouse is being moved accordingly by Sakuli:

{{<card-deck>}}
{{%feature-card%}}
{{< highlight typescript "linenos=table" >}}
(async () => {
    const testCase = new TestCase("native_keyboard_demo");
    const url = "https://codepen.io/naturalhanglider/full/jQMWoq";
    const screen = new Region();
    try {
        await _navigateTo(url);
        await screen
            .find("source_egg.png")
            .mouseMove()
            .dragAndDropTo(
                await screen.find("target_pan.png")
            );
        await _wait(3000);
    } catch (e) {
        await testCase.handleException(e);
    } finally {
        testCase.saveResult();
    }
})().then(done);
{{< /highlight>}}
{{%/feature-card%}}

{{%feature-card%}}
<video width="100%" autoplay loop controls>
  <source src="/videos/FryAnEgg.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
{{%/feature-card%}}
{{</card-deck>}}

Of course, you can also use Sakuli's native testing power on its own, e.g. rich-client testing of SAP, Office or proprietary software systems. Sakuli accomplishes it's native capabilities by scanning the whole screen (or a dedicated region) on a stand-alone computer or in headless container screens, searching for provided image patterns.

## Learn more
Learn more about writing Sakuli tests within our [documentation] (https://sakuli.io/docs/).
