import { useState } from 'react';
import useWebSocket from 'react-use-websocket';
import useSWR from 'swr';
import { BASE_URL, BASE_URL_WS } from './urls';
import { DEFAULT_JOINT_POSITIONS } from './joints';

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
    speed: 30,
    position: { ...DEFAULT_JOINT_POSITIONS },
  });

  const sendPacket = (type, data) => {
    sendJsonMessage({ type, data });
  };

  const setPosition = (position) => {
    sendPacket('set_position', position);
    setState({ ...state, position });
  };

  const setSpeed = (speed) => {
    sendPacket('set_speed', { speed });
    setState({ ...state, speed });
  };

  const { speed, position } = state;
  return { readyState, speed, position, setSpeed, setPosition };
}
