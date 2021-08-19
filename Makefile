up:
	docker-compose up -d --build --scale tests=0

down:
	docker-compose down \
		--rmi local \
		--volumes \
		--remove-orphans \
		--timeout 60; \
	docker-compose rm -f

install:
	npm ci

lint:
	npm run lint

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test-ci: up
	set -e ;\
	test_status_code=0 ;\
	docker-compose run tests || test_status_code=$$? ;\
	exit $$test_status_code ;

run:
	npm start

.PHONY: lint up test run down
