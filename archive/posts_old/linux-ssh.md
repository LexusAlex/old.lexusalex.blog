---
published: false
---
docker run --name debian-ssh -it -p 22:22 -d debian:10
docker exec -it debian-ssh /bin/bash

SSH
Устанавливает защищенное соединение

sudo apt install openssh-server на сервере
service sshd status
xubuntu 16 - 192.168.88.252 client

ubuntu18 - 192.168.88.236 server

ssh 192.168.88.236 Узел прислал ключ и предлагает нам проверить этот тот узел или нет
The authenticity of host '192.168.88.236 (192.168.88.236)' can't be established.
ECDSA key fingerprint is SHA256:8w3MOlKaq9OQp7fDYSflwpYoddFQHeG6Qjze+ks2RRs.
Are you sure you want to continue connecting (yes/no)? no

Host key verification failed.

Допустим мы не уверены что - это наш узел
Если мы администратор этого сервера нужно узнать действительно это наш ключ

Идем на сервер

Служба ssh работает в виде демона /usr/sbin/sshd

dpkg -S /usr/sbin/sshd

openssh-server
dpkg -S openssh-server
dpkg -L openssh-server

/etc/ssh

ssh_host узловые ключи сервера

-rw-------  1 root root    668 мар  7 08:41 ssh_host_dsa_key
-rw-r--r--  1 root root    603 мар  7 08:41 ssh_host_dsa_key.pub
-rw-------  1 root root    227 мар  7 08:41 ssh_host_ecdsa_key
-rw-r--r--  1 root root    175 мар  7 08:41 ssh_host_ecdsa_key.pub
-rw-------  1 root root    399 мар  7 08:41 ssh_host_ed25519_key
-rw-r--r--  1 root root     95 мар  7 08:41 ssh_host_ed25519_key.pub
-rw-------  1 root root   1675 мар  7 08:41 ssh_host_rsa_key
-rw-r--r--  1 root root    395 мар  7 08:41 ssh_host_rsa_key.pub

узнать fingerprint ключа можно утилитой убеждаемся что это тот узел
ssh-keygen -l -f /

ssh-keygen -l -f /etc/ssh/ssh_host_ecdsa_key.pub
256 SHA256:8w3MOlKaq9OQp7fDYSflwpYoddFQHeG6Qjze+ks2RRs root@ubuntu18 (ECDSA)

ssh 192.168.88.236
The authenticity of host '192.168.88.236 (192.168.88.236)' can't be established.
ECDSA key fingerprint is SHA256:8w3MOlKaq9OQp7fDYSflwpYoddFQHeG6Qjze+ks2RRs.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '192.168.88.236' (ECDSA) to the list of known hosts.
Сам публичный ключ будет записан в фаил, если возникает проблема при подключении нужно
удалить строку в этом файле

~/.ssh/known_hosts

При каждом подкючении ssh  проверяет тоже самое присылается или нет

~. закрыть соединение ssh

Допустим у нас потеряны все ключи сервера
sudo rm ssh_host_*

ssh-keygen -A Перегенерировать хост ключи
Пробуем подключится и получаем, говорит о том что ключи на сервере поменялись

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ECDSA key sent by the remote host is
SHA256:20DCnF/vDbuyIi5pAX4D4Cz2GXkF+Sd0IhaTyT20f/Q.
Please contact your system administrator.
Add correct host key in /home/alex/.ssh/known_hosts to get rid of this message.
Offending ECDSA key in /home/alex/.ssh/known_hosts:35
  remove with:
  ssh-keygen -f "/home/alex/.ssh/known_hosts" -R 192.168.88.236
ECDSA host key for 192.168.88.236 has changed and you have requested strict checking.
Host key verification failed.

Как это исправить, удалить ключ вручную или командой с указанием строки
sed -i '75d' /root/.ssh/known_hosts

Скопировать фаил на удаленный хост scp CNAME alex@192.168.88.236:/tmp
Копирует только файлы scp lexusalex.github.io/* alex@192.168.88.236:/tmp/alex

rsync -av lexusalex.github.io/* alex@192.168.88.236:/tmp/alex скопировать все
Копируются только измененные файлы

2048/8 = 256 символов

Сгенерировать ключ для сервера у себя на машине

ssh-keygen -t rsa -b 4096 -C "alexsey_89@bk.ru"

далее добавить публичный ключ в аккаунт на гибхабе, добавляются только публичные ключи

Чтобы удаленный сервер получил наш ключ нужно скопировать туда публичный ключ

ssh-copy-id alex@192.168.88.236
Эта команда создаст фаил автоматически
будет скопированы все публичные ключи на удаленный сервер создася файил authorized_keys с публичными \ ключами

scp id_rsa_github.pub alex@192.168.88.236:

Здесь придется вручную добавлять ключ в authorized_keys
после этого можно удалить ключ с сервера

Если задана passphrase возможно зададь держать ее в оператичной памяти
eval `ssh-agent`
Agent  pid 123

ssh-add

https://hackware.ru/?p=10059

https://linux-notes.org/kak-ispol-zovat-komandu-fdisk-na-linux/

Мы полагаем, что ваш системный администратор изложил вам основы
безопасности. Как правило, всё сводится к трём следующим правилам:

    №1) Уважайте частную жизнь других.
    №2) Думайте, прежде что-то вводить.
    №3) С большой властью приходит большая ответственность.


