docker build -f docker/Dockerfile --build-arg DOCKER_PORT=$(grep DOCKER_PORT .env | cut -d '=' -f2) -t my-nest-app .

echo "\033[35mIt's Done.\033[0m"