const http = require('http');
const httpProxy = require('http-proxy');
const HttpProxyRules = require('http-proxy-rules');

const proxyRules = new HttpProxyRules({
  rules: {},
});

const proxy = httpProxy.createProxy();

function createServer(host, port, callback) {
  http.createServer(function(request, response) {
    const target = proxyRules.match(request);
    if (target ?? false) {
      return proxy.web(request, response, {
        target
      });
    }

    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end('The request url and path did not match any of the listed rules!');
  })
    .listen(port, host, callback);
}

module.exports = {
  createServer,
};
