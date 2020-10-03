---
published: false
---
/lib/x86_64-linux-gnu/libc.so.6 Получить версию библиотеки с

https://www.youtube.com/watch?v=P18_wphhrQ4&t=2471s

Программа обязательно должна вернуть 0 в случае успеха
```text
#include <stdio.h>
#define N 100
int global;
char *string = "string";

extern int f();
int main() {
    printf("Hello\n");
    return 0;
}
```

сс main.c // в результате появится фаил a.out фаил можно запустить
gcc
cc -v main.c // показать

Препроцессор

Высокоуровневый язык превращает в низкоуровневый
 
1 стадия компиляции cc1 берет исходных текст и во временном каталоге появляется 
промежуточный результат из main.с в ассемблер cc6Nunux.s
Симлирование из ассемблера в обьектный модуль
Линковка collect2 crt1.o crtn.o
Динамические расширяемые библиотеки

Остановка после
gcc -E main.c // препроцессор
gcc -S main.c // асемблирование
gcc -c main.c // обьектный модуль

a.out
gcc -o main main.c
strip main удалить ненужную информацию из программы
./main

// при многомодульной сборке указываем все модули
gcc -o main.c f.c

Нужно отельно компилировать главный модуль, отдельно все зависящие от него
gcc -o main.о f.о

Сборщик make, удобно собирать программу
Первая цель по умолчанию
~~~makefile
CFLAFS=-Wall -pthread

main : main.o f.o
~~~

make main
file main

// какие библиотеки использует программа
ldd main

API LINUX

ltrace трассировщик библиотечных вызывов

process.c

~~~c
#include <stdio.h>
#include <stdlib.h>

int global;
int Global = 0;
const int GLOBAL = 0xdead
int main(int argc, char *argv[]) {
    int i;
    int *g = &GLOBAL
    # адрес с памяти глолбальной переменной
    printf("global -> %x\n", (unsigned int)&global);
    printf("Global -> %x\n", (unsigned int)&Global);
    printf("GLOBAL -> %x\n", (unsigned int)&GLOBAL);
    printf("i -> %x\n", (unsigned int)&i);
    printf("argc -> %x\n", (unsigned int)&argc);
    printf("argv -> %x\n", (unsigned int)&argv);
    printf("main -> %x\n", (unsigned int)&main);

    *g = -1; // присвоение по указателю
for (;;);
    exit(0);
}
~~~

fork.c

~~~
#include <stdio.h>
#include <unistd.h>

void parent(void) {
    for (;;) printf("parent\n");
}

void child(void) {
    for (;;) printf("child\n");
}
int main() {
    int pid;
    pid = fork();

    if(pid == 0) {
        child();
    }
    else {
        parent();
    }

    return 0;
}
~~~

thread.c

~~~
#include <stdio.h>
#include <unistd.h>
#include <pthread.h>

int global = 0xdead;
void* one(void* arg) {
    for (;;) {
        global--
        printf("one%x\n", global);
    } 
}

void* two(void* arg) {
   for (;;) {
           global++
           printf("two%x\n", global);
       } 
}

int main() {

    pthread_t tid;
    
    pthread_create(&tid, NULL, one, NULL);
    pthread_create(&tid, NULL, two, NULL);

    pthread_join(tid, NULL);
    return 0;
}
~~~
#include <stdio.h>
#include <stdlib.h>
#include <gnu/libc-version.h>

int main() {
    printf("libc -> %x\n",gnu_get_libc_version());
    return 0;
}

ОС контролирует , если записать данные куда нельзя будет ошибка сегментирования
Компилятор и нужен для того чтобы проверять нас

