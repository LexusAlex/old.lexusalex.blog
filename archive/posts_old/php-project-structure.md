---
layout: post
title: Структура php проекта
permalink: php-project-structure
tags: php
comments: true
summary: В поисках удобной структуры php проекта.
is_navigate: true
cover_url: "/assets/images/articles/php.png"
published: false
---

Приступая к очередному проекту на php задумался, существует ли "правильная" структура проекта.
Попробуем разобраться.

### Постановка вопроса

Время от времени возникает потребность в переписывании проекта сделанном на каком-нибудь из старых
версий фреймворка или еще хуже с легаси кода. Увы, но так просто переписать к примеру с `Yii` на `Symfony` или с легаси
на `Laravel` не является возможным. Потому, что фреймворки не совместимы и не могут заменить друг друга.

Отсюда вопрос. Необходимо организовать такую структуру, при которой ядро приложения должно быть фреймворконезависимым.
То есть должна быть возможность менять фреймворк или параллельно использовать несколько фреймворков.

При этом важно разделять взаимодействие из вне и чистый код приложения. Никогда не знаешь когда проект "устареет" и придется
все переписывать.

В общем важно правильно организовать структуру проекта, чтобы не было мучительно больно в будущем.

### Требования

Я стараюсь идти в ногу со временем поэтому в проекте используем современные подходы и инструменты.

1. Все зависимости загружаем через `composer`.
2. Используем статические и лексические анализаторы кода.
3. Разработку ведем по принципу `Code-First`, то есть пишем чистый рабочий код без [побочных эффектов](https://lexusalex.ru/pure-functions).
4. Не думаем о базе данных вообще, это вторично.
5. Автоматизируем все что только можно.
6. Обязательное тестирование кода.
7. Единая точка входа в приложение.
8. Для локальной разработки используем docker

### Запросы и ответы

Очевидно, что любое приложение должно уметь принимать запросы и возвращать ответы.

Любой запрос попадает в контроллер, который в свою обрабатывает результат.
Клиентом в данном случае может выступать любая программа или сервис, которая посылает этот запрос.

Создадим файл `public/index.php`. Это единая точка входа в приложение.

```php
<?php

declare(strict_types=1); // Заставляем работать php в строгом режиме

require __DIR__ . '/../vendor/autoload.php'; // Подключаем composer, куда же без него
```

К главному скрипту `index.php` мы можем получить доступ разными путями.

<img src="/archive/images/articles/php/ci.svg" alt="ci">

Здесь может быть очередь, консоль или мобильное приложение, то есть несколько каналов для входных запросов.
Это фреймворки, их как раз мы можем менять заменяя друг на друга.

Создадим структуру директорий "Client Interface". К примеру такую.

```text
src/
    CI/
        Android/
        Api/
        Cli/
        Http/
        iOS/
        RabbitMq/
```

В этих директориях мы будем хранить контроллеры.

### PSR-7

Насколько сложной не была бы у нас бизнес-логика. Приложение всегда принимает запрос (request), 
и возвращает ответ (response). Для облегчения жизни разработчиков группа PHP-FIG представляет абстракцию над http 
рекомендацию [PSR-7](https://www.php-fig.org/psr/psr-7/).

Рекомендация psr - это [набор классов и интерфейсов](https://github.com/php-fig/http-message) которые нужно реализовать, для того чтобы писать фреймворконезависимый код.

В качестве обучения мы можем реализовать классы самостоятельно, но мы воспользуемся готовой реализацией например:
1. [Slim-Psr7](https://github.com/slimphp/Slim-Psr7)
2. [Laminas](https://github.com/laminas/laminas-diactoros)
3. [Nyholm](https://github.com/Nyholm/psr7)
4. [Guzzle](https://github.com/guzzle/psr7)


https://habr.com/ru/post/250343/


PSR-7 предлагает стандартный способ управления запросами и отправку любых ответов клиентам.

### Система маршрутизации

Роутер

### Контроллеры

Теперь в этих папках можно размещать контроллеры, которые будут обрабатывать все это дело.

__Контроллер - это любой код который управляет процессом__

Контроллер может как класс, или просто функция

Здесь может быть как код фреймворков так и собственная реализация.

https://elisdn.ru/blog/105/services-and-controllers

### Сервисный слой

### Доменная модель
Архитектура как код.
https://elisdn.ru/blog/104/domain-entities-modelling

исходный код проекта https://github.com/LexusAlex/php-compact
https://habr.com/ru/post/458484/