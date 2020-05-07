#!/usr/bin/env bash

set -e
export GOPATH=$HOME/go
cd custom-js
npm ci
npm run build
cd -
$GOPATH/bin/hugo
