FROM node:14
LABEL name = "manage"
LABEL version = "v1.0"
COPY ../ /app
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD npm start