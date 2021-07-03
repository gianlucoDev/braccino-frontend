import { useEffect, useRef } from 'react';

/**
 * Takes a MouseEvent fired from a <canvas> and converts the coordinates of
 * the MouseEvent in <cavas> coordinates
 *
 * @param {MouseEvent} event a MouseEvent that has been fired from a <canvas> element
 * @return an object with the coordinates
 */
export function getCanvasCoords(event) {
  const canvas = event.target;
  const { top, left } = canvas.getBoundingClientRect();

  let x = event.pageX - left;
  let y = event.pageY - top;

  return { x, y };
}

function Canvas({ draw, ...props }) {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext('2d');

    let frameId;
    const render = (timestamp) => {
      draw({ context, timestamp });
      frameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  });

  return <canvas {...props} ref={ref} />;
}

export default Canvas;
