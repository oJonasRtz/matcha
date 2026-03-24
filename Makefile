COMPOSE = docker compose

all: up

# empty .env are allowed, but they must exist
up: check-env tls
	$(COMPOSE) up -d --build

down:
	$(COMPOSE) down

clean:
	$(COMPOSE) down -v --remove-orphans

fclean: clean
	docker system prune -af --volumes

check-env:
	@for dir in backend frontend; do \
		if [ ! -f "$$dir/.env" ]; then \
			echo "Error: .env file not found in $$dir directory."; \
			exit 1; \
		fi; \
	done

tls:
	@echo "Generating TLS certificates..."
	@bash ./server/certificates/generate.sh

re: down up

.PHONY: all up down clean fclean re check-env