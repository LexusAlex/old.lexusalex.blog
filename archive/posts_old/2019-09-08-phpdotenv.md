---
layout: post
title: Библиотеки php - phpdotenv
permalink: php-phpdotenv
tags: php environment linux
comments: true
subtitle: phpdotenv или как использовать переменные окружения в php.
summary:  phpdotenv или как использовать переменные окружения в php.
is_navigate: true
cover_url: "/assets/images/articles/php.png"
published: false
---

### Переменные окружения в linux

Переменные окружения в linux представляют собой пары `ИМЯ_ПЕРЕМЕННОЙ=ЗНАЧЕНИЕ`.
Ими активно пользуются запущенные программы, скрипты и демоны.

Для просмотра списка переменных окружения установленных для данной рабочей среды и данного пользователя
используются команды `env` или `printenv`, например в docker контейнере набор переменных такой: 

~~~bash
HOSTNAME=9df533cf61f3
COMPOSER_ALLOW_SUPERUSER=1
PWD=/php-tests
HOME=/root
TERM=xterm
SHLVL=1
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
_=/usr/bin/env
...
~~~

а у меня на хост машине переменные такие: 

~~~bash
XDG_VTNR=7
XDG_SESSION_ID=c2
CLUTTER_IM_MODULE=
XDG_GREETER_DATA_DIR=/var/lib/lightdm-data/alex
QT_STYLE_OVERRIDE=gtk
SESSION=xubuntu
GPG_AGENT_INFO=/home/alex/.gnupg/S.gpg-agent:0:1
GLADE_PIXMAP_PATH=:
SHELL=/bin/bash
XDG_MENU_PREFIX=xfce-
TERM=xterm
QT_LINUX_ACCESSIBILITY_ALWAYS_ON=1
WINDOWID=71303172
UPSTART_SESSION=unix:abstract=/com/ubuntu/upstart-session/1000/3033
GNOME_KEYRING_CONTROL=
USER=alex
...
~~~

Соответственно на разных машинах набор переменных отличается.


### Установка phpdotenv

php дает нам возможность получить эти переменные.

Библиотека [https://github.com/vlucas/phpdotenv](https://github.com/vlucas/phpdotenv) читает файл `.env` и заполняет
все суперглобальные переменные окружения, что дает возможность использовать их в коде.

Устанавливается библиотека стандартным способом через composer :

~~~bash
composer require vlucas/phpdotenv
~~~

### Использование

Создаем файл `.env` с нужными переменными в любом каталоге:

~~~.dotenv
DATABASE_USER=test
DATABASE_PASSWORD=passwd
~~~

Создаем объект и прописываем путь до файла `.env` :

~~~php
use Dotenv\Dotenv;

$dotenv = Dotenv::create(__DIR__); // можно прописать несколько путей для различных окружений;
$dotenv->load(); // загружаем переменные, при это существующие переменные с такими же названиями не будут перезаписаны
//$dotenv->overload (); // в данном случае переменные будут перезаписаны 
~~~

Получить доступ к переменным можно одним из следующих способов:

~~~php
echo getenv('DATABASE_USER'); // test - предпочтительней
echo $_ENV['DATABASE_USER']; // test
echo $_SERVER['DATABASE_USER']; // test
~~~

В библиотеку встроена проверка на обязательные параметры например:

~~~php
$dotenv=;$dotenv->required(['DATABASE_USER', 'DATABASE_PASSWORD']);
~~~

Так же есть возможность проверить на пустоту и тип параметра:

~~~php
$dotenv=;$dotenv->required(['DATABASE_USER'])->notEmpty();
$dotenv->required(['DATABASE_USER'])->isBoolean();
$dotenv->required(['DATABASE_USER'])->isInteger();
~~~

В каждом из этих случаев будет `Fatal Error`.

Есть возможность указать диапазон значений для переменной:

~~~php
$dotenv=;$dotenv->required(['USERS'])->allowedValues(['alex','test']);
~~~

### Рекомендации

- Не загружать файл `.env` в git, но рекомендуется закомититить файл-шаблон `.env-example` с тестовыми значениями. 
- Для именования используйте префиксы, чтобы исключить конфликты имен, например `PROJECT_DATABASE_HOST`
- В идеале все настройки должны хранится в этом файле

### Полезные ссылки

- [Сохраняйте конфигурацию в среде выполнения (принцип приложения 12 факторов)](https://12factor.net/ru/config)
- [Репозиторий библиотеки на github](https://github.com/vlucas/phpdotenv)
- [Файл .env.example в Laravel](https://github.com/laravel/laravel/blob/master/.env.example)
- [Библиотека на packgist.org](https://packagist.org/packages/vlucas/phpdotenv)
