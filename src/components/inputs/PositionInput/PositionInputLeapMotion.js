import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Controller } from 'leapjs';

import PositionInputCartesianPlane from './PositionInputCartesianPlane';

/**
 * Converts a 3d vector representing a position in Leap Motion space to a
 * position object that can be sent to the Braccio API.
 *
 * @param {[number, number, number]} leapPos a 3d vector
 */
function leapPostoBraccioPos(leapPos) {
  const [x, y, z] = leapPos;
  
  // The Leap Motion uses y as height, but the braccio uses z
  return {
    x: Math.floor(x),
    y: -Math.floor(z),
    z: Math.floor(y),
  };
}

function PositionInputLeapMotion({ position, onChange }) {
  const [message, setMessage] = useState('nessuna mano rilevata');

  useEffect(() => {
    // const controller = new Controller({ loopWhileDisconnected: false });
    const controller = new Controller({ loopWhileDisconnected: false });
    controller.connect();

    const frameHandler = (frame) => {
      const { hands } = frame;

      if (hands.length !== 1) {
        setMessage(
          `${hands.length} mani rilevate. Deve esserci una e una sola mano.`
        );
        return;
      }

      const hand = hands[0];
      const pos = leapPostoBraccioPos(hand.palmPosition);
      
      setMessage(`Mano rilevata, posizione: ${pos.x}, ${pos.y}, ${pos.z}`);
      onChange(pos);
    };
    controller.on('frame', frameHandler);

    return () => {
      controller.disconnect();
      controller.removeListener('frame', frameHandler);
    };
  }, [onChange]);

  return (
    <div>
      <Typography gutterBottom>{message}</Typography>
      <PositionInputCartesianPlane position={position} />
    </div>
  );
}

export default PositionInputLeapMotion;
