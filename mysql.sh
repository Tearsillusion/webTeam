#!/bin/bash



docker build -t mysql-images ./manage/docker
docker run -itd --name mysql-container -p 3306:3306 -e MYSQL_ROOT_PASSWORD=ljl1234 mysql-images

