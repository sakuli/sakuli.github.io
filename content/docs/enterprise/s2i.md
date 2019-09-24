---
title: S2I Image
weight: 500
slug: s2i-image
---

Hello World


{{<highlight bash>}}
apiVersion: v1
kind: Template
labels:
  template: sakuli-s2i-testsuite-image-build
metadata:
  annotations:
    description: Build config to create a ready to run Sakuli2 container with the specified testsuite
    tags: consol, sakuli2, custom-image, s2i, source-to-image
  name: sakuli-s2i-testsuite-image-build
### template parameter defined via `oc process -f this.yaml -p "PARAMETER=value"`
parameters:
  - description: The name for the taged target image
    name: IMAGE
    required: true
    value: sakuli-s2i-testsuite

  - description: The Sakuli2 Licence key
    name: SAKULI_LICENSE_KEY
    required: true

  - description: Git source URI for the testsuite
    name: TESTSUITE_REPOSITORY_URL
    required: true

  - description: Git branch/tag reference
    name: TESTSUITE_REPOSITORY_REF
    value: "master"
    required: true

  - description: Source folder where the test suite is placed
    name: TESTSUITE_CONTEXT_DIR

  - description: Secret to acces the tesuite repo
    name: TESTSUITE_REPO_SECRET

  - description: |-
      The kind of source to obtain the image from. For more information, please visit
      https://docs.openshift.com/container-platform/3.7/dev_guide/builds/build_strategies.html#docker-strategy-from
    name: BASE_IMAGE_KIND
    required: true
    value: ImageStream

  - description: The name of the base image
    name: BASE_IMAGE
    required: true
    value: sakuli-s2i

  - description: The tag of the base image to use
    name: BASE_IMAGE_TAG
    required: true
    value: 2.1.3

  - description: GitHub trigger secret
    from: '[a-zA-Z0-9]{8}'
    generate: expression
    name: GITHUB_WEBHOOK_SECRET
    required: true

  - description: Generic build trigger secret
    from: '[a-zA-Z0-9]{8}'
    generate: expression
    name: GENERIC_WEBHOOK_SECRET
    required: true

  - description: Image tag of the target image
    name: IMAGE_TAG
    required: true
    value: latest

### Configuration of OpenShift objects
objects:
  - apiVersion: v1
    kind: ImageStream
    metadata:
      labels:
        application: ${IMAGE}
      name: ${IMAGE}

  - apiVersion: v1
    kind: ImageStream
    metadata:
      labels:
        application: ${IMAGE}
      name: ${BASE_IMAGE}
    spec:
      dockerImageRepository: docker.io/taconsol/${BASE_IMAGE}

  - apiVersion: v1
    kind: BuildConfig
    metadata:
      labels:
        build: ${IMAGE}
      name: ${IMAGE}
    spec:
      output:
        to:
          kind: ImageStreamTag
          name: ${IMAGE}:${IMAGE_TAG}
      source:
        type: Git
        git:
          ref: ${TESTSUITE_REPOSITORY_REF}
          uri: ${TESTSUITE_REPOSITORY_URL}
        contextDir: ${TESTSUITE_CONTEXT_DIR}
        sourceSecret:
          name: ${TESTSUITE_REPO_SECRET}
      strategy:
        type: Source
        sourceStrategy:
          from:
            kind: ${BASE_IMAGE_KIND}
            name: ${BASE_IMAGE}:${BASE_IMAGE_TAG}
          env:
            - name: "SAKULI_LICENSE_KEY"
              value: ${SAKULI_LICENSE_KEY}
      triggers:
        - github:
            secret: ${GITHUB_WEBHOOK_SECRET}
          type: GitHub
        - generic:
            secret: ${GENERIC_WEBHOOK_SECRET}
          type: Generic
        - imageChange: {}
          type: ImageChange
        - type: ConfigChange
{{</highlight>}}
