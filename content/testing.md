---
title: Testing
slug: testing
---

Sakuli makes it easy to write tests that act like a real user. It automatically sets up and starts a webdriver instance and also let you take control over the mouse and keyboard of the system.

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

Sakuli is build to create real end to end testing experiences for testers, developers and companies. It enables you to fully automate every user interaction with your system without putting you inside any system or technology boundaries. 

### Webbased Testing build on Selenium

Sakuli implements the easy to use functional syntax of [Sahi](https://sahipro.com/) while executing real browser automation based on [selenium-webdriver](https://github.com/SeleniumHQ/selenium). This layer hides the complexity of Selenium into a more high-level API that let you focus on what you want to test rather than dealing with timeouts and `StaleElementReferenceError`.

Key features are

- Less fragile element fetching
- Easy to use but still expressive syntax
- Testing every browser with a webdriver implementation

### Screenshotbased Testing

Some end to end scenarios go beyond the borders of your browser and the capabilites of webdriver. This might include common usecases like a drag and drop from the host system to a webpage or exporting a report into a spreadsheet or pdf-format. In this cases your webbased tests can be extended to also validate bahavior and invoke interactions outside the browser. Sakuli can scan the hole screen (or a dedicated region) for patterns which are provided as screenshots.