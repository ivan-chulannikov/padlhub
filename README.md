# Расписание первых пробных тренировок

Fullstack-тестовое задание: расписание бесплатных первых тренировок Падл хаб, представленное в формате турнирного расписания.

## Реализовано

- Недельная навигация по датам.
- Фильтрация по типу, станции и дате через REST API.
- Группировка тренировок по дням.
- Карточки со временем, длительностью, тренером, станцией и свободными местами.
- Окно с подробной информацией о тренировке.
- Loading, error и empty состояния.
- Адаптивная версия для desktop, tablet и mobile.
- NestJS API с DTO-валидацией query-параметров.
- MongoDB с автоматическим заполнением демо-данными при первом запуске.
- Docker Compose для запуска frontend, API и MongoDB.
- FSD-структура frontend с автоматической проверкой направлений слоёв и public API.

Запись и оплата намеренно не реализованы в соответствии с условием задания.

## Стек

### Frontend

- React 19
- TypeScript
- Vite
- CSS Modules

### Backend

- NestJS
- Mongoose
- MongoDB
- REST API
- Docker / Nginx

## Быстрый запуск

Требуется установленный Docker Desktop:

```bash
docker compose up --build
```

После запуска:

- Frontend: http://localhost:5173
- REST API: http://localhost:3000/api
- Health check: http://localhost:3000/api/health

Остановка:

```bash
docker compose down
```

## Локальная разработка без Docker

1. Запустить MongoDB на `mongodb://localhost:27017/padlhub`.
2. Запустить backend:

```bash
cd backend
cp .env.example .env
npm install
npm run start:dev
```

3. В другом терминале запустить frontend:

```bash
cp .env.example .env
npm install
npm run dev
```

## API

```text
GET /api/health
GET /api/trainings
GET /api/trainings?station=Нагатинская
GET /api/trainings?type=Американо
GET /api/trainings?date=2026-07-14
GET /api/trainings/stations
GET /api/trainings/types
GET /api/trainings/:id
```

## Архитектурные решения

Frontend организован по слоям `app`, `pages`, `widgets`, `features`, `entities`, `shared`. Межслойные импорты проходят только через public API слайсов. Команда `npm run check:fsd` автоматически проверяет deep imports и направления зависимостей.

Frontend не содержит расписание и получает его из REST API. Фильтры передаются на backend через query-параметры. API разделён на controller, service, DTO и Mongoose schema.

Seed выполняется только для пустой коллекции: проверяющий получает наполненный интерфейс сразу после `docker compose up`, а повторный запуск не создаёт дубликаты.

Scope ограничен чтением расписания. Административный CRUD, авторизация, запись и оплата не добавлялись, потому что они не входят в условие и нарушили бы ограничение в три часа.
