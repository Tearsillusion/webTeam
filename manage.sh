#!/bin/bash

git reset --hard origin/webManage
git clean -f
git pull origin webManage
docker build -t manage-images ./manage
docker build -t mysql-images ./manage/docker
docker stop manage-container
docker rm manage-container
docker run -itd -p 9008:3000 --name manage-container  manage-images
docker run -itd --name mysql-container -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql-images

