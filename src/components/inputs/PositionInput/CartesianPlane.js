import Canvas, { getCanvasCoords } from './Canvas';

//#region helper functions

// cartesian plane coord -> canvas coord
const toCanvasCoords = (x, axis, canvasSize) => {
  const { min, max } = axis;
  return (x / (max - min)) * canvasSize;
};

// canvas coord -> cartesian plane coord
const toPositionCoords = (x, axis, canvasSize) => {
  const { min, max } = axis;
  return (x / canvasSize) * (max - min);
};

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

//#endregion

//#region rendering functions

const drawMarks = (ctx, size, axis) => {
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

  // begin: lables
  ctx.fillStyle = '#000';
  ctx.font = `16px monospace`;

  const lm = 4; // label margin
  const s2 = size / 2; // half size

  // label axis names
  ctx.textAlign = 'start';
  ctx.textBaseline = 'top';
  ctx.fillText(axis.vertical.name, s2 + lm, 0 + lm);

  ctx.textAlign = 'end';
  ctx.textBaseline = 'bottom';
  ctx.fillText(axis.horizontal.name, size - lm, s2 - lm);

  // label axis extremes
  ctx.textAlign = 'start';
  ctx.textBaseline = 'top';
  ctx.fillText(axis.horizontal.min, 0 + lm, s2 + lm);

  ctx.textAlign = 'end';
  ctx.textBaseline = 'top';
  ctx.fillText(axis.horizontal.max, size - lm, s2 + lm);

  ctx.textAlign = 'end';
  ctx.textBaseline = 'top';
  ctx.fillText(axis.vertical.max, s2 - lm, 0 + lm);

  ctx.textAlign = 'end';
  ctx.textBaseline = 'bottom';
  ctx.fillText(axis.vertical.min, s2 - lm, size - lm);
};

const drawPos = (ctx, size, axis, pos) => {
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

//#endregion

function CartesianPlane({ axis, pos, onClick }) {
  const draw = ({ context }) => {
    const size = resizeCanvasSquare(context.canvas);
    drawMarks(context, size, axis);
    drawPos(context, size, axis, pos);
  };

  // takes a MouseEvent fire from a <canvas> and converts to the coordiantes used by the <CartesianPlane />
  const handleClick = (event) => {
    const canvas = event.target;
    const size = canvas.width;

    const coords = getCanvasCoords(event);
    const x = toPositionCoords(coords.x - size / 2, axis.horizontal, size);
    const y = toPositionCoords(-(coords.y - size / 2), axis.vertical, size);

    const pos = {
      horizontal: Math.round(x),
      vertical: Math.round(y),
    };

    onClick(pos);
  };

  return <Canvas style={{ width: '100%' }} draw={draw} onClick={handleClick} />;
}

export default CartesianPlane;
