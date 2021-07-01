import Grid from '@material-ui/core/Grid';

import LabelSliderNumberCombo from './LabelSliderNumberCombo';

function PositionInput({ position, onChange }) {
  const min = -500;
  const max = +500;

  const handleChange = (axis) => (newValue) => {
    onChange({
      ...position,
      [axis]: newValue,
    });
  };

  return (
    <Grid container>
      {['x', 'y', 'z'].map((axis) => (
        <LabelSliderNumberCombo
          key={axis}
          label={axis}
          min={min}
          max={max}
          value={position[axis]}
          onChange={handleChange(axis)}
        />
      ))}
    </Grid>
  );
}

export default PositionInput;
