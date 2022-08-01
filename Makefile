start: stop
	docker-compose up -d --build

stop:
	docker-compose stop
	docker-compose down --volumes --remove-orphans
	@docker rm productfilter || true

ps:
	docker-compose ps

logs:
	docker-compose logs -f productfilter

shell:
	docker exec -it productfilter ash