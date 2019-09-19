---
title: Features
slug: features
---

## Core Features (Open Source)

{{<card-deck>}}
{{%feature-card title="Testing based on Selenium and Nut.js" image="/images/how_it_works.svg" maxHeight="200px"%}}
{{%/feature-card%}}
{{</card-deck>}}

{{<card-deck>}}
{{%feature-card title="Screenshot based interaction" image="/images/screen-shotbased.svg" maxHeight="200px" %}}{{%/feature-card%}}
{{%feature-card title="DOM based interaction" image="/images/dom-based.svg" maxHeight="200px"%}}{{%/feature-card%}}
{{%feature-card title="Screen Sizes" image="/images/screen-sizes.svg" maxHeight="200px"%}}{{%/feature-card%}}
{{</card-deck>}}
{{<card-deck>}}
{{%feature-card title="Drag and Drop" image="/images/drag-and-drop.svg" maxHeight="200px"%}}{{%/feature-card%}}
{{%feature-card title="Native Control" image="/images/native-interactions.svg" maxHeight="200px"%}}{{%/feature-card%}}
{{%feature-card title="Clipboard integration" image="/images/clipboard.svg" maxHeight="200px"%}}{{%/feature-card%}}
{{%feature-card title="Secrets" image="/images/secrets.svg" maxHeight="200px"%}}{{%/feature-card%}}
{{</card-deck>}}
{{<card-deck>}}
{{%feature-card title="Simplifying Selenium" image="/images/complexity.svg" maxHeight="200px"%}}{{%/feature-card%}}
{{%feature-card title="Node debugging" image="/images/debugging.svg" maxHeight="200px" %}}{{%/feature-card%}}
{{%feature-card title="No more Staleelements" image="/images/no-stale.svg" maxHeight="200px"%}}{{%/feature-card%}}
{{</card-deck>}}

