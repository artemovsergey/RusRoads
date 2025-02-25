
# Пакеты для добавления в ИЛ

Расширения для vscode:
- C#
- C# Extensions
- Angular Language Service
- REST Client
- Nuget Gallery

Backend (.NET 9):
- Swashbackle.Swagger
- Microsoft.IdentityModel.Tokens (8.3.1)
- System.IdentityModel.Tokens.Jwt (8.3.1)
- Microsoft.AspNetCore.Authentication.JwtBearer(9.0.1)
- Microsoft.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.Tools
- Microsoft.EntityFrameworkCore.Design
- Npgsql.EntityFrameworkCore.PostgreSQL
- AutoMapper

Frontend (Angular):
- @angular/cli
- @angular/material
- @angular/cdk
- @angular/service-worker
- material-design-icons-iconfont
- @ng-bootstrap/ng-bootstrap
- ngx-bootstrap
- ngx-toastr
- xml2js
- primeng
- angularx-qrcode
- @swimlane/ngx-graph

Мобильное приложение (Kotlin):
- com.jakewharton.retrofit:retrofit2-kotlinx-serialization-converter:1.0.0
- com.squareup.retrofit2:retrofit:2.11.0
- io.coil-kt:coil-compose:2.7.0
- org.jetbrains.kotlinx:kotlinx-serialization-json:1.8.0
- androidx.navigation:navigation-compose:2.8.7
- org.jetbrains.kotlinx:kotlinx-coroutines-android:1.8.0
- com.google.accompanist:accompanist-swiperefresh:0.32.0
- com.google.accompanist:accompanist-placeholder:0.32.0

# Подготовка день С-1

- настроить горячие клавиши VsCode
- установить пакеты .net, angular, kotlin, проверить базу и гит
- проверить dotnet-ef для миграций
- проверить angular
- проверить pwa
- проверить Android Studio и подключение к базе данных через Retrofit
- если останется время, сразу делать первую сессию и настраивать окружение

# Сессия 1

.net 9

- создать папку ```RusRoads``` и перейти в нее
- создать решение dotnet new sln
- создать проект webapi ```RusRoads.API``` с флагом ```-controllers``` и 
- добавить проект api в решение
- в api добавить gitignore
- открыть в vscode папку ```RusRoads```(code .)
- почистить проект api от файлов по умолчанию
- поставить пакет для Swagger и подключить в Program
- в папке ```Entities``` создать основные модели предметной области
- продумать все свойства, типы, ограничения и связи
- прописать ограничения на чистом sql в dbeaver (на мобильный телефон сотрудника, день рождения,
проверка,что руководитель и помощник, рабочий телефон, email, кабинет
из этого же подразделения)
- в папку ```Data``` создать контекст ```RusRoadsContext```
- настроить подключение к базе данных (через первичный конструктор)
- провести начальные миграции
- внести по 3 тестовые осмысленные записи для каждой таблицы
- импорт подразделений и сотрудников через Dbeaver

- компирование из Excel в Dbeaver работает нормально при Ctrl + Shift + V и поставить "Вставить множество строк"
- возможно понадобиться ручное обновление счетчика автоинкремента

```
ALTER SEQUENCE "Subdivisions_Id_seq" RESTART 48;
```

- импорт данных производственного календаря
- создание модели для производственного календаря
- сделать backup обязательно и проверить, что он работает
- реализация API(модель ошибки, статус коды, dto, automapper)
- все методы, кроme sign, защитить [Authorize]
- в Program настроить перевод с camelCase на snake_case
- настройка jwt аутентификации
- проверить в Swagger, Postman, http

# Сессия 2

- создать приложение Angular ```ng new RusRoads.Angular --skip-tests```
- настроить маршрутизацию app.routes.ts
- определить ```EmployeeDto``` и ```SubdivisionsDto```
- в API добавить crud контроллер на ```Employee```
- в API создать crud ```Subdivision``` контроллер
- в ```SubdivisionsController``` создать конечную точку по выводу сотрудников по id подразделения, включая дочернии подразделения

- распределить главный компоннет ```App``` на header и два контейнера, в одном структура подразделений, а в другом сотрудники

