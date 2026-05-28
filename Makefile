COMPOSE = docker compose

#colors for output
GREEN = \033[32m
RED = \033[31m
YELLOW = \033[33m
RESET = \033[0m

all: up

# empty .env are allowed, but they must exist
up: check-env tls
	@echo "${GREEN}===== Starting the services... =====${RESET}"
	@$(COMPOSE) up -d --build
	@echo "${GREEN}===== Services are up and running! =====${RESET}"
	@echo "${YELLOW}===== You can access at https://localhost =====${RESET}"

down:
	@echo "${YELLOW}===== Stopping the services... =====${RESET}"
	@$(COMPOSE) down

clean: down
	@echo "${GREEN}===== Cleaning the services... =====${RESET}"
	@docker image prune -a -f
	@docker container prune -f
	@docker network prune -f

fclean:
	@$(COMPOSE) down -v

	@echo "${GREEN}===== Cleaning the services... =====${RESET}"
	@docker image prune -a -f
	@docker container prune -f
	@docker network prune -f

	@echo "${RED}===== Erasing everything... =====${RESET}"
	@rm -f ./server/certificates/*.crt
	@rm -f ./server/certificates/*.key
	@rm -f backend/.env
	@rm -f frontend/.env
	@rm -f database/.env

check-env:
	@missing=0; \
	for dir in backend frontend database; do \
		if [ ! -f "$$dir/.env" ]; then \
			echo "${YELLOW}===== Warning: .env file not found in $$dir directory. =====${RESET}"; \
			missing=1; \
		fi; \
	done; \
	if [ $$missing -eq 1 ]; then \
		bash ./scripts/env_setup.sh; \
	fi

tls:
	@if [ -f "./server/certificates/server.crt" ] && [ -f "./server/certificates/server.key" ]; then \
		echo "${GREEN}===== TLS certificates already exist. Skipping generation. =====${RESET}"; \
	else \
		echo "${GREEN}===== Generating TLS certificates... =====${RESET}"; \
		chmod +x ./scripts/generate_ssl_certs.sh; \
		bash ./scripts/generate_ssl_certs.sh; \
	fi

re: down up

remake: fclean all

.PHONY: all up down clean fclean re check-env tls remake
