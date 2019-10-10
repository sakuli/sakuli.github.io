#!/usr/bin/env bash

set -e
yum install -y wget
wget https://dl.google.com/go/go1.12.1.linux-amd64.tar.gz --quiet -O go.tar.gz
tar -C /usr/local -xzf go.tar.gz

# Set up paths
export GOPATH=$HOME/go

# Build Hugo
git clone --branch v0.56.3 --depth 1 https://github.com/gohugoio/hugo.git
cd hugo
GO111MODULE=on go install --tags extended
$GOPATH/bin/hugo version