<!--
  - Suitable for Browsers with Webdriver Implementation
  - Works with commonly used Screensizes / Resolution with a single Monitor setup
  - No built-in CI support but should work properly on every system which supports Docker (see Container) or within one of the supported OSes
  - [Webdrivers supported](#webdriver-support) by [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver)
    - What can be done with Selenium can be done with Sakuli
  - No (Multi-) Touch events
  - Screenshot-based Interactions
    - Scaleinvariant pattern matching
    - Fuzzy image matching
  - Native control
  - Mouse and Keyboard interactions
  - Write and Read Clipboard
  - Drag&Drop
  - Reliable Web-Automation with multi-selector matching
  - Rare "StaleElementReferenceError"
  - Abstraction of Seleniums complexity
  - Error-screenshots
  - Secrets: encryption of sensitive data (no plaintext in logs or outputs)
  - Architecture
    - Generic integration of target systems
  - Debugging with Node

-->

### Supported OS (others may also work but without warranty)

{{< card-deck >}}
{{< feature-card title="Windows" icon="fab fa-windows" >}}
Windows 10 and above
{{</feature-card>}}
{{< feature-card title="Mac OS" icon="fab fa-apple" >}}
OSX V.10.10 and above
{{</feature-card>}}
{{% feature-card title="Linux" icon="fab fa-linux" %}}
Requires X-Window-System >= V. 1.18

- Ubuntu >= V. 16.04
- RHEL >= V. 7

{{%/feature-card%}}
{{< /card-deck >}}

# Enterprise Features

### Supported Monitoring

{{< card-deck >}}
{{% feature-card title="OMD" image="/images/omd.svg"  %}}
OMD (Gearman)<br/> 
Version 3 and above
{{% /feature-card %}}
{{% feature-card title="Icinga2" image="/images/icinga.svg"  %}}
<!-- Von unbekannt - Vektordaten: https://www.icinga.com/wp-content/uploads/2013/10/Icinga_OSMC2013_Presentation.pdfFarbinfo: von Weiß auf Schwarz umgesetzt, Logo, https://de.wikipedia.org/w/index.php?curid=10452845 -->
Icinga2 with configured API
{{% /feature-card %}}
{{% feature-card title="Check_MK" image="/images/check_mk.svg" %}}
Version 1.5 and above
{{% /feature-card %}}
{{% feature-card title="Databases" image="/images/database.svg" %}}
SQL Databases supported by [Typeorm](https://typeorm.io)
{{% /feature-card %}}
{{< /card-deck >}}

### Docker-Image

{{<card-deck>}}
{{% feature-card title="All in one Docker image ships with:" image="/images/content/container.svg" %}}
{{% /feature-card %}}
{{</card-deck>}}

{{<card-deck>}}
{{% feature-card title="Browsers" image="/images/external_logos/chrome.svg" maxHeight="200px" %}}
Ready to use Browsers (Firefox and Chrome)
{{% /feature-card %}}
{{% feature-card title="Webdrivers" image="/images/external_logos/logo_selenium.svg" maxHeight="200px" %}}
Installed Chrome- and Gecko-WebDriver
{{% /feature-card %}}
{{% feature-card title="Sakuli" image="/images/sakuli_header_logo.svg" maxHeight="200px" %}}
Installed Sakuli
{{% /feature-card %}}
{{% feature-card title="VNC" image="/images/external_logos/vnc.svg"  maxHeight="200px" %}}
<!-- By Source, Fair use, https://en.wikipedia.org/w/index.php?curid=30428313 -->
Configured VNC-server and NoVNC
{{% /feature-card %}}
{{</card-deck>}}

{{% alert %}}
<i class="fas fa-exclamation-triangle"></i> <strong> No warranty when you change:</strong>

{{% unstyled-list %}}
- <span>&times;</span> Window Manager
- <span>&times;</span> VNC server and NoVNC config
- <span>&times;</span> Operating System or its version
- <span>&times;</span> Installed browsers or versions
- <span>&times;</span> Sakuli installation
{{% /unstyled-list %}}
{{% /alert %}}


### Webdriver Support

You will need to download additional components to work with each of the major browsers. The drivers for Chrome, Firefox, and Microsoft's IE and Edge web browsers are all standalone executables that should be placed on your system [PATH](http://en.wikipedia.org/wiki/PATH_(variable)) or added into your `package.json`. Apple's safaridriver is shipped with Safari 10 for OS X El Capitan and macOS Sierra. You will need to enable Remote Automation in the develop menu of Safari 10 before testing.

| Browser           | Installable Driver                                           | NPM Package                                |
| :---------------- | :----------------------------------------------------------- | ------------------------------------------ |
| Chrome            | [chromedriver(.exe)](http://chromedriver.storage.googleapis.com/index.html) | https://www.npmjs.com/package/chromedriver |
| Internet Explorer | [IEDriverServer.exe](http://selenium-release.storage.googleapis.com/index.html) | https://www.npmjs.com/package/iedriver     |
| Edge              | [MicrosoftWebDriver.msi](http://go.microsoft.com/fwlink/?LinkId=619687) | https://www.npmjs.com/package/edgedriver   |
| Firefox           | [geckodriver(.exe)](https://github.com/mozilla/geckodriver/releases/) | https://www.npmjs.com/package/geckodriver  |
| Safari            | [safaridriver](https://developer.apple.com/library/prerelease/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_10_0.html#//apple_ref/doc/uid/TP40014305-CH11-DontLinkElementID_28) |                                            |

### Support Limitation

Sakuli Support basically refers to errors and incidents occurring in Sakuli Core (SC) and Sakuli Enterprise Features (SEF). By definition, SC uses webdriver to run tests in browsers. These browser-specific webdrivers have a range of functions beyond which SC does not perform any actions in the browser. Therefore Sakuli has no influence on errors occurring in webdrivers. With integrated mechanisms, SC offers convenience functions to encapsulate the webdriver and Selenium commands. Sakuli therefore has no direct influence on the Selenium functionalities executed in the browser and transferred via webdriver. Web pages can be built using a variety of technologies, having different levels of testability, and do not consistently conform to W3C standards. Custom implementations of Web elements (e.g. dropdowns, radio buttons, etc.) can therefore lead to unexpected behavior.

{{% alert %}}
<i class="fas fa-exclamation-triangle"></i>
Bugs in webdrivers and browsers (local or in container environments) are not covered by Sakuli Support. The identification of workarounds is understood as consulting services.
{{% /alert %}}

- Support for misbehavior of query, focus, click, interaction, highlight etc. of an element visible in the viewport, implemented as a standard HTML element according to W3C standards, using different selectors (max count / element type: 1000)
- Sakulis DOM based browser control is based on the appropriate webdriver implementation and the browsers used. Unexpected behavior due to the webdriver or browser implementation is not covered by Sakuli Support
- Web components implemented with custom JS can lead to unexpected Sakuli behavior and are not supported
- Native components: Support for standard US keyboard layout / Restriction on MacOS and Windows Meta-Keys