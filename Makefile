DOCKER_IMAGE_NAME_DEV=$(shell grep DOCKER_IMAGE_NAME_DEV .env | cut -d '=' -f2)
DOCKER_IMAGE_NAME_PROD=$(shell grep DOCKER_IMAGE_NAME_PROD .env | cut -d '=' -f2)
DOCKER_VOLUME_PATH_DEV=$(shell grep DOCKER_VOLUME_PATH_DEV .env | cut -d '=' -f2)
DOCKERFILE_PATH=$(shell grep DOCKERFILE_PATH .env | cut -d '=' -f2)
DOCKER_PORT=$(shell grep DOCKER_PORT .env | cut -d '=' -f2)
DOCKER_NETWORK=$(shell grep DOCKER_NETWORK .env | cut -d '=' -f2)

POSTGRES_NAME_DEV=$(shell grep POSTGRES_NAME_DEV .env | cut -d '=' -f2)
POSTGRES_NAME_PROD=$(shell grep POSTGRES_NAME_PROD .env | cut -d '=' -f2)
POSTGRES_IMAGE=$(shell grep POSTGRES_IMAGE .env | cut -d '=' -f2)
POSTGRES_PORT=$(shell grep POSTGRES_PORT .env | cut -d '=' -f2)
POSTGRES_USER=$(shell grep POSTGRES_USER .env | cut -d '=' -f2)
POSTGRES_PASSWORD=$(shell grep POSTGRES_PASSWORD .env | cut -d '=' -f2)
POSTGRES_DB=$(shell grep POSTGRES_DB .env | cut -d '=' -f2)

create-network:
	docker network inspect $(DOCKER_NETWORK) || docker network create $(DOCKER_NETWORK)

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
		--network $(DOCKER_NETWORK) \
		$(POSTGRES_IMAGE)

create-db-prod:
	docker run -d \
		-e POSTGRES_USER=$(POSTGRES_USER) \
		-e POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) \
		-e POSTGRES_DB=$(POSTGRES_DB) \
		-p $(POSTGRES_PORT):$(POSTGRES_PORT) \
		--name $(POSTGRES_NAME_PROD) \
		--network $(DOCKER_NETWORK) \
		$(POSTGRES_IMAGE)

run-db-dev:
	docker start $(POSTGRES_NAME_DEV)

run-db-prod:
	docker start $(POSTGRES_NAME_PROD)

run-app-dev:
	docker run -p $(DOCKER_PORT):$(DOCKER_PORT) \
		-v $(shell pwd):$(DOCKER_VOLUME_PATH_DEV) \
		--network $(DOCKER_NETWORK) \
		$(DOCKER_IMAGE_NAME_DEV)

run-app-prod:
	docker run -it -p $(DOCKER_PORT):$(DOCKER_PORT) \
		--network $(DOCKER_NETWORK) \
		$(DOCKER_IMAGE_NAME_PROD)
