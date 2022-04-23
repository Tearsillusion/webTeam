#!/bin/bash

WORK_PATH = './web'
cd $WORK_PATH
git reset --hard origin/webManage
git clear -f
git pull origin webManage
docker build -t web-images ./docker
docker build --progress=plain -t node-images -f $WORK_PATH/docker/Dockerfile-node.buildkit $WORK_PATH
docker build --progress=plain -t web-images -f $WORK_PATH/docker/Dockerfile-web.buildkit $WORK_PATH
docker stop web-container
docker rm web-container
docker run -p 9001:80 --name web-container -d web-images

