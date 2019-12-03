---
title: E2E Test Container
weight: 400
slug: test-container
---

Once you obtained a Sakuli Enterprise license your docker-user will be granted access to the private Sakuli test container image.
This image is ready to go and ships with already installed:

  - Sakuli
  - Icinga2 / Check_MK / OMD Forwarder
  - VNC / noVNC
  - Chrome / Firefox (incl. webdriver)

## 1 Obtaining the Image

The registered docker-hub user will then be able to pull the private image:

{{<highlight bash>}}
docker pull taconsol/sakuli:<IMAGE_TAG>
{{</highlight>}}

Sakuli test containers do not provide a `latest` tag.
You will always have to specify the exact version of Sakuli you intend to use in your containerized tests.

Containers are tagged according to Sakuli versions, so in order to use Sakuli v2.1.2 in a test, one would pull the following image:

{{<highlight bash>}}
docker pull taconsol/sakuli:2.1.2
{{</highlight>}}

{{<alert>}}
Sakuli does not support a latest tag. When running a containerized test one always has to specify the exact version to use to ensure consistency. You can find a list of available tags on [**Dockerhub**](https://cloud.docker.com/u/taconsol/repository/docker/taconsol/sakuli)
{{</alert>}}

## 2 Running Sakuli Test Containers

Containerized Sakuli tests require a valid Sakuli license token which has to be provided via the `SAKULI_LICENSE_KEY` [environment variable](/docs/enterprise).

Docker allows to pass environment variable along other parameters when starting a new container:

{{<highlight bash>}}
docker run --rm -p 5901:5901 -p 6901:6901 -e SAKULI_LICENSE_KEY=<YOUR SAKULI LICENSE KEY> taconsol/sakuli:2.1.2
{{</highlight>}}

Parameters:

- **\-\-rm**: The test container will be removed after execution, not just stopped
- **-p**: Port forwardings. VNC is available on port 5901, the HTML5 webVNC view is exposed on port 6901 on the Docker host
- **-e**: Environment variable flag which is used to provide the `SAKULI_LICENSE_KEY` to the container

{{<alert>}}
Sakuli Test Containers run as non-root user, the default UID is 1000.
{{</alert>}}

## 3 Anatomy of a Containerized Sakuli Test

In general, the structure of a containerized Sakuli test does not differ from any other Sakuli test.
No changes are required when executing a test inside a container.
The only configuration we have to provide, is information about how and which tests should be executed.

## 4 Configuring a Containerized Test

The default behaviour of a Sakuli Test Container is to run `npm test` to execute tests,
so to run a custom test we have to:

1. Provide the test project to the container (as shown in 4.2.X)
2. Specify the location of our test project inside the container
3. Configure what to execute on `npm test`

### 4.1 Provide the test project to the container

There are two common ways to provide files to a container:

- Bind mounts
- Extending a base image

#### 4.1.1 Bind Mounts

When running a Docker container it is possible to mount a file or directory on the Docker host into a container.
This mechanism can be used to provide a Sakuli test to a test container:

{{<highlight bash>}}
docker run -v /path/to/test/project/on/host:/sakuli_test -e SAKULI_LICENSE_KEY=<YOUR SAKULI LICENSE KEY> taconsol/sakuli:2.1.2
{{</highlight>}}

By adding the **-v** parameter we're mounting the root folder of our Sakuli test at `/path/to/test/project/on/host` (where the `package.json` file is located) on our host machine at `/sakuli_test` inside our test container.
Inside the test container we can now run a Sakuli test via `sakuli run /sakuli_test/test_suite_folder`.

Bind mounts are easy to use and very useful during development.

For further information, please refer to the [Docker documentation on bind mounts](https://docs.docker.com/storage/bind-mounts/)

#### 4.1.2 Extending a Base Image

Once we finished our test case and are ready to put it to work, bind mounts might become a bit cumbersome.
Now that the test is done and wont change frequently, it would be feasible to build an explicit Docker image for our test.

We can do so by creating our own Dockerfile next to our project directory:
{{% unstyled-list %}}
- <i class="fas fa-folder"></i> **/folder/containing/Dockerfile/and/project**
    - <i class="far fa-file"></i> **Dockerfile**
    - <i class="fas fa-folder"></i> **testsuite-a**
        - <i class="far fa-file"></i> **package.json**
        - <i class="far fa-file"></i> **...**
{{% /unstyled-list %}}

{{<highlight bash>}}
FROM taconsol/sakuli:2.1.2

ADD ./testsuite-a $HOME/sakuli_testsuite
{{</highlight>}}

Using this Dockerfile we can now build our own test image by running

{{<highlight bash>}}
docker build -t name-of-my-image .
{{</highlight>}}

inside the folder where our Dockerfile is located.

We can now run our newly built image via:

{{<highlight bash>}}
docker run -e SAKULI_LICENSE_KEY=<YOUR SAKULI LICENSE KEY> name-of-my-image
{{</highlight>}}

{{<alert>}}
When working with added files and folders inside a container, one has to ensure correct file permissions for added files.
{{</alert>}}

### 4.2 Specify the location of our test project inside the container

Now that our test files are available inside the container, we need to find a way to configure where our project is located.

This can easily be done by setting the `SAKULI_TEST_SUITE` environment variable to the respective path:

{{<highlight bash>}}
docker run -v /path/to/test/folder:/sakuli_test -e SAKULI_TEST_SUITE=/sakuli_test -e SAKULI_LICENSE_KEY=<YOUR SAKULI LICENSE KEY> taconsol/sakuli:2.1.2
{{</highlight>}}

When building new images, this setting can also be added to the Dockerfile:

{{<highlight bash>}}
FROM taconsol/sakuli:2.1.2

ADD ./testsuite-a $HOME/sakuli_testsuite
ENV SAKULI_TEST_SUITE=$HOME/sakuli_testsuite
{{</highlight>}}

### 4.3 Configure what to execute on `npm test`

The main configuration file of a npm project is its `package.json` file.
Within this file it's possible to configure [npm-scripts](https://docs.npmjs.com/misc/scripts), a handy way to execute scripts inside an npm project.

An empty project initialised via `npm init` already contains one script: `npm test`

{{<highlight js>}}
...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
...
{{</highlight>}}

`npm test` is the default way of executing tests in an npm project, so Sakuli tests should be executed this way, too!

Since Sakuli is available in our project, we can run our test by simply calling `sakuli run ...` on `npm test`.
Our test suites are located within the same folder as our `package.json`, so a test suite can be run via:

{{<highlight js>}}
...
  "scripts": {
    "test": "sakuli run /path/to/your/test/suite"
  },
...
{{</highlight>}}

#### 4.3.1 Troubleshooting

This topic covers possible errors when running containerized Sakuli tests.

#### 4.3.1.1 Error: Invalid ELF header

Some parts of Sakuli are platform-dependent, so the `node_modules` folder of a Sakuli project contains platform specific libs.
Sakuli containers are running a Linux base image, so when mounting a project which has been developed on a non Linux machine, e.g. macOS, the `node_modules` folder will contain libs specific to macOS.

Trying to run such a test inside a Sakuli container will therefore fail with an error message similar to this:

{{<highlight bash>}}
UnhandledPromiseRejectionWarning: Error: /test/node_modules/robotjs-node10/build/Release/robotjs.node: invalid ELF header
{{</highlight>}}

A simple way to resolve the dependency problem is to delete the `node_modules` folder.
If your test project does not require libraries other than Sakuli, the correct libraries globally installed in Sakuli containers will be used.

In case your test project requires additional dependencies, it's possible to run `npm install` before executing the Sakuli test.

{{<highlight js>}}
...
  "scripts": {
    "test": "npm i && sakuli run /path/to/your/test/suite"
  },
...
{{</highlight>}}

## 5 Viewing / Configuring Test Execution

Sakuli test containers allow to configure specific details of their runtime environment.

### 5.1 VNC Access

Sakuli containers provide access to running containers via VNC on ports 5901 and 6901.
By specifying port forwardings (**-p**) it is possible to configure which ports will be used to connect to a running container on the host system.

{{<highlight bash>}}
docker run --rm -p 5901:5901 -p 6901:6901 -e SAKULI_LICENSE_KEY=<YOUR SAKULI LICENSE KEY> taconsol/sakuli:2.1.2
{{</highlight>}}

The example above forwards container ports 5901 and 6901 to the same ports on the host system.

{{<highlight bash>}}
docker run --rm -p 5000:5901 -p 6000:6901 -e SAKULI_LICENSE_KEY=<YOUR SAKULI LICENSE KEY> taconsol/sakuli:2.1.2
{{</highlight>}}

In this example container port 5901 is forwarded to port 5000 on the host system, port 6901 is forwarded to port 6000 on the host system.
`localhost:5000` would be used to connect to the container via VNC client, on `localhost:6000` a webVNC view is available in the browser.

{{<alert>}}
The default password to access a container via VNC is `vncpassword`. It is **highly** recommended to change this password in production environments. See section [**#5.2**](#5-2-configuring-vnc-access) for details
{{</alert>}}

### 5.2 Configuring VNC Access

The following VNC environment variables can be overwritten at the docker run phase to customize your desktop environment inside the container:

{{<highlight bash>}}
VNC_COL_DEPTH, default: 24          // Color depth

VNC_RESOLUTION, default: 1280x1024  // Screen resolution

VNC_PW, default: vncpassword        // VNC password

VNC_VIEW_ONLY, default: false       // Run in view only mode, no keyboard / mouse interaction possible
{{</highlight>}}

For example, the password for VNC could be set like this:

{{<highlight bash>}}
~$ docker run -p 5901:5901 -p 6901:6901 -e VNC_PW=my-new-password taconsol/sakuli:2.1.2
{{</highlight>}}

### 5.2 Container User

Per default all container processes will be executed with user id 1000.

- Using root (user id 0):

    Add the \-\-user flag to your docker run command:

    {{<highlight bash>}}
~$ docker run -it -p 5901:5901 -p 6901:6901 --user 0 taconsol/sakuli:2.1.2
    {{</highlight>}}

- Using user and group id of host system

    Add the \-\-user flag to your docker run command:

    {{<highlight bash>}}
~$ docker run -it -p 5901:5901 -p 6901:6901 --user $(id -u):$(id -g) taconsol/sakuli:2.1.2
    {{</highlight>}}

### 6 Custom Certificates

Internal infrastructure often uses custom certificates with own root CAs etc.
Things like untrusted certificates cause Sakuli tests to fail, since no connection to an seemingly insecure host will be established (`InsecureCertificateError`).

Unfortunately, browsers use their own certificate store, which requires some additional work to add custom certificates to.

#### Adding Custom Certificates

In order to add custom certificates to a Sakuli container, one has to provide two things:

- A directory containing certificates for import (*.crt, *.cer, *.pem)
- An environment variable called `SAKULI_TRUSTED_CA_DIR` which holds the path to the directory where certificates for import are located inside the container

If the environment variable has been set, a startup script will pick up all certificates contained in the given folder and import each of them to all available browser certificate stores within `$HOME`, supporting both `cert8.db` databases for older browser versions as well as `cert9.db` files for recent browser versions.

If the environment variable is unset, nothing changes and the test container will execute.

#### Sample

```bash
docker run -v /path/to/certificated/:/certificate_import -e SAKULI_TRUSTED_CA_DIR=/certificate_import/ taconsol/sakuli:2.2.0
```

#### Firefox

By default, a Firefox test uses a new, blank profile for each test run. In order to pick up the added certificates, a Firefox profile containing the appropriate certificate database has to be specified via `selenium.firefox.profile=/path/to/profile/folder` in `testsuite.properties`. In order to make this process easier, a dedicated Firefox profile for use with certificates is located at `/headless/firefox-certificates` to be used, instead of the generated profiles in `/headless/.mozilla/firefox/long_random_id.default`.

**Attention:** If this property is not set, added certificates will have no effect.

### 7 Overview Environment Variables

| Environment Variable | Default Value       | Description                                                           |
|----------------------|---------------------|-----------------------------------------------------------------------|
| SAKULI_TEST_SUITE    | $HOME/demo_testcase | Path to Sakuli testsuite to be executed                               |
| SAKULI_LICENSE_KEY   |                     | Sakuli license to use the container                                   |
| VNC_COL_DEPTH        | 24                  | Color depth of container monitor                                      |
| VNC_RESOLUTION       | 1280x1024           | Screen resolution of container                                        |
| VNC_PW               | vncpassword         | Password to access NoVNC/VNC connection                               |
| VNC_VIEW_ONLY        | false               | Enable/Disable view-only mode                                         |
| NODE_NO_WARNINGS     | 1                   | Enable/Disable node warnings (deprecations etc.)                      |
| NPM_TOKEN            |                     | NPM token to access npmjs.com registry                                |
| SAKULI_TRUSTED_CA_DIR|                     | Directory containing custom certificates for import                   |

## 7 Summary

Once we have

- added our test to the container (via [**bind mount**](#bind-mounts) or [**our own image**](#extending-a-base-image))
- configured where our test project is located (via [**SAKULI_TEST_SUITE environment variable**](#specify-the-location-of-our-test-project-inside-the-container))
- set up our [**test script**](#configure-what-to-execute-on-npm-test)
- (optional) configured the container runtime environment

our test will run automatically after the container started.
