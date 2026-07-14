export const scheduleDays = Array.from({ length: 7 }, (_, index) => {
  const date = new Date(2026, 6, 14 + index);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const dayOfMonth = String(date.getDate()).padStart(2, '0');

  return {
    value: `${year}-${month}-${dayOfMonth}`,
    day: new Intl.DateTimeFormat('ru-RU', { day: '2-digit' }).format(date),
    weekday: new Intl.DateTimeFormat('ru-RU', { weekday: 'short' }).format(date).replace('.', ''),
    label: new Intl.DateTimeFormat('ru-RU', { dateStyle: 'full' }).format(date),
  };
});
