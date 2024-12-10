FROM node:20 AS dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

CMD ["dockerize", "-wait", "tcp://db:5432", "-timeout", "30s", "yarn", "start:dev"]

FROM node:20 AS prod

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --production

COPY . .

RUN yarn build

# Rodar migrações no início
RUN yarn migration:run

CMD ["dockerize", "-wait", "tcp://db:5432", "-timeout", "30s", "yarn", "start:prod"]
