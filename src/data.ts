export type Station = 'Все станции' | 'Нагатинская' | 'Терехово' | 'Ясенево';

export type Training = {
  id: number;
  date: string;
  time: string;
  title: string;
  station: Exclude<Station, 'Все станции'>;
  address: string;
  coach: string;
  duration: number;
  spotsLeft: number;
  spotsTotal: number;
  court: string;
};

export const stations: Station[] = ['Все станции', 'Нагатинская', 'Терехово', 'Ясенево'];

export const trainings: Training[] = [
  {
    id: 1,
    date: '2026-07-14',
    time: '19:00',
    title: 'Первая пробная тренировка',
    station: 'Нагатинская',
    address: '1-й Нагатинский проезд, 2с17',
    coach: 'Алексей Морозов',
    duration: 60,
    spotsLeft: 2,
    spotsTotal: 4,
    court: 'Корт 3',
  },
  {
    id: 2,
    date: '2026-07-15',
    time: '10:30',
    title: 'Первая пробная тренировка',
    station: 'Терехово',
    address: 'Нижние Мнёвники, 110',
    coach: 'Мария Лебедева',
    duration: 60,
    spotsLeft: 1,
    spotsTotal: 4,
    court: 'Корт 1',
  },
  {
    id: 3,
    date: '2026-07-16',
    time: '18:00',
    title: 'Первая пробная тренировка',
    station: 'Ясенево',
    address: 'Новоясеневский проспект, 3А',
    coach: 'Полина Конева',
    duration: 90,
    spotsLeft: 3,
    spotsTotal: 4,
    court: 'Корт 2',
  },
  {
    id: 4,
    date: '2026-07-18',
    time: '12:00',
    title: 'Первая пробная тренировка',
    station: 'Нагатинская',
    address: '1-й Нагатинский проезд, 2с17',
    coach: 'Дмитрий Григорьев',
    duration: 60,
    spotsLeft: 4,
    spotsTotal: 4,
    court: 'Корт 5',
  },
  {
    id: 5,
    date: '2026-07-19',
    time: '17:30',
    title: 'Первая пробная тренировка',
    station: 'Терехово',
    address: 'Нижние Мнёвники, 110',
    coach: 'Ксения Данько',
    duration: 60,
    spotsLeft: 2,
    spotsTotal: 4,
    court: 'Корт 4',
  },
];
