COMPOSE = docker compose

ifeq ($(OS),Windows_NT)
IS_WINDOWS = 1
else
IS_WINDOWS = 0
endif

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

ifeq ($(IS_WINDOWS),1)
	@powershell -NoProfile -ExecutionPolicy Bypass -File ./scripts/fclean.ps1
else
	@rm -f ./server/certificates/*.crt
	@rm -f ./server/certificates/*.cert
	@rm -f ./server/certificates/*.key
	# ensure files are writable before removing to avoid permission errors
	@for f in ./server/certificates/*.crt ./server/certificates/*.cert ./server/certificates/*.key backend/.env frontend/.env database/.env; do \
		if [ -e "$$f" ]; then \
			chmod u+w "$$f" 2>/dev/null || true; \
			rm -f "$$f" || true; \
		fi; \
	done
endif

check-env:

ifeq ($(IS_WINDOWS),1)
	@powershell -NoProfile -ExecutionPolicy Bypass -File ./scripts/check_env.ps1
else
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
endif

tls:

ifeq ($(IS_WINDOWS),1)
	@powershell -NoProfile -ExecutionPolicy Bypass -File ./scripts/generate_ssl_certs.ps1
else
	@if [ -f "./server/certificates/server.cert" ] && [ -f "./server/certificates/server.key" ]; then \
		echo "${GREEN}===== TLS certificates already exist. Skipping generation. =====${RESET}"; \
	else \
		echo "${GREEN}===== Generating TLS certificates... =====${RESET}"; \
		bash ./scripts/generate_ssl_certs.sh; \
	fi
endif

re: down up

remake: fclean all

.PHONY: all up down clean fclean re check-env tls remake
