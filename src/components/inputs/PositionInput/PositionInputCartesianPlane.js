import Grid from '@material-ui/core/Grid';

import CartesianPlane from './CartesianPlane';

function PositionInputCartesianPlane({ position, onChange }) {
  const handleClickXY = (pos) => {
    const { horizontal: x, vertical: y } = pos;
    onChange({
      ...position,
      x,
      y,
    });
  };

  const handleClickXZ = (pos) => {
    const { horizontal: x, vertical: z } = pos;
    onChange({
      ...position,
      x,
      z,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <CartesianPlane
          axis={{
            horizontal: { name: 'x', min: -500, max: 500 },
            vertical: { name: 'y', min: -500, max: 500 },
          }}
          pos={{
            horizontal: position.x,
            vertical: position.y,
          }}
          onClick={handleClickXY}
        />
      </Grid>
      <Grid item xs={6}>
        <CartesianPlane
          axis={{
            horizontal: { name: 'x', min: -500, max: 500 },
            vertical: { name: 'z', min: -500, max: 500 },
          }}
          pos={{
            horizontal: position.x,
            vertical: position.z,
          }}
          onClick={handleClickXZ}
        />
      </Grid>
    </Grid>
  );
}

export default PositionInputCartesianPlane;
