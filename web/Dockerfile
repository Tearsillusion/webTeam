# syntax = docker/dockerfile:experimental
FROM node:14
WORKDIR /app
USER root
COPY . /app
RUN  npm i --registry https://registry.npm.taobao.org/
RUN npm run build


FROM nginx
LABEL name = "web"
LABEL version = "v1.0"
COPY ./dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 80