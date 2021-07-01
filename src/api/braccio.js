import { useState } from 'react';
import useWebSocket from 'react-use-websocket';
import useSWR from 'swr';
import { BASE_URL, BASE_URL_WS } from './urls';

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

export function useBraccioSocket(serial_number) {
  const { sendJsonMessage, readyState } = useWebSocket(
    `${BASE_URL_WS}/braccio/${serial_number}/`
  );

  const [state, setState] = useState({
    speed: 20,
    attack_angle: null,
    gripper: 50,
    gripper_rot: 0,
    position: {
      x: 250,
      y: 0,
      z: 125,
    },
  });

  const sendPacket = (type, data) => {
    sendJsonMessage({ type, data });
  };

  const update = (newState) => {
    sendPacket('update', newState);
    setState(newState);
  };

  return { socketState: readyState, state, update };
}
