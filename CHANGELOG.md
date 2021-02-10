# Changelog

## 0.2.7

- CI/CD:

  - Remove `scope` parameter from _publish GPR_ job
  - Add _Upgrade NPM_ step to _publish GPR_ job in order to fix issue in authentication.

    Previous versions of npm had bug reading `_auth` key from `.npmrc` (which is set by [actions/setup-node](https://github.com/actions/setup-node)), as mentioned in [1](https://github.com/actions/setup-node/issues/213#issuecomment-752095615), and [2](https://github.com/npm/cli/issues/2300).

## 0.2.6

- CI/CD:

  - Remove GitHub registry URL auth token configuration to `.npmrc`
  - Add `scope` parameter to _publish GPR_ job

## 0.2.5

- CI/CD:
  - Add GitHub registry URL auth token configuration to `.npmrc`
  - Revert _publish_ workflow _publish GPR_ job node version back to `15`

## 0.2.4

- CI/CD:
  - Change _publish_ workflow _publish GPR_ job node version to `14`

## 0.2.3

- CI/CD:

  - Add on release triggers to _publish_ workflow configuration

  - Change publish GPR token to virtual environment provided GITHUB_TOKEN

## 0.2.2

- CI/CD:

  Set Git default branch to `main` in _publish_ workflow.

## 0.2.1

- CI/CD:

  Add more triggers to _publish_ workflow.

## 0.2.0

- Add ability to register a server:

  Servers can register themselves to gateway proxy table providing the options required to register them. The request payload consists of the URL they want to receive requests on (`listeningUrl`), `host` and `port` of their listener server. Example of a request for a gateway with operation server listening at `http://localhost:3001` for a server listening at `http://127.0.0.1:8090` that wants to receive requests with the base URL `/send-me` will be:

  ```sh
  curl \
      --request PUT \
      --url http://localhost:3001/add-me \
      --header 'Content-Type: application/json' \
      --data '{
          "host": "127.0.0.1",
          "port": 8090,
          "listeningUrl": "/send-me"
      }'
  ```
