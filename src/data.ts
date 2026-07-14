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
