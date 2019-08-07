# Building and developing local

This page uses vue.js for interactive components in order to run them for local development start the npm build script:

```bash
cd vue-components
npm install # only required after first checkout
npm start
```

## Developing with remote contents

Add the following line to your HOSTS-files:

```text
127.0.0.1 hugodev
```

Run hugo with a bindign to this host:

```bash
hugo server -b http://hugodev
```
