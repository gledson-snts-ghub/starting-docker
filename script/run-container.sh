export $(grep DOCKER_PORT .env)

docker run -it -p  $DOCKER_PORT:$DOCKER_PORT my-nest-app

