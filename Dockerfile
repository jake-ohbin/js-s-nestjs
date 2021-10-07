FROM node:latest AS JJ

WORKDIR /src/app

COPY . .

RUN npm install
RUN npm run build

FROM node:latest
WORKDIR /src/app
COPY --from=JJ /src/app ./

EXPOSE 3000

CMD ["npm", "run", "start:dev"]