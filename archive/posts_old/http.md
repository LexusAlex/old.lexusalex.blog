---
published: false
---
http
Клиент http://164.16.98.23 request
Сервер http://87.250.250.242/ response

роль клиент - сервер

Локальный справочник /etc/hosts
DNS

Порты от 1 до 65535

Любой пакет содержит ip адрес и номер порта получателя

http 80
https 443

если сервер не ответил значит порт не слушается сервером, процесс не

http одноразовый протокол

Proxy кеширующие серверы

GET получить
PUT загрузить
PATCH в документе заменить какие - нибудь данные, правка
DELETE удалить документ
HEAD получить заголовки
POST отправка нового контента
CONNECT получить информацию о соединении
TRACE получить информацию о соединении
OPTIONS список доступных методов для адреса Allow: GET, OPTIONS, HEAD

1. Безопасные методы - это методы для чтения GET HEAD OPTIONS PUT DELETE - идемпотентные
2. Не безопасные методы - POST PATCH - не идемпотентные методы опасные методы

http://httpbin.org/

1×× Informational
100 Continue
101 Switching Protocols
102 Processing

2×× Success
200 OK
201 Created
202 Accepted
203 Non-authoritative Information
204 No Content
205 Reset Content
206 Partial Content
207 Multi-Status
208 Already Reported
226 IM Used

3×× Redirection
300 Multiple Choices
301 Moved Permanently
302 Found
303 See Other
304 Not Modified
305 Use Proxy
307 Temporary Redirect
308 Permanent Redirect

4×× Client Error
400 Bad Request
401 Unauthorized
402 Payment Required
403 Forbidden
404 Not Found
405 Method Not Allowed
406 Not Acceptable
407 Proxy Authentication Required
408 Request Timeout
409 Conflict
410 Gone
411 Length Required
412 Precondition Failed
413 Payload Too Large
414 Request-URI Too Long
415 Unsupported Media Type
416 Requested Range Not Satisfiable
417 Expectation Failed
418 I'm a teapot
421 Misdirected Request
422 Unprocessable Entity
423 Locked
424 Failed Dependency
426 Upgrade Required
428 Precondition Required
429 Too Many Requests
431 Request Header Fields Too Large
444 Connection Closed Without Response
451 Unavailable For Legal Reasons
499 Client Closed Request

5×× Server Error
500 Internal Server Error
501 Not Implemented
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
505 HTTP Version Not Supported
506 Variant Also Negotiates
507 Insufficient Storage
508 Loop Detected
510 Not Extended
511 Network Authentication Required
599 Network Connect Timeout Error

GET /get HTTP/1.1
Host: httpbin.org



