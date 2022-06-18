# !/bin/bash

docker rm $(docker stop $(docker ps -aq))
docker compose up --abort-on-container-exit --remove-orphans --build
docker rm $(docker stop $(docker ps -aq))