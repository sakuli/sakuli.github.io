export GOPATH=$HOME/go
cd vue-components
npm ci
npm run build
cd -
$GOPATH/bin/hugo
