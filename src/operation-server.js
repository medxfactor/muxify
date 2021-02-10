import http from 'http';
import FindMyWay from 'find-my-way';
import { EVENTS } from './constants';


export function OperationServer(eventEmitter) {
  const router = new FindMyWay({
    ignoreTrailingSlash: true
  });

  router.on('PUT', '/attach', (request, response, params) => {
    const requestData = [];
    request.on('data', (chunk) => {
      requestData.push(chunk);
    });
    request.on('end', () => {
      response.setHeader('Content-Type', 'application/json');
      try {
        const payload = JSON.parse(requestData);
        eventEmitter.emit(EVENTS.ATTACH_SERVER, payload);
        response.statusCode = 204;
        response.end('');
      } catch (error) {
        response.statusCode = 500;
        response.end(`{"message": "error parsing request body"}`);
      }
    });
  });

  router.on('PUT', '/detach', (request, response, params) => {
    const requestData = [];
    request.on('data', (chunk) => {
      requestData.push(chunk);
    });
    request.on('end', () => {
      response.setHeader('Content-Type', 'application/json');
      try {
        const payload = JSON.parse(requestData);
        eventEmitter.emit(EVENTS.DETACH_SERVER, payload);
        response.statusCode = 204;
        response.end('');
      } catch (error) {
        response.statusCode = 500;
        response.end(`{"message": "error parsing request body"}`);
      }
    });
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
