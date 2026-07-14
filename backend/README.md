# PadlHub schedule API

NestJS REST API для расписания первых пробных тренировок.

## Endpoints

- `GET /api/health`
- `GET /api/trainings`
- `GET /api/trainings?station=Нагатинская`
- `GET /api/trainings?date=2026-07-14`
- `GET /api/trainings/stations`
- `GET /api/trainings/:id`

При первом запуске пустая MongoDB автоматически заполняется демонстрационным расписанием.

## Local development

```bash
cp .env.example .env
npm install
npm run start:dev
```
