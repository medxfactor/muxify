const http = require('http');
const FindMyWay = require('find-my-way');
const { EVENTS } = require('./constants');


function OperationServer(eventEmitter) {
  const router = FindMyWay({
    ignoreTrailingSlash: true
  });

  router.on('PUT', '/add-me', (request, response, params) => {
    eventEmitter.emit(EVENTS.ADD_SERVER, {
      host: '127.0.0.2',
      port: 8090,
      listeningUrl: '/im-listening',
    })
    response.end('hello-world')
  });

  const server = http.createServer(function requestHandler(request, response) {
    router.lookup(request, response);
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
  OperationServer,
}
