---
title: Legacy API
slug: legacy-api
description: Learn more details about Sakulis API and its backwards compatibility with version 1.x
---

Sakulis runs its Tests in an isolated node.js vm script runner and injects its own global scope. The legacy preset adds the most common Classes and functions which where available in Sakuli V1.x.

## Common Classes and Utils

### TestCase

The TestCase class - obviously - represents a testcase. It's API doesn't differ much from [the former version](http://consol.github.io/sakuli/latest/index.html#TestCase).

## Web Testing

For the webtesting most of the functions from [sahi tests](https://sahipro.com/docs/sahi-apis/) could be used (please note that Sakuli only implements the Open Soure APIs).

The main difference in the newer version is that it uses [Promises](https://developers.google.com/web/fundamentals/primers/promises) in the action API. That means you have to `await` a click e.g.

On the other hand element selectors remain sync functions but wont do the actual dom fetching anymore. While something like `var $e = _link('Sakuli')` did an actual DOM-access in Sakuli V1.x it now returns a kind of abstract query for an Element (you can compare it with [Locators in Selenium](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_By.html)). So in the end an action can fetch this element whenever it is required.

## Native Testing

The most important Class for Native interactions is the [`Region` class](https://sakuli.io/apidoc/sakuli-legacy/interfaces/region.html). It differes from it's predecessor because fluent api is not longer suitable with async operations.
