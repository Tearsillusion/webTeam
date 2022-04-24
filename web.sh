#!/bin/bash


WORK_PATH='./web'
git reset --hard origin/webManage
git clean -f
git pull origin webManage
docker stop web-container
docker rm web-container
cd $WORK_PATH
make build-image
docker run -itd -p 9002:80 --name web-container  web-team:latest



