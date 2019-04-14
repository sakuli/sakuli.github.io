---
title: Testing
slug: testing
---

Sakuli makes it easy to write tests that act like a real user. It automatically setup and start a webdriver instance and also let you take control over the mouse and keyboard of the system. 

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