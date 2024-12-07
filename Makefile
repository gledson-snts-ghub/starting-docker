DOCKER_IMAGE_NAME=my-nest-app
DOCKERFILE_PATH:=$(shell grep DOCKERFILE_PATH .env | cut -d '=' -f2)
DOCKER_PORT:=$(shell grep DOCKER_PORT .env | cut -d '=' -f2)

POSTGRES_IMAGE:=$(shell grep POSTGRES_IMAGE .env | cut -d '=' -f2)
POSTGRES_PORT:=$(shell grep POSTGRES_PORT .env | cut -d '=' -f2)
POSTGRES_USER:=$(shell grep POSTGRES_USER .env | cut -d '=' -f2)
POSTGRES_PASSWORD:=$(shell grep POSTGRES_PASSWORD .env | cut -d '=' -f2)
POSTGRES_DB:=$(shell grep POSTGRES_DB .env | cut -d '=' -f2)


build:
	docker build -f $(DOCKERFILE_PATH) -t $(DOCKER_IMAGE_NAME) .

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

run:
	docker run -it -p $(DOCKER_PORT):$(DOCKER_PORT) $(DOCKER_IMAGE_NAME)

run-db:
	docker run -d \
		-e POSTGRES_USER=$(POSTGRES_USER) \
		-e POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) \
		-e POSTGRES_DB=$(POSTGRES_DB) \
		-p $(POSTGRES_PORT):$(POSTGRES_PORT) \
		--name postgres-container \
		$(POSTGRES_IMAGE)

start: run-db run

clean:
	docker system prune -f
