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
- Docker (Optional)

## Running Speedtyper.dev

### Backend

```
mkdir ./packages/speedtyper-backend/dist
make install-backend-dependencies
cp ./packages/speedtyper-backend/.env.development ./packages/speedtyper-backend/.env
make run-dev-db
make run-seed-db
make run-dev
```

### Frontend

```
make install-webapp-dependencies
make run-build-css
make run-webapp
```
