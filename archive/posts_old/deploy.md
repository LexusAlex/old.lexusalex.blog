---
published: false
---
git push

код попадает на github
далее код идет на сборочный сервер который выполняет необходимые команды

Получается что единственный способ вылить изменения - это отправить полностью работоспособный коммит
на сборочый сервер
pipeline

Сборочный сервер
git pull
init
valid scheme db (api)
lint
test
e2e
down

docker build
docker push
deploy staging -> prod