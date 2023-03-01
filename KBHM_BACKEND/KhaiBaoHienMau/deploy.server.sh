 docker-compose -f docker-compose.yml -f docker-compose.override.yml build
 docker-compose -f docker-compose.yml -f docker-compose.override.yml push

scp docker-compose.yml docker-compose.override.yml root@27.71.27.86:app/backend
ssh root@27.71.27.86 "cd app/backend ; sed -i '/build:\|context:\|dockerfile:/d' docker-compose.yml; bash deploy.sh"
