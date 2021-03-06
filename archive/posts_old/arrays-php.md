---
published: false
---
Массивы в php

Массив в php - это список элементов, коллекция состоящая из пар ключ => значение,  набор однотипных элементов.

Массив - это динамическая структура

индекс последнего элемента `$animals[count($animals) - 1]`
размер массива `count($animals)`

`unset($animals[1]);`
В общем случае уменьшение размера массива — нежелательная операция

В общем случае, правильно всегда проверять доступность индекса и никогда не обращаться к массиву за его границами.

`array_key_exists ( mixed $key , array $array ) : bool` проверка существования индекса часто используют `isset()`

null coalescing operator `$value = $matrix[3] ?? $matrix[3][8] ?? 'x';`

Частая операция при работе с массивами - это итерация по элементам

Оптимальный вариант

~~~php
for ($i = 0, $length = count($colors); $i < $length; print($i), $i++) {
  print_r("{$colors[$i]}\n");
}
~~~

при таком for будет ошибка Начальное значение $i выходит за границу массива

~~~php
for ($i = count($userNames); $i >= 0; $i--) {
  print_r("{$userNames[$i]}\n");
}
~~~

писать нужно так `$i = count($userNames) - 1`

частые ошибки - это неизвестный индекс ` Undefined offset: 26`

Частая задача - нужно из исходного делать новый массив

### Структура данных - массив

Это соответствие между ключом и значением,его еще называют коллекцией, определить массив можно так
~~~php
$array = array();
$array = [];
~~~

Ключом массива может быть строка или число, другие типы будут преведены к строке или к числу. 
Каждый элемент массива имеет индекс(порядковый номер) начинающийся с 0, например

~~~php
$array = [1, 2, 3];
$array = ['one', 'two', 'three'];
$array = [0 => 'one', 1 => 'two', 2 => 'three'];
~~~
Так же ключи можно указать вручную. 
Если ключи однородные то, все значения будут перезаписаны, итоговым значением будет последнее.
Если ключи указаны мзборочно, то следующим ключом будет следующий за последним

~~~php
$array = [0 => 'one', 9 => 'two', 'three'];

array (size=3)
  0 => string 'one' (length=3)
  9 => string 'two' (length=3)
  10 => string 'three' (length=5)
~~~

Получить доступ к элементам можно с помощью квадратных скобок

~~~php
$array = ['one', 'two', 'three'];

echo $array[2]; //'three'
~~~

Определяем размер массива

Проверить
Выход за границу массива
Остановка цикла
переворот массива
function reverseArray($coll) 
{
    $size = sizeof($coll);
    $maxIndex = floor($size / 2);
    for ($i = 0; $i < $maxIndex; $i++) {
        $mirrorIndex = $size - $i - 1;
        $temp = $coll[$i];
        $coll[$i] = $coll[$mirrorIndex];
        $coll[$mirrorIndex] = $temp;
    }
    
    return $coll;
}

print_r(reverseArray([3, 2]));
print_r(reverseArray([3, 56, 2]));
print_r(reverseArray(['one', 'two', 'three', 'four']));

На уровне хранения, понятия массив не существует. 
Массив представляется цельным куском памяти, 
размер которого вычисляется по формуле "количество элементов * количество памяти под каждый элемент".
