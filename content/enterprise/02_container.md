---
title: Pre-Configured Headless Container
slug: container
---
## Sakuli Container in a Nutshell

Our pre-configured Docker container will run Sakuli in an isolated environment. This will ensure having the same setup and equal conditions for every test-run. You don´t need an unlocked display for native UI interaction with the headless VNC image configured in every container. For debugging purposes, you will be able to watch your test execution live in a browser or a VNC client any time. Scale your tests horizontally by instantiating as many containers as you need.

<img src="/images/content/container.svg" alt="" style="max-height: 400px;" />

## Your Benefits

- Always rely on the same, clean environment: no cookie hassle, no session data, no old test artefacts
- Scale your tests: Run multiple instances of your container in parallel to accelerate overall execution time or simulate heavy load on your application
- Orchestrate your test-cluster with OpenShift, Kubernetes or any other platform
- CI/CD: Easily integrate your tests into your continuous integration environment
- The layout and scaling of websites and native applications will always be the same, therefore increasing the reliability of native interactions
- Orchestrate, execute and alter your test container within the Sakuli UI portal coming soon


## Your Package

Each Sakuli docker image includes the following components in their respective latest stable release:

- Operating system Ubuntu
- Desktop environment Xfce
- VNC-Server
- noVNC - HTML5 VNC client
- Node.js
- Mozilla Firefox
- Google Chrome
- Sakuli