- в папке ```models``` создать модели ts для основных сущностей, сервисы
- в папке ```services``` создать основные сервисы командой ng g s [name] 
- создать компонент ```subdivision``` в котором вывести все подразделения
- у компонента ```subdivision``` должен быть горизонтальный и вертикальный скролл
- минимум надо вывести в древовидном(иерархичном виде) подразделения c помощью ```angular material tree```
- максимум в виде прямоугольников по уровням и со стреками
(надо посмотреть @swimlane/ngx-graph)
- логика: при клике на подразделение в компоненте ```subdivision``` в правой части отображаются сотрудники. Это передача данных между компонентами через сервисы. Сервис работает как синглтон
- каждый сотрудник представляет собой ```компонент сотрудника``` (карточка сотрудника)
- при клике отображается подробные сведения по сотруднику в виде модального окна(форма с полями только для чтения). При нажатии на "edit" можно редактировать
- также ест кнопка "+" это добавление сотрудника
- при редактировнии и добавлении валидация Angular с помощью ```reactive form```(проверка на длину телефон и кабинет, номера телефонов проверяются на отсутствие лишних символов, проверка на обязательные поля, email проверяется по шаблону)
- руководитель и помощник в выпадающем списке выбираются из сотрудников выбранного подразделения
- при успешной операции - вызов отдельного компонента как модальное окно как подтвержение или просто "Ok"
- в окне добавления и редактирования есть еще область с выводом списка событий сотрудника
обучений, отпусков и отгулов
- сортировка событий происходит по дате (от новых)
- фильтрация с множественным выбором: прошедние, текущие (промежуток дат у события включает сегодняшний день), будующие
- по умолчанию отображены текущие и будующие события
- валидация на обязательность полей
- валидация на диапазон дат (дата окончания не может быть меньше даты начала)
- валидация на пересечение дат(отпуск и отгул, отгул и обучение)
- при добавлении отгула учитывается производственный календарь
- при добавлении отгула валидация на выходной день
- надо сгруппировать (GROUP BY можно применить в запросе) вывод событий список по типу события(отпуск, отгул, обучение)
- поля объекта события: дата, краткое обоснование
- добавление события в новом модальном окне
- валидация Angular на добавление события

- удаление(увольнение) сотрудника. По факту это не удаление, а изменение атрибута у модели сотрудника (поле в бд)
- запрет на увольнение при наличии будующих обучений
- при увольнении удаляются списки будующих отгулов и отпусков
- при увольнении ставится завершение работы с БД с текущей датой  // currentDate - cancelDateJob <= 0
- сотрудники уволенные в течении последних 30 дней, отображаются серым
- сотрудники уволенные больше 30 дней назад не отображаются

# Сессия 3 

- на основе описания предметной области создать ```wareframe``` в draw.io

- Отображение перечня всех проектов компании реализовано плиткой в виде портфеля проектов
- Цветовая индикация позволяет определить тип проекта, статус, исполнителя (отдел из оргструктуры)
- Реализована страница с перечнем этапов разработки проекта в виде доски (kanban| диаграмма ганта| User Story map| time-tracker) и их параметрами, структурированными по этапам разработки проекта
- Реализовано модальное окно с сетевым графиком выбранного этапа
- Реализована карточка проекта
- Единый стиль в оформлении wireframe
- Реализован последовательный пользовательский интерфейс
- Предоставлен файл-исходник и .pdf


- создание 10 тест-кейсов
- Корректный позитивный тест проверки наличия руководителя проекта
- Корректный негативный тест проверки наличия руководителя проекта
- Корректный позитивный тест проверки правильности отображения сроков проекта
- Корректный негативный тест проверки правильности отображения сроков проекта
- Корректный позитивный тест проверки отображения этапов разработки проекта
- Корректный негативный тест проверки отображения этапов разработки проекта
- Корректный позитивный тест проверки отображения графического объекта с цветовой индикацией
- Корректный негативный тест проверки отображения графического объекта с цветовой индикацией
- Корректный позитивный тест проверки правильности формирования карточки проекта
- Корректный негативный тест проверки правильности формирования карточки проекта


- диаграмма деятельности (activity diagram) процесса просмотра, хранения и публикации корпоративных документов;
- Пользователи определены верно
- Начало и конец процесса определены
- Функции выделены верно и соответствуют заданию
- Последовательность функций определена верно и соответствует заданию
- Ветвления, слияния и синхронизации применены и соответствуют заданию
- Оформление диаграммы соответствует стандарту UML

- диаграмма последовательности (sequence diagram) процесса построения и отображения маршрутных карт согласования документов;
- Объекты определены верно
- Последовательность обмена информацией между объектами определена верно и соответствует заданию
- Методы выделены верно и соответствуют заданию
- Сообщения отражают корректный порядок обмена информацией между объектами
- Фрагменты диаграммы с необходимостью ветвления выделены с помощью соответствующих фреймов
- Оформление диаграммы соответствует стандарту UML

- диаграмма классов (class diagram) спроектированного сервиса.
- Основные сущности определены
- Атрибуты определены верно
- Операции определены верно
- Уровни видимости определены
- Связи определены верно
- Оформление диаграммы соответствует стандарту UML


# Сессия 4

