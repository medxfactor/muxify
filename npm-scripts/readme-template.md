# muxify

%DESCRIPTION_PLACEHOLDER%

## What is it?

```txt
A Dynamic Multiplexer
     |         |
     |         A gateway to running instances of your server applications
     No need to reloads or restarts. Changes will be applied on the next request
```

### The need

In environments where you might have many Server-Side Rendered (SSR) application instances running on the same machine, and each might listen to a different, and even a random port, popular gateways like `nginx` will not help much, because they cannot get configured during their runtime and they should be restarted after each change in their configuration.

One solution is to have a gateway which distributes requests it receives to application instances that are attached to it, based on a _base URL_ they are interested in. It launches two servers, one is the gateway itself, which routes the requests to application instances. Other one, is the _operation_ server, which application instances can issue requests to it, for attach/detach operations.

Personally, I want to have the following architecture:

![diagram that represent an example scenario where muxify works best](./diagram.png)

*[Credit: <https://app.diagrams.net/>]*

So, if you have the same problem, muxify might help you! 😃

Personally, I use it in development CI/CD environments for multiple instances of server applications.

> It's not fast, and should not be used in production.

### Usage

npx:

  ```sh
  sudo npm install --global muxify
  ```

It will install the `muxify`. Then, you can start it by executing `muxify` command. It will start operation server at `http://127.0.0.3001` and gateway server at `http://127.0.0.3000`.

You can change each server host and port by providing [options](#options) to `muxify`.

### Options

Executing `muxify` with `--help`, will print:

```txt
%HELP_MESSAGE%
```

### Operation Server Endpoints

Operation server have two endpoints:

- `PUT /attach`:

  Used to request for attaching a server to a _base URL_.

  Example:

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

- `PUT /detach`:

  Used to request for detaching a server from a _base URL_.

  Example:

  ```sh
  curl \
      --request PUT \
      --url http://localhost:3001/add-me \
      --header 'Content-Type: application/json' \
      --data '{
          "listeningUrl": "/im-listening"
      }'
  ```
