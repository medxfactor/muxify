const http = require('http');
const httpProxy = require('http-proxy');
const HttpProxyRules = require('http-proxy-rules');
const { EVENTS } = require('./constants');


function GatewayServer(eventEmitter) {
  const proxyRules = new HttpProxyRules({
    rules: {},
  });

  eventEmitter.on(EVENTS, (payload) => {
    proxyRules.rules[payload.listeningUrl] = `http://${payload.host}:${payload.port}`
  });

  const proxy = httpProxy.createProxy();

  const server = http.createServer(function requestHandler(request, response) {
    console.dir(proxyRules.rules);
    const target = proxyRules.match(request);
    if (target ?? false) {
      return proxy.web(request, response, {
        target
      });
    }

    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end('The request url and path did not match any of the listed rules!');
  });

  return {
    start(host, port, callback) {
      server.listen(port, host, callback);
    },
    stop() {
      server.close();
    }
  }
}

module.exports = {
  GatewayServer,
};
