---
layout: post 
title: Composer - менеджер зависимостей php
permalink: php-composer
tags: php composer
comments: true
subtitle: Использование пакетного менеджера composer для управления зависимостями проекта
summary:  Использование пакетного менеджера composer для управления зависимостями проекта
is_navigate: true
cover_url: "/assets/images/articles/composer/composer.png"
published: false
---

Типичное php приложение зависит от другого кода. 
Часто бывает, что код необходимо использовать сразу в нескольких проектах.
В операционных системах зависимостями управляет **пакетный менеджер** .
Пакетный менеджер управляет библиотеками, зависимостями между версиями библиотек, так же является автоматизированным
средством управления то есть установкой, обновлением и удалением библиотек.

В php пакетным менеджером пакетов явлется [composer](https://getcomposer.org/). 
Он умеет подключать файлы и работать с зависимостями пакетов.

_Данное руководство можно отнести к руководству по работе с менеджерами пакетов в общем смысле_

## Определения

1. Библиотека (Пакет) - законченная программа которую мы используем в проекте как зависимость.
2. Версия библиотеки - библиотка обязательно должна иметь номер версии, так как библиотеки зависят от версий друг друга.
3. Репозиторий - Хранилище библиотек. В php это - [packagist.org](https://packagist.org/).
4. Локальная установка - означает что пакет ставится локально для проекта.
5. Глобальная установка - означает что пакет ставится глобально для всей системы как обычная программа.
6. Проект (Приложение) - это конечный продукт который использует зависимости
7. Корневой пакет - это директория где вы зупускаете `composer install`

## Установка composer

Перед началом установки в операционной системе (я использую ubuntu) уже должны стоять следующие пакеты:

- curl
- php
- git
- unzip

Composer написан на php и упакован в [phar архив](https://www.php.net/manual/ru/intro.phar.php).
Его можно поставить локально в как часть проекта или глобально для использования во всей системе.

### Локальная установка

~~~bash
#!/usr/bin/env php
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" # качаем инсталятор
php -r "if (hash_file('sha384', 'composer-setup.php') === 'a5c698ffe4b8e849a443b120cd5ba38043260d5c4023dbf93e1558871f1f07f58274fc6f4c93bcfd858c6bd0775cd8d1') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" # сравниваем хеш файла
# далее можно указать опции установки
php composer-setup.php # установка с опциями по умолчанию
php composer-setup.php --install-dir=/usr/local/bin # установка в указанную директорию
php composer-setup.php --filename=composer # имя конечного файла
php composer-setup.php --version=1.0.0-alpha8 # установить конкретную версию
~~~

После установки будет скачан архив `composer.phar` который уже можно использовать

Также можно загрузить файл `composer.phar` вручную (например на хостинг) с [официального сайта](https://getcomposer.org/download/) или
воспользоваться утилитой `curl -sS https://getcomposer.org/installer -o composer-setup.php`

### Глобальная установка

Чтобы использовать composer глобально нужно переместить файл `composer.phar` 
в директорию `/usr/local/bin/` ,например командой `mv composer.phar /usr/local/bin/composer`
Теперь composer будет доступен глобально и его можно запускать просто как обычную unix утилиту.

Так же composer доступен в репозиториях пакетов операционных систем например в [ubuntu](https://packages.ubuntu.com/disco/composer)
Устанавиливается он как обычная программа `apt-get install composer` в ubuntu или `apk add composer` в alpine linux 

Способ установки зависит от ситуации.

[Мануал по установке composer](https://getcomposer.org/doc/00-intro.md)

## Запуск

Управление всеми зависимостями осуществлятся утилитой `composer`.
Если вы устанавливали composer локально в проект запустите `php composer.phar`
При запуске утилиты будет выведен список опций и возможные команды :
~~~bash
   ______
  / ____/___  ____ ___  ____  ____  ________  _____
 / /   / __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
/ /___/ /_/ / / / / / / /_/ / /_/ (__  )  __/ /
\____/\____/_/ /_/ /_/ .___/\____/____/\___/_/
                    /_/
Composer version 1.9.0 2019-08-02 20:55:32

Usage:
  command [options] [arguments]

Options:
  -h, --help                     Display this help message
  -q, --quiet                    Do not output any message
  -V, --version                  Display this application version
      --ansi                     Force ANSI output
      --no-ansi                  Disable ANSI output
  -n, --no-interaction           Do not ask any interactive question
      --profile                  Display timing and memory usage information
      --no-plugins               Whether to disable plugins.
  -d, --working-dir=WORKING-DIR  If specified, use the given directory as working directory.
      --no-cache                 Prevent use of the cache
  -v|vv|vvv, --verbose           Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

~~~

Возможные команды командной строки:
1. about                    - Shows the short information about Composer.
1. archive                  - Creates an archive of this composer package.
1. browse                   - Opens the package's repository URL or homepage in your browser.
1. check-platform-reqs      - Check that platform requirements are satisfied.
1. clear-cache              - Clears composer's internal package cache.
1. clearcache               - Clears composer's internal package cache.
1. config                   - Sets config options.
1. create-project           - Creates new project from a package into given directory.
1. depends                  - Shows which packages cause the given package to be installed.
1. diagnose                 - Diagnoses the system to identify common errors.
1. dump-autoload            - Dumps the autoloader.
1. dumpautoload             - Dumps the autoloader.
1. exec                     - Executes a vendored binary/script.
1. [global](#Глобально)     - Allows running commands in the global composer dir ($COMPOSER_HOME).
1. help                     - Displays help for a command
1. home                     - Opens the package's repository URL or homepage in your browser.
1. i                        - Installs the project dependencies from the composer.lock file if present, or falls back on the composer.json.
1. info                     - Shows information about packages.
1. [init](#Генерация-файла-composer.json) - Creates a basic composer.json file in current directory.
1. install                  - Installs the project dependencies from the composer.lock file if present, or falls back on the composer.json.
1. [licenses](#Лицензия-на-код-(licence)) - Shows information about licenses of dependencies.
1. list                     - Lists commands
1. outdated                 - Shows a list of installed packages that have updates available, including their latest version.
1. prohibits                - Shows which packages prevent the given package from being installed.
1. remove                   - Removes a package from the require or require-dev.
1. require                  - Adds required packages to your composer.json and installs them.
1. run                      - Runs the scripts defined in composer.json.
1. run-script               - Runs the scripts defined in composer.json.
1. search                   - Searches for packages.
1. self-update              - Updates composer.phar to the latest version.
1. selfupdate               - Updates composer.phar to the latest version.
1. show                     - Shows information about packages.
1. status                   - Shows a list of locally modified packages, for packages installed from source.
1. suggests                 - Shows package suggestions.
1. u                        - Upgrades your dependencies to the latest version according to composer.json, and updates the composer.lock file.
1. update                   - Upgrades your dependencies to the latest version according to composer.json, and updates the composer.lock file.
1. upgrade                  - Upgrades your dependencies to the latest version according to composer.json, and updates the composer.lock file.
1. validate                 - Validates a composer.json and composer.lock.
1. why                      - Shows which packages cause the given package to be installed.
1. why-not                  - Shows which packages prevent the given package from being installed.


Проверим версию composer, у меня в системе установлена локальная и глобальная версия (версия на сентябрь 2019 - 1.9.0) проверим их две:

~~~bash
composer -V && php composer.phar -V
# Composer version 1.9.0 2019-08-02 20:55:32
# Composer version 1.9.0 2019-08-02 20:55:32
~~~

## composer.json

Это управляющий и описательный файл проекта одновременно. Он создается в корне проекта и определяет, 
что это за проект, какие в нём пространства имён, классы, включаемые файлы, зависимости и т.д.
Это ключевой и самый важный файл для работы менеджера.
У каждого пакета зарегистрированного на [packagist.org](https://packagist.org/) есть собственный `composer.json`,
лежащий в корне каждого пакета.
В свою очередь по этим файлам менеджер смотрит, какие какому пакету требуются зависимые пакеты для работы. 

Данные в файле представлены в формате [json](https://www.json.org/json-ru) - это специальный формат для предоставления
структурированных данных. Важно иметь ввиду что формат строг к синтаксическим ошибкам. Например строки могут быть только
в двойных кавычках. Для проверки на корректность можно воспользоваться одним из json валидаторов например 
[jsonlint.com](https://jsonlint.com/)

Пример `composer.json` выглядит следующим образом :

~~~json
{
    "name": "vendor-name/project-name",
    "description": "This is a very cool package!",
    "version": "0.3.0",
    "type": "library",
    "keywords": ["logging", "cool", "awesome"],
    "homepage": "https://jolicode.com",
    "time": "2012-12-21",
    "license": "MIT",
    "authors": [
        {
            "name": "Xavier Lacot",
            "email": "xlacot@jolicode.com",
            "homepage": "http://www.lacot.org",
            "role": "Developer"
        },
        {
            "name": "Benjamin Clay",
            "email": "bclay@jolicode.com",
            "homepage": "https://github.com/ternel",
            "role": "Developer"
        }
    ],
    "support": {
        "email": "support@exemple.org",
        "issues": "https://github.com/jolicode/jane/issues",
        "forum": "http://www.my-forum.com/",
        "wiki": "http://www.my-wiki.com/",
        "irc": "irc://irc.freenode.org/composer",
        "source": "https://github.com/jolicode/jane",
        "docs": "https://github.com/jolicode/jane/wiki"
    },
    "require": {
        "monolog/monolog": "1.0.*",
        "joli/ternel": "@dev",
        "joli/ternel-bundle": "@stable",
        "joli/semver": "^2.0",
        "joli/package": ">=1.0 <1.1",
        "acme/foo": "dev-master#2eb0c097"
    },
    "require-dev": {
        "debug/dev-only": "1.0.*"
    },
    "conflict": {
        "another-vendor/conflict": "1.0.*"
    },
    "replace": {
        "debug/dev-only": "1.0.*"
    },
    "provide": {
        "debug/dev-only": "1.0.*"
    },
    "suggest": {
        "jolicode/gif-exception-bundle": "For fun!"
    },
    "autoload": {
        "psr-4": {
            "Monolog\\": "src/",
            "Vendor\\Namespace\\": ""
        },
        "psr-0": {
            "Monolog": "src/",
            "Vendor\\Namespace": ["src/", "lib/"],
            "Pear_Style": "src/",
            "": "src/"
        },
        "classmap": ["src/", "lib/", "Something.php"],
        "files": ["src/MyLibrary/functions.php"]
    },
    "autoload-dev": {
        "psr-0": {
            "MyPackage\\Tests": "test/"
        }
    },
    "target-dir": "Symfony/Component/Yaml",
    "minimum-stability": "stable",
    "repositories": [
        {
            "type": "composer",
            "url": "http://packages.example.com"
        },
        {
            "type": "vcs",
            "url": "https://github.com/Seldaek/monolog"
        },
        {
            "type": "pear",
            "url": "http://pear2.php.net"
        },
        {
            "type": "package",
            "package": {
              "name": "smarty/smarty",
              "version": "3.1.7",
              "dist": {
                "url": "http://www.smarty.net/Smarty-3.1.7.zip",
                "type": "zip"
              },
              "source": {
                "url": "http://smarty-php.googlecode.com/svn/",
                "type": "svn",
                "reference": "tags/Smarty_3_1_7/distribution/"
              }
            }
        },
        {
            "type": "artifact",
            "url": "path/to/directory/with/zips/"
        },
        {
            "type": "path",
            "url": "../../packages/my-package"
        },
        {
            "packagist.org": false
        }
    ],
    "config": {
        "process-timeout": 300,
        "use-include-path": false,
        "preferred-install": "auto",
        "store-auths": "prompt",
        "github-protocols": ["git", "https", "http"],
        "github-oauth": {"github.com": "oauthtoken"},
        "gitlab-oauth": {"gitlab.com": "oauthtoken"},
        "github-domains": ["enterprise-github.me.com"],
        "gitlab-domains": ["enterprise-gitlab.me.com"],
        "github-expose-hostname": true,
        "disable-tls": false,
        "cafile": "/var/certif.ca",
        "capath": "/var/",
        "http-basic": {"me.io":{"username":"foo","password":"bar"}},
        "platform": {"php": "5.4", "ext-something": "4.0"},
        "vendor-dir": "vendor",
        "bin-dir": "bin",
        "data-dir": "/home/ternel/here",
        "cache-dir": "$home/cache",
        "cache-files-dir": "$cache-dir/files",
        "cache-repo-dir": "$cache-dir/repo",
        "cache-vcs-dir": "$cache-dir/vcs",
        "cache-files-ttl": 15552000,
        "cache-files-maxsize": "300MiB",
        "bin-compat": "auto",
        "prepend-autoloader": true,
        "autoloader-suffix": "pony",
        "optimize-autoloader": false,
        "sort-packages": false,
        "classmap-authoritative": false,
        "notify-on-install": true,
        "discard-changes": false,
        "archive-format": "tar",
        "archive-dir": "."
    },
    "archive": {
        "exclude": ["/foo/bar", "baz", "/*.test", "!/foo/bar/baz"]
    },
    "prefer-stable": true,
    "scripts": {
        "pre-install-cmd": "MyVendor\\MyClass::doSomething",
        "post-install-cmd": [
            "MyVendor\\MyClass::warmCache",
            "phpunit -c app/"
        ],
        "pre-update-cmd": "MyVendor\\MyClass::doSomething",
        "post-update-cmd": "MyVendor\\MyClass::doSomething",
        "pre-status-cmd": "MyVendor\\MyClass::doSomething",
        "post-status-cmd": "MyVendor\\MyClass::doSomething",
        "pre-package-install": "MyVendor\\MyClass::doSomething",
        "post-package-install": [
            "MyVendor\\MyClass::postPackageInstall"
        ],
        "pre-package-update": "MyVendor\\MyClass::doSomething",
        "post-package-update": "MyVendor\\MyClass::doSomething",
        "pre-package-uninstall": "MyVendor\\MyClass::doSomething",
        "post-package-uninstall": "MyVendor\\MyClass::doSomething",
        "pre-autoload-dump": "MyVendor\\MyClass::doSomething",
        "post-autoload-dump": "MyVendor\\MyClass::doSomething",
        "post-root-package-install": "MyVendor\\MyClass::doStuff",
        "post-create-project-cmd": "MyVendor\\MyClass::doThis",
        "pre-archive-cmd": "MyVendor\\MyClass::doSomething",
        "post-archive-cmd": "MyVendor\\MyClass::doSomething"
    },
    "extra": { "key": "value" },
    "bin": ["./bin/toto"]
}
~~~

К тому же схему можно найти на [официальном сайте](https://getcomposer.org/schema.json)

## Создание проекта (пакета)

Создание проекта сводиться к созданию в корне файла `composer.json`.

### Генерация файла composer.json

~~~bash
composer init
~~~

После этого запустится генератор базового файла `composer.json` для интерактивного заполнения базовых настроек проекта :

    Welcome to the Composer config generator
    This command will guide you through creating your composer.json config.

Достаточно просто сформировать базовый шаблон (просто нажимая `Enter`), все опции впоследствии поправить вручную.

Получили вот такую заготовку :
~~~json
{
    "name": "root/test",
    "authors": [
        {
            "name": "alex",
            "email": "alex@example.com"
        }
    ],
    "require": {}
}
~~~

Ничего не мешает создать этот фаил руками, что я и предпочитаю.

Подробнее об опциях команды `init` в [докуменации](https://getcomposer.org/doc/03-cli.md#init)

### Название пакета (name)

Чтобы дать возможность утановить пакет ему нужно дать имя. 
Название или имя пакета состоит из пары `vendor-name/project-name` оно указывается в ключе `name`

1. `vendor-name` - это ваше уникальное глобальное имя на [packagist.org](https://packagist.org/). Например `lexusalex`, 
`phpunit`, `yiisoft`
2. `project-name` - это название проекта, оно должно быть уникальным только в пределах `vendor-name` Например `phpunit`,
`yii2`, `semver`

По соглашениям рекумендуется именовать пакет в нижнем регистре и в качестве разделителей использовать дефис. Примеры названий пакетов:

- `guzzlehttp/psr7`,
- `symfony/polyfill-mbstring`,
- `vlucas/phpdotenv`,
- `tijsverkoyen/css-to-inline-styles`,
- `phar-io/version`

Поле является обязательным для опубликованных библиотек.

### Описание пакета (description)

Текстовое описание вашего пакета, указывается в поле `description`. Например :

- Highly opinionated mocking framework for PHP 5.3+
- Yii PHP Framework Version 2
- The PHP Unit Testing framework.

Текст будет использоваться для поиска.
Поле является обязательным для опубликованных библиотек.

### Версия пакета (version)

В большинстве случаев поле можно опустить и рекомендуется это делать, указывается в ключе `version`. 
Это строка с указанием номера версии пакета например :

- 1.0.0
- v1.0.2
- 1.0.0-dev
- 1.0.0-beta2
- 1.0.0-RC5
- 1.0.0-alpha3
- V2.0.4-p1

Не изучил где можно использовать этот ключ.

### Тип пакета (type)

Исходя из типа composer пакета, у него может быть разное поведение. Используются для настраиваемой логики установки. 
Задается в ключе `type`.

Composer использует следующие стандартные типы :

1. `library` - тип по умолчанию, composer просто копирует файлы в директорию `vendor` таких пакетов большинство.
2. `project` - означает что пакет является полноценным проектом, который нужно устанавливать в отдельную директорию например
командой `composer create-project symfony/framework-standard-edition symfony` в итоге будет скачан проект и запущено
обновление зависимостей.
3. `metapackage` - пустой пакет содержащий требования к установке и зависимости, но не содержащий файлов, например : 
пакет[https://packagist.org/packages/sentry/sdk](https://packagist.org/packages/sentry/sdk) содержит зависимости которые требуется
скачать.
4. `composer-plugin` - предостовляет собой установщик для других пакетов, которые имеют конфигурируемый тип. Например пакет
[https://packagist.org/packages/yiisoft/yii2-composer](https://packagist.org/packages/yiisoft/yii2-composer) предоставляет
установщик и инсталятор. Подробнее об этом в [официальной документации](https://getcomposer.org/doc/articles/custom-installers.md)

Еще поддерживаются кастомные типы к примеру [https://packagist.org/packages/shyim/plugin-manager](https://packagist.org/packages/shyim/plugin-manager)
имеет тип `shopware-plugin`, который имеет установщик способный установливать пакеты этого типа.

Рекомендуется оставить стандартный тип `library` если вам не нужна пользовательская логика во время установки.

### Ключевые слова (keywords)

Набор ключевых слов используемых для поиска пакета. Устанавливается массив значений в поле `keywords` например :

- ["shopware", "composer", "pluginmanager"]
- ["yii2","framework"],

Поле необязательно.

### Домашняя страница (homepage)

URL адрес проекта например :

- https://lexusalex.ru/

Поле необязательно к заполнению.

### Дата выпуска версии (time)

Дата выхода версии. Поле `time` Дата дожна быть в одном из форматов :

- YYYY-MM-DD
- YYYY-MM-DD HH:MM:SS
- YYYY-MM-DDTHH:MM:SSZ

Поле необязательно к заполнению.

### Лицензия на код (licence)

Лицензия на пакет. Наиболее распростаненными лицензиями являются :

- Apache-2.0
- BSD-2-Clause
- BSD-3-Clause
- BSD-4-Clause
- GPL-2.0
- GPL-2.0+
- GPL-3.0
- GPL-3.0+
- LGPL-2.1
- LGPL-2.1+
- LGPL-3.0
- LGPL-3.0+
- MIT
- proprietary

Полный список лицензий находися на сайте [https://spdx.org/licenses/](https://spdx.org/licenses/).

Можно перечислить лицензии в виде массива например :

~~~json
{
 "license": [
 "BSD-2-Clause",
 "GPL-3.0+",
 "MIT"
 ]
}
~~~

Типы лицензий популярных пакетов :

- yii2 - BSD-3-Clause
- symfony - MIT
- laravel - MIT
- phpnit -  BSD-3-Clause 

Проверить тип лицензии каждого установленного пакета можно командой :

~~~bash
composer licenses

# Name: lexusalex/php-tests
# Version: No version set (parsed as 1.0.0)
# Licenses: MIT
# Dependencies:

# Name                                Version  License       
# doctrine/instantiator               1.2.0    MIT
# ...
~~~

Будет выведена информация о текущем пакете и информация о зависимостях с указанием имени, версии и лицензии пакета.

Возможные опции команды:

- `composer licenses` или `composer licenses --format=text` - выводить информацию о лицензиях в текстовом виде (по умолчанию)
- `composer licenses --format=json` - выводить информацию о лицензиях в формате `json`
- `composer licenses --no-dev` - не выводить информацию о лицензиях пакетов расположенных в секции `require-dev`


Поле рекомендуется заполнять.

### Авторы пакета (authors)

Масссив объектов с информации об аторах пакета имеет формат :

- `name` - Настоящее имя автора
- `email` - Электронная поята автора
- `homepage` - Веб сайт автора
- `role` - Роль автора в проекте

Пример:

~~~json
{
"authors": [
        {
            "name": "Qiang Xue",
            "email": "qiang.xue@gmail.com",
            "homepage": "http://www.yiiframework.com/",
            "role": "Founder and project lead"
        },
        {
            "name": "Alexander Makarov",
            "email": "sam@rmcreative.ru",
            "homepage": "http://rmcreative.ru/",
            "role": "Core framework development"
        },
        {
            "name": "Boudewijn Vahrmeijer",
            "email": "info@dynasource.eu",
            "homepage": "http://dynasource.eu",
            "role": "Core framework development"
        },
        {
            "name": "Sebastian Bergmann",
            "email": "sebastian@phpunit.de",
            "role": "lead"
        },
        {
            "name": "Fabien Potencier",
            "email": "fabien@symfony.com"
        },
        {
            "name": "Symfony Community",
            "homepage": "https://symfony.com/contributors"
        }
    ]
}
~~~

Ключ `authors` рекомендуется заполнять

### Информация для поддержки проекта (support)

В ключе `support` содержится объект с ссылкам на ресурсы где можно получить информацию о пакете

Например в фреймворке yii2 этот ключ выглядит следующим образом :

~~~json
{
  "support": {
      "issues": "https://github.com/yiisoft/yii2/issues?state=open",
      "forum": "http://www.yiiframework.com/forum/",
      "wiki": "http://www.yiiframework.com/wiki/",
      "irc": "irc://irc.freenode.net/yii",
      "source": "https://github.com/yiisoft/yii2"
  }
}
~~~

Возможные значения :

- email: адрес электронной почты для получения поддержки.
- issues: URL-адрес для для проблем.
- forum: URL-адрес форума.
- wiki: URL-адрес на вики статью.
- irc: IRC-канал для поддержки, как irc://server/channel.
- source: URL-адрес для просмотра исходного кода.
- docs: URL-адрес для документации.
- rss: URL-адрес для RSS-канала.
- chat: URL-адрес для чат канала.

Поле необязательно к заполнению


## Установка пакетов

Основное предназначение composer - это установка пакетов. 
Пакеты можно устанавливать глобально для всей системы или локально одного проекта.

### Глобально

Для установки пакетов используется команда `require`, а для глобальной установки пакета используется команда `global`, 
что позволяет ставить пакет в домашнюю директорию текущего пользователя.

Команда `global` используется в составе для запуска таких команд как `require`, `remove`, `install`, `update`

Установим библиотеку [php_codesniffer](https://packagist.org/packages/squizlabs/php_codesniffer) которая содержит
консольные утилиты для проверки php кода на соответствие стандартам, например мы хотим иметь глобальный доступ к
данной библиотеке.

~~~bash
composer global require "squizlabs/php_codesniffer=*"
~~~

В данном случае composer сделает следующее :
1. Создаст скрытую директорию `.composer` в домашней директории пользователя в моем варианте это `/root/.composer`
2. Создаст там фаил `composer.json`
3. Загрузит информацию о пакете из репозитория
4. Обновит и загрузит зависимости пакета
5. Скачает (Обновит, откатит или удалит) и установит сам пакет в директорию `vendor`
6. Запишет дерево зависимостей в фаил `composer.lock`
7. Сгенерирует файлы автозагрузки 

После установки библиотека `squizlabs/php_codesniffer` сразу же готова к использованию :

~~~bash
php /root/.composer/vendor/bin/phpcs --standard=PSR12 /php-tests/index.php
~~~

Чтобы каждый раз не писать длинный путь настроим переменную окружения `$PATH`.
Для этого в один из файлов в домашней директории пользователя, bash будет грузить их в следующем порядке:

- .bashrc
- .bash_profile
- .profile

Добавим строку :

~~~bash
export PATH=$PATH:/root/.composer/vendor/bin/
~~~

Выходим из терминала. Команда станет доступна как обычная программа : 

~~~bash
phpcs --standard=PSR12 tests/
~~~

Если что-то пошло не так проверьте переменную окружения `$PATH` и путь до исполняемого файла :

~~~bash
echo $PATH
# /root/.composer/vendor/bin/:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
which phpcs
# /root/.composer/vendor/bin/phpcs
~~~

Обычно, глобально пакеты ставятся редко, в основном их используют локально для проекта.

### Локально

Теперь установим другую библиотеку например фреймворк для тестирования [phpunit](https://packagist.org/packages/phpunit/phpunit),
но уже локально в проект :

~~~bash
composer require phpunit/phpunit
~~~

Порядок действий будет следующий :

1. Добавляется зависимости в фаил `composer.json`
2. Загружается информация о пакете из репозитория
3. Загружаются зависимости пакета в директорию `vendor`
4. Загрузка и установка пакета в директорию `vendor`
5. Пишется дерево зависимостей в фаил `composer.lock`
6. Генерируются файлы автозагрузки

Подробнее каждый шаг установки мы разберем в разделе [Зависимости](#Зависимости)

Если пакет уже был загружен он будет браться из кеша.

### Зависимости

Зависимости пакетов прописываются в двух секциях файла `composer.json` :

- `require` - пакеты от которых зависит ваше приложение
- `require-dev` - пакеты которые используются на этапе разработки или тестирования проекта.

Пример как могут выглядеть данные секции :

~~~json
{
    "require": {
        "vendor/package":  "1.3.2", 
        "vendor/package":  ">=1.3.2", 
        "vendor/package":  "<1.3.2", 
        "vendor/package":  "1.3.*", 
        "vendor/package":  "~1.3.2", 
        "vendor/package":  "~1.3", 
        "vendor/package":  "^1.3.2", 
        "vendor/package":  "^0.3.2"
    }
}
~~~

Для установки пакетов используется команда `require`

Например установим библиотеку [carbon](https://packagist.org/packages/nesbot/carbon) для работы и датой и временем локально
Запускать установку будем в режиме дебага, чтобы видеть что происходит.

~~~bash
composer require nesbot/carbon -vvv
~~~

По шагам разберем что тут происходит :

1. Происходит чтение файла `composer.json`
2. Происходит загрузка `composer.json`
3. Проверка файла с сертификатами `/etc/ssl/certs/ca-certificates.crt`
4. Выполнение рядя внутренних команд composer связанных с git
5. Чтение глобального файла `composer.json` в домашней директории текущего пользователя, у меня он лежит здесь `/root/.composer/composer.json`
6. Загрузка глобального файла `composer.json`
7. Чтение файлов установленных библиотек `/php-tests/vendor/composer/installed.json` и `/root/.composer/vendor/composer/installed.json`
8. Отображение системной информации к примеру `Running 1.9.0 (2019-08-02 20:55:32) with PHP 7.3.4 on Linux / 4.15.0-62-generic`
9. Загрузка основного файла со списком пакетов с [https://repo.packagist.org/packages.json](https://repo.packagist.org/packages.json)
10. Проверка закешированных списков пакетов `/root/.composer/cache/repo/https---repo.packagist.org/p-provider-2018.json`
11. Выгрузка и запись в кеш. При последующих запросах данные уже не будут запрошены, а будут браться из кеша
12. Выгрузка и запись в кеш зависимостей нашей устанавливаемой библиотеки [http://repo.packagist.org/p/nesbot/carbon%24851184481d07d9a44e2bfbc87f737424edd8af6d78875158b34cc66eb0a9026c.json](http://repo.packagist.org/p/nesbot/carbon%24851184481d07d9a44e2bfbc87f737424edd8af6d78875158b34cc66eb0a9026c.json)
13. Определение текущей версии библиотеки `Using version ^2.25 for nesbot/carbon`
14. Обновление секции `require` в `composer.json`
15. Чтение и загрузка `composer.json`
16. Выполнение рядя внутренних команд composer связанных с git
17. Далее происходит поочередная загрузка локальных и глобальных файлов `composer.json` и `/vendor/composer/installed.json`
18. Загрузка информации о пакетах. В данный момент у нас они уже загружены, они будут взяты из кеша
19. Загрузка зависимых пакетов в данном случае это пакет [http://repo.packagist.org/p/symfony/translation%24078b6f1caf6f8088a43926d3bdb4430e1793a10cfda338ea90536d8cea7c462b.json](http://repo.packagist.org/p/symfony/translation%24078b6f1caf6f8088a43926d3bdb4430e1793a10cfda338ea90536d8cea7c462b.json)
20. Анализ и разрешение зависимостей
21. Вывод информации что будет сейчас сделано `Package operations: 4 installs, 0 updates, 0 removals`
22. Будет скачано 4 пакета. Один который нам нужен и три зависимых от него, так же все будет записано в кеш
23. Перечисление пакетов предлагаемых к установке
24. Запись файла `composer.lock`
25. Генерация файлов автозагрузки

После загрузки пакеты появятся в директории `vendor` . Данную папку необходимо добавить в фаил `.gitignore`.

После этого секция `require` будет выглядеть примерно так :

~~~json
{
  "require": {
    "nesbot/carbon": "^2.25"
  }
}
~~~

## Версии пакетов

Версии нумеруются используя стандарт [SEMVER](https://semver.org/lang/ru/).

Версия пакета представляет из себя номер формата X.Y.Z - что зквивалентно номеру версии МАЖОРНАЯ.МИНОРНАЯ.ПАТЧ которую следует
увеличивать когда:

- МАЖОРНАЯ версия достигла обратно несовместимые изменения API
- в МИНОРНОЙ версии появились новые функции не нарушая обратной совместимости
- в ПАТЧ версии появились обратно совместимые исправления

На что обратить внимание :
1. После выпуска новой версии содержание не может быть модифицировано
2. Любые изменение выпускаются как новая версия
3. Версия 0.0.0 предназначена для начальной разработки, а 1.0.0 увеличивается в зависимости от того как измененяется API
4. ПАТЧ версия изменяется если было исправлено неккоректное поведение
5. МИНОРНАЯ версия увеличивается если добавлена новая функциональность, если функциональность помечена как устаревшая.
При увеличении этой версии ПАТЧ должна быть обулена
6. МАЖОРНАЯ версия увеличивается если были внесены обратно несовместимые изменения с предыдущими версиями. При этом обнуляются
МИНОРНАЯ и ПАТЧ версия.
7. Начиначить разработку рекомендуется с версии 0.1.0
8. Если ваш проект уже работает на проде его версия не ниже 1.0.0

Composer при поиске нужной версии ориентируется на теги в системе контроля версий. 
Далее composer получает список тегов и создает список доступных версий.
Исходя из ограничений он находит самую высокую версию, которая соответсвует потребностям вашего пакета.
Потом происходи загрузка zip архива версии в директорию `vendor`.

Composer так же умеет работать с ветками и даже определенными коммитами. 
Тем самым просто происходит загрузка в папку `vendor` ветки репозитория

## Стабильность пакетов

Понятие корневого пакета (root-only).

Для примера возмем [пакет yii2](https://github.com/yiisoft/yii2/blob/master/composer.json).
Cклонируем пакет `git clone https://github.com/yiisoft/yii2.git yii2` и запустим в нем `composer install`
В данном случае корневой директорией и корневым пакетом нашего проекта будет являтся директория фреймворка yii2.

Теперь поменяем контекст. Создадим свой пакет, который будет зависеть от пакета yii2 и запустим там `composer install`.
Корневым пакетом будет являтся наш пакет.

Для задания нужного уровня стабильности пакета использутся ключ `minimum-stability` в котором указываются параметры в этом порядке :

- stable
- rc
- beta
- alpha
- dev

по умолчанию это `stable`. То есть ниже указанной версии пакета будет скачать невоможно.

http://codinghamster.info/php/stability-paketov-v-composer-problemy-i-reshenia/

TODO

## Ограничения версии 

В `composer.json` в секции `require` возможно указать конкретную версию пакета или диапазон (ограничение) версий:

1. "1.3.2" - что эквилентно точной версии пакета
2. ">=1.3.2" - все что выше либо равно версии 1.3.2
3. "<1.3.2" - что ниже версии 1.3.2
4. "1.3.*" - что эквивалентно >=1.3.0 <1.4.0
5. "~1.3.2" - что эквивалентно >=1.3.2 <1.4.0
6. "~1.3" - что эквивалентно >=1.3.0 <2.0.0
7. "^1.3.2" - что зквивалентно >=1.3.2 <2.0.0
8. "^0.3.2" - что эквивалентно >=0.3.2 <0.4.0
9. "dev-master#2eb0c0978d290a1c45346a1955188929cb4e5db7" - ветка и точная ссылка на коммит
10. "dev-master" - последний релиз ветки master

Доступные операторы :

>, <, >=, <= specify upper / lower bounds
* wildcard
~ allows last digit specified to go up
^ doesn't allow breaking changes

Перейдем к примерам . Поставим [phpunit](https://packagist.org/packages/phpunit/phpunit):

~~~bash
composer require "phpunit/phpunit:8.0.0" # 8.0.0
composer require "phpunit/phpunit:>=8.0.0" # Самая высокая версия - это 8.4.1
composer require "phpunit/phpunit:>=7.5.16" # все та же 8.4.1
composer require "phpunit/phpunit:<8.0.0" # 3.7.10
composer require "phpunit/phpunit:!=8.0.0" # 8.4.1
composer require "phpunit/phpunit:8.0.*" # Самая высокая версия в ветке 8 это - 8.0.6
composer require "phpunit/phpunit:~8" # 8.4.1
~~~

Удобный сервис для вывода диапазона версий [https://semver.mwl.be/](https://semver.mwl.be/)

## Автозагрузка

Composer может автоматически загружать файлы без необходимости подключения файлов через `require()` или `include()`


## Поиск пакетов








## Создание проекта

Создание проекта сводиться к созданию конфигурационного файла зависимостей `composer.json` в формате json.
Создать его можно вручную или через командную строку, выполнив `composer init`, во втором случае будут заданы вопросы и
сгенерирован фаил `composer.json` с базовой структурой.

Понятие корневого пакета. Корневой пакет - это корневая директория вашего приложения.Существуют свойства root-only, которые
учитываются только корневым пакетом.

Свойства `composer.json` :

1. `name` - имя пакета в формате vendor/name, где vendor глобальное уникальное имя пользователя (логин на [packagist.org](https://packagist.org/)), name - имя пакета в рамках имени пользователя. Пример: `"name" : "lexusalex/test-composer"`
2. `description` - описание пакета. Пример: `"description": "Yii PHP Framework Version 2 - Development Package"`
3. `keywords` - массив ключевых слов для поиска и фильтрации пакета. Пример:
    ~~~json
    {
    "keywords": [
        "test",
        "composer"
      ]
    }
    ~~~
4.  `homepage` - веб-сайт проекта. Например, `"homepage": "http://www.yiiframework.com/"`
5.  `type` - тип пакета. 
     Стандартные типы:
     -  library - библиотека
     -  project - что выходит за рамки простой библиотеки называеться проектом
     -  metapackage - пустой пакет
     -  composer-plugin - специальный плагин для composer
     
     Настраиваемый тип:
     
     -  yii2-extension - тип который нужно настраивать
6.  `license` - лицензия на код пакета. Может быть также массивом лицензий. [Cписок лицензий](https://spdx.org/licenses/). Пример: `"license": "BSD-3-Clause"`
7.  `authors` - массив обьектов авторов пакета. Например:
    ~~~json
    {
      "authors": [
         {
            "name": "Qiang Xue",
            "email": "qiang.xue@gmail.com",
              "homepage": "http://www.yiiframework.com/",
            "role": "Founder and project lead"
        },
        {
            "name": "Alexander Makarov",
            "email": "sam@rmcreative.ru",
            "homepage": "http://rmcreative.ru/",
            "role": "Core framework development"
        }
      ]
    }
    ~~~
8.  `support` - информация для получения поддержки проекта. Например:
    ~~~json
    {
        "support": {
            "issues": "https://github.com/yiisoft/yii2/issues?state=open",
            "forum": "http://www.yiiframework.com/forum/",
            "wiki": "http://www.yiiframework.com/wiki/",
            "irc": "irc://irc.freenode.net/yii",
            "source": "https://github.com/yiisoft/yii2"
        }
    }
    ~~~
9.  `version` - версия пакета. Не используется.    
10. `time` - дата выпуска версии в формате ГГГГ-ММ-ДД или ГГГГ-ММ-ДД ЧЧ:ММ:СС
11. `minimum-stability` (root-only) - указать желаемый уровень стабильности для корневого пакета. По умолчанию stable, это
    говорит о том, что зависимые пакеты могут использовать стабильную версию корневого пакета. Например: `"minimum-stability": "dev",`
    Доступные варианты:
    - dev
    - alpha
    - beta
    - RC
    - stable
    
    [подробнее](http://codinghamster.info/php/stability-paketov-v-composer-problemy-i-reshenia/)
12. `prefer-stable` (root-only) - Устанавливать самую стабильную версию пакета, если таковая имеется. Пример: `"prefer-stable": true,`
13. `replace` Список пакетов для замены. Пример: `"replace": {"yiisoft/yii2": "self.version"}`
14. `repositories` (root-only) Репозитории для загрузки пакетов. По умолчанию поиск и загрузка пакетов идет с packagist.org, но это поведение
    можно переопределить и добавить еще репозитории. Например:
    ~~~json
    {
        "repositories": [
                {
                    "type": "composer",
                    "url": "https://asset-packagist.org"
                }
        ]
    }
    ~~~
15. `suggest` - предложения пакетов которые могут улучшить работу корневого пакета. Пример:
    ~~~json
    {
        "suggest": {
                "yiisoft/yii2-coding-standards": "you can use this package to check for code style issues when contributing to yii"
        }
    }
    ~~~
16. `config` (root-only) - конфигурация для пакета типа "проект".
17. `bin` - Двоичные файлы для каталога `vendor/bin` Пример: `"bin": ["framework/yii"]`
18. `extra` - Дополнительные данные для скриптов . Пример:
    ~~~json
    {
        "extra": {
                "branch-alias": {
                    "dev-master": "2.0.x-dev"
                }
        }
    }
    ~~~
19. `scripts` (root-only)- позволяет запускать скрипты
20. `require` - список зависимостей проекта, подробнее в разделе "Обновление зависимостей"
21. `require-dev` (root-only) - список зависимостей для разработки или тестирования, подробнее в разделе "Обновление зависимостей"
22. `conflict` - список зависимостей которые конфликтуют с этим пакетом
23. `provide` - 
24. `autoload` - автозагрузка файлов
25. `autoload-dev` - автозагрузка файлов для разработки

## Управление зависимостями

Для указания пакетов от которых зависит наш проект используется секция `require` и `require-dev` (для разработки и тестирования) в `composer.json`

Найти нужный пакет можно следующими способами:
1. На сайте [packagist.org](https://packagist.org/?query=yii2)
2. С помощью команды `composer search yii2`

## Версионирование пакетов

Номер версии пакета состоит из трех составляющих и строиться по формату 0.0.0 (Мажорная версия.минорная версия.патч).

1. Мажорная версия увеличивается, когда изменения обратно несовместимы с предыдущими версиями
2. Минорная версия увеличивается, когда были добавлены новые функции не нарушая обратную совместимость с предыдущими версиями
3. Патч версия увеличивается когда были сделаны исправления, не нарушая обратную совместимость с предыдущими версиями, например баг-фиксы

Что тут важно:
-   любые новые изменения в коде должны быть представлены как новая версия
-   увеличение вышестоящего числа обнуляет нижестоящее

К версии перед релизом может быть добавлена метаинформация, например 1.0.0-x.7.z.92

[Спецификация](https://semver.org/lang/ru/)

## Типы версий

1.  `1.0.2` - будет установлена точная версия пакета
2.  `>=1.0`, `<=5.4.6`, `>3.0`, `<5.6` `!=3.8`, - будет установлена версия которая подходит под условие
3.  `>=1.0 <3.0` - диапазон версий, логическое И
4.  `>=1.0 <1.1 || >=1.2` - диапазон версий, логическое ИЛИ
5.  `1.0.0 - 2.1.0` - диапазон версий, любая версия из указанных
6.  `1.0.*` - любая версия выше минорной, то есть все баг фиксы
7.  `~1.2.0` - означает, что пакет может быть обновлен больше указанной версии, но меньше чем 1.2.9999, или `~2.0` означает что может быть обновлена до версии меньше 2.999
8.  `^1.2` - означает, что подойдет версия до 2.0 (не включая 2.0)
9.  `dev-master#2eb0c0978d290a1c45346a1955188929cb4e5db7` - указываем на ветку и коммит, удобно для разработки

Добавить зависимость к проекту можно вручную прописав в секции `require` или командой `composer require`

~~~bash
composer require cebe/markdown

Using version ^1.2 for cebe/markdown
./composer.json has been updated
Loading composer repositories with package information
Updating dependencies (including require-dev)
Package operations: 1 install, 0 updates, 0 removals
  - Installing cebe/markdown (1.2.1): Downloading (100%)         
Writing lock file
Generating autoload files
~~~
Composer будет смотреть что указано в корневом пакете в секции `minimum-stability` и если не была указана точная версия,
будет качать версию в этом значении.

~~~bash
composer require cebe/markdown:1.2.* # добавить последнюю версию из диапазона
composer require --dev phpunit/phpunit # добавляет пакет в секцию require-dev для локальной разработки
composer require "squizlabs/php_codesniffer" --dev # еще вариант добавления пакета в кавычках
composer remove --dev phpunit/phpunit # удалить пакет из секции require-dev
composer global require phpunit/phpunit # установить глобально пакет ,по умолчению пакет поставиться в домашнюю директорию пользователя в папку `.composer`
composer global remove phploc/phploc # удалить глобальный пакет из системы
~~~

## Автозагрузка

Более того, это стандарт. В проекте весь код должен подгружаться автоматически композером. Это снижает уровень сложности и связанности кода.


Типичный composer пакет состоит из файлов и директорий:
- `src` - исходные файлы проекта
- `tests` - тесты для пакета
- `docs` - документация

но это структура может быть любой

Composer сам умеет загружать все необходимые файлы.

Так что же может загружать composer:

-   PSR-4. [Стандарт](https://www.php-fig.org/psr/psr-4/) загрузки классов
    ~~~json
    {
    "autoload": {
        "psr-4": {
            "yii\\": "src/",
            "yii\\tests\\": "tests/",
            "Slim\\": "Slim/",
            "LexusAlex\\": "src/",
            "Vendor\\Namespace\\": ["src/", "lib/"],
            "": "src/"
          }
        }
    }
    ~~~
    В примере выше классы с пространством имен`yii` будут грузиться из директории `src`. Таким образом, нет необходимости
    ручного подключения файлов, класс будет подгружен автоматически.Важно, чтобы между префиксами пространства имен стояли символы `\\`
-   Карта классов. Перечисляем список классов которые нужно загрузить, можно указать просто директорию или конкретный фаил класса, например
    ~~~json
    {
    "autoload": {
        "classmap": [
          "other/",
          "other/test/mytest.php"
        ]
      }
    }
    ~~~
-   Файлы. Для явного запроса определенных файлов.
    ~~~json
    {
    "autoload": {
        "files": [
          "file.php"
        ]
      }
    }    
    ~~~
Теперь нужно обновить файлы автозагрузчика командой `composer dump-autoload -o`, composer пропишет список файлов которые нужно
загружать при обращении к ним в файлах в каталоге `vendor/composer`

По умолчанию при выполнении команды `composer dump-autoload -o` грузяться файлы из секций `autoload` и `autoload-dev`, чтобы
изменить это поведение нужно добавить ключ `--no-dev`  `composer dump-autoload -o --no-dev`, теперь автозагрузка файлов для
разработки будет игнорироваться.

Чтобы все заработало нужно в файле, который является точкой входа в приложения прописать `require __DIR__ . '/vendor/autoload.php';`

## Обновление зависимостей

Чтобы установить зависимости из `composer.json` в только что склонированном проекте, существует команда

~~~bash
composer install
~~~
В результате:

-   Composer загрузит все зависимости из `composer.json` в директорию `vendor`
-   Будет создан фаил `composer.lock`, где перечислены точные версии пакетов проекта

Если фаил `composer.lock` уже был создан(была выполнена команда `composer install`), то повторное выполнение `composer install`
приведет к загрузке зависимостей из `composer.lock`, что гарантирует версии пакетов на момент фиксации

### composer.lock

Важно фиксировать `composer.lock` в системе контроля версий, чтобы другие разработчики пользовались теми же версиями
пакетов что и вы, даже если библиотки были обновлены.

Фаил `composer.lock`, запрещает получение новых версий пакетов, что дает уверенность, что код заработает сейчас у нас на
машине и через год на другой машине, так как версии пакетов остануться прежними

Теперь, чтобы обновить пакеты до последних версий, нужно выполнить команду
~~~bash
composer update
~~~
Что приводит к получению последних версий пакетов в соответствии с файлом `composer.json`, независимо от версий в `composer.lock`

~~~bash
composer install --no-dev # не устанавливать пакеты из секции `require-dev`
composer update --no-dev # не обновлять пакеты из секции `require-dev`
~~~

Полезные команды:

~~~bash
composer validate # проверка `composer.json` на валидность, желательно всегда запускать
composer validate --with-dependencies # проверка всех зависымых `composer.json` на валидность
composer status --verbose # проверить какие файлы в зависимостях были изменены с уточнением что именно было изменено
composer self-update # обновление composer до последней версии
composer create-project --prefer-dist yiisoft/yii2-app-basic basic # склонировать и устновить проект одной командой
composer run-script phpunit # запуск скриптов из секции scripts
composer outdated # показать список пакетов которые имеют обновления
~~~
 


http://composer.json.jolicode.com/

https://ru.hexlet.io/courses/php-setup-environment/lessons/composer/theory_unit
http://present.wpdom.com/articles.php?id=16
https://habr.com/ru/company/mailru/blog/346488/
https://medium.com/phpyh/%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F-%D1%80%D0%B5%D0%B3%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F-%D0%BA%D0%BE%D0%BD%D1%81%D0%BE%D0%BB%D1%8C%D0%BD%D1%8B%D1%85-%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4-%D0%B2-symfony-di-f7536c254926
