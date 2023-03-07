docker-compose down
docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up -d
docker-compose -f docker-compose.yml push

scp docker-compose.yml root@103.82.22.104:app/frontend
ssh root@103.82.22.104 "cd app/frontend ; sed -i '/build:\|context:\|dockerfile:/d' docker-compose.yml;"
