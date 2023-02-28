docker compose down
docker compose build
docker compose restart
docker compose push


ssh root@27.71.27.86 "cd app/backend ; bash pullbackend.sh"
