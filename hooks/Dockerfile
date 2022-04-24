FROM node:14.18.3
LABEL name = "hooks"
LABEL version = "v1.0"
USER root
COPY . /app
WORKDIR /app
EXPOSE 9003
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install
CMD npm start