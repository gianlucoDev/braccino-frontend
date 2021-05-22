import useSWR from 'swr';
import { BASE_URL } from './fetcher';

export function useBraccioList() {
  return useSWR('/braccio');
}

export function useBraccio(serial_number) {
  return useSWR(!serial_number ? null : `/braccio/${serial_number}`);
}

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
