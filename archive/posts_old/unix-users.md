---
layout: post
title: UNIX. Пользователи
permalink: unix-users
tags: linux unix
comments: true
subtitle: Управление пользователями в Unix
summary:  Управление пользователями в Unix
is_navigate: true
published: false
---

Linux - это многопользовательская, многозадачная операционная система.
Права пользователей на системные ресурсы постоены на дискреционной модели исходя из которой определяется
доступ к этим ресурсам.

## Пользователи и группы

Каждый пользователь в linux имеет идентификатор пользователя **UID** и идентификатор группы **GID**

При регистрации пользователя в системе под него создается одна _основная группа_ в которую он входит. Так же пользователь может
входить в несколько _дополнительных групп_.

Пользователи могут быть :
1. Привилегированными.
2. Системными.
3. Обычными.

### UID и GID

Привилегированный пользователь в системе - это root

```bash
#!/usr/bin/env bash
id root
uid=0(root) gid=0(root) groups=0(root)
```
Системные пользователи или псеводопользователи создаются автоматически. 
От их имени работают различные системные службы.

Нумерация для обычных пользователей начинается со значений указанных в файле `/etc/login.defs` :

```bash
#!/usr/bin/env bash
UID_MIN			 1000
UID_MAX			60000
GID_MIN			 1000
GID_MAX			60000
```

## Управление пользователями и группами

Управление пользователям и группами осуществляется путем внесения изменений в файлы системными утилитами: 

~~~bash
#!/usr/bin/env bash
ls -l /etc/passwd /etc/shadow /etc/group /etc/gshadow
-rw-r--r-- 1 root root   459 Jan  2 23:21 /etc/group
-rw-r----- 1 root shadow 383 Jan  2 23:21 /etc/gshadow
-rw-r--r-- 1 root root   963 Jan  2 23:21 /etc/passwd
-rw-r----- 1 root shadow 527 Jan  2 23:21 /etc/shadow
~~~

На каждой строке расположена учетная запись пользователя/группы, поля разделены двоеточиями ` : `

Так исторически сложилось, что пользователи хранятся в файлах `/etc/passwd` и `/etc/shadow` (открыты для чтения всем),
группы `/etc/group` и `/etc/gshadow` (содержат конфидициальную информацию, доступны только суперпользователю)

### Фаил /etc/passwd

В этом файле содержится открытая информация об учетных записях пользователей доступна для просмотра всем пользователям:

<table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Поле</th>
      <th scope="col">Описание</th>
      <th scope="col">Комментарий</th>
      <th scope="col">Пример</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <th scope="row">login</th>
      <td>Логин пользователя</td>
      <td>Уникальное имя которое пользователь вводит при входе в систему.
          Логин связан с UID пользователя.
          Переименование пользователя никак не влияет на его права доступа.
          Имя должно состоять не более чем из 32 символов.
       </td>
       <td>test</td>
    </tr>
    <tr>
      <td>2</td>
      <th scope="row">password</th>
      <td>Пароль (Аутентификация)</td>
      <td>
         - символ `x` означает что пароль зашифрован хранится в файле `/etc/shadow`
         - символ `*` учетная запись временно отключена
         - пустое поле означает что пароль не требуется.
         - непосредственно зашифрованный пароль.
       </td>
       <td>x</td>
    </tr>
    <tr>
      <td>3</td>
      <th scope="row">UID</th>
      <td>Идентификатор пользователя(Авторизация)</td>
      <td>
         Возможно наличие несколько пользователей с одним и тем же UID, что позволяет иметь сразу несколько имен для входа.
       </td>
       <td>0</td>
    </tr>
    <tr>
      <td>4</td>
      <th scope="row">GID</th>
      <td>Идентификатор первой группы</td>
      <td>
         По умолчанию, в ОС Linux для каждого нового пользователя создается новая группа с таким же регистрационным именем.
       </td>
       <td>0</td>
    </tr>
    <tr>
      <td>5</td>
      <th scope="row">gecos</th>
      <td>Комментарии к учетной записи, содержит текст описывающий пользователя</td>
      <td>
         Этот текст может выводится различными программами например `finger`.
            Поля могут указываться через запятую в следующем порядке :
            - полное имя.
            - номер офиса и здания.
            - рабочий телефон.
            - домашний телефон.
       </td>
       <td>James Bond</td>
      </tr>
      <tr>
        <td>6</td>
        <th scope="row">home directory</th>
        <td>Домашний каталог пользователя, куда пользователь попадает после входа в систему</td>
        <td>
           Путь становится значением переменной среды `HOME`.
         </td>
         <td>/root</td>
        </tr>
      <tr>
        <td>7</td>
        <th scope="row">shell</th>
        <td>Начальный командный интерпретатор, которому передается управление после входа пользователя в систему.</td>
        <td>
           Содержимое поля становится значением переменной среды `SHELL`.
         </td>
         <td>/bin/bash</td>
      </tr>
  </tbody>
