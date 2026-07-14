export type StationName = 'Нагатинская' | 'Терехово' | 'Ясенево';
export type StationFilter = 'Все станции' | StationName;
export type TrainingType = 'Американо' | 'Мексикано';
export type TrainingTypeFilter = 'Все типы' | TrainingType;

export type Training = {
  id: number;
  date: string;
  time: string;
  title: string;
  station: StationName;
  type: TrainingType;
  address: string;
  coach: string;
  duration: number;
  spotsLeft: number;
  spotsTotal: number;
  court: string;
};
