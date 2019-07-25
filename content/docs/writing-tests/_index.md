---
title: Writing Tests
slug: writing-tests

---

With Sakuli v2+ we changed a lot under the hood of Sakuli and completely replaced the technology-stack. This resulted in a more flexible and future-ready architecture while remaining a maximum of backward compatibility.

## Major Changes to Sakuli1 (Migration)

Nearly all functions and classes from Sakuli 1 are available in Sakuli v2+. They are provided by the [@sakuli/legacy](/apidoc/sakuli-legacy/interfaces/legacyapi) package.

### Async / Await

You might have wondered where the `await` keyword came from when you saw the Sakuli v2+ code. It is caused by the decision to use NodeJs as the new Runtime for Sakuli. The following section will describe the background of async / await syntax and its use in Sakuli. If you are already familiar with JavaScript, you can skip this section since it contains a lot of background information.

#### Why we need it

***TL;DR;***

- Due to the runtime and core libraries, asynchronous operations are required (and cannot be turned into synchronous operations)
- Async/Await is the most idiomatic way to handle asynchronous code in JavaScript

If you ever worked with Sakuli and followed our ["Getting started"](/docs/getting-started) guide,you might have noticed one of the most obvious paradigm changes in the test syntax: The wrapping `(async () => /*...*/)().then(done)` and the extensive use of `await`. This is due to the new runtime [NodeJs](https://nodejs.org) and its asynchronous nature. NodeJs executes scripts in a single-thread and therefore makes heavy use of asynchronous operations to not block the execution within this thread. The underlying JavaScript engine is [V8](https://v8.dev/) (which also powers the JavaScript execution in [Chromium Browsers](https://www.chromium.org/Home)). To make this asynchronous behaviour happen, V8 uses a so called "Event-Loop" with a "Call-Stack" of all deferred operations (like: reading a file, making a web-request, doing heavy computation and so on). [This talk](https://www.youtube.com/watch?v=8aGhZQkoFbQ) explains the behaviour in a short and entertaining way. A good mental model for the event loop is a (fast-food) restaurant where you place an order at the counter, get a receiver which informs you when your food is ready, so you can do something else in the meantime and you are not blocked until you get your food and can do further operations (e.g. eat your meal).

But how does all this effect Sakuli? Sakuli V1 was running within a Java Virtual Machine and the test-scripts were executed in the [Rhino-Engine](https://developer.mozilla.org/de/docs/Rhino) (JavaScript Runtime for the JVM) - its fundamental treatment of asynchronous operations completely differs compared to NodeJs. Simply said, everything in Java is blocking until you make it non-blocking, while in NodeJs (many) operations are non-blocking by default. In Java, for example, it is a rather common pattern to run while loop until the asynchronous operation sets its condition to false. This repl shows the basic idea: [Java version](https://repl.it/@tnobody/non-blocking-vs-blockingjava).

 "Unfortunately", it is not (easily) possible to turn non-blocking operations into blocking operations in NodeJs ([have a look at this repl](https://repl.it/@tnobody/non-blocking-vs-blockingjs)) and Sakulis core technologies (selenium-webdriver and Nut.Js) make heavy use of asynchronous operations. There are projects like [fibers](https://www.npmjs.com/package/fibers), but they rely on native (OS-dependent) libraries and therefore we have decided to avoid another OS specific library in Sakuli.

Last but not least: Using and writing asynchronous code is the most idiomatic way to write JavaScript nowadays. Using async/await is a kind of syntactic sugar which lets us write asynchronous code like it would be synchronous just by using the `await` keyword. A short look back in the old days makes clear, how JavaScript landed there:

Before, the most common way to handle async code was via callbacks which were passed to the async operation and where they were executed when the operation was finished. This approach was useful and acceptable for the usual JavaScript use-case in those days: Handling events in the DOM. But when NodeJs was released and also Browser applications became more and more complex the developers ended up in the so called ["callback-hell"](http://callbackhell.com/). To exit the callback hell ES6 introduced the [`Promise` class](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Promise). The advantage of a promise is its ability to chain with other promises. This makes it way more elegant to write subsequent, dependent asynchronous operations. A good read on this topic can be found in the chapter VIII of [JavaScript for impatient programmers](https://exploringjs.com/impatient-js/toc.html)

#### The async wrapper

You might have noticed, that if a testcase in Sakuli v2 is wrapped within `(async () => /*...*/)().then(done)` this construct, it is called  *immediately invoked function expression* (IIFE). It is basically a function definition which is immediately invoked. This pattern is widely used in JavaScript to preserve scopes and namespaces, since every symbol which is defined at the top level of a script is in global namespace and may potentially collide with other scripts. In the era of [web bundler](https://medium.com/fusebox/beginner-web-developers-use-a-bundler-31ab0c91d2f5) and [ES-modules](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) this use-case became more and more irrelevant, but the IIFE still remains relevant with the introduction of async / await in JavaScript. One caveat of this syntax is that the `await` keyword is only available within an async function - because the engine will wrap the whole body of this function with a Promise. That means you need your code to be executed within an async function in order to make use of the `await` keyword. In the top level IIFE we declare the actual function as `async` and can make use of `await`. Since the result of this function is automatically turned into a Promise we can invoke the `then` and pass the `done` function to it. `done` is a Sakuli specific function which indicates Sakuli that the testcase script is finished. There is currently a discussion on the JavaScript [proposal in stage 3](https://github.com/tc39/proposal-top-level-await) which would introduce a *top level await* in JavaScript.

If you want to avoid this construct completely, you can use the then function of a Promise. The example code of the ["Getting started" guide](/docs/getting-started) would look like this:

{{< highlight javascript "linenos=table,linenostart=1" >}}

const testCase = new TestCase();

_navigateTo("https://sakuli.io")
    .then(_ => testCase.endOfStep("Open Landing Page", 5, 10))
    .then(_ => _click(_link("Getting started")))
    .then(_ => _highlight(_code("npm init")))
    .then(_ => testCase.endOfStep("Find npm init code sample"))
    .catch(e => await testCase.handleException(e))
    .then(_ => testCase.saveResult())
    .then(done);

{{< / highlight >}}

This is also a totally valid use of Sakuli. However, this approach has two downsides:

- If you are less familiar with JavaScript, it could be harder to read and understand
- The Sakuli documentation will mostly use the await / async syntax in the examples

For these reasons, we would advise you not to use the `.then(...)` syntax, unless you are completely sure that you know what you are doing.

#### Async Functions

The most functions which implement the [Sahi DSL](https://sahipro.com/docs/sahi-apis/index.html) - recognizable by prefixed underscore - return a Promise. That means you should put an `await` in front of it. An exception from this pattern, are the [Accesor functions](/apidoc/sakuli-legacy/interfaces/accessorapi.html) which create query objects to access elements in the dom. You can check if the function returns a Promise in the [API docs of SahiApi](apidoc/sakuli-legacy/interfaces/sahiapi.html). If you are not sure if you need an `await`, you can put it any way since it will execute the function as expected. Since this is not a good practice, we are working on tooling which will help you identify async functions like [Typescript support](https://github.com/sakuli/sakuli/tree/feature/ts-support).

#### Thenable Classes

Sakuli has some classes - especially these for native interactions - which implement the [Fluent Interface pattern](https://de.wikipedia.org/wiki/Fluent_Interface) where you can chain method invocations on the same object. Unfortunately, this does not really play nice with async operations. Methods of a Fluent API always return the object itself or at least an instance of the same class. An async (and awaitable) method rather needs to return a Promise. To still accomplish the goal of backward compatibility all classes which implement a fluent interface but have async methods are wrapped in a `Thenable<ClassName>` form of itself. This concept is highly inspired by selenium-webdrivers [`ThenableWebdriver`](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_ThenableWebDriver.html). From an end-user perspective you can use the fluent interface almost like before, besides a little `await` at the beginning:

{{< highlight javascript "linenos=table,linenostart=1" >}}

// With Thenable classes; Assuming we are in the context of an async function
await screen.find('button.png').click();

// Without Thenable class
screen.find('button.jpg')
    .then(screen => screen.click());

{{< / highlight >}}

**Thenable Classes are**

- [Application](/apidoc/sakuli-legacy/interfaces/thenableapplication.html)
- [Environment](/apidoc/sakuli-legacy/interfaces/thenableenvironment.html)
- [Region](/apidoc/sakuli-legacy/interfaces/thenableregion.html)

The technical trick behind this is that there are two implementations: The actual class with the async functions and a *thenable*-class which implements the PromiseLike interface which basically forces to implement a `then` function and is therefore "awaitable". The wrapper class also holds a Promise with the instance to the *actual* class. When a method of the thenable class is invoked it delegates the call to the same method of the actual class and returns itself with the promise returned by the actual method. Since the thenable class itself is a promise, it will resolve to an instance of the actual class.

### _include and _includeDynamic

If you ever wrote larger testcases or different testcases on the same system, you might have come up with a modularisation of common functions. For example, the login to a system is always the same in all testcases, so you put it into a separate file.

In Sakuli v1 there were functions to load these files into your actual testcase: `_include` or `_includeDynamic`. The code usually looked like this:

`<TESTSUITE>/common/login.js`:
{{< highlight javascript "linenos=table,linenostart=1" >}}

function login($user, $password) {
    //... login logic
}

{{< / highlight >}}

`<TESTSUITE>/testcase/case.js`
{{< highlight javascript "linenos=table,linenostart=1" >}}

_include('../commons/login.js');

try {
    var testcase = new TestCase('');

    login('user', 'password');

    // actual testcode
} catch(e) {
    testcase.handleException(e);
} finally {
    testcase.saveResults();
}

{{< / highlight >}}

Two interesting aspects can be observed here:

- Functions defined in the include script, were put to the global namespace
- It is not an idiomatic way to require dependent code in JavaScript (nowadays)

Sakuli now introduces support for [ES-module syntax](https://2ality.com/2014/09/es6-modules-final.html). So, the example above has to be rewritten to:

<i class="fas fa-file"></i>  `<TESTSUITE>/common/login.js`
{{< highlight javascript "linenos=table,hl_lines=1,linenostart=1" >}}

export async function login($user, $password) {
    //... login logic
}

{{< / highlight >}}

<i class="fas fa-file"></i> `<TESTSUITE>/testcase/case.js`
{{< highlight javascript "linenos=table,hl_lines=1,linenostart=1" >}}

import {login} from './../commons/login';

try {
    var testcase = new TestCase('');

    await login('user', 'password');

    // actual testcode
} catch(e) {
    testcase.handleException(e);
} finally {
    testcase.saveResults();
}

{{< / highlight >}}

Besides the added async / await keywords, we can see that the first line of each script changed. In the first script, all functions (or classes, enums, constants, etc) have to be explicitly exported by the script (module would be the more accurate term) if they should be used in other scripts. In the actual testcase script the `_include` function is removed and replaced by an `import`. The import ensures, that we only import symbols that are required in the current script and its *global* namespace. Each function which is required in the testcase script, has to be imported explicitly. An alternative syntax is to import everything within an own namespace:

{{< highlight javascript "linenos=table,linenostart=1" >}}

import * as loginUtils from './../commons/login';

// omitting boilerplate code

await loginUtils.login('user', 'password');

{{< / highlight >}}
