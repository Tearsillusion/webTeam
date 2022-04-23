#!/bin/bash

WORK_PATH='/webTest/webTeam'
cd $WORK_PATH
git reset --hard origin/webManage
git clean -f
git pull origin webManage
docker build -t manage-images ./manage/docker
docker stop manage-container
docker rm manage-container
docker container run -p 3000:3000 --name manage-container -d manage-images

