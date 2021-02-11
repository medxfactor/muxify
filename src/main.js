import { GatewayServer } from './gateway-server';
import { OperationServer } from './operation-server';
import { EventEmitter } from 'events';
import minimist from 'minimist';


const help = `
  Dynamic CI/CD Development Multiplexer

  Usage:
    muxify [options]

  Options:
    --operation-port          Preferred operation server port.  [default: 3001]
    --operation-host          Preferred operation server host.  [default: '127.0.0.1']
    --gateway-port            Preferred gateway server port.    [default: 3000]
    --gateway-host            Preferred gateway server host.    [default: '127.0.0.1']
    --help, -h                Prints this help message and exists.
    --version, -v             Prints muxify version (process.env.VERSION) and exists.
`;

const argv = minimist(
  process.argv.slice(2),
  {
    string: ['operation-host', 'gateway-host'],
    boolean: ['help', 'version'],
    alias: {
      help: ['h'],
      version: ['v']
    },
    default: {
      help: false,
      version: false,
      'operation-port': 3001,
      'operation-host': '127.0.0.1',
      'gateway-port': 3000,
      'gateway-host': '127.0.0.1',
    },
    unknown: (unknownArgument) => {
      console.error(`Unknown argument '${unknownArgument}'`);
      console.error(help);
      process.exit(1);
    },
    stopEarly: true
  },
);

const flags = {
  operationPort: argv['operation-port'],
  operationHost: argv['operation-host'],
  gatewayPort: argv['gateway-port'],
  gatewayHost: argv['gateway-host'],
  help: argv.help,
  version: argv.version,
}

if (flags.help) {
  console.log(help);
  process.exit(0);
}

if (flags.version) {
  console.log('process.env.VERSION');
  process.exit(0);
}

const eventEmitter = new EventEmitter();

const gatewayServer = GatewayServer(eventEmitter);
gatewayServer.start(
  flags.gatewayHost,
  flags.gatewayPort,
  () => {
    console.info(`muxify gateway server is listening at http://${flags.gatewayHost}:${flags.gatewayPort}`);
  }
);

const operationServer = OperationServer(eventEmitter);
operationServer.start(
  flags.operationHost,
  flags.operationPort,
  () => {
    console.info(`muxify operation server is listening at http://${flags.operationHost}:${flags.operationPort}`);
  }
);
