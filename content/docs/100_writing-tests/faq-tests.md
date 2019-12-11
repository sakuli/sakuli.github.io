---
title: Frequently Asked Questions
slug: faq-tests
---

* **How can I handle frames or iframes in Sakuli?**

Since v2.2.0 Sakuli will automatically detect different frames (and iframes) and will search for elements in each frame
when the element can not be found in default frame. But it is also possible to switch between frames manually by using
the iframe webelement or its respective index.

{{<highlight javascript>}}
const myIframe = await _fetch(_iframe('frameName'));
await driver.switchTo().frame(myIframe);
{{</highlight>}}

{{<highlight javascript>}}
const frameIndex = 0;
await driver.switchTo().frame(frameIndex);
{{</highlight>}}