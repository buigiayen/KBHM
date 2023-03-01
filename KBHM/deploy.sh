 docker-compose down
 docker-compose -f docker-compose.yml build
  docker-compose -f docker-compose.yml up -d
 docker-compose -f docker-compose.yml push

scp docker-compose.yml root@27.71.27.86:app/frontend
ssh root@27.71.27.86 "cd app/frontend ; sed -i '/build:\|context:\|dockerfile:/d' docker-compose.yml; bash deploy.sh"
