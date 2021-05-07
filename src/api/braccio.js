import { BASE_URL } from './fetcher';

export async function runRoutine(braccio, routine) {
  const res = await fetch(
    `${BASE_URL}/braccio/${braccio.serial_number}/run/${routine.id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return await res.json();
}
