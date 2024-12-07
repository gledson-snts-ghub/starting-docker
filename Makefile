DOCKER_IMAGE_NAME_DEV=$(shell grep DOCKER_IMAGE_NAME_DEV .env | cut -d '=' -f2)
DOCKER_IMAGE_NAME_PROD=$(shell grep DOCKER_IMAGE_NAME_PROD .env | cut -d '=' -f2)
DOCKER_VOLUME_PATH_DEV=$(shell grep DOCKER_VOLUME_PATH_DEV .env | cut -d '=' -f2)
DOCKERFILE_PATH:=$(shell grep DOCKERFILE_PATH .env | cut -d '=' -f2)
DOCKER_PORT:=$(shell grep DOCKER_PORT .env | cut -d '=' -f2)

POSTGRES_NAME_DEV:=$(shell grep POSTGRES_NAME_DEV .env | cut -d '=' -f2)
POSTGRES_NAME_PROD:=$(shell grep POSTGRES_NAME_PROD .env | cut -d '=' -f2)
POSTGRES_IMAGE:=$(shell grep POSTGRES_IMAGE .env | cut -d '=' -f2)
POSTGRES_PORT:=$(shell grep POSTGRES_PORT .env | cut -d '=' -f2)
POSTGRES_USER:=$(shell grep POSTGRES_USER .env | cut -d '=' -f2)
POSTGRES_PASSWORD:=$(shell grep POSTGRES_PASSWORD .env | cut -d '=' -f2)
POSTGRES_DB:=$(shell grep POSTGRES_DB .env | cut -d '=' -f2)

build-dev:
	docker build -f $(DOCKERFILE_PATH) --target dev -t $(DOCKER_IMAGE_NAME_DEV) .

build-prod:
	docker build -f $(DOCKERFILE_PATH) --target prod -t $(DOCKER_IMAGE_NAME_PROD) .

create-db-dev:
	docker run -d \
		-e POSTGRES_USER=$(POSTGRES_USER) \
		-e POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) \
		-e POSTGRES_DB=$(POSTGRES_DB) \
		-p $(POSTGRES_PORT):$(POSTGRES_PORT) \
		--name $(POSTGRES_NAME_DEV) \
		$(POSTGRES_IMAGE)

create-db-prod:
	docker run -d \
		-e POSTGRES_USER=$(POSTGRES_USER) \
		-e POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) \
		-e POSTGRES_DB=$(POSTGRES_DB) \
		-p $(POSTGRES_PORT):$(POSTGRES_PORT) \
		--name $(POSTGRES_NAME_PROD) \
		$(POSTGRES_IMAGE)

run-db-dev:
	docker start $(POSTGRES_NAME_DEV)

run-db-prod:
	docker start $(POSTGRES_NAME_PROD)

run-app-dev:
	docker run -it -p $(DOCKER_PORT):$(DOCKER_PORT) -v $(shell pwd):$(DOCKER_VOLUME_PATH_DEV)  $(DOCKER_IMAGE_NAME_DEV)

run-app-prod:
	docker run -it -p $(DOCKER_PORT):$(DOCKER_PORT) $(DOCKER_IMAGE_NAME_PROD)

clean:
	docker system prune -f

delete-container-stoped:
	docker container prune -f

info:
	@echo "\033[35mImagem Docker\033[0m"
	@docker images
	@echo "\033[32mContainers em Execução\033[0m"
	@docker ps
	@echo "\033[33mContainers Parados\033[0m"
	@docker ps -a
	@echo "\033[34mVolumes Docker\033[0m"
	@docker volume ls
	@echo "\033[36mNetwork Docker\033[0m"
	@docker network ls
	@echo "\033[31mPorta Docker\033[0m"
	@echo "$(DOCKER_PORT)"