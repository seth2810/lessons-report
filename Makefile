up:
	docker-compose up -d --build

down:
	docker-compose down \
		--rmi local \
		--volumes \
		--remove-orphans \
		--timeout 60; \
	docker-compose rm -f

.PHONY: test
