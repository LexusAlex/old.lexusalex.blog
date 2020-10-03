---
published: false
---
- Основные понятия и конструкции
- Что же это за типы и что же это за классы
- Синтаксис классов
- Поля и методы объекта
- Области видимости. Какие когда предпочесть
- Статические и динамические элементы
- Плюсы и минусы строгой типизации
- Всё ли можно запихнуть в класс
- Всё ли порождённое из класса является объетом
- Виды объектов и их отличия от «необъектов»

Типизация

------

Нельзя делать вычисления со значениями с разными типами данных.

Языки со строгой типизацией заставляют думать какие типы ему нужны.
Учитывать сюрпризы которые сами преобразуют типы.

Преобразование типов php
Строгая типизация благо.
Включать ошибки на сервере обязательно

Если есть всего один способ и он правильный, это приятнее, чем если есть десять способов, половина из которых неправильные.

Пишите код так, как будто с ним работает маньяк, который знает где вы живёте.
Пишите код, за который вам не будет стыдно

Создавать типы с человеческими названиями, собственные типы данных, ими можно моделировать любые задачи
Point
Vector
Table
Lamp

Чем меньше кода нужно менять в программе, чтобы ее изменить, тем она гибче.

Уровневое проектирование

------

Синтаксис написания классов

Модификаторы доступа
public
private
protected

Для методов можно не указывать модификатор доступа, но лучше их указывать.

операто new - Создает новый экземпляр объекта в оперативной памяти.

Сам класс это просто объявление типа, его нельзя никуда присвоить

student1 = student2
student1 = null
unset(student2)

// Код для генерации ошибки
if (empty($firstName)) {
throw new InvalidArgumentException('Введите имя');
}
if (empty($lastName)) {
throw new InvalidArgumentException('Введите фамилию');
}

Приватные поля и уже внутри присваивать как нужно.

private fname
private lname

Чтобы получить приватные поля нужно сделать для них геттеры

public getFirstName()
{
    return $this->firstName();
}

// Конструктор запускается при создании объекта

public function __construct($fn, $ln) 
{
    $this->fn = $fn
    $this->ln = $ln
}

