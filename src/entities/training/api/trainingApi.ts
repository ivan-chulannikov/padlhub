import { apiRequest } from '@/shared/api';
import type { StationName, Training } from '../model/types';

type TrainingFilters = {
  station?: StationName;
  date?: string;
};

export function getTrainings(filters: TrainingFilters, signal?: AbortSignal): Promise<Training[]> {
  const query = new URLSearchParams();
  if (filters.station) query.set('station', filters.station);
  if (filters.date) query.set('date', filters.date);

  const search = query.size ? `?${query.toString()}` : '';
  return apiRequest<Training[]>(`/trainings${search}`, signal);
}

export function getStations(signal?: AbortSignal): Promise<StationName[]> {
  return apiRequest<StationName[]>('/trainings/stations', signal);
}
