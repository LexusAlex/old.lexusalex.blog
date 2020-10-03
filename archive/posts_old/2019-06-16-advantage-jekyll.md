---
layout: post
title: Преимущества Jekyll
permalink: advantage-jekyll
tags: jekyll github github-pages
comments: true
subtitle: Почему я выбрал jekyll для создания блога
summary: Почему я выбрал jekyll для создания блога.
is_navigate: false
cover_url: "/assets/images/articles/jekyll.png"
published: false
---

Назрела необходимость завести блог, хотел просто писать статьи.
В поиске подходящих вариантов натолкнулся на бесплатный хостинг статических файлов от github [Github pages](https://pages.github.com/) 
на уровне репозитория.

Github pages из коробки поддерживает статический генератор сайтов [Jekyll](https://jekyllrb.com/).

Jekyll - это простой, статический генератор сайтов, позволяющий быстро сделать гибкий и легкий сайт 
для ведения личных заметок и записей.

Поясню, что подтолкнуло меня использовать его.

Самое главное, что здесь не нужно заниматься настройкой [LAMP](https://ru.wikipedia.org/wiki/LAMP) стека php, apache,
mysql и следить за безопасностью своего сайта. 
Jekyll генерирует статические html страницы, а это значит, данные всегда доступны, ведь здесь нет базы данных.

Удобно, что текст можно набирать в своем любимом редакторе в markdown, а не в окошке [WYSIWYG](https://ru.wikipedia.org/wiki/WYSIWYG) редактора.
С той же легкостью отправляем изменения простым коммитом в репозиторий с именем username.github.io, после этого jekyll соберет сайт.

Получаем блог, состоящий из набора текстовых файлов с которым удобно работать.

## Полезные ссылки

- [Документация по jekyll от github](https://help.github.com/en/articles/using-jekyll-as-a-static-site-generator-with-github-pages)
- [Документация jekyll](https://jekyllrb.com/docs/)
- [Готовый шаблон poole](http://getpoole.com/)
- [Guide от Hexlet](https://guides.hexlet.io/jekyll/)