new Student('Ivanov', 'Petya); // Теперь это полноценная сущность

В php не существует перегрузки методов, то есть нельзя создать два метода с
одинаковым названием. Это решается параметрами значением по умолчанию.
Все необязательные параметры указываются в конце.

__destruct() запускается при завершении программы
__get доступ к полю которого нет в объекте
__set запись в свойство которого нет в объекте
__isset проверка на isset
__unset удаление несуществующего поля

Можно эмулировать резиновый объект

new stdClass(); встроенный резиновый обьект
Php автоматически создает поля если их нет

__call Срабатывает когда мы вызывает метод которого нет в объекте
__toString Запускает когда объект выводим как строку
__invoke запускается если объект вызываем как функцию


Константы их можно использовать в классе
class Student {
    consts TYPE = 1;
    self::TYPE
}

Student::TYPE

Статические поля принадлежат классу и выводятся только в одном экземпляре
public static $val Присваивается переменной один раз
self::$val;
Student::val = 15 // Обращение снаружи Поле будет жить в одном экземпляре

В сам объект попадают только обычные поля и методы. Статические поля никуда 
не попадают.

Статические поля используют редко, а если используют то хранят в нем настройки.

// Статический метод принадлежит классу
public static function getTypeList()
    {
        return [
            self::TYPE_OCHN => 'Очный',
            self::TYPE_ZAOCHN => 'Заочный',
        ];
    }
self::getTypeList();    
Student::getTypeList() // можно вызвать без создания объекта
В статические методы удобно помещать те данные которые к объекту не принадлежат, но имеют отношение к нему.
Если методу нужен текущий объект, то метод делать обычным, если не нужен, то статическим.

Удобно делать вспомогательный конструктор, если требуется

public static function createOchn($name)
{
    return new self($name, self::TYPE_OCHN);
}

Статические методы работать как чистые функции, они должны работать только на чтение

Можно запретить создать объект и сделать конструктор приватным если нужно
private function __construct () {}

----------

Куча статических методов пихают в AR что не правильно.
Нужно абстрагировать и избегать монолитного кода.

Нужно реализовать хранилище, то есть вынести в отдельный класс
class StudentRepository
    __construct($file)
    findAll()
    saveAll()
Репозиторев может быть несколько, все они завязаны на студентах.
Но чистый класс должен быть один.

class TXTStudentsRepository 
class XMLStudentsRepository

----------------------------------
Этот паттерн называется репозиторий. 
-----------------------------------

Разделили хранилище от чистого кода.
Нужно разделять код по ящикам.

TODO - Нарисовать схему паттерна Репозиторий.

RepositoryFactory::create($type, $file) Простая фабрика

----------------------------------

Люди боятся большого кол-ва классов, но если программировать правильно то все будет впорядке

mb_strtoupper($srt, UTF-8)

class StringHelper {
    public static function ()
}

Если нужны настройки, то следует все статичные данные вынести в настройки
Создавать их можно через конструктор, так удобнее.

Все классы которые оказывают услуги, считают что-то и тд называют СЕРВИСАМИ.
Функция с некими настройками
StaffService 

Объединять сущности в группы, в один объект.
От массивов переходим к объектам, вернее к структурам данных, появляется типизация
разбиваем по ответственностям.

Полноценный объект содержит еще и методы, поведение какое-нибудь

class Name {
    public $first;
    public $last;
}

DTO // Data Transfer Object

$employee->name->getFull() . PHP_EOL

Закрыть все поля от перезаписи, сделать геттеры

generateId()
find()
isEqualTo()
и осмысленные сеттеры 
changePhone()
rename()
changeAddress()
changeEmployeePhone()


// Как правильно формировать класс

<?php

namespace lesson02\example3\demo19;

##############################

class Name
{
    public $first;
    public $last;

    public function __construct($first, $last)
    {
        $this->first = $first;
        $this->last = $last;
    }

    public function getFull() {
        return $this->last . ' ' . $this->first;
    }
}

class Phone
{
    public $code;
    public $number;

    public function __construct($code, $number) {
        $this->code = $code;
        $this->number = $number;
    }

    public function isEqualTo(Phone $phone)
    {
        return $this->code == $phone->code && $this->number == $phone->number;
    }
}

class PhonesCollection
{
    private $phones;

    public function __construct(array $phones) {
        foreach ($phones as $phone) {
            if (!$phone instanceof Phone) {
                throw new \InvalidArgumentException('Incorrect phone.');
            }
        }
        $this->phones = $phones;
    }

    public function add(Phone $phone)
    {
        foreach ($this->phones as $item) {
            if ($item->isEqualTo($phone)) {
                throw new \Exception('Phone already exists.');
            }
        }
        $this->phones[] = $phone;
    }

    public function remove(Phone $phone)
    {
        foreach ($this->phones as $i => $item) {
            if ($item->isEqualTo($phone)) {
                unset($this->phones[$i]);
                return;
            }
        }
        throw new \Exception('Phone not found.');
    }

    public function getAll()
    {
        return $this->phones;
    }
}

class Address
{
    public $country;
    public $region;
    public $city;
    public $street;
    public $house;
    public function __construct($country, $region, $city, $street, $house) { }
}

class Employee
{
    private $id;
    private $name;
    private $phones;
    private $address;

    public function __construct($id, Name $name, PhonesCollection $phones, Address $address) {
        $this->id = $id;
        $this->name = $name;
        $this->phones = $phones;
        $this->address = $address;
    }

    public function getId() { return $this->id; }
    public function getName() { return $this->name; }
    public function getPhones() { return $this->phones->getAll(); }
    public function getAddress() { return $this->address; }

    public function rename(Name $name)
    {
        $this->name = $name;
    }

    public function addPhone(Phone $phone)
    {
        $this->phones->add($phone);
    }

    public function removePhone(Phone $phone)
    {
        $this->phones->remove($phone);
    }

    public function changeAddress(Address $address)
    {
        $this->address = $address;
    }
}

##############################

class StaffService
{
    public function recruitEmployee(Name $name, Phone $phone, Address $address)
    {
        $employee = new Employee($this->generateId(), $name, new PhonesCollection([$phone]), $address);
        $this->save($employee);
        return $employee;
    }

    public function addEmployeePhone($id, Phone $phone)
    {
        $employee = $this->find($id);
        $employee->addPhone($phone);
        $this->save($employee);
    }

    public function removeEmployeePhone($id, Phone $phone)
    {
        $employee = $this->find($id);
        $employee->removePhone($phone);
        $this->save($employee);
    }

    private function generateId() {
        return rand(10000, 99999);
    }

    private function find($id) {
        return null;
    }

    private function save($employee)
    {
        $file = __DIR__ . '/data/employee_' . $employee['id'] . '.php';
        file_put_contents($file, '<?php return ' . var_export($employee, true) . ';');
    }
}

##############################

$service = new StaffService();

$empoyee = $service->recruitEmployee(
    new Name('Вася', 'Пупкин'),
    new Phone(7, '92000000000'),
    new Address('Россия', 'Липецкая обл.', 'г. Пушкин', 'ул. Ленина', 1)
);

echo $empoyee->getName()->getFull() . PHP_EOL;

--------------------

Как тестировать 

Создать класс замены для тестирования

Разбивать по классам

DTO - Промежуточный объект перед тем как сохранить куда то

Сеттеры в объектах  - это антипаттерн, их практически нет
Программируем ровно то что нужно

ООП - это когда можно заменить все без потери работоспособности