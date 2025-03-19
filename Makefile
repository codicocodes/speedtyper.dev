# backend

install-backend-dependencies:
	yarn --cwd ./packages/back-nest

run-backend-dev:
	yarn --cwd ./packages/back-nest start:dev

run-dev-db:
	docker compose --env-file ./packages/back-nest/.env -f ./packages/back-nest/docker-compose.yml up -d

run-seed-codesources:
	yarn --cwd ./packages/back-nest command seed-challenges

# webapp

install-webapp-dependencies:
	yarn --cwd ./packages/webapp-next

run-webapp-dev:
	yarn --cwd ./packages/webapp-next dev
