---
title: Screenshot based Testing
---

A lot of E2E scenarios exceed the capabilities of browsers and webdrivers. This might include common use-cases like a drag and drop from the host system to a webpage or exporting a report into a spreadsheet or PDF-format. In these cases, your web-based tests can be extended to also validate behavior and invoke interactions outside the browser, all within a single test.

Of course, you can also use Sakulis native testing power on its own, e.g. rich-client testing of SAP, office or proprietary software systems. Sakuli accomplishes its native capabilities by scanning the whole screen (or a dedicated region) on a stand-alone computer or in headless container screens, searching for provided image patterns.

Screenshot based actions are relying on an abstract `Region` class, which represents an abstract region on the desktop.
When creating a new instance without parameters, a `Region` spans over the whole desktop.
But, it is also possible to create new regions by specifying `left`, `top`, `width` and `height` parameters.

The following example represents a test which drags a source element to a target region.
In this demo scenario, both source and target are both located on screen via template image.  
To reproduce this scenario, you need to capture screenshots of the egg and the pan.

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

The `dragAndDropTo(...)` methods always move straight to the target region.
In order to follow a more complex path, it is also possible to perform the drag gesture manually.
Once the source image has been located on the screen, Sakuli moves the mouse to its location, presses and holds the left mouse button.
Afterwards, it locates the target image, moves the mouse there while still holding the mouse button and releases it, once it reaches the target location.  
To reproduce this scenario, you need to capture screenshots of the egg and the pan.

{{< highlight typescript "linenos=table" >}}
(async () => {
    const testCase = new TestCase("native_demo");
    const url = "https://codepen.io/naturalhanglider/full/jQMWoq";
    const screen = new Region();
    try {
        await _navigateTo(url);
        await screen.find("source_egg.png").mouseMove().mouseDown(MouseButton.LEFT);
        await new Region(0, 0, 10, 10).mouseMove();
        await new Region(500, 700, 50, 100).mouseMove();
        await screen.find("target_pan.png").mouseMove().mouseUp(MouseButton.LEFT);
        await _wait(3000);
    } catch (e) {
        await testCase.handleException(e);
    } finally {
        testCase.saveResult();
    }
})().then(done);
{{< /highlight >}}
