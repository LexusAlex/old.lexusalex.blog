---
published: false
---
nodjs
https://nodejs.org/ru/
https://metanit.com/web/nodejs/2.1.php
js
https://ru.hexlet.io/courses/js-setup-environment
gulp
https://gulpjs.com/
https://webdesign-master.ru/blog/docs/gulp-documentation.html#working-with-files
https://www.youtube.com/watch?v=n-N1BnloIVE&t=1082s


План изложения
1. Nodejs Установка
2. Модули
3. NPM
4. Gulp


Gulp - это менеджер задач. Инструмент, который позволяет автоматизировать рабочие процессы в
веб-разработке и не только. Gulp может быть применен для сборки проекта, копирования, перемещения,
создания, сжатия и оптимизации файлов.

Gulp помогает именно тебе с автоматизацией рутинных задач.

## JavaScript

[JavaScript](https://ru.wikipedia.org/wiki/JavaScript) является интерпретируемым языком программирования. Это значит, что преобразование
исходного кода в машинный код происходит прямо в процессе его обработки - этот процесс называется интерпретацией.

Чтобы запустить JavaScript нужна программа интерпретатор. Интерпретатор JavaScript встроен в браузер, так же может исполнятся на сервере 
с помощью программной платформы [Node.js](https://ru.wikipedia.org/wiki/Node.js).

Сейчас на языке JavaScript пишут приложения не только для браузера, но и приложения для операционных
систем, пример этому редактор кода [Atom](https://ru.wikipedia.org/wiki/Atom_(%D1%82%D0%B5%D0%BA%D1%81%D1%82%D0%BE%D0%B2%D1%8B%D0%B9_%D1%80%D0%B5%D0%B4%D0%B0%D0%BA%D1%82%D0%BE%D1%80)) от github, который
можно поставить на компьютер как обычную программу.

## Стандарты ECMAScript

[ECMAScript](https://www.ecma-international.org/ecma-262/) это стандарт на котором базируется JavaScript.

Отдельный вопрос в интерпретации стандартов

<img src="/assets/images/articles/gulp/10-gulp-ecmascript-standarts.png" alt="Стандарты EcmaScript" data-action="zoom">

ECMAScript 3 стала наиболее популярной версией языка выпущенной в 1999 году. Все поменялось в 2015 году
когда вышел новый стандарт получивший название "ES6" или "ES2015" он привнес множество обновлений и
улучшений в сам язык. 

Поддержка новых возможностей различными интерпретаторами есть на сайтах:
 - [https://kangax.github.io/compat-table/es6/](https://kangax.github.io/compat-table/es6/)
 - [https://caniuse.com/es6](https://caniuse.com/es6)

JavaScript развивается. Комитет принял решение выпускать каждый год новую версию стандарта.

## Node.js

[Node.js](https://nodejs.org/) - это среда выполнения JavaScript кода вне браузера. Часто используется как платформа или бэкенд для создания веб
приложений. Node.js является проектом с [открытым исходным кодом](https://github.com/nodejs).

К преимуществам можно отнести возможность использования JavaScript и на фронтенде и на бэкенде.

### Установка

Node.js можно установить [вручную](https://nodejs.org/en/download/) либо воспользоваться [пакетным менеджером](https://github.com/nodesource/distributions/blob/master/README.md)
вашей операционной системы. Все предельно просто.

Самый простой вариант попробовать Node.js в [docker контейнере](https://hub.docker.com/_/node/).
Все работает из коробки.

### Использование Node.js

https://nodejs.org/ru/docs/guides/nodejs-docker-webapp/
Запустим Node.js в докер контейнере
https://github.com/nodejs/docker-node/blob/master/README.md#how-to-use-this-image

### Модули

Код в node.js имеет понятие модуля
Node.js использует модульную систему. То есть вся встроенная функциональность разбита на отдельные пакеты или модули. Модуль представляет блок кода, который может использоваться повторно в других модулях.

При необходимости мы можем подключать нужные нам модули. Какие встроенные модули есть в node.js и какую функциональность они предоставляют, можно узнать из документации.

## Npm

Менеджер зависимостей

поиск пакетов https://www.npmjs.com/


