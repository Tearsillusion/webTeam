#!/bin/bash

git reset --hard origin/webManage
git clean -f
git pull origin webManage
docker build -t hooks-images ./hooks
docker stop hooks-container
docker rm hooks-container
docker run -itd -p 9003:9003 --name hooks-container  hooks-images

