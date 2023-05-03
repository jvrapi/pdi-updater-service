FROM node:lts as builder

WORKDIR /app

COPY . .

RUN yarn install 

RUN yarn build

RUN mv .env.production .env

FROM node:lts

WORKDIR /app

COPY --from=builder /app  .

EXPOSE 3000

CMD [ "node", "dist/main.js" ]