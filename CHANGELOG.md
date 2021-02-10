# Changelog

## 0.2.2

* CI/CD:

    Set Git default branch to `main` in *publish* workflow.

## 0.2.1

* CI/CD:

    Add more triggers to *publish* workflow.

## 0.2.0

* Add ability to register a server:

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
