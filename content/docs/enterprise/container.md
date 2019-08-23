---
title: E2E Test Container
weight: 400
slug: test-container
---

Once you obtained a Sakuli Enterprise license your docker-user will be granted access to the private Sakuli test container image.

## 1. Obtaining the Image

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

## 2. Running Sakuli Test Containers

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

## 3. Anatomy of a Containerized Sakuli Test

In general, the structure of a containerized Sakuli test does not differ from any other Sakuli test.
No changes are required when executing a test inside a container.
The only configuration we have to provide, is information about how and which tests should be executed.

## 4. Configuring a Containerized Test

The default behaviour of a Sakuli Test Container is to run `npm test` to execute tests,
so to run a custom test we have to:

1. Provide the test project to the container (as shown in 4.2.X)
2. Specify the location of our test project inside the container
3. Configure what to execute on `npm test`

### 4.2 Provide the test project to the container

There are two common ways to provide files to a container:

- Bind mounts
- Extending a base image

#### 4.2.1 Bind Mounts

When running a Docker container it is possible to mount a file or directory on the Docker host into a container.
This mechanism can be used to provide a Sakuli test to a test container:

{{<highlight bash>}}
docker run -v /path/to/test/project/on/host:/sakuli_test -e SAKULI_LICENSE_KEY=<YOUR SAKULI LICENSE KEY> taconsol/sakuli:2.1.2
{{</highlight>}}

By adding the **-v** parameter we're mounting the root folder of our Sakuli test at `/path/to/test/project/on/host` (where the `package.json` file is located) on our host machine at `/sakuli_test` inside our test container.
Inside the test container we can now run a Sakuli test via `sakuli run /sakuli_test/test_suite_folder`.

Bind mounts are easy to use and very useful during development.

For further information, please refer to the [Docker documentation on bind mounts](https://docs.docker.com/storage/bind-mounts/)

#### 4.2.2 Extending a Base Image

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

### 4.3 Specify the location of our test project inside the container

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

### 4.4 Configure what to execute on `npm test`

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

## 5. Summary

Once we have

- added our test to the container (via [**bind mount**](#bind-mounts) or [**our own image**](#extending-a-base-image))
- configured where our test project is located (via [**SAKULI_TEST_SUITE environment variable**](#specify-the-location-of-our-test-project-inside-the-container))
- set up our [**test script**](#configure-what-to-execute-on-npm-test)

our test will run automatically after the container started.
