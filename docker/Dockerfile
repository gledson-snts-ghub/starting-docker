FROM node:20 AS dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "start:dev"]

FROM node:20 AS prod

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --production

COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]
