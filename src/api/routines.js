import { BASE_URL } from './fetcher';

export const DEFAULT_ROUTINE = { name: '', steps: [] };

export async function createRoutine(routine) {
  const res = await fetch(BASE_URL + `/routines`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(routine),
  });

  // TODO: handle non-200 responses
  return await res.json();
}

export async function updateRoutine(id, routine) {
  const res = await fetch(BASE_URL + `/routines/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(routine),
  });

  return await res.json();
}

export async function deleteRoutine(id) {
  await fetch(BASE_URL + `/routines/${id}`, {
    method: 'DELETE',
  });
}
