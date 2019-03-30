# Copy from https://www.codementor.io/yomateo/angular-docker-dockerize-your-app-in-5-minutes-video-included-oohw2mzuj
FROM node:11-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install && \
    npm run build

FROM nginx:1.15-alpine

COPY --from=builder /app/dist/* /usr/share/nginx/html/
COPY nginx/default.conf /etc/nginx/conf.d/
