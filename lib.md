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


`
dependencies {
    // Retrofit и сериализация
    implementation("com.jakewharton.retrofit:retrofit2-kotlinx-serialization-converter:1.0.0") // Конвертер для Kotlin Serialization
    implementation("com.squareup.retrofit2:retrofit:2.11.0") // Retrofit для сетевых запросов
    implementation("io.coil-kt:coil-compose:2.7.0") // Загрузка и отображение изображений в Compose
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.8.0") // Kotlin Serialization для JSON

    // Навигация в Compose
    implementation("androidx.navigation:navigation-compose:2.8.7") // Навигация между экранами в Compose

    // Coroutines
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.8.0") // Kotlin Coroutines для асинхронных операций

    // Accompanist (дополнительные функции для Compose)
    implementation("com.google.accompanist:accompanist-swiperefresh:0.32.0") // Pull-to-Refresh
    implementation("com.google.accompanist:accompanist-placeholder:0.32.0") // Плейсхолдеры для загрузки
}
`

> Замечание: На уровне проекта нужно:

- Убедиться, что добавлены репозитории google() и mavenCentral().
- Добавить плагин kotlinx-serialization, если используется Kotlin Serialization.
- Проверить актуальность версий Kotlin и Android Gradle Plugin.

На уровне модуля (app/build.gradle.kts) добавляются все зависимости, такие как Retrofit, Coil, Accompanist и Compose.

plugins {
    id("com.android.application") version "8.8.0" apply false
    id("com.android.library") version "8.8.0" apply false
    id("org.jetbrains.kotlin.android") version "2.1.0" apply false
    id("org.jetbrains.kotlin.plugin.compose") version "2.1.0" apply false
    id("org.jetbrains.kotlin.plugin.serialization") version "2.1.0" apply false
}