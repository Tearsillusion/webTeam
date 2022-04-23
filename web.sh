#!/bin/bash



git reset --hard origin/webManage
git clean -f
git pull origin webManage
docker build -t web-images ./docker
docker build --progress=plain -t node-images -f ./docker/Dockerfile-node.buildkit .
docker build --progress=plain -t web-images -f ./docker/Dockerfile-web.buildkit .
docker stop web-container
docker rm web-container
docker run -p 9001:80 --name web-container -d web-images

