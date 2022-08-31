# backend

install-backend-dependencies:
	yarn --cwd ./packages/speedtyper-backend

run-backend-dev:
	yarn --cwd ./packages/speedtyper-backend dev

run-dev-db:
	docker compose -f ./packages/speedtyper-backend/docker-compose.yml up -d

run-seed-db:
	yarn --cwd ./packages/speedtyper-backend seed-db


# webapp

install-webapp-dependencies:
	yarn --cwd ./packages/speedtyper-backend

run-build-css:
	yarn --cwd ./packages/speedtyper-webapp build:css

run-webapp:
	yarn --cwd ./packages/speedtyper-webapp start
