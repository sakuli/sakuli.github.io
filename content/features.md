---
title: Features
slug: features
---

# OS (Core)
### Testing based on Selenium and Nut.js
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

### Supported OS (others may also work but without warranty)
  - Windows 10+
  - OSX >= V. 10.10
  - Linux Systems (requires X-Window-System >= V. 1.18)
    - Linux Ubuntu >=  V. 16.04
    - RHEL >= 7

# Enterprise Features
### Supported Monitoring
  - OMD (Gearman) >= 3
  - Icinga2 with configured API
  - Check_MK >= 1.5
  - SQL Databases supported by Typeorm

### Docker-Image
  - Ready to use Browsers (Firefox and Chrome)
  - Installed Chrome- and Gecko-WebDriver
  - Installed Sakuli
  - Configured VNC-server and NoVNC
  - No warranty when you change
    - Window Manager
    - VNC server and NoVNC config
    - OS
    - Installed Browsers or verisons
    - Sakuli installation

### Webdriver Support

You will need to download additional components to work with each of the major browsers. The drivers for Chrome, Firefox, and Microsoft's IE and Edge web browsers are all standalone executables that should be placed on your system [PATH](http://en.wikipedia.org/wiki/PATH_(variable)) or by adding it to your `package.json`. Apple's safaridriver is shipped with Safari 10 for OS X El Capitan and macOS Sierra. You will need to enable Remote Automation in the Develop menu of Safari 10 before testing.

| Browser           | Installable Driver                                           | NPM Package                                |
| :---------------- | :----------------------------------------------------------- | ------------------------------------------ |
| Chrome            | [chromedriver(.exe)](http://chromedriver.storage.googleapis.com/index.html) | https://www.npmjs.com/package/chromedriver |
| Internet Explorer | [IEDriverServer.exe](http://selenium-release.storage.googleapis.com/index.html) | https://www.npmjs.com/package/iedriver     |
| Edge              | [MicrosoftWebDriver.msi](http://go.microsoft.com/fwlink/?LinkId=619687) | https://www.npmjs.com/package/edgedriver   |
| Firefox           | [geckodriver(.exe)](https://github.com/mozilla/geckodriver/releases/) | https://www.npmjs.com/package/geckodriver  |
| Safari            | [safaridriver](https://developer.apple.com/library/prerelease/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_10_0.html#//apple_ref/doc/uid/TP40014305-CH11-DontLinkElementID_28) |                                            |
