FROM node:10-alpine3.11

WORKDIR /app

COPY . .

RUN apk add --no-cache make

RUN npm ci

CMD ["make", "test-coverage"]
