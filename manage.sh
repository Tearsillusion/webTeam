#!/bin/bash

git reset --hard origin/webManage
git clean -f
git pull origin webManage
docker build -t manage-images ./manage/docker
docker stop manage-container
docker rm manage-container
docker run -itd -p 9008:3000 --name manage-container  manage-images

