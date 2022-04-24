#!/bin/bash



git reset --hard origin/webManage
git clean -f
git pull origin webManage
docker stop web-container
docker rm web-container
docker build --progress=plain -t web-team-pre:latest -f ./web/docker/Dockerfile-pre.buildkit ./web
docker build --progress=plain -t web-images:latest -f ./web/docker/Dockerfile.buildkit ./web
docker run -itd -p 9002:80 --name web-container  web-images:latest



