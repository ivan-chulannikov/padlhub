import type { Station, Training } from './data';

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

type TrainingFilters = {
  station?: Exclude<Station, 'Все станции'>;
  date?: string;
};

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`, { signal });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getTrainings(filters: TrainingFilters, signal?: AbortSignal): Promise<Training[]> {
  const query = new URLSearchParams();
  if (filters.station) query.set('station', filters.station);
  if (filters.date) query.set('date', filters.date);

  const search = query.size ? `?${query.toString()}` : '';
  return request<Training[]>(`/trainings${search}`, signal);
}

export function getStations(signal?: AbortSignal): Promise<Array<Exclude<Station, 'Все станции'>>> {
  return request<Array<Exclude<Station, 'Все станции'>>>('/trainings/stations', signal);
}
