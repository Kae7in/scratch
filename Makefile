.PHONY: install stop clean db-start db-seed db-push db-delete

init:
	@echo ">>> Initializing the backend..."
	$(MAKE) install
	$(MAKE) db-start
	@echo ">>> Waiting for the database to start..."
	sleep 5
	$(MAKE) db-push
	$(MAKE) db-seed
	@echo ">>> Everything is ready!"

install:
	@echo ">>> Checking for pnpm..."
	@if ! command -v pnpm &> /dev/null; then \
		echo "Installing pnpm..."; \
		npm install -g pnpm; \
	fi
	@echo ">>> Installing monorepo dependencies..."
	cd web && pnpm i
	cd server && pnpm i
	@echo ">>> Switching docker context to orbstack..."
	docker context use orbstack
	@echo ">>> Building the Docker image..."
	docker compose build

stop:
	@echo ">>> Stopping docker..."
	docker compose stop

clean:
	@echo ">>> Cleaning up Scratch..."
	$(MAKE) stop
	rm -rf node_modules
	docker system prune -f

db-start: 	
	@echo ">>> Starting the database..."
	docker compose up -d db

db-seed:
	@echo ">>> Seeding the database..."
	cd server && pnpm run db:seed

db-push:
	@echo ">>> Pushing to remote database..."
	cd server && pnpm run db:push

db-delete:
	@echo ">>> Cleaning up the backend..."
	docker compose down -v
	docker-compose down --volumes

lint:
	@echo ">>> Linting the code..."
	cd web && pnpm run lint:fix
	cd server && pnpm run lint:fix

test:
	@echo ">>> Checking if test database is running..."
	@if [ $$(docker ps -q -f name=test-postgres) ]; then \
		echo "Test database is already running."; \
	else \
		echo "Starting the test database..."; \
		docker compose up -d test-db; \
		echo "Waiting for the test database to start..."; \
		sleep 5; \
		echo "Resetting the test database..."; \
		pnpm --filter @scratch/server run db:reset:test; \
		echo "Migrating the test database..."; \
		pnpm --filter @scratch/server run db:migrate:test; \
	fi
	@echo ">>> Running tests..."
	cd server && pnpm test

test-clean:
	@echo ">>> Stopping the test database..."
	docker compose down -v test-db
	docker-compose down --volumes test-db

env:
	cd server && vercel env pull
	cd web && vercel env pull
