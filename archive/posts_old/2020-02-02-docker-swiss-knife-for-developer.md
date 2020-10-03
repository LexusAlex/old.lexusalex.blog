---
layout: post 
title: Docker - швейцарский нож для разработчика
permalink: docker-swiss-knife-for-developer
tags: docker linux php mariadb
comments: true
summary: Немного о docker - как об универсальном инструменте разработчика.
subtitle: Docker - универсальный инструмент для разработчика
is_navigate: true
cover_url: "/assets/images/articles/docker.png"
published: false
---

В сети периодически натыкаюсь на вопросы про docker [к примеру](https://qna.habr.com/q/697294), в связи с этим
решил показать как с помощью docker можно запустить приложение.

## Стек

Процесс установки docker прекрасно описан в [документации](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
и не должен вызвать трудностей. Docker доступен для всех операционных систем.

В идеологии docker каждый процесс должен быть запущен в отдельном контейнере. 
Но на самом деле это зависит от задачи и проекта.

Компоненты которые нам понадобятся входить в типичный стек веб разработчика:
- База данных mariaDb
- Веб сервер apache с php 7.4

Я намеренно не усложняю процесс и обхожусь здесь без [docker-compose](https://docs.docker.com/compose/). 
Это интересная штука, но для повседневных задач, излишняя.

## База данных

База данных - это долгоиграющий контейнер-сервис. Я использую один контейнер для всех необходимых мне баз данных.

Находим на [docker hub](https://hub.docker.com) нужный нам [образ](https://hub.docker.com/_/mariadb) в данном случае последнюю версию mariadb:latest (10.4.12) и скачиваем его:

```bash
#!/usr/bin/env bash
docker pull mariadb:latest
```
Технически образ это просто архив с файлами.

Создайте где-нибудь у себя в файловой системе директорию `docker-values` для сервисов ресурсы которых будут использовать другие
контейнеры. Возможно в будущем их будет несколько. Каждый сервис будем описывать и хранить в отдельном
каталоге. Например у меня это в домашнем каталоге:

~~~text
/home/alex/projects/docker-values/mariadb
~~~

Cобираем контейнер и выполняем команду:
```bash
#!/usr/bin/env bash
docker run -d --name mariadb -v $PWD/../docker-values/mariadb/data:/var/lib/mysql -v $PWD/../docker-values/mariadb/logs:/var/lib/mysql/logs -e MYSQL_ROOT_PASSWORD=root -p 127.0.0.1:3306:3306 mariadb:latest
```
Ключи `-v` значат, что мы прокидываем директории хост машины в директории контейнера, то есть содержимое этих директорий будет синхронизировано, что дает возможность хранить сами базы данных у себя на компьютере.

Если все пути были заданы верно контейнер запустится и готов к работе. К базе данных можно подключится по стандартным параметрам:
- хост: 127.0.0.1
- порт: 3306
- логин: root
- пароль: root

Запустить/Остановить контейнер :

~~~bash
docker start mariadb
docker stop mariadb
~~~

## Сборка контейнера веб сервера

Для сборки контейнера веб-сервера выполним похожие команды, но прежде создадим нужные нам директории и файлы в проекте:

### /services/apache/config/000-default.conf

Стандартный файл виртуального хоста apache.

```apacheconfig
<VirtualHost *:80>
	ServerAdmin webmaster@localhost
	DocumentRoot /var/www/html/public
	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

### /services/apache/Dockerfile

Главный файл docker, из которого будет собирать образ

```dockerfile
FROM php:apache
RUN apt-get update && docker-php-ext-install pdo_mysql && apt-get install git unzip vim -y
RUN curl -sS https://getcomposer.org/installer -o composer-setup.php && php composer-setup.php --install-dir=/usr/local/bin --filename=composer && rm composer-setup.php
WORKDIR /var/www/html
RUN a2enmod rewrite
EXPOSE 80
CMD ["apache2-foreground"]
```

Скачаем базовый образ apache-php :

```bash
#!/usr/bin/env bash
docker pull php:apache
```

Соберем контейнер на основе Dockerfile и запустим его:

```bash
#!/usr/bin/env bash
docker build -t php:apache-test $PWD/services/apache/
docker run -d --name test --link mariadb:mariadb -v $PWD/www:/var/www/html -v $PWD/services/apache/config/000-default.conf:/etc/apache2/sites-available/000-default.conf -p 127.0.0.1:80:80 php:apache-test
```

Запустить/Остановить контейнер :

~~~bash
docker start test
docker stop test
~~~

Все готово. Наш стандартный стек собран.

Чтобы не запоминать все эти команды для удобства запуска всего этого дела я рекомендую создать `Makefile` с командами например:

~~~makefile
init:
	docker build -t php:apache-test $(PWD)/services/apache/
run:
	docker run -d --name test --link mariadb:mariadb -v $(PWD)/www:/var/www/html -v $(PWD)/services/apache/config/000-default.conf:/etc/apache2/sites-available/000-default.conf -p 127.0.0.1:80:80 php:apache-test
start:
	docker start test
start-all:
	docker start mariadb test
stop-all:
	docker stop mariadb test
create-database:
	docker exec -it mariadb /bin/bash -c "mysql -hlocalhost -uroot -proot -e 'CREATE DATABASE test' && echo ok"
composer:
	docker exec -i test /bin/bash -c "composer update && chmod -R 777 composer.lock"
~~~

Теперь запустить сразу два контейнера можно командой `make start-all` или к примеру обновить зависимости composer командой `make composer`.

## Итог

Docker имеет множество настроек, которые я считаю выходить за рамки данной статьи.
Считаю что описание процесса выше вполне достаточно, чтобы минимально влиться в процесс контейнеризированной разработки.
Из очевидных плюсов хочу отметить универсальность и гибкость инструмента.

## Ссылки

- [Документация Docker](https://docs.docker.com/)
- [Репозиторий образов Docker](https://hub.docker.com/)
- [Годный гайд по Docker](https://guides.hexlet.io/docker/)