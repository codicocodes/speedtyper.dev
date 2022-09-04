# backend

install-backend-dependencies:
	yarn --cwd ./packages/backend

run-backend-dev:
	yarn --cwd ./packages/backend dev

run-dev-db:
	docker compose -f ./packages/backend/docker-compose.yml up -d

run-seed-codesources:
	yarn --cwd ./packages/backend tsc
	yarn --cwd ./packages/backend seed-codesources

run-process-challenges:
	yarn --cwd ./packages/backend tsc
	yarn --cwd ./packages/backend process-challenges


# webapp

install-webapp-dependencies:
	yarn --cwd ./packages/webapp

run-build-css:
	yarn --cwd ./packages/webapp build:css

run-webapp:
	yarn --cwd ./packages/webapp start
