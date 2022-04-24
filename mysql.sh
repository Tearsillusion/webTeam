#!/bin/bash


docker stop mysql-container
docker rm mysql-container
docker build -t mysql-images ./manage/docker
docker run -itd --name mysql-container -p 49457:3306 -e MYSQL_ROOT_PASSWORD=ljl1234 mysql-images

