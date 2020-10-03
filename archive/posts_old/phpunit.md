---
layout: post
title: Библиотеки php - phpunit
permalink: php-phpunit
tags: phpunit php
comments: true
subtitle: Как начать использовать phpunit у себя в проекте
summary:  Как начать использовать phpunit у себя в проекте
cover_url: "/assets/images/articles/phpunit/phpunit.png"
is_navigate: true
published: false
---

### Что это

[phpunit](https://phpunit.de) - это фреймворк для написания юнит тестов

Если кратко то юнит тесты позволяют держать под контролем работоспособность проекта.

При этом тесты дают ряд преимуществ :
- При написании нового функционала тесты помогают сохранить в рабочем состоянии существующий код
- Проверить работоспособность проекта можно буквально запуском одной команды
- Автоматизированные тесты приучают к декомпозиции задачи, что в целом полезно для разработчика
- Легко рефакторить
- С тестами код быстрее, чем без них

### Версии phpunit

По историческим причинам версия phpunit напрямую зависит от версии php которая установлена у вас на сервере.

В момент написания этой статьи (август 2019) актуальными и поддерживаемыми являются версии phpunit 7 и 8.

Из таблицы с [официального сайта](https://phpunit.de/supported-versions.html) можно сделать вывод, 
что если вы используете к примеру php 7.0, то будет использоваться версия phpunit 6 или phpunit 5. 
Если ваша версия php 5.3, то phpunit 4.

Важно учесть, то что если тесты написаны под phpunit 7, в 8 версии они могут
не запустится. Используйте одну мажорную версию и смотрите документацию.

Спискок текущих версий и их поддержку удобно смотреть на сайте [https://packagist.org/packages/phpunit/phpunit](https://packagist.org/packages/phpunit/phpunit)

### Установка

В 2019 году де факто стандартным и предпочитаемым способом установки библиотек, является
установка через пакетный менеджер [composer](https://getcomposer.org/). Рекомендую его использовать.

Предполагается, что у нас уже есть проект, и мы хотим установить фреймворк для тестирования phpunit.

Так как запускать тесты нужно локально или в dev окружении добавляем phpunit в секцию `require-dev` командой:

~~~bash
composer require --dev phpunit/phpunit ^8
~~~

После установки станет доступна команда `./vendor/bin/phpunit`

> На боевом сервере для того убрать phpunit из автозагрузки
  необходимо выполнить `composer update --no-dev` для запрета установки пакетов из секции `require-dev`.

Я буду использовать php 7.3.4 и phpunit 8.3.4.

Проверим установленную версию phpunit:

~~~bash
./vendor/bin/phpunit --version
PHPUnit 8.3.4 by Sebastian Bergmann and contributors.
~~~

Если есть необходимость проверить что установлена последняя версия фреймворка, существует ключ `--check-version`:

~~~bash
./vendor/bin/phpunit --check-version
PHPUnit 8.3.3 by Sebastian Bergmann and contributors.

You are not using the latest version of PHPUnit.
The latest version is PHPUnit 8.3.4.
~~~

Если в проекте не используется composer cуществует также альтернативный способ установки phpunit.

~~~bash
# скачать phar архив
wget -O phpunit https://phar.phpunit.de/phpunit-8.phar
# сделать фаил исполняемым
chmod +x phpunit
# запустить из указанного места
./phpunit
~~~

Можно так же установить глобально для всей системы (что не рекомендуется) переместив файл командой 
`sudo mv phpunit /usr/local/bin/phpunit` теперь команда phpunit будет доступна глобально.

Как видим способов установки масса.

### Соглашения по написанию тестов

Не существует однозначных правил по написанию тестов, но есть общие рекомендации.

- Необязательно, но принято исходный код приложения размещать в каталоге `/src`, а тесты в каталоге `/tests`
- Тестовые классы следует наследовать от `PHPUnit\Framework\TestCase`
- Тестовый класс следует именовать с постфиксом `*Test` например `/tests/UserTest.php`
- Один класс проекта соответствует одному тестовому классу, но не всегда. Это зависит от связей между классами.
- Методы тестирования должны быть публичными и иметь префикс `test*` например `testLogin` или `testAdmin`
- В док блоке теста можно использовать аннотацию `@test`
- Каждый метод тестирования должен запускаться независимо от других, то есть должен быть изолирован
- Для проверок соответствия реального и ожидаемого результата используются функции утверждения `assert*()` например `assertTrue()`
- Тестировать нужно в сторону увеличения зависимостей кода
- Лучше на начальном этапе ставить меньше проверок, только так можно понять какие проверки нужно добавить в будущем


### Как запускать

Для запуска тестов необходимо указать директорию или название файлов которые необходимо запустить, например:

~~~bash
./vendor/bin/phpunit tests
./vendor/bin/phpunit tests/DummyTest
./vendor/bin/phpunit tests/DummyTest.php
~~~

Далее будет произведен поиск класса теста, затем будут выполнены методы этого класса.

### Конфигурация

Чтобы не писать при запуске название директории создадим фаил конфигурации `phpunit.xml` c настройками по умолчанию.

Проще всего это сделать выполнив команду: 
~~~bash
./vendor/bin/phpunit --generate-configuration
~~~

Будет сгенерирован xml фаил конфигурации по умолчанию.
Я немного дополнил дефолтный фаил, он выглядит так:

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="https://schema.phpunit.de/8.3/phpunit.xsd"
         bootstrap="./tests/bootstrap.php"
         executionOrder="depends,defects"
         forceCoversAnnotation="true"
         beStrictAboutCoversAnnotation="true"
         beStrictAboutOutputDuringTests="true"
         beStrictAboutTodoAnnotatedTests="true"
         verbose="true"
         colors="true"
         convertErrorsToExceptions="true"
         convertNoticesToExceptions="true"
         convertWarningsToExceptions="true"
         stopOnFailure="false">
    <testsuites>
        <testsuite name="default">
            <directory suffix="Test.php">tests</directory>
        </testsuite>
    </testsuites>

    <filter>
        <whitelist processUncoveredFilesFromWhitelist="true">
            <directory suffix=".php">src</directory>
        </whitelist>
    </filter>
</phpunit>
~~~

Множество опций можно найти в [документации](https://phpunit.readthedocs.io/en/8.3/configuration.html)


### Вывод тестов

При запуске теста для каждого тестового класса будет выведено одно из обозначений:

- `W` - Предупреждение, например `No tests found in class "DummyTest".` если не найдены тестовые методы
- `R` - Тест который не содержит утверждений и будет пропущен `This test did not perform any assertions OK, but incomplete, skipped, or risky tests!`
- `.` - Тест пройден успешно
- `E` - Произошла ошибка во время запуска теста например `Error: Call to undefined function ыыпып()`
- `F` - Тест не пройден, выводится информация почему тест не прошел, например `Failed asserting that false is true.`
- `S` - Тест был отмечен как пропущенный
- `I` - Тест был отмечен как незавершенный

Помимо обозначения в выводе будет и другая информация:

~~~bash
PHPUnit 8.3.4 by Sebastian Bergmann and contributors.

Runtime:       PHP 7.3.4
Configuration: /test-phpunit/phpunit.xml

..                                                                  2 / 2 (100%)

Time: 604 ms, Memory: 4.00 MB

OK (2 tests, 2 assertions)
~~~


### Настройки

У утилиты `./vendor/bin/phpunit` имеется [множество ключей](https://phpunit.readthedocs.io/en/8.3/textui.html), 
но указывать их каждый раз неудобно. Гораздо лучше задать их один раз в конфигурационном файле `phpunit.xml`

### Принципы тестирования


## Полезные Ссылки

https://phpunit.de/supported-versions.html
https://phpunit.de/getting-started/phpunit-8.html
https://www.alexeykopytko.com/2016/phpunit/
https://phpunit.readthedocs.io/ru/latest/index.html
http://volter9.github.io/blog/unit-testing/
https://russianpenguin.ru/%d1%82%d0%b5%d1%81%d1%82%d0%b8%d1%80%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d0%b5-%d0%bf%d0%be/
https://gist.github.com/codedokode/a455bde7d0748c0a351a
https://waredom.ru/196#intro

https://medium.com/nuances-of-programming/%D0%B1%D0%B5%D1%80%D0%B5%D0%B6%D0%BB%D0%B8%D0%B2%D0%BE%D0%B5-%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B8%D0%BB%D0%B8-%D0%BF%D0%BE%D1%87%D0%B5%D0%BC%D1%83-%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5-%D1%82%D0%B5%D1%81%D1%82%D1%8B-%D1%85%D1%83%D0%B6%D0%B5-%D1%87%D0%B5%D0%BC-%D0%B2%D1%8B-%D0%B4%D1%83%D0%BC%D0%B0%D0%B5%D1%82%D0%B5-24670e16ab0
https://www.youtube.com/watch?v=zsz8kdi62mE
https://github.com/index0h/php-conventions/tree/feature/20190916-levishchenko-1-basic-php-conventions