import Canvas from './Canvas';

function resizeCanvasSquare(canvas) {
  const { width } = canvas.getBoundingClientRect();

  if (canvas.width !== width || canvas.height !== width) {
    const { devicePixelRatio: ratio = 1 } = window;
    const context = canvas.getContext('2d');
    canvas.width = width * ratio;
    canvas.height = width * ratio;
    context.scale(ratio, ratio);
  }

  return width;
}

// scale a dimension to the axis
const toCanvasCoords = (x, axis, canvasSize) => {
  const { min, max } = axis;
  return (x / (max - min)) * canvasSize;
};

const toPositionCoords = (x, axis, canvasSize) => {
  const { min, max } = axis;
  return (x / canvasSize) * (max - min);
};

function CartesianPlane({ axis, pos, onClick }) {
  const drawMarks = ({ context: ctx, size }) => {
    // helper functions
    const strokeLine = (x1, y1, x2, y2) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    // varaibles
    const lines = 20;

    // reset canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, size, size);

    // lines
    ctx.strokeStyle = '#ccc';
    for (let i = 0; i < lines; i++) {
      const n = i * (size / lines);
      strokeLine(n, 0, n, size); // vertical
      strokeLine(0, n, size, n); // horizontal
    }

    // axis
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 2;
    strokeLine(size / 2, 0, size / 2, size);
    strokeLine(0, size / 2, size, size / 2);
  };

  const drawPos = ({ context: ctx, size }) => {
    if (!pos) return;

    const { horizontal, vertical } = pos;

    const x = toCanvasCoords(horizontal, axis.horizontal, size);
    const y = toCanvasCoords(vertical, axis.vertical, size);

    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.scale(1, -1);

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
  };

  const draw = ({ context, ...params }) => {
    const size = resizeCanvasSquare(context.canvas);
    drawMarks({ size, context, ...params });
    drawPos({ size, context, ...params });
  };

  const handleClick = (event, canvasPos) => {
    const size = event.target.width;

    const x = toPositionCoords(canvasPos.x - size / 2, axis.horizontal, size);
    const y = toPositionCoords(-(canvasPos.y - size / 2), axis.vertical, size);

    const pos = {
      horizontal: Math.round(x),
      vertical: Math.round(y),
    };

    onClick(pos);
  };

  return <Canvas style={{ width: '100%' }} draw={draw} onClick={handleClick} />;
}

export default CartesianPlane;
