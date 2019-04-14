---
title: Pre-Configured Headless Container
slug: container
---
<h2>Summary</h2>
Our pre-configured Docker container will run Sakuli in an isolated environment which ensures having the same setup and equal conditions for every test-run.
You don´t need an unlocked display for native UI interaction with the headless VNC image configured in every container. You can watch your test execution live in a browser or a VNC client any time for debugging purposes.

<h2>Benefits:</h2>
<ul>
<li>Always rely on the same environment: no cookie hassle, no active user sessions, no artefacts of old tests</li>
<li>Scale your tests: run multiple instances of your container in parallel to accelerate overall execution time or simulate heavy load on your application</li>
<li>CI/CD: Easily integrate your tests into your continuous integration environment</li>
<li>The layout and scaling of websites and native applications will always be the same and therefore increases the liability of native interactions</li>
<li>Orchestrate, execute and alter your Test Container within the Sakuli UI portal</li>
</ul>

<h2>Architecture of Sakuli containers</h2>
Each Sakuli docker image is installed with the following components:
<ul>
<li>Operating system Ubuntu xxx</li>
<li>Desktop environment (Xfce4)</li>
<li>VNC-Server (default VNC port 5901)</li>
<li>noVNC - HTML5 VNC client (default http port 6901)</li>
<li>Node.js</li>
<li>Mozilla Firefox</li>
<li>Google Chrome</li>
<li>Sakuli in the latest stable version</li>
</ul>

The running container is accessible with VNC (default password: sakuli) by:
<ul>
<li>VNC viewer: DOCKER_HOST:5901</li>
<li>noVNC HTML5 client: http://localhost:6901/vnc_auto.html?password=sakuli</li>
</ul>

<h2>What is included?</h2>
Sakuli Container package ships with:
<ul>
  <li>Pre-Configured Docker Container</li>
  <li>Container image:
    <ul>
      <li>Latest stable release of Ubuntu x.x.x</li>
      <li>Security patches</li>
      <li>Latest stable release of noVNC</li>
      <li>etc.</li>
    </ul>
  </li>
</ul>
