# Contributing

*This is a work in progress*

### **Table of Contents**
- [Required](#required)
- [Running Speedtyper.dev](#running-speedtyperdev)

## Required

- Git
- Node 16
- Yarn
- MongoDB
- build-essential (or equivalent for your OS)
- Docker (Optional)

## Running Speedtyper.dev

### Backend

```
mkdir ./packages/backend/dist
make install-backend-dependencies
cp ./packages/backend/.env.development ./packages/backend/.env
make run-dev-db
make run-seed-codesources
make run-process-challenges
make run-backend-dev
```

### Frontend

```
make install-webapp-dependencies
make run-webapp-dev
```
