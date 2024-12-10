# Backend Ilumeo Project

Este projeto é o backend da aplicação de controle de ponto, desenvolvido com NestJS. Para rodá-lo, você precisará usar Docker e rodar algumas migrations para configurar o banco de dados.

## Link da API de produção no RENDER:

    Rota users: https://starting-docker.onrender.com/users
    Rota times: https://starting-docker.onrender.com/times

## Pré-requisitos

- Docker instalado na sua máquina.

Se você ainda não tem o Docker instalado, pode seguir a documentação oficial: [Instalar o Docker](https://docs.docker.com/get-docker/).

## Rodando o Backend

Para rodar o projeto backend, siga os passos abaixo:

1. **Criar a rede Docker**:

   Execute o seguinte comando para criar a rede Docker necessária para a comunicação entre os containers:

   ```bash
   make create-network
   ```

2. **Construa a imagem Docker para o ambiente de desenvolvimento**:
   ```bash
   make build-dev
   ```
3. **Criar o container do banco de dados PostgreSQL:**
   ```bash
   make create-db-dev
   ```
4. **Se o banco de dados já foi criado anteriormente, você pode iniciar o container com:**

   ```bash
   make run-db-dev
   ```

5. **Rodar a aplicação no ambiente de desenvolvimento:**

   ```bash
   make run-app-dev
   ```

6. **Obtenha o ID do container que está utilizando com o comando:**

   ```bash
   docker ps -a
   ```

7. **Em seguida, acesse o terminal do container:**

   ```bash
   docker exec -it <id-do-container> /bin/bash
   ```

8. **Dentro do terminal do container, execute o seguinte comando para rodar as migrations e criar as tabelas no banco de dados:**

   ```bash
   yarn migration:run
   ```

   Isso irá criar as tabelas necessárias no banco de dados.
