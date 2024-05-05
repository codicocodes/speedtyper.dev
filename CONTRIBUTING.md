# Contributing

*This is a work in progress.*

### **Table of Contents**
- [Required](#required) 
- [Running Speedtyper.dev](#running-speedtyperdev)
    - [Backend](#backend)
    - [Frontend](#frontend)

## Required

|Prerequisite                               |Link                                                                   |
|-------------------------------------------|-----------------------------------------------------------------------|
|Git                                        |[🔗](https://git-scm.com/downloads)                                   |
|Node 20                                    |[🔗](https://nodejs.org/en/)                                          |
| Yarn                                      |[🔗](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)|
|PostgreSQL                                 |            |
|build-essential (or equivalent for your OS)|                                                                       |
| Docker (Optional)                         |[🔗](https://www.docker.com/)                                         |

## Running Speedtyper.dev

### Backend

1. Install dependencies:

    ```
    make install-backend-dependencies
    ```
1. Copy over path of env file:

    ```
    cp ./packages/back-nest/.env.development ./packages/back-nest/.env
    ```

1. Generate [Github Access Token (classic)](https://github.com/settings/tokens) with `public_repo` permissions and update `GITHUB_ACCESS_TOKEN` variable in `./packages/back-nest/.env` with the token value. It is used to download seed data from GitHub.

1. Start Docker Compose in the background:

    ```
    make run-dev-db
    ```

1. Seed the db with example challenges:

    ```
    make run-seed-codesources
    ```

1. Run the backend:

    ```
    make run-backend-dev
    ```

### Frontend

1. Install dependencies:

    ```
    make install-webapp-dependencies
    ```

1. Run the frontend:

    ```
    make run-webapp-dev
    ```
