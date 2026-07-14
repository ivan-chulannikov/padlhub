const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export async function apiRequest<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`, { signal });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}
