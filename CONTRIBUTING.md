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
|Node 16                                    |[🔗](https://nodejs.org/en/)                                          |
| Yarn                                      |[🔗](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)|
| MongoDB                                   |[🔗](https://www.mongodb.com/docs/manual/installation/)               |
|build-essential (or equivalent for your OS)|                                                                       |
| Docker (Optional)                         |[🔗](https://www.docker.com/)                                         |

## Running Speedtyper.dev

### Backend

Create directory:
```
mkdir ./packages/backend/dist
```
Install dependencies:
```
make install-backend-dependencies
```
Copy over path of env file:
```
cp ./packages/backend/.env.development ./packages/backend/.env
```
Start Docker Compose in the background:
```
make run-dev-db
```
Invoke the Typescript compiler and seed the db: (https://codicocodes.github.io/speedtyper-community/index.json)
```
make run-seed-codesources
```
Invoke the Typescript compiler and process the challenges:
```
make run-process-challenges
```
Run the backend:
```
make run-backend-dev
```

### Frontend

Install dependencies:
```
make install-webapp-dependencies
```
Run the frontend:
```
make run-webapp-dev
```
