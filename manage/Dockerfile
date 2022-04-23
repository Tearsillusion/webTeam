FROM node:14
LABEL name = "manage"
LABEL version = "v1.0"
USER root
COPY . /app
WORKDIR /app
EXPOSE 3000
RUN  npm i --registry https://registry.npm.taobao.org/
CMD npm start