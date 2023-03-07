 docker-compose -f docker-compose.yml -f docker-compose.override.yml build
 docker-compose -f docker-compose.yml -f docker-compose.override.yml push

scp docker-compose.yml docker-compose.override.yml root@103.82.22.104:app/backend
ssh root@103.82.22.104 "cd app/backend ; sed -i '/build:\|context:\|dockerfile:/d' docker-compose.yml; bash deploy.sh"