</table>

Примеры :
```bash
root:x:0:0:root:/root:/bin/bash
smmsp:x:123:132:Mail Submission Program,,,:/var/lib/sendmail:/bin/false
nvidia-persistenced:x:121:130:NVIDIA Persistence Daemon,,,:/:/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
```

### Фаил /etc/shadow

Содержится дополнительная информация не включенная `/etc/passwd` в том числе пароль в зашифрованном виде.

<table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Поле</th>
      <th scope="col">Описание</th>
      <th scope="col">Комментарий</th>
      <th scope="col">Пример</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <th scope="row">login</th>
      <td>Логин пользователя</td>
      <td>Берется из файла `/ect/passwd`</td>
       <td>test</td>
    </tr>
    <tr>
      <td>2</td>
      <th scope="row">password</th>
      <td>Пароль в зашифрованном виде</td>
      <td>! или * означает что пароль отсутсвует</td>
      <td>$1$.ArJtddq$H399O2dO6aDa99UmDjJ7/1</td>
     </tr>
    <tr>
      <td>3</td>
      <th scope="row">lastchg</th>
      <td>Количество дней с 1 января 1970 года, после которых производилось последнее изменение пароля</td>
      <td> </td>
       <td>17334</td>
     </tr>
    <tr>
      <td>4</td>
      <th scope="row">min</th>
      <td>Минимальное число дней между изменениями пароля.</td>
      <td>В данном поле задается количество дней, спустя которые пользователь сможет снова изменить пароль.</td>
       <td>0</td>
    </tr>
    <tr>
      <td>5</td>
      <th scope="row">max</th>
      <td>Максимальное число дней между изменениями пароля.</td>
      <td>Максимальное время жизни пароля определяется суммой значений max и inactive</td>
       <td>99999</td>
    </tr>
    <tr>
      <td>6</td>
      <th scope="row">warn</th>
      <td>Количество дней до истечения срока действия пароля, когда выдается предупреждение.</td>
      <td>В данном поле задано количество дней, оставшихся до момента устаревания пароля,когда программа login должна предупреждать пользователя о необходимости изменить пароль.</td>
       <td>7</td>
    </tr>
    <tr>
      <td>7</td>
      <th scope="row">inactive</th>
      <td>Количество дней по истечении срока действия пароля, когда учетная запись отключается.</td>
      <td></td>
       <td>пусто</td>
    </tr>
    <tr>
      <td>8</td>
      <th scope="row">expire</th>
      <td>Срок действия учетной записи.</td>
      <td>По окончанию этого срока пользователь не сможет 
             зарегистрироваться в системе, пока администратор не сбросит значение поля. 
             Если поле содержит пустое значение, учетная запись всегда будет активной.</td>
       <td>пусто</td>
    </tr>
    <tr>
      <td>9</td>
      <th scope="row">flag</th>
      <td>Зарезервированное поле.</td>
      <td>В настоящий момент не используется.</td>
       <td>пусто</td>
    </tr>
  </tbody>
</table>

Соотношение временных параметров указано на рисунке :

![/etc/shadow](/archive/images/articles/unix/unix-user/shadow.png "/etc/shadow")

Примеры:
~~~bash
root:!:17334:0:99999:7:::
colord:*:17212:0:99999:7:::
~~~

Настройки полей по умолчанию для новых пользователей находятся в файле `/etc/login.defs` 

