# Contributing

This is a work in progress

### **Table of Contents**
- [Prerequisites](#Prerequisites)
- [Building and Running Speedtyper.dev](#building-and-running-speedtyperdev)

## Required

- Git
- Node 16
- Yarn
- MongoDB
- Docker (Optional)

## Building and running Speedtyper.dev

### Backend

#### Building

```
mkdir ./packages/speedtyper-backend/dist
make install-backend-dependencies
cp ./packages/speedtyper-backend/.env.development ./packages/speedtyper-backend/.env
make run-dev-db
make run-seed-db
```

#### Running
```
make run-dev
```

### Frontend

#### Building

```
make install-webapp-dependencies
make run-build-css
```

#### Running
```
make run-webapp
```
