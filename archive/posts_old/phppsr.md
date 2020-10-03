---
layout: post
title: Стандарты в php
permalink: php-standards-recommendations 
tags: psr php
comments: true
subtitle: Какие существуют стандарты кодирования в php
summary: Какие существуют стандарты кодирования в php
is_navigate: true
cover_url: "/assets/images/articles/php.png"
published: false
---

Уже давно существуют некие соглашения по написанию кода которые приняты в мире php.
Для этого создана специальная группа [php-fig](https://www.php-fig.org/) 
в которую входят разработчики и представители фреймворков. 
Цель группы состоит в том чтобы унять разброс и шатание по стилю написания приложений

Список всех стандартов представлен на официальном сайте [https://www.php-fig.org/psr/](https://www.php-fig.org/psr/)
Это не перевод оригиналов, это всего лишь объяснение для упорядочивания информации.

## Стиль написания кода

### PSR-1 – Базовый стандарт оформления кода

1. Код должен использовать только два варианта тегов `<?php ?>` или `<?= ?>`.
2. PHP код должен быть в кодировке `UTF-8 без BOM`.
3. В коде должны либо объявлятся структуры (классы, функции, константы) либо порождаться [побочные эффекты](https://lexusalex.ru/pure-functions), но не одновременно.
4. Имена классов, интерфейсов и трейтов должны быть формате `StudlyCaps` например `AbstractHandler`, `FormattableHandlerTrait`.
5. Константы классов должы быть объявлены в верхнем регистре например `YII_DEBUG`.
6. Имена методов должны быть в формате `camelCase` например `setFormatter()`, `generateDataStream()`.
7. Свойства класса должы быть объявлены в единой форме в рамках проекта например `$logToken` или `$testClientProvider` но не `$test_client_provider`.

### PSR-12: расширенный стиль кодирования

Стандарт пришел на смену [PSR-2](https://www.php-fig.org/psr/psr-2/), который уже не актуален.

1. Если в текущей версии языка указанные конструкции не существуют, они могут быть проигнорированы.
2. Все файлы php должны использовать в качестве конца строки `Unix LF`.
3. Все файлы php должны оканчиватся пустой строкой.
4. Если в файле содержится только php код закрывающий тег `?>` должен быть опущен.
5. Мягкое ограничение на длину строки составляет 120 символов, но рекомендуется делать строки не длиннее 80 символов.
6. Пустые строки могут быть добавлены с целью улучшения читаемости кода.
7. Не должно быть пробелов в конце строк.
8. Не должно быть более одного оператора на строку.
9. Код должен использовать 4 пробела в качестве отступов.
10. [Зарезервированные слова](https://www.php.net/manual/ru/reserved.keywords.php) должны быть написаны в нижнем регистре.
11. [Типы данных](https://www.php.net/manual/ru/reserved.other-reserved-words.php) должы использоваться только в краткой форме например `int`, `bool`
12. Блоки в коде должны быть указаны в порядке как в примере ниже, не используемые могут быть опущены, блоки разделяются пустыми строками.
    ```php
    <?php
    
    /**
     * MariaDb class // док блок файла
     */
    
    declare(strict_types=1); // опрератор объявления. Строгая проверка типов возвращаемых или передаваемых из функции
    
    namespace LexusAlex; // объявление пространства имен
    
    use PDO; // Импорт классов
    
    use function test; // импорт функций
    use function test2;
    
    use const {TEST}; // импорт констант
    
    /**
     * Class MariaDb
     * @package LexusAlex // док блок класса
     */
    class MariaDb // объявление класса
    {
    
    }
     // пустая строка в конце файла
    ```
13. Вложенные пространства имен не допускаются.
14. Если код содержит html и php то оператор объявлений должен быть объявлен следующем образом :
    ```php
    <?php declare(strict_types=1) ?>
    <html>
    <body>
        <?php
            // Код php
        ?>
    </body>
    </html>
    ```
15. Форматирование оператора `declare`
    ~~~php
    <?php
    
    declare(ticks=1) {
        // some code
    }
    ~~~
16. Класс в контексте данных рекомендаций подразумевает под собой так же интерфейс и трайт.
17. Объявление нового класса всегда должно сопровождаться круглыми скобками конструктора `new Core();`
18. При создании нового класса не должно быть комментариев на той же строке.
19. Ключевые слова `extends` и `implements` должны быть объявлены на той же строке что и имя класса `abstract class MariaDb extends ParentClass implements \ArrayAccess, \Countable, \AnInterfaceWithReturnType`.
20. Открывающие и закрывающие скобки класса должны распологаться следующим образом.
    ```php
    <?php
    
    abstract class MariaDb
    {
    
    }
    
    ```
21. Список интерфейсов может быть разбит на несколько строк, по одному интерфейсу на строку.
    ```php
    <?php
    
    abstract class MariaDb extends ParentClass implements 
        \ArrayAccess, 
        \Countable, 
        \AnInterfaceWithReturnType
    {
    
    }
    
    ```
22. Объявление трайтов внутри класса должны быть объявлены после открывающей скобки
    ```php
    <?php
    
    class MariaDb
    {
        use CancelTestTrait;
        use LoggerAwareTrait;
        use NotifyTestTrait;
        // пустая строка необходима если после объявлений трайтов есть еще код
        public $prop;
    }
    
    ```
23. Видимость свойств,методов и констант должна быть объявлена во всех свойствах.
24. Не допускается использование ключевого слова `var` при объвлении свойства.
25. Не допускается использовать префикс для объявления свойства и метода с приватным уровнем доступа. Префикс явно не имеет никакого значения.
    ```php
    <?php
    
    class MariaDb
    {
        public object $connect;
        public int $timestamp = 0;
    }
    
    ```
26. Признак видимости должен быть объявлен во всех методах.
27. Объявлеление метода должно выглядеть следующим образом, после каждой запятой должен быть пробел.
28. Значения по умолчанию должны быть в конце списка.
    >>> ?string означает что указанные возвращаемые значения могут быть как указанный тип так же и NULL
    ```php
    <?php
    
    class MariaDb
    {
        public function createTable(&$test, $nameTable = 'table_name', $rows = [], &...$parts): ?string
        {

        }
    }
    
    ```
29. Агрументы могут быть разбиты на несколько строк.
    ```php
    <?php
    
    class MariaDb
    {
        public function createTable(
            HttpRequestDataShare &$test, 
            string $nameTable = 'table_name', 
            array $rows = []
        ): ?string {

        }
    }
    
    ```
30. Ключевые слова `abstract`, `final` объявляются до обозначения области видимости.
31. Ключевое слово `static` объявляется после обозначения области видимости.
    ```php
    <?php
    
    abstract class MariaDb
    {
        abstract protected static function test()
        {
    
        }
        
        final public static function test2()
        {
    
        }
    }
    
    ```
32. Примеры вызова функции и методов
    ```php
    <?php
    
    test();
    $mariaDb = new MariaDb();
    $mariaDb->createTable();
    $mariaDb::test($param1, $param2);
    
    ```
33. Параметры могут быть разбиты на несколько строк.
    ```php
    <?php
     $mariaDb = new MariaDb();
     $mariaDb->test(
         $longArgument,
         $longerArgument,
         $muchLongerArgument
     );
     
     somefunction($foo, $bar, [
       // ...
     ], $baz);
     
     $app->get('/', function (Request $request, Response $response, array $args) use ($app) {
         $name = $args['name'];
         $response->getBody()->write("Hello, $name");
         return $response;
     });
34. `if`, `elseif`, `else`, `switch`
    ```php
    <?php
    
    if ($expr1) {
    
    } elseif ($expr2) {
    
    } else {
    
    }
    
    if (
        $expr1
        && $expr2
    ) {
    
    } elseif (
        $expr3
        && $expr4
    ) {
    
    }
    
    switch ($expr) {
        case 0:
            echo 'First case, with a break';
            break;
        case 1:
            echo 'Second case, which falls through';
            // no break
        case 2:
        case 3:
        case 4:
            echo 'Third case, return instead of break';
            return;
        default:
            echo 'Default case';
            break;
    }
    
    switch (
        $expr1
        && $expr2
    ) {
    
    }
    
    ```
35. `while`,`for`, `foreach`
    ```php
    <?php
    
    while ($bool_expression) {
    
    }
    while (
        $bool_expression1
        && $bool_expression2
    ) {
    
    }
    
    for ($i = 0; $i < 10; $i++) {
    
    }

    for (
        $i = 0;
        $i < 10;
        $i++
    ) {
    
    }
    
    foreach ($iterable as $key => $value) {
        
    }
    ```
36. `try-catch-finally`
    ```php
    <?php
    
    try {
        // try body
    } catch (FirstThrowableType $e) {
        // catch body
    } catch (OtherThrowableType | AnotherThrowableType $e) {
        // catch body
    } finally {
        // finally body
    }
    ```
37. Операторы. Все, что не будет перечислено здесь не определено.

    ```php
    <?php
    $i++;
    ++$j;
    $intValue = (int) $input;
    $a === $b
    $bar ?? $a ?? $b
    $a > $b
    $a + $b * $c
    $foo ? 'foo' : 'bar'
    $foo ?: 'bar'
    ```
38. Замыкания.

https://vk.com/@degler222-standarty-kodirovaniya-php-psr
https://elisdn.ru/blog/134/four-pillars-of-psrs
https://github.com/jbboehr/php-psr
https://redwerk.jobs/blog/psr-12-%d0%bf%d0%b5%d1%80%d0%b5%d0%b2%d0%be%d0%b4-%d1%80%d0%b0%d1%81%d1%88%d0%b8%d1%80%d0%b5%d0%bd%d0%bd%d0%be%d0%b3%d0%be-%d1%81%d1%82%d0%b0%d0%bd%d0%b4%d0%b0%d1%80%d1%82%d0%b0-%d0%be%d1%84%d0%be/