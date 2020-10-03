---
published: false
---

html. Необходимый минимум.


    metadata content — метасодержимое
    flow content — потоковое содержимое
    sectioning content — структурное содержимое
    heading content — заголовочное содержимое
    phrasing content — текстовое содержимое
    embedded content — внедряемое содержимое
    interactive content — интерактивное содержимое
    palpable content — содержимое для вывода
    script-supporting content — скриптовое содержимое
    sectioning roots — структурные основы
    grouping content — группирующее содержимое
    void elements — пустые элементы
    raw text elements — элементы со свободным текстом
    escapable raw text elements — элементы с экранируемым свободным текстом
    foreign elements — сторонние элементы
    normal elements — обычные элементы

### Заголовки
- h1 - один на странице
- h2 - несколько на странице
- h3 - несколько на странице
- h4 - несколько на странице
- h5 - несколько на странице
- h6 - несколько на странице

Описывает важную структурную контентную часть
Заголовки смысловых разделов либо заголовки всей страницы
Заголовок описывает либо логический раздел, либо всю страницу целиком.
Размер заголовка тут никакю роль не играет

Не желательны пропуски уровней заголовков

https://www.w3.org/TR/html52/sections.html#the-h1-h2-h3-h4-h5-and-h6-elements 




--------------------------
Парные теги
~~~html
<h1>Тест</h1> <! -- заголовок -->
~~~

Одиночные теги

~~~html
<hr> <! -- линия -->
<br> <! -- перенос строки -->
<input type="text"> <! -- поле ввода -->
<img src="/assets" alt="объект изображения"> <! -- изображение -->
~~~~

## Вложенность 
https://caninclude.glitch.me/ 

## Типы тегов
<img src="/assets/images/articles/html/html/1/types_tags.png" alt="Типы тегов" data-action="zoom">

### Структурные теги

- article - независимая смысловая единица. Комментарий, твит статья. Отдельная часть которая имеет смысл. Внутри желателен
заголовок. Так же может иметь футер. Его можно отделить и разместить на другом сайте
- aside
- nav - навигационный раздел. Используется для основной навигации. Меню в футере можно не оборачивать в nav
- section - неотделяемый, смысловой раздел документа. Желателен заголовок.



### Поток
- a 
- abbr 
- address 
- area (if it is a descendant of a map element) 
- article 
- aside 
- audio 
- b 
- bdi 
- bdo 
- blockquote 
- br 
- button 
- canvas 
- cite 
- code 
- data 
- datalist 
- del 
- details 
- dfn 
- dialog 
- div - контейнер без значения
- dl 
- em 
- embed 
- fieldset 
- figure 
- footer - заключительная часть смыслового раздела. Описывает, уточняет. Подвал сайта. Этих элементов может быть несколько. Их может быть несколько.
- form 
- h1 h2 h3 h4 h5 h6 
- header - вводная часть смыслового раздела, обычно содержит подсказки и навигацию. Этих элементов может быть несколько на странице
- hr 
- i 
- iframe 
- img 
- input 
- ins 
- kbd 
- label 
- link (if it is allowed in the body) 
- main - основное главное содержимое сайта, должно быть одно. То за чем пришел пользователь.
- map 
- mark 
- math 
- meter 
- nav 
- noscript 
- object 
- ol 
- output 
- p - все куда мы кладем контент, может группировать часть содержимого
- picture 
- pre 
- progress 
- q 
- ruby 
- s 
- samp 
- script 
- section 
- select 
- small 
- span 
- strong 
- style 
- sub 
- sup 
- svg 
- table - список с вертикальными связями
- template 
- textarea 
- time 
- u 
- ul - нужен для набора однородных элементов, но не для всего
- var 
- video 
- wbr 
- text 

### Фразовые

- a 
- abbr 
- area (if it is a descendant of a map element) 
- audio 
- b - жирное начернатие
- bdi 
- bdo 
- br - переводы строк
- button 
- canvas 
- cite 
- code 
- data 
- datalist 
- del 
- dfn 
- em - эмоциональное выделение
- embed 
- i - дополнительное выделение
- iframe 
- img - контентное изображение
- input 
- ins 
- kbd 
- label 
- link (if it is allowed in the body) 
- map 
- mark 
- math 
- meter 
- noscript 
- object 
- output 
- picture 
- progress 
- q 
- ruby 
- s 
- samp 
- script 
- select 
- small 
- span - универсальный элемент без собственного значения
- strong - сильное выделение
- sub 
- sup 
- SVG svg 
- template 
- textarea 
- time 
- u 
- var 
- video 
- wbr 
- text 

## Как делать разметку

Спецификация
https://html.spec.whatwg.org/multipage/ 
https://www.w3.org/TR/html52/
html не имеет версии
http://spec.piraruco.com/html5/index.htm