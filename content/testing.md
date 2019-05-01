---
title: Testing
slug: testing
---

Sakuli makes it easy to write tests that act like a real user. It automatically sets up and starts a webdriver instance and also lets you take control over the mouse and keyboard of the system.

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
        tc.handleException(e);
    } finally {
        tc.saveResult();
    }

}).then(done);

{{< /highlight >}}

## Testing Features

Sakuli is built to create real end to end testing experiences for testers, developers and companies. It enables you to fully automate every user interaction with your system without any system or technology boundaries. 

### Webbased Testing build on Selenium

Sakuli implements an easy to use functional syntax for executing real browser automation based on [selenium-webdriver](https://github.com/SeleniumHQ/selenium). This layer hides the complexity of Selenium into a more high-level API that lets you focus on what you want to test rather than dealing with timeouts and `StaleElementReferenceError`.

Key features are

- Less fragile element fetching
- Easy to use but still expressive syntax
- Testing every browser with a webdriver implementation

### Screenshotbased Testing

A lot of end to end scenarios go beyond the borders of your browser and the capabilities of webdriver.
This might include common use-cases like a drag and drop from the host system to a webpage or exporting a report into a spreadsheet or pdf-format. In these cases your webbased tests can be extended to also validate behavior and invoke interactions outside the browser, all within a single test. Of course you can also use Sakulis native testing power on its own, e.g. rich-client testing of SAP, Office or proprietary software systems. Sakuli accomplishes its native capabilities by scanning the whole screen (or a dedicated region) on a stand-alone computer or in headless container screens and searches for provided image patterns.
