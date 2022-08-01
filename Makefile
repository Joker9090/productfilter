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

mock:
	node ./node_modules/intermock/build/src/cli/index.js --files ./models/Product.ts --interfaces "ProductInterface" --outputFormat json > mocks/product1.json
	node ./node_modules/intermock/build/src/cli/index.js --files ./models/Product.ts --interfaces "ProductInterface" --outputFormat json > mocks/product2.json
	node ./node_modules/intermock/build/src/cli/index.js --files ./models/Product.ts --interfaces "ProductInterface" --outputFormat json > mocks/product3.json
	node ./node_modules/intermock/build/src/cli/index.js --files ./models/Product.ts --interfaces "ProductInterface" --outputFormat json > mocks/product4.json
	node ./node_modules/intermock/build/src/cli/index.js --files ./models/Product.ts --interfaces "ProductInterface" --outputFormat json > mocks/product5.json
	node ./node_modules/intermock/build/src/cli/index.js --files ./models/Product.ts --interfaces "ProductInterface" --outputFormat json > mocks/product6.json
	node ./node_modules/intermock/build/src/cli/index.js --files ./models/Product.ts --interfaces "ProductInterface" --outputFormat json > mocks/product7.json
	node ./node_modules/intermock/build/src/cli/index.js --files ./models/Product.ts --interfaces "ProductInterface" --outputFormat json > mocks/product8.json
	node ./node_modules/intermock/build/src/cli/index.js --files ./models/Product.ts --interfaces "ProductInterface" --outputFormat json > mocks/product9.json