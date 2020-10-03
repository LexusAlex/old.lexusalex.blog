---
layout: post
title: Использвание docker. Часть 1
permalink: test-code-phpunit
tags: php linux docker
comments: true
published: false

---

Docker  состоит из двух компонентов:
- Docker Engine
- Docker Hub

Для работы докера нужна 64 битная ОС

скрипт для установки https://get.docker.com/

----------------

Все начинаеться с установки ОС, что хорошо, можно выбрать нужную под каждый сервис, независимо

Пространство имен (Namespace) - механизм изоляции и группировки структур данных ядра, пространиство
имен процессов, начинают нумероваться с 1

Control groups - механизм изоляции ресурсов ядра, управление ресурсами

Контейнер - это пространство имен и некий набор утилит

Контейнер может быть
- создан
- перезапущен
- рабоатает
- приостановлен
- остановлен

Контейнер существует пока существует его процесс

clone() - клонирование процесса
unshare()
setns()

Докер позволяет сохранять стейт

libcontainer
libvirt
lxc
systemd-nspawn

Copy on write fs

https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1

https://github.com/phpearth/docker-php

https://docs.docker.com/compose/install/#install-compose

ENTRYPOINT - запуск скрипта при запуске docker run
Скачать образ `docker pull phpearth/php:7.2-apache`


https://docs.docker.com/compose/compose-file/#stop_grace_period

docker-compose up -d
docker-compose build

docker-compose rm db


хрвним все в проекте, поэксперимертировать с запуском разных баз данных
~~~dockerfile
FROM phpearth/php:7.2-apache

CMD ["/usr/sbin/httpd", "-DFOREGROUND"]

~~~

команды

~~~bash

docker system df # сколько весят образы
docker system prune #удаляем контейнерный хлам
docker system prune -a #вообще удаляем все
docker search debian # поиск образа
docker image ls -a # список всех образов
docker image prune # удаление всех неизпользованныъ образов
docker container run -it itscaro/debian-ssh /bin/bash #запуск контейнера и выполнения внутри его команды
docker exec -it [CONTAINER ID] bash # подключиться к контейнеру
docker ps # что запущено
docker top [CONTAINER ID] # процессы внутри контейнера
docker logs [CONTAINER ID] # логи
docker rm [CONTAINER ID] # удалить контенер


curl https://get.docker.com/ > /tmp/i.sh
chmod +x /tmp/i.sh
/tmp/i.sh


docker run -h cont -it debian:9-slim /bin/bash

docker ps
docker inspect cont
docker logs cont


docker rmi $(docker images -q -f danggling=true)
~~~

Создать свой образ на основе другого docker build --tag lexusalex/php-sicp .

docker run --rm -v ${PWD}/manager:/app -p 8080:80 --workdir=/app php-7.2:cli /bin/app.php