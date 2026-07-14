export const scheduleDays = Array.from({ length: 7 }, (_, index) => {
  const date = new Date(2026, 6, 14 + index);

  return {
    value: date.toISOString().slice(0, 10),
    day: new Intl.DateTimeFormat('ru-RU', { day: '2-digit' }).format(date),
    weekday: new Intl.DateTimeFormat('ru-RU', { weekday: 'short' }).format(date).replace('.', ''),
  };
});
