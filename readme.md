
# Замечания

- лучше настраивать контроллер индивидуально с полным контролем dto 


# Пакеты для добавления в ИЛ

расширения для vscode

- для работы с c#
- angular

backend (.NET Core 9)

- Swashbackle.Swagger
- Microsoft.IdentityModel.Tokens (8.3.1)
- System.IdentityModel.Tokens.Jwt(8.3.1)
- Microsoft.AspNetCore.Authentication.JwtBearer(9.0.1)
- Microsoft.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.Tools
- Microsoft.EntityFrameworkCore.Design
- Npgsql.EntityFrameworkCore.PostgreSQL

- работа с RSS
- работа с таймером
- работа с файлами .ics
- работа с QRCode, формат vCard


frontend (Angular)
- rxjs
- angular material
- material-design-icons-iconfont
- ng-bootstrap
- работа с pwa
- ngx-toastr
- работа с модальными окнами
- работа с иерархией предсталения
- работа с отображением прямоугольников


kotlin:

- пакет для слайдера
- пакет для работы с удержанием, жестами
- может быть пакет material design
- пакет для работы с календарем


- на уровне проекта
plugins {
    id("com.android.application") version "8.8.0" apply false
    id("com.android.library") version "8.8.0" apply false
    id("org.jetbrains.kotlin.android") version "2.1.0" apply false
    id("org.jetbrains.kotlin.plugin.compose") version "2.1.0" apply false
    id("org.jetbrains.kotlin.plugin.serialization") version "2.1.0" apply false
}

- на уровне модуля

dependencies {

    // Import the Compose BOM
    implementation(platform("androidx.compose:compose-bom:2024.12.01"))
    implementation("androidx.activity:activity-compose:1.9.3")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.core:core-ktx:1.15.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.7")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.7")

    // Retrofit
    implementation("com.jakewharton.retrofit:retrofit2-kotlinx-serialization-converter:1.0.0")
    implementation("com.squareup.retrofit2:retrofit:2.11.0")
    implementation("io.coil-kt:coil-compose:2.7.0")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.8.0")

    debugImplementation("androidx.compose.ui:ui-test-manifest")
    debugImplementation("androidx.compose.ui:ui-tooling")
}


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

- создать общий api контроллер с базовыми сущностями. Если данные избыточны, то добавить TDto и применить AutoMapper (или работать с каждым контроллером индивидуально)


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
- проверить внешний API на CORS

# Интернет-кафе ресурсы (без авторизации)

- angular material