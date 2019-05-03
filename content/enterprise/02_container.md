---
title: Pre-Configured Headless Container
slug: container
---
## Sakuli Container in a nutshell

Our pre-configured Docker container will run Sakuli in an isolated environment which ensures having the same setup and equal conditions for every test-run.
You don´t need an unlocked display for native UI interaction with the headless VNC image which is configured in every container. You can watch your test execution live in a browser or a VNC client any time for debugging purposes. Scale your tests horizontally by instanciating as many container as you need.

## Benefits

- Always rely on the same, clean environment: no cookie hassle, no session data, no artefacts of old tests
- Scale your tests: run multiple instances of your container in parallel to accelerate overall execution time or simulate heavy load on your application
- Orchestrate your test-cluster with OpenShift, Kubernetes or any other platform
- CI/CD: Easily integrate your tests into your continuous integration environment
- The layout and scaling of websites and native applications will always be the same and therefore increases the reliability of native interactions
- Orchestrate, execute and alter your Test Container within the Sakuli UI portal *coming soon*

## What is included?

Each Sakuli docker image includes the following components in the respective latest stable release:

- Operating system Ubuntu
- Desktop environment Xfce
- VNC-Server
- noVNC - HTML5 VNC client
- Node.js
- Mozilla Firefox
- Google Chrome
- Sakuli
