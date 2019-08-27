#!/usr/bin/env bash

set -e
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin
cd vue-components
npm ci
npm run build
cd -
hugo
