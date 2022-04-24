#!/bin/bash

git reset --hard origin/webManage
git clean -f
git pull origin webManage
docker build -t manage-images ./manage
docker stop manage-container
docker rm manage-container
docker run -itd -p 9001:3000 --name manage-container  manage-images

