import http from 'http';
import { createProxy } from 'http-proxy';
import HttpProxyRules from 'http-proxy-rules';
import { EVENTS } from './constants';


export function GatewayServer(eventEmitter) {
  const rulesMap = new Map([]);

  const proxyRules = new HttpProxyRules({
    rules: {},
  });

  function updateProxyRules() {
    proxyRules.rules = Object.fromEntries(rulesMap.entries());
  }

  eventEmitter.on(EVENTS.ATTACH_SERVER, (payload) => {
    rulesMap.set(payload.listeningUrl, `http://${payload.host}:${payload.port}`);
    updateProxyRules();
  });

  eventEmitter.on(EVENTS.DETACH_SERVER, (payload) => {
    rulesMap.delete(payload.listeningUrl);
    updateProxyRules();
  });

  const proxy = createProxy();

  const server = http.createServer(function requestHandler(request, response) {
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
