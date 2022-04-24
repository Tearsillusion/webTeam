#!/bin/bash



git reset --hard origin/webManage
git clean -f
git pull origin webManage
docker stop web-container
docker rm web-container
make build-image
docker run -itd -p 9002:80 --name web-container  web-team:latest



