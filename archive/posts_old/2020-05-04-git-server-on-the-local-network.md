---
layout: post
title: Git сервер в локальной сети
permalink: git-server-on-the-local-network
tags: git linux
comments: true
subtitle: Разворачиваем простой git сервер на debian
summary: Небольшой мануал, о том как развернуть git сервер у себя в локальной сети.
cover_url: "/assets/images/articles/git/git-server.png"
is_navigate: true
published: false
---

GIT сейчас является самой популярной системой контроля версий исходного кода.

Проектов накапливается много и они становятся разношерстными.

Работаем на разных машинах и в разных операционных системах, появляется потребность в централизованном хранилище. 
Оно позволяет не только хранить проекты, но и распространять. 

Для этих целей существует отличный сервис как [Github](https://github.com/), но мы будем использовать собственный git сервер.

Настройка собственного решения позволит нам создавать репозитории без ограничений и в любых размерах и количествах.

### Место куда ставить ОС

Это может быть отдельный компьютер в локальной сети, виртуальная машина или даже docker контейнер.
У меня сервер будет крутиться на виртуальной машине VMware Workstation.

### Установка ОС

В качестве операционной системы подойдет любой дистрибутив linux.

Я буду использовать debian 10. 
Скачать его можно с [сервера яндекса](https://mirror.yandex.ru/debian-cd/), выбрав версию и тип процессора.
В моем случае актуальная версия `10.3.0`, процессор `amd64`. Далее минимальный образ `/bt-cd/debian-10.3.0-amd64-netinst.iso.torrent`.

При установке создайте локального пользователя git.

Итак: имеем установленную систему. Пришло время ее настроить.

### Настройка git сервера

Подразумевается, что установлен чистый debian без лишнего софта.

Зайдем в систему под пользователем git.

Установим команду `sudo`, чтобы иметь возможность повышать свои привилегии до суперпользователя, 
но сначала нужно им стать. Для этого установим необходимый пакет

```bash
su - # Обязательный - в конце
Пароль: 
root@git:/home/git apt-get install sudo
```

Далее нужно разрешить нашему пользователю git выполнять команды от root, путем добавления пользователя в дополнительную группу `sudo`

```bash
usermod -aG sudo git
```

Чтобы проверить, что пользователь был добавлен в группу `sudo` нужно вновь войти в систему и выполнить команду

```bash
id
#uid=1000(git) gid=1000(git) группы=1000(git),24(cdrom),25(floppy),27(sudo),29(audio),30(dip),44(video),46(plugdev),109(netdev)
```

Все в порядке! Теперь нужно обновить систему до последней версии

```bash
sudo apt-get update -y
sudo apt-get upgrade -y
```

Ставим необходимые пакеты

```bash
sudo apt-get install openssh-server git vim
```

Наши репозитории будут храниться в домашнем каталоге пользователя git в `/home/git`

Теперь настроим доступ по ssh на сервер по ключу. 

Для этого в каталоге `/home/git` создадим папку `.ssh` и файл `authorized_keys` с ключами авторизованных пользователей и назначим им нужные права

```bash
mkdir -p ~/.ssh && chmod 0700 ~/.ssh
touch ~/.ssh/authorized_keys && chmod 0600 ~/.ssh/authorized_keys
```

В качестве примера создадим тестовый репозиторий

```bash
git init --bare ~/test.git
```

На сервере должен быть статический ip адрес. В моем случае он такой 192.168.88.230.

На этом настройка git сервера закончена. Переходим к клиенту.

### Настройка клиента

Под клиентом подразумевается пользователь на любой операционной системе, где установлен git и есть терминал.

*Скачать git можно с официального сайта [https://git-scm.com](https://git-scm.com/download/)*

Для подключения к нашему серверу git нужно сгенерировать пары ключей у себя на машине в linux. Это делается так:

```bash
ssh-keygen -t rsa -b 4096 -C "email@text.ru"

# Закрытый и открытый ключ соответственно
#id_rsa_git_local
#id_rsa_git_local.pub
```

Если ключи уже были сгенерированы, то теперь публичный ключ нужно передать на сервер и занести в файл `~/.ssh/authorized_keys`

Скопировать ключ на сервер и занести в файл `~/.ssh/authorized_keys` можно командой

```bash
ssh-copy-id -i ~/.ssh/id_rsa_git_local.pub git@192.168.88.230
```

Если такой возможности нет, то вручную, просто вывести файл

```bash
cat ~/.ssh/id_rsa_git_local.pub
```

и скопировать его содержимое в файл `~/.ssh/authorized_keys` на сервере.

Еще вариант с подключением к серверу по ssh

```bash
cat ~/.ssh/id_rsa_git_local.pub | ssh git@192.168.88.230 'cat >> ~/.ssh/authorized_keys'
```

Удалить ключ на сервере можно командой

```bash
sed -i '1d' ~/.ssh/authorized_keys
```
с указанием строки.

Работаем с нашим тестовым репозиторием `test.git`.

Предположим на машине конечного пользователя проект размещен здесь `/home/alex/test/`, хотя это не важно.

Переходим в эту директорию и добавляем адрес внешнего репозитория в наш локальный

```bash
git remote add origin git@192.168.88.230:test.git
```

Если нужно заменить адрес репозитория воспользуемся командой

```bash
git remote set-url origin git@192.168.88.230:test.git
``` 

Пишем код, делаем коммиты, создаем ветки и отправляем в репозиторий

```bash
git push -u origin master
```

Если нужно развернуть уже созданный проект, то клонируем его 

```bash
git clone git@192.168.88.230:test.git
```

Создать новый репозиторий на сервере можно так, действуем от лица пользователя git:

```bash
ssh git@192.168.88.230 'git init --bare ~/repo_test.git'
```

Если все настроено правильно, должно работать без проблем.

### Итог

Таким образом поднять свой сервер не составит особых проблем. 
Конечно, есть куда стремится путем совершенствования сервера.

Из очевидных плюсов:

- Мы не ограничены при работе с git.
- Настраиваем сервер под себя.
- Легко добавить нового пользователя, для ведения проектов, указав его публичный ключ в файле `~/.ssh/authorized_keys`.
- При желании можно разрешить доступ к вашему репозиторию из вне.
