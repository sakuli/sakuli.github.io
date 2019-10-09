#!/usr/bin/env bash

set -e
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin
cd vue-components
npm ci
npm run build
cd -
CURRENT_BRANCH=`git rev-parse --abbrev-ref HEAD`
DEPLOYMENT_ALIAS="https://sakuligithubio-git-${CURRENT_BRANCH//(\/|[^a-zA-Z0-9_]|_)/-}.s1hofmann.now.sh"
hugo --baseURL $DEPLOYMENT_ALIAS
