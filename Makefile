# backend

install-backend-dependencies:
	yarn --cwd ./packages/speedtyper-backend

run-backend-dev:
	yarn --cwd ./packages/speedtyper-backend dev

run-dev-db:
	docker compose -f ./packages/speedtyper-backend/docker-compose.yml up -d

run-seed-codesources:
	yarn --cwd ./packages/speedtyper-backend tsc
	yarn --cwd ./packages/speedtyper-backend seed-codesources

run-process-challenges:
	yarn --cwd ./packages/speedtyper-backend tsc
	yarn --cwd ./packages/speedtyper-backend process-challenges


# webapp

install-webapp-dependencies:
	yarn --cwd ./packages/speedtyper-backend

run-build-css:
	yarn --cwd ./packages/speedtyper-webapp build:css

run-webapp:
	yarn --cwd ./packages/speedtyper-webapp start