- адаптивность экранов под width = 1920, 1110, 400
- создать модель ts для отображения новостей в angular
- по конкретному адресу получить rss, применить (xml2js) и через http клиент вывести обычным способом
- нужен компонент новостей и компонент новости(в виде плитки).
- Новость отображает наименование, дата, описание
- в ts модели новостей предусмотреть поле на вывода картинки с сервера тип string
- каждые 15 секунд делать запрос
- по внешнему API по другому адресу получить мероприятия(события). Завести модель и название выбрать, чтобы не пересекалось с event (события сотрудников)
- в карточке мероприятия(наименование, дата, автор, краткий текст и кнопка добавления в календарь)
- при нажатии на кнопку добавления в календарь формируется из данных этого события ```ics``` файл и отправлется на устройство отображая окно для выбора места хранения (применить пакет ics или сформировать вручную)

- далее просто выводится список сотрудников в виде горизонтального списка
- присутствует горизонтальный скролл (при большом количестве участников, если не помещается на экран)
- в карточке сотрудника должна быть кнопка для показа qrcode (angularx-qrcode)
- При нажатии на QR-код формируются данные в формате vCard
- При нажатии на кнопку QR-код отображается QR-код с данными работника

- поиск по всем полям в нескольких наборах данных
- поиск по новостям (заголовок, описание, дата)
- поиск по событиям (заголовок, описание, автор, дата)
- поиск по работникам (фио, должность, email, телефон, дата рождения)

- без учета регистра
- поиск при наборе данных
- результат по каждому блоке, если нет - информация о том, что не найдено
- при очистке запроса, все возвращается

Замечание: работа с компонентом календаря в 4 сессии нет

# Сессия 5

- создать приложение Jetpack Compose
- настроить зависимости
- настроить компоненты (функции Composable)
- настроить навигацию
- при отображении новостей необходимо использовать слайдер.
- изображение-заглушку пока загружается новостное изображение.
- при удержании элемента с новостью необходимо отображать окно с реакциями: положительной и отрицательной.
- при выборе реакции на сервер отправляется запрос и происходит пересчет реакций (если новости получают с внешнего API, то должна быть представлена конечная точка post)
- при отображении событий необходимо выводить отсортировав даты добавления событий от новых к ранним.
- при нажатии на звездочку должно происходить открытие окна добавления события в системный календарь телефона с заполненными полями.
- интерфейс на основе макетов

- реализация календаря
- Веб-приложение содержит блок Календарь
- Отображается календарь как на макете

- отобразить выходные дни, учитывая производственный календарь красным цветом
- текущий день выделен кружочком
- если у сотрудника день рождения - тортик на дате
- при наведении на тортик - показывает у кого день рождение

- логика подсветки событий в календаре
●	#FC4343 (красным) - в случае если в этот день >= 5 событий
●	#89FC43 (зеленым) - в случае если в этот день < 2 событий
●	#F8FC43 (желтым) - в случае если в остальных случаях

- календарь должен пролистывать месяцы
- отображаться, учитывая дни недели, с которых начинается месяц
- понедельник в первом столбце, а воскресенье в последнем


# Сессия 6

- диаграмма компонентов (архиектуры приложения) UML
- Основные модули представлены отдельными компонентами (в клиентском приложении при использовании серверного)
- Интерфейсы между модулями определены верно

- руководство пользователя
- презентация (pdf, pptx на git)



**Замечания**:

- компирование из Excel в Dbeaver работает нормально при Ctrl + Shift + V и поставить "Вставить множество строк"
- возможно понадобиться ручное обновление счетчика автоинкремента

```
ALTER SEQUENCE "Subdivisions_Id_seq" RESTART 48;
```

# Вопросы и предложения

- в 1 сессии в конечной точке API создания комментария изменить структуру входной модели comment. В задании это полный объект комментария.
- проверить внешний API и RSS на CORS (в прошлом году внешний API не давал подключиться веб-приложениям)
- при проверке веб и десктоп сделать равноправными (в критериях есть дополнительные баллы, если это конкретный тип приложения)
- в 5 сессии новости и события делать студентам? Потому, что в критериях написано про оценку добаления конечной точки API, но новости берутся из RSS, а мероприятия с внешнего API
- в критериях есть блок про документацию,а в задании не сказано сделать документацию для API

- структурное подразделение (обязательное поле) (заранее выбранное значение на основании орг.структуры слева и выделенного блока); Переделать на список?

# Интернет-кафе ресурсы (без авторизации)

- angular material

# Замечания

- при установке @angular/pwa может возниктуть проблема с schematic

```npm cache clean --force``` и заново установить ```ng add @angular/pwa```

- можно установить отдельно ```@angular/service-worker```, но лучше ```ng add @angular/pwa```
- если через ng add не устанавливается пакет, то npm install


- могут быть проблемы с AutoMapper в обратунуб сторону из dto в модель
- для работы с DateTime и Postgres надо настроить контекст
- Validate.email не рабоатет c кириллицей