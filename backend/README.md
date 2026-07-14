# PadlHub schedule API

NestJS REST API для расписания первых пробных тренировок.

## Endpoints

- `GET /api/health`
- `GET /api/trainings`
- `GET /api/trainings?station=Нагатинская`
- `GET /api/trainings?type=Американо`
- `GET /api/trainings?date=2026-07-14`
- `GET /api/trainings/stations`
- `GET /api/trainings/types`
- `GET /api/trainings/:id`

Интерактивная OpenAPI-документация доступна на `/api/docs`, JSON-схема — на `/api/docs-json`.

При первом запуске пустая MongoDB автоматически заполняется демонстрационным расписанием.

## Local development

```bash
cp .env.example .env
npm install
npm run start:dev
```
