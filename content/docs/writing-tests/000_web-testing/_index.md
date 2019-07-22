---
title: Web tests
---

For DOM based testing most of the functions from [sahi tests](https://sahipro.com/docs/sahi-apis/) can be used (please note that Sakuli only implements the Open Soure APIs).

The main difference in the new DSL is the usage of [Promises](https://developers.google.com/web/fundamentals/primers/promises) in the action API. That means you have to `await` a click e.g.

On the other hand element selectors remain sync functions but won't do the actual DOM fetching anymore. While something like `var $e = _link('Sakuli')` did an actual DOM-access in Sakuli V1.x, it now returns a kind of abstract query for an element. So action can fetch this element whenever it is required.

A detailed list of all available functions can be found in the [Sahi API interface](/apidoc/sakuli-legacy/interfaces/sahiapi.html),

## Accessor API

The Accessor API is described in the [AcessorApi interface](/apidoc/sakuli-legacy/interfaces/accessorapi.html).

Sakuli uses the concept of reusable [Queries](/apidoc/sakuli-legacy/interfaces/sahielementquery.html) rather than directly working on an Element-Object (like in Selenium). Sakuli offers an expressive set of [Accessors](/apidoc/sakuli-legacy/interfaces/accessorapi.html) like `_div`, `_textbox` or `_table`. These Accessors will not return an actual element or any reference to it. It will create a [SahiElementQuery](/apidoc/sakuli-legacy/interfaces/sahielementquery.html). This query can than be used in various [Actions](#action-api) like `_click`, `_highlight` or `_isVisible`. This concept could be compared with [Locators in Selenium](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_By.html))
This Architecture gives us two nice benefits:

- Compatibility with [Sahi-Api](https://sahipro.com/docs/sahi-apis/index.html)
- Since Sakuli handles the actual fetching and validating of an element it can perform retries, refreshes, implicit wait etc. which reduces the annoying issues with Selenium a lot (e.g. [StaleElementReferenceError](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/error_exports_StaleElementReferenceError.html))

Most Accessors are defined in the same way: They are functions that take an [AccessorIdentifier](apidoc/sakuli-legacy/globals.html#accessoridentifier) as a first parameter and a variadic list of [Relations](#relations-api):

{{<highlight javascript>}}
_NAME(identifier, ...relations): SahiElementQuery
{{</highlight>}}

The accessor adds a static [Locator](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_By.html) to the returned query. Since a query object consists of a Locator, an identifier and a list of Relations, we will eventually get an entire query object. The Locator basically is a CSS element selector which you would expect from the accessor name - so `_div` for example adds `By.css('div')` , `_textbox` adds `By.css('input[type="text"], input:not([type])')` and so on.

## ElementQueries

Since Sakuli encapsulates the creation (through accessors) and the application (e.g. through actions) of a [SahiElementQuery](/apidoc/sakuli-legacy/interfaces/sahielementquery.html) a user will rarely get in touch with these objects directly. Nevertheless, it is good to understand how Sakuli works with Queries. Lets consider this example:

{{<highlight javascript>}}
await _click(_button('Sign In'));
{{</highlight>}}

The Following will happen under the hood:

1. `_button` creates a query with a Locator to a button element and with `'Sign In'` as an identifier and an empty list of relations

2. This query is passed to the `_click` action. This action uses the [AccessorUtil](/apidoc/sakuli-legacy/classes/accessorutil.html) to fetch an element. It will:
   1. Fetch a list of all elements from the locator
   2. Reducing this list based on the relations (skipped when this list ist empty)
   3. Reducing this list with the [identifier logic](#identifier)
   4. Returns the first entry of the remaining elements list

### Identifier

The identifer is another relict from Sahi that can be one of the following types:

| Type                                                         | Effect                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `number`                                                     | The identifier is considered as index. Sakuli picks the element at this index (zero-based) in step 2.3. |
| [`RegExp`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/RegExp)                                                     | Tests this RegExp against the following attributes of each element in the list at step 2.1: `[aria-describedby]`, `[name]`, ` [id]`, `className`, `innerText`, `value`, `src` |
| `string`                                                     | The string is normalized and wrapped into a RegExp, than the same logic as for RegExp applies. |
| [`AccessorIdentifierAttributes`](/apidoc/sakuli-legacy/globals.html#accessoridentifierattributes) | This could be an object with the properties `sahiIndex` and / or `sahiIndex`, `sahiText`, `className`. The first two are handled like a number respectively a string identifer. The latter one works like a string identifier which only checks against the className property. |

> Since we mostly apply the logic of Sahi comparisons against the class attribute are pretty dumb. While the attribute value is semantically a space seperated list of class names. It is just handled as a usual string in Sahi (and therefore also in Sakuli so far).

## Action API

The Action API is described in the [Action Api interface](/apidoc/sakuli-legacy/interfaces/accessorapi.html).

Actions usually invoke an [Selenium action sequence](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Actions.html) with activated bridge mode to cover compatibility to the most webdriver implementations. An action accepts a [SahiElementQuery or a WebElement](/apidoc/sakuli-legacy/globals.html#sahielementqueryorwebelement). Then tries to perform the action on this Element several times. Especially when a Query is used this approach reduces the count of StaleElementReferenceErrors dramatically - and at least a test author doesn't have to care about such things.

### _eval

Beside the fact that actions now work asynchronous, they work like in Sahi. An exception from this is the [`_eval`](/apidoc/sakuli-legacy/interfaces/actionapi.html#_eval) method, which now accepts a string containing some JavaScript code which is performed on the website by the webdriver implementation (see `executeAsyncScript` method of [seleniums Thenablewebdriver](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_ThenableWebDriver.html)).

{{<highlight javascript>}}
const windowOuterHeight = await _eval(`return window.outerHeight`)
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

Since Sakuli uses [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver) it also provides various ways to access the functionality of this backend.

> It is recommended to use Sakulis built-in functionalities rather than work with the driver instances or any WebElement directly. At the moment, Sakuli is built upon selenium, nevertheless a switch to other technologies is possible in the future. Downwards compatibility is only possible for Sakulis built-in functionalities. Direct use of webdriver instance methods is not supported.

### WebDriver instance

Sakuli test-scripts provide a globally accessible object of the current [WebDriver instance](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_ThenableWebDriver.html) which can be used to invoke its native methods directly. This might be useful to switch between frames for example:

{{<highlight javascript>}}
await driver.switchTo().frame(1);
await _click(_div('element-in-frame-1'));
await driver.switchTo().defaultContent();
{{</highlight>}}

### WebElement instances

The fetch api provides the `_fetch` function which returns the native [WebElement](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html) instance from selenium-webdriver for a query:

{{<highlight javascript>}}
const webElement = await _fetch(_image('funny-cat-image.png')); 
const {width, height} = await webElement.getRect();
{{</highlight>}}