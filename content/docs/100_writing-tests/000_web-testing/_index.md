---
title: Web tests
slug: writing-tests/web-testing
---

For DOM based testing most of the functions from [Sahi tests](https://sahipro.com/docs/sahi-apis/) can be used (please note that Sakuli only implements the open source APIs).

The main difference between Sakuli v1 and Sakuli v2 is the usage of [Promises](https://developers.google.com/web/fundamentals/primers/promises) in the action API, meaning that you have to `await` a click for example.

On the other hand, element selectors remain synchronized functions but will not do the actual DOM fetching anymore. While an expression like `var $e=_link('Sakuli')` did an actual DOM-access in Sakuli v1.x, it returns a kind of abstract query for an element now. So, action can fetch this element whenever it is required.

A detailed list of all available functions can be found in the [Sahi API interface](/apidoc/sakuli-legacy/interfaces/sahiapi.html),

## Accessor API

The Accessor API is described in the [Accessor API interface](/apidoc/sakuli-legacy/interfaces/accessorapi.html).

Sakuli uses the concept of reusable [Queries](/apidoc/sakuli-legacy/interfaces/sahielementquery.html) rather than directly working on an element-object (like in Selenium). Sakuli offers an expressive set of [Accessors](/apidoc/sakuli-legacy/interfaces/accessorapi.html) like `_div`, `_textbox` or `_table`. These accessors will not return an actual element or any reference to it. Rather it will create a [SahiElementQuery](/apidoc/sakuli-legacy/interfaces/sahielementquery.html). This query can then be used in various [Actions](#action-api) like `_click`, `_highlight` or `_isVisible`. This concept could be compared with [Locators in Selenium](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_By.html).
This architecture gives us two nice benefits:

- Compatibility with [Sahi API](https://sahipro.com/docs/sahi-apis/index.html)
- Since Sakuli handles the actual fetching and validation of an element by performing retries, refreshes, implicit wait etc. which reduce annoying issues with Selenium a lot (e.g. [StaleElementReferenceError](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/error_exports_StaleElementReferenceError.html))

Most accessors are defined in the same way: They are functions that take an [AccessorIdentifier](apidoc/sakuli-legacy/globals.html#accessoridentifier) as a first parameter and a variadic list of [Relations](#relations-api):

{{<highlight javascript>}}
_NAME(identifier, ...relations): SahiElementQuery
{{</highlight>}}

The accessor adds a static [Locator](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_By.html) to the returned query. Since a query object consists of a locator, an identifier and a list of relations, we will eventually get an entire query object. The locator basically is a CSS element selector which you would expect from the accessor name - so `_div` for example adds `By.css('div')`, `_textbox` adds `By.css('input[type="text"], input:not([type])')` and so on.

## ElementQueries

Since Sakuli encapsulates the creation (through accessors) and the application (e.g. through actions) of a [SahiElementQuery](/apidoc/sakuli-legacy/interfaces/sahielementquery.html), a user will rarely get in touch with these objects directly. Nevertheless, it is good to understand how Sakuli works with queries. Let us consider this example:

{{<highlight javascript>}}
await _click(_button('Sign In'));
{{</highlight>}}

The following will happen under the hood:

1. `_button` creates a query with a locator to a button element and with `'Sign In'` as an identifier and an empty list of relations

2. This query is passed to the `_click` action. This action uses the [AccessorUtil](/apidoc/sakuli-legacy/classes/accessorutil.html) to fetch an element. It will:
   1. Fetch a list of all elements from the locator
   2. Reduce the list based on the relations (skipped when this list is empty)
   3. Reduce the list with the [identifier logic](#identifier)
   4. Return the first entry of the remaining elements list

### Identifier

The identifer is another relict from Sahi that can be one of the following types:

| Type                                                         | Effect                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `number`                                                     | The identifier is considered as index. Sakuli picks the element at this index (zero-based) in step 2.3 |
| [`RegExp`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/RegExp) | Tests this RegExp against the following attributes of each element in the list at step 2.1: `[aria-describedby]`, `[name]`, ` [id]`, `className`, `innerText`, `value`, `src` |
| `string`                                                     | The string is normalized and wrapped into a RegExp, therefore the same logic as for RegExp is applied |
| [`AccessorIdentifierAttributes`](/apidoc/sakuli-legacy/globals.html#accessoridentifierattributes) | This could be an object with the properties `sahiIndex` and/or `sahiIndex`, `sahiText`, `className`. The first two are handled like a number or a string identifer, respectively. The latter one works like a string identifier which only checks for the className property |

> Since we mostly apply the logic of Sahi comparisons against the class attribute are pretty dumb. While the attribute value is semantically a space separated list of class names. It is just handled as a usual string in Sahi (and therefore also in Sakuli so far).

## Action API

The Action API is described in the [Action Api interface](/apidoc/sakuli-legacy/interfaces/accessorapi.html).

Actions usually invoke a [Selenium action sequence](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Actions.html) with an activated bridge mode to cover compatibility to most webdriver implementations. An action accepts a [SahiElementQuery or a WebElement](/apidoc/sakuli-legacy/globals.html#sahielementqueryorwebelement) and tries to perform the action on this element several times. This approach reduces the count of StaleElementReferenceErrors dramatically, especially when a query is used.

### _eval

Beside the fact that actions work asynchronously now, they behave like in Sahi. One exception is the [`_eval`](/apidoc/sakuli-legacy/interfaces/actionapi.html#_eval) method, which accepts a string now containing some JavaScript code, which is performed on the website by the webdriver implementation (see `executeAsyncScript` method of [Seleniums Thenablewebdriver](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_ThenableWebDriver.html)).

{{<highlight javascript>}}
const windowOuterHeight = await _eval(`return window.outerHeight`)
{{</highlight>}}

## Fetch API

The Fetch API is described in the [Fetch API interface](/apidoc/sakuli-legacy/interfaces/fetchapi.html).

These methods are useful to get deeper access to elements and element-attributes:

{{<highlight javascript>}}
const [x,y] = await _position(_image('funny-cat-image.png'));
{{</highlight>}}

or let you perform checks (e.g. if an element exists).

{{<highlight javascript>}}
if(await _exists(_div('cookie-banner'))) {
    await _click(_button('I agree'))
}
{{</highlight>}}

## Selenium Fallbacks

Since Sakuli uses [Seleniums webdriver](https://www.npmjs.com/package/selenium-webdriver) it also provides various ways to access the functionality of this backend.

> It is recommended to use Sakulis built-in functionalities rather than work with the driver instances or any WebElement directly. At the moment, Sakuli is built upon Selenium. Nevertheless, a switch to other technologies in the future is possible. Downwards compatibility is only possible for Sakulis built-in functionalities. Direct use of webdriver instance methods is not supported.

### WebDriver instance

Sakuli test scripts provide a globally accessible object of the current [WebDriver instance](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_ThenableWebDriver.html) which can be used to invoke its native methods directly. This might be useful for switching between frames:

{{<highlight javascript>}}
await driver.switchTo().frame(1);
await _click(_div('element-in-frame-1'));
await driver.switchTo().defaultContent();
{{</highlight>}}

{{<alert>}}
Since v2.2.0 Sakuli will automatically detect different frames (and iframes) and will search for elements in each frame when the element can not be found in default frame.
{{</alert>}}

### WebElement instances

The Fetch API provides the `_fetch` function which returns the native [WebElement](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html) instance from Seleniums webdriver for a query:

{{<highlight javascript>}}
const webElement = await _fetch(_image('funny-cat-image.png'));
const {width, height} = await webElement.getRect();
{{</highlight>}}
