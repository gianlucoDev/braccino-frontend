import { useEffect, useRef } from 'react';

function Canvas({ draw, onClick, ...props }) {
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

  const handleClick = (e) => {
    const canvas = ref.current;
    const { top, left } = canvas.getBoundingClientRect();

    let x = e.pageX - left;
    let y = e.pageY - top;

    onClick(e, { x, y });
  };

  return <canvas {...props} ref={ref} onClick={handleClick} />;
}

export default Canvas;