~~~bash
PASS_MAX_DAYS	99999
PASS_MIN_DAYS	0
PASS_WARN_AGE	7
~~~

### Фаил /etc/group

Список групп с доступом для всех пользователей.

 >> В ранних реализациях UNIX пользователь мог входить только в одну группу

<table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Поле</th>
      <th scope="col">Описание</th>
      <th scope="col">Комментарий</th>
      <th scope="col">Пример</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <th scope="row">name group</th>
      <td>Имя группы</td>
      <td></td>
       <td>alex123</td>
    </tr>
    <tr>
      <td>2</td>
      <th scope="row">password</th>
      <td>Пароль группы (сейчас не используется)</td>
      <td>Ранее членство в группе было динамическим, чтобы получить доступ к файлам нужно было ввести пароль группы. Если группа не имеет пароля то указывают символы 'x', '!' или '!!'.</td>
       <td>x</td>
    </tr>
    <tr>
      <td>3</td>
      <th scope="row">GID</th>
      <td>Идентификатор группы</td>
      <td></td>
       <td>2345</td>
    </tr>
    <tr>
      <td>4</td>
      <th scope="row">user list</th>
      <td>Список членов группы на основе имен.</td>
      <td>Если группа для пользователя является основной, она здесь не присутсвует</td>
       <td>syslog,alex</td>
    </tr>    
  </tbody>
</table>

Примеры :
~~~bash
adm:x:4:syslog,alex
docker:x:999:alex
~~~

### Фаил /etc/gshadow

Cодержит информацию о группах. Ранее здесь указывался пароль группы в зашифрованном виде.
Вместо указания паролей стали просто перечислять членов группы.

<table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Поле</th>
      <th scope="col">Описание</th>
      <th scope="col">Комментарий</th>
      <th scope="col">Пример</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <th scope="row">name group</th>
      <td>Имя группы</td>
      <td></td>
       <td>alex123</td>
    </tr>
    <tr>
      <td>2</td>
      <th scope="row">password</th>
      <td>Пароль группы (сейчас не используется)</td>
      <td>Ранее членство в группе было динамическим, чтобы получить доступ к файлам нужно было ввести пароль группы. Если группа не имеет пароля то указывают символы 'x', '!' или '!!'.</td>
       <td>!</td>
    </tr>
    <tr>
      <td>3</td>
      <th scope="row">admin list</th>
      <td>Администраторы</td>
      <td>Разделенный запятыми список администраторов группы.</td>
       <td>admin, admin2, admin3</td>
    </tr>
    <tr>
      <td>4</td>
      <th scope="row">user list</th>
      <td>Список членов группы на основе имен.</td>
      <td>Если группа для пользователя является основной, она здесь не присутсвует</td>
       <td>syslog,alex</td>
    </tr>    
  </tbody>
</table>

Примеры :
~~~bash
adm:*::syslog,alex
tty:*::
disk:*::
~~~

## Утилиты для управления пользователями и группами

Список утилит пакета `passwd` доступные суперпользователю :
~~~bash
#!/usr/bin/env bash
dpkg -L passwd | grep /usr/sbin/
/usr/sbin/chgpasswd
/usr/sbin/chpasswd
/usr/sbin/cppw
/usr/sbin/groupadd
/usr/sbin/groupdel
/usr/sbin/groupmems
/usr/sbin/groupmod
/usr/sbin/grpck
/usr/sbin/grpconv
/usr/sbin/grpunconv
/usr/sbin/newusers
/usr/sbin/pwck
/usr/sbin/pwconv
/usr/sbin/pwunconv
/usr/sbin/useradd
/usr/sbin/userdel
/usr/sbin/usermod
/usr/sbin/vipw
/usr/sbin/cpgr
/usr/sbin/vigr
~~~
Список утилит пакета `passwd` доступные обычному пользователю:

```bash
#!/usr/bin/env bash
dpkg -L passwd | grep /usr/bin/ 
/usr/bin/chage
/usr/bin/chfn
/usr/bin/chsh
/usr/bin/expiry
/usr/bin/gpasswd
/usr/bin/passwd
```
У всех команд посмотерть помощь можно набрав команду `useradd -h`

