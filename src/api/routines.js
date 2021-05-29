import { BASE_URL } from './urls';
import useSWR, { mutate } from 'swr';

export const DEFAULT_ROUTINE = { name: '', steps: [] };

export function useRoutineList() {
  return useSWR('/routines');
}

export function useRoutine(id) {
  return useSWR(!id ? null : `/routines/${id}`);
}

export async function createRoutine(routine) {
  const res = await fetch(BASE_URL + `/routines`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(routine),
  });
  const created = await res.json();

  // preload data in cache
  await mutate(`/routines/${created.id}`, created);

  // TODO: handle non-200 responses
  return created;
}

export async function updateRoutine(id, routine) {
  const res = await fetch(BASE_URL + `/routines/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(routine),
  });
  const updated = await res.json();

  // mutate cache
  mutate(`/routines/${updated.id}`, updated);

  return updated;
}

export async function deleteRoutine(id) {
  await fetch(BASE_URL + `/routines/${id}`, {
    method: 'DELETE',
  });

  // update list
  mutate('/routines');
}
