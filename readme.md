
# Пакеты для добавления в ИЛ

backend
- Swashbackle.Swagger

```
    <PackageReference Include="Microsoft.IdentityModel.Tokens" Version="8.3.1" />
    <PackageReference Include="System.IdentityModel.Tokens.Jwt" Version="8.3.1" />

    <PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="9.0.1" />
```

frontend:
- angular material

# Подготовка день С-1

- настроить горячие клавиши VsCode
- установить пакеты, проверить базу и гит
- проверить dotnet-ef для миграций
- проверить angular
- проверить angular desktop
- проверить Android Studio и подключение к базе данных через Retrofit
- если останется время, сразу делать первую сессию и настраивать окружение

# Сессия 1
.net 9

- создать папку RusRoads и перейти в нее
- создать решение dotnet new sln
- создать проект webapi с флагом ```-controllers``` и 
- добавить проект api в решение
- в api добавить gitignore
- открыть в vs code папку RusRoads
- почистить проект api
- поставить пакет для Swagger и подключить в Program
- в папке ```Entities``` создать модели предметной области
- в папку ```Data``` создать контекст RusRoadsContext
- настроить подключение к базе данных
- провести начальные миграции
- настроить в контексте ограничения в базе данных (либо прямо в postgres)
- внесит по 3 тестовые записи для каждой таблицы

# Сессия 2

- employee crud 
- event

# Сессия 3 
проектирование wireframe и uml

# Сессия 4

- работники
- новости 
- события

На фронтенде работа с календарем, формат календаря, qr code, rss 


# Сессия 5

- мобильное приложение: события и новости
- доработка веб-приложения из сессии 4


**Замечания**:

- компирование из Excel в Dbeaver работает нормально при Ctrl + Shift + V и поставить "Вставить множество строк"
- возможно понадобиться ручное обновление счетчика автоинкремента

```
ALTER SEQUENCE "Subdivisions_Id_seq" RESTART 48;
```

- ограничения делать на чистом sql в бд


# Вопросы и предложения

- в API конечноя точка создания комментария, может быть изменить структуру входной модели