### Создание пользователя (useradd)

>> Есть некоторые особенности реализации Ubuntu и CenOS. В данной статье рассматироваем на примере Ubuntu

При создании пользователя в домашний каталог пользователя будет 
скопировано содержимое директории `/etc/skel` там находятся файлы конфигурации для пользователя.

```bash
#!/usr/bin/env bash
useradd -D # Настройки при создании нового пользователя
GROUP=100
HOME=/home
INACTIVE=-1
EXPIRE=
SHELL=/bin/sh
SKEL=/etc/skel
CREATE_MAIL_SPOOL=no
```
Основные ключи

useradd -p 456 -m user2
### Информация и пользователе и группах

Посмотреть текущий UID и GID пользователя можно командой `id` : 
```bash
#!/usr/bin/env bash
 id
 uid=1000(alex) gid=1000(alex) группы=1000(alex),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),113(lpadmin),128(sambashare),999(docker)
```
Узнать в каких группах состоит пользователь :

```bash
#!/usr/bin/env bash
groups alex
alex : alex adm cdrom sudo dip plugdev lpadmin sambashare docker
```
Дополнительная информация :

```bash
#!/usr/bin/env bash

finger alex
Login: alex           			Name: �M-^Pлек�M-^Aей
Directory: /home/alex               	Shell: /bin/bash
On since Thu Jan  2 10:14 (MSK) on tty7 from :0
    2 hours 35 minutes idle
On since Thu Jan  2 11:57 (MSK) on pts/6 from :0.0
   2 seconds idle
Mail last read Sun Feb 17 01:51 2019 (MSK)
No Plan.
```
Характеристики пользователя :
1. Кем является (whoami)
2. На какой машине находится (hostname )
3. В каком каталоге находиться (pwd)
4. На каком терминале (tty) - в систему можно войти сколько угодно раз

```bash
#!/usr/bin/env bash
whoami
root

hostname 
d0c4e30359f4

pwd 
/

tty
/dev/pts/1
```

Команда `users` выводит сколько раз пользователь вошел в систему

```bash
#!/usr/bin/env bash

who # На каких терминалах залогинен пользователь в текущий момент
alex     tty7         2020-01-02 10:14 (:0)
alex     pts/6        2020-01-02 11:57 (:0.0)

w # Что выполняется
11:57:17 up  2:01,  2 users,  load average: 0,26, 0,46, 0,58
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
alex     tty7     :0               10:14    2:01m  9:03   0.31s /sbin/upstart -
alex     pts/6    :0.0             11:57    0.00s  0.02s  0.00s w

```

Переключится на другого пользователя
Суперпользователь - это роль
~~~bash
sudo -i
~~~

docker run -it --name ubuntu-18.04 -p 127.0.0.1:22:22 ubuntu:latest
docker run -it --name debian-10 debian:10
docker run -it --name centos-8 centos:8
docker run -it --name alpine-3 alpine:3
docker run -it --name fedora-31 fedora:31

docker exec -it ubuntu-18.04 /bin/bash
docker exec -it debian-10 /bin/bash
docker exec -it centos-8 /bin/bash
docker exec -it alpine-3 /bin/ash
docker exec -it fedora-31 /bin/bash

apt-get update && apt-get install ssh vim -y
service ssh start
useradd -p 456 -m alex

useradd -p 123 -m test

ssh alex@172.17.0.2

## Утилиты для манипуляции пользователями и группами

### Пользователь

#### useradd

ubuntu
~~~bash
useradd -D 
GROUP=100
HOME=/home
INACTIVE=-1
EXPIRE=
SHELL=/bin/sh
SKEL=/etc/skel
CREATE_MAIL_SPOOL=no
~~~
centos
~~~bash
useradd -D 
GROUP=100
HOME=/home
INACTIVE=-1
EXPIRE=
SHELL=/bin/bash
SKEL=/etc/skel
CREATE_MAIL_SPOOL=yes
~~~

usermod
userdel
pwck
pwconv
pwunconv
passwd
ehfn
chsh
chage

### Группа

groupadd
groupdel
groupmod
gpasswd
