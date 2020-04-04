#!/bin/bash
service mongod stop
docker start database
docker start mongobarber
docker start redisbarber
docker ps

npm run web:run
