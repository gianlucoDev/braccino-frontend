import Grid from '@material-ui/core/Grid';

import InputContainer from './InputContainer';
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
    <InputContainer heading="Posizione">
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
    </InputContainer>
  );
}

export default PositionInput;
