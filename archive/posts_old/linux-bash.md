---
layout: post
title: Программировние на bash
permalink: php-standards-recommendations 
tags: psr php
comments: true
subtitle: Какие существуют стандарты кодирования в php
summary: Какие существуют стандарты кодирования в php
is_navigate: true
cover_url: "/assets/images/articles/php.png"
published: false
---

#### Структура командной строки

`alex@test:~$ command -x 1 [-x 2 args] {-x n | --long-options i } args ...`

`alex@test:/tmp/.X11-unix$` - эта часть это просто справочная информация где :
- `alex` имя учетной записи пользователя
- `@` разделитель
- `test` имя компьютера
- `:` разделитель
- `/tmp/.X11-unix` директория где мы находимся и где выполнятеся команда
- `$` приглашение к выполнению команды от обычного пользователя, `#` от суперпользователя

Пример.

```bash
root@debian10:/tmp/.X11-unix#
```

Команда представляет из себя все что идет после приглашения.
В простейшем случае команда это одно слово, но по факту это путь до исполняемого файла.
Чтобы выполнить команду нужно запустить ее выполнение нажав enter

```bash
ls
pwd
cd
ps
find
date
touch
man
mkdir
```
После запуска будет выведен или не веведен результат выполнения.
Значения по умолчанию - это хорошо, но хочется большего. 
Например указание агрументов команды. Их может быть несколько

```bash
ls /tmp/
cd /tmp/
touch /tmp/testfile
mkdir mytestfolder
rm test1 test2 test3 test4
cat file1 file2
stat file
```

Существует так же возможность более точно сказать интерпретатору что мы хотим, для этого
существуют ключи или модификаторы. Обычно они указываются между командой и агрументами команды

```bash
ls -a /tmp/
ls -a -l /tmp/
tail -f /var/log/messages
```

У ключей тоже могут быть аргументы, они должны идти сразу после ключа

```bash
ls -T 3 -w 1 /
```

Это были короткие ключи, но так же бывает и длинные с агрументами или без:

```bash
ls --sort=size --dereference-command-line /
find . -maxdepth 1 -size 0
```

### Подстановки

#### Подстановка имен файлов

- `*` метасимвол означающий сколько угодно и каких угодно символов
- `?` любой символ, но один
- `~` домашний каталог
- `\` специальный символ для отмены значений других символов
- `[x-z]` диапазон
- `[abcd]` пересичление, один конкретный символ
`ls ja*`

`du -sh ~/*`

#### Экранирование

- `\m` одиночное
-  `'mmmmmm'` множественное условное
-  `"mmmmmm"` множественное сильное экранирует все

** Чтобы видеть все подстановки нужно включить трассировку set -x включить трассировку всего set +x выкл трассировку**


### Подстановка вывода команд
`comand`
$(comand)

rm `find . -maxdepth 1 -size 0`





11 минута
Программирование на bash

https://habr.com/ru/company/ruvds/blog/325522/
$ command -x 1 [-x 2 args] {-x n | --long-options i } args ...

~ - домашний каталог
* - любой символ сколько угодно
? - любой но один символ
[x-y] - диапазон
[abc]

m 1 m 2 m...m n ’ - множественное экранирование
”m 1 m 2 m...m n ” - множественное экранирование
\m одиночное

ls -l mu* - любое кол-во символов
ls -la mu?????? - 6 любых символов
ls -la ???????? - 8 любых символов
[mr]*
ls -ld *-*
ls -ld /etc/*[0-9]*
find . -maxdepth 1 -size 0
wc -l

Подстановка вывода команд ` `  $()
rm `find . -maxdepth 1 -size 0`
rm $(find . -maxdepth 1 -size 0) 
cmd1 $(cmd2 $(cmd3))
cmd1 $(cmd2) $(cmd3)

touch "name test"

find /usr -size +35k
find /usr -size +$[5 * 1024]k -ls
find /usr -size +$[5 * 1024]k | wc -l - арифметическая подстановка
echo $[2**10]

Подстановка параметров 
echo $LANG 
echo ${LANG}test 

set -x включить трассировку всего 
set +x выкл трассировку

du -sh ~ вес домашнего каталога

Списки

Последовательные

Параллельные -ассинхронный список

& &

find / -size 0 2> /dev/null 1> /tmp/ &


Синхронные последовательные

cmd ; cmd  безусловный список
cmd || cmd условный список ИЛИ до первого успеха только одна успешная
cmd && cmd  условный список И - все команды должны быть успешные для того чтобы они выполннились

cmd & cmd

Параллеьное выполнение
find / -size 0 2 > /dev/null 1> /tmp &

file * | grep shell | cut -f 1 -d : | grep ^[^0-9]

Регулярные выражения

bash откомпилированная двоичная программа

#!/bin/sh диа лект сценария

#!/bin/bash

vim test.sh

chmod o-x,g-x test.sh

# Comment

#!/bin/bash
# Сценарий на языке командного интерпретатора

echo Hello user $1!

Команда test

if test "$1" = "" # здесь команды, они должны закончится успехом или не успехом, команду мы заэранировали
then
 echo Hello world!
else
 echo Hello user $1!

Но это же самое можно заменить на более красивое , это команда с обязательными пробелами
if [ "$1" = "" ]

Но эту конруткцию можно упростить
user=world
if [ "$1" != "" ]
then
 user=$1
fi

Но можно еще упростить
user=world
[ "$1" != "" ] && user=$1
echo Hello $user!


`$#` - Количество переданных не пустых позиционных параметров число

для сравнения строк = или !=
для чисел -eq -ne

в связи с этим перепишем так
user=world

[ $# -ge 1 ] && user=$1

echo Hello $user!

`$*` все переданные непозиционные параметры

[ $# -ge 1 ] && user=$*

echo Hello $user!


Цикл

for var in word-lists
do
 command
done

 добавляем цикл в нашу программу
users=world
[ $# -ge 1 ] && users=$*
for user in $users
do
 echo Hello $user!
done

Множественное ветвление конструкция  case

users=world
[ $# -ge 1 ] && users=$*
for user in $users
do
 case $user in
  john|ivan) t=Mr;;
  jane) t=Ms;;
  *) t=....;;
 esac
 echo Hello,${t}. ${user}!
done


Списки условий

while command

do

done

until

do

done

counter=1
while [ $counter -le 100]
do
 echo $counter
 counter=$[counter+1]
done

## Это аналог seq 1 100

В цикле можно создавать необходимое кол-во файлов

Функции

[function] name()
{
    command
}


function help()
{
 echo Usage
 exit
}

help()
{
 echo Usage
 exit
}


[ "$1" = "-h" ] && help
https://gist.github.com/Titiaiev/dcb7298389d1276b823bbc96e29f940d

