up:
	@(docker-compose up -d --remove-orphans)

down:
	@(docker-compose down)

bootstrap: up
	@(docker-compose exec app npm run bootstrap)

build: down
	@(docker-compose build)

dev-up:
	@(docker-compose -f docker-compose.dev.yml up -d --remove-orphans)

dev-down:
	@(docker-compose -f docker-compose.dev.yml down)